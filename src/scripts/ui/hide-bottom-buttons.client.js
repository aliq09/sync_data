function onLoad() {
    var hide = function (el) {
        if (!el || !el.style) return
        el.style.display = 'none'
    }
    try {
        var doc = document
        var nodes = doc.querySelectorAll('[id$="_bottom"]')
        var i
        for (i = 0; i < nodes.length; i++) hide(nodes[i])
        hide(doc.getElementById('buttons_row_bottom'))
        var rows = doc.getElementsByClassName('form_action_button_row')
        if (rows && rows.length > 1) hide(rows[rows.length - 1])
    } catch (e) {}
}
