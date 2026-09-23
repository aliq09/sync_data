/**
 * Runs after application files load (sys_script_fix.before = false).
 * 0.2.0 and 0.2.1 wrote the Configuration Snapshot section only as form
 * metadata. Both PDIs applied the other Default-view sections and left
 * Notes at position 5, with no section row and no config_snapshot element.
 * This script inserts that row, the two elements, and the form link when
 * they are still missing. It is safe to run again.
 */
;(function placeDexSnapshotSection() {
    var TABLE = 'x_33764_sbridge_data_execution'
    var FORM_ID = 'a39c161c38d7471dbf6001749a463750'
    var SECTION_ID = '5edf9b4f473a422198044825a384682b'
    var LINK_ID = '4c27e767676c4bb08c8820010017669f'
    var SNAPSHOT_ELEMENT_ID = 'c338bd1a7d664c3c9f80b4662e686f75'
    var RUN_ELEMENT_ID = 'fd40f7eb7c724d1fa2646218253bea75'
    var HEADER_ID = 'f370e505d8da4a2bb9f783a1badbf058'
    var NOTES_LINK_ID = 'a25c837926504870a03001e1dad7673a'

    try {
        var view = 'Default view'
        var domain = 'global'
        var header = new GlideRecord('sys_ui_section')
        if (header.get(HEADER_ID)) {
            view = header.getValue('view') || view
            domain = header.getValue('sys_domain') || domain
        }

        var sectionId = ensureSection(view, domain)
        if (!sectionId) return

        ensureElement(SNAPSHOT_ELEMENT_ID, sectionId, 'config_snapshot', '0')
        ensureElement(RUN_ELEMENT_ID, sectionId, 'run', '1')
        ensureFormLink(sectionId)
        moveNotesToPositionFive()
    } catch (e) {
        gs.error('[bridge] Configuration Snapshot section was not placed: ' + e)
    }

    function ensureSection(view, domain) {
        var gr = new GlideRecord('sys_ui_section')
        if (!gr.isValid()) {
            gs.error('[bridge] sys_ui_section is not available to the snapshot fix script')
            return ''
        }
        if (gr.get(SECTION_ID)) return SECTION_ID

        var found = new GlideRecord('sys_ui_section')
        found.addQuery('name', TABLE)
        found.addQuery('caption', 'Configuration Snapshot')
        found.addQuery('view', view)
        found.setLimit(1)
        found.query()
        if (found.next()) return found.getUniqueValue()

        gr.newRecord()
        try {
            gr.setNewGuidValue(SECTION_ID)
        } catch (ignore) {
            gr.setValue('sys_id', SECTION_ID)
        }
        gr.setValue('name', TABLE)
        gr.setValue('caption', 'Configuration Snapshot')
        gr.setValue('view', view)
        gr.setValue('sys_domain', domain)
        gr.setValue('header', 'false')
        gr.setValue('title', 'false')
        var inserted = gr.insert()
        if (!inserted) {
            gs.error('[bridge] Configuration Snapshot section insert failed')
            return ''
        }
        return String(inserted)
    }

    function ensureElement(id, sectionId, element, position) {
        var gr = new GlideRecord('sys_ui_element')
        if (!gr.isValid()) return
        if (gr.get(id)) return
        var found = new GlideRecord('sys_ui_element')
        found.addQuery('sys_ui_section', sectionId)
        found.addQuery('element', element)
        found.setLimit(1)
        found.query()
        if (found.next()) return

        gr.newRecord()
        try {
            gr.setNewGuidValue(id)
        } catch (ignore) {
            gr.setValue('sys_id', id)
        }
        gr.setValue('sys_ui_section', sectionId)
        gr.setValue('element', element)
        gr.setValue('position', position)
        gr.setValue('type', '')
        if (!gr.insert()) gs.error('[bridge] form element insert failed for ' + element)
    }

    function ensureFormLink(sectionId) {
        var gr = new GlideRecord('sys_ui_form_section')
        if (!gr.isValid()) return
        if (gr.get(LINK_ID)) {
            if (gr.getValue('position') !== '4' || gr.getValue('sys_ui_section') !== sectionId) {
                gr.setValue('sys_ui_section', sectionId)
                gr.setValue('position', '4')
                gr.update()
            }
            return
        }
        var found = new GlideRecord('sys_ui_form_section')
        found.addQuery('sys_ui_form', FORM_ID)
        found.addQuery('sys_ui_section', sectionId)
        found.setLimit(1)
        found.query()
        if (found.next()) {
            if (found.getValue('position') !== '4') {
                found.setValue('position', '4')
                found.update()
            }
            return
        }
        gr.newRecord()
        try {
            gr.setNewGuidValue(LINK_ID)
        } catch (ignore) {
            gr.setValue('sys_id', LINK_ID)
        }
        gr.setValue('sys_ui_form', FORM_ID)
        gr.setValue('sys_ui_section', sectionId)
        gr.setValue('position', '4')
        if (!gr.insert()) gs.error('[bridge] Configuration Snapshot form link insert failed')
    }

    function moveNotesToPositionFive() {
        var notes = new GlideRecord('sys_ui_form_section')
        if (!notes.get(NOTES_LINK_ID)) return
        var pos = parseInt(notes.getValue('position'), 10)
        if (isNaN(pos) || pos === 4) {
            notes.setValue('position', '5')
            notes.update()
        }
    }
})()
