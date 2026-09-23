/**
 * The Data Execution Default form file is replaced on upgrade. Configuration
 * Snapshot is an explicit section record (not the skipped id 4568c2f0). This
 * step keeps that link at position 4 and Notes at position 5 inside the form
 * file, so an instance that already has the five-section form gains the section
 * between Timeline and Notes.
 */
export default async function ensureConfigurationSnapshotSection({ rootDir, path, logger }) {
    const fs = await import('node:fs/promises')
    const formId = 'a39c161c38d7471dbf6001749a463750'
    const formFile = path.join(rootDir, 'dist/app/update', `sys_ui_form_sections_${formId}.xml`)
    const xml = await fs.readFile(formFile, 'utf8')
    const blocks = xml.match(
        /<sys_ui_form_section action="INSERT_OR_UPDATE" apply_defaults="true">[\s\S]*?<\/sys_ui_form_section>/g
    )
    if (!blocks) throw new Error('Data Execution form file has no sections')

    const snapshot = blocks.find((block) => block.includes('caption="Configuration Snapshot"'))
    const notes = blocks.find((block) => block.includes('caption="Notes"'))
    if (!snapshot || !notes) {
        throw new Error('Data Execution form file is missing Configuration Snapshot or Notes')
    }

    const setPosition = (block, position) =>
        block.replace(/<position>\d+<\/position>/, `<position>${position}</position>`)
    const snapshotFixed = setPosition(snapshot, 4)
    const notesFixed = setPosition(notes, 5)

    let rest = xml.replace(snapshot, '').replace(notes, '')
    const anchor = rest.indexOf('<sys_ui_form action="INSERT_OR_UPDATE"')
    if (anchor < 0) throw new Error('Data Execution form record is missing from the section file')
    rest = `${rest.slice(0, anchor)}${snapshotFixed}\n    ${notesFixed}\n    ${rest.slice(anchor)}`
    rest = rest.replace(/\n\s*\n\s*\n/g, '\n\n')

    const sectionId = snapshot.match(/<sys_ui_section [^>]*>([0-9a-f]{32})<\/sys_ui_section>/)?.[1]
    if (!sectionId || sectionId === '4568c2f0e3754850bc8f46babb3f7030') {
        throw new Error('Configuration Snapshot is still bound to the skipped section id')
    }
    const sectionFile = path.join(rootDir, 'dist/app/update', `sys_ui_section_${sectionId}.xml`)
    const sectionXml = await fs.readFile(sectionFile, 'utf8')
    if (!sectionXml.includes('<element>config_snapshot</element>') || sectionXml.includes('action="DELETE"')) {
        throw new Error('Configuration Snapshot section file does not install config_snapshot')
    }
    if (!rest.includes('<position>4</position>') || !rest.includes('<position>5</position>')) {
        throw new Error('Failed to order Configuration Snapshot before Notes')
    }
    const openCount = (rest.match(/<sys_ui_form_section /g) || []).length
    const closeCount = (rest.match(/<\/sys_ui_form_section>/g) || []).length
    if (openCount !== 6 || closeCount !== 6) {
        throw new Error(`Data Execution form file has ${openCount} sections after ordering`)
    }
    const captions = [...rest.matchAll(/<sys_ui_section caption="([^"]+)"/g)].map((match) => match[1])
    const expected = ['Header', 'Scope', 'Counts', 'Timeline', 'Configuration Snapshot', 'Notes']
    if (captions.join('|') !== expected.join('|')) {
        throw new Error(`Data Execution section order is ${captions.join(', ')}`)
    }

    await fs.writeFile(formFile, rest)
    logger.info(`Configuration Snapshot (${sectionId}) is position 4 on the Data Execution Default form`)
}
