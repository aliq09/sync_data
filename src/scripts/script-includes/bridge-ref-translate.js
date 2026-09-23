/**
 * BridgeRefTranslate — minimal first-slice implementation.
 * Full strategy matrix (xref cache warming, identity, null_and_flag) can grow later.
 * Capture already emits natural keys for user_name/group_name; apply resolves them here.
 */
var BridgeRefTranslate = Class.create()

BridgeRefTranslate.prototype = {
    initialize: function () {},

    /**
     * Build lookup maps once per batch.
     * @returns {{usersByName: Object, groupsByName: Object}}
     */
    prepare: function (items, peerId) {
        var users = {}
        var groups = {}
        // Warm maps from payloads that already carry natural keys — cheap.
        // Deeper warming against sys_user / sys_user_group happens on miss in translate.
        return { usersByName: users, groupsByName: groups, peerId: peerId || '' }
    },

    /**
     * @returns {{values: Object, unresolved: Array}}
     */
    translate: function (item, refMap, maps) {
        var values = {}
        var unresolved = []
        var src = (item && item.values) || {}
        refMap = refMap || {}
        maps = maps || { usersByName: {}, groupsByName: {} }

        for (var field in src) {
            if (!Object.prototype.hasOwnProperty.call(src, field)) continue
            var strategy = refMap[field] && refMap[field].strategy
            if (!strategy || strategy === 'identity') {
                values[field] = src[field]
                continue
            }
            if (strategy === 'null_and_flag') {
                values[field] = ''
                continue
            }
            if (strategy === 'user_name') {
                var uname = src[field]
                if (!uname) {
                    values[field] = ''
                    continue
                }
                var uid = maps.usersByName[uname] || this._lookupUser(uname)
                if (uid) {
                    maps.usersByName[uname] = uid
                    values[field] = uid
                } else {
                    values[field] = ''
                    unresolved.push({ field: field, strategy: strategy, key: uname })
                }
                continue
            }
            if (strategy === 'group_name') {
                var gname = src[field]
                if (!gname) {
                    values[field] = ''
                    continue
                }
                var gid = maps.groupsByName[gname] || this._lookupGroup(gname)
                if (gid) {
                    maps.groupsByName[gname] = gid
                    values[field] = gid
                } else {
                    values[field] = ''
                    unresolved.push({ field: field, strategy: strategy, key: gname })
                }
                continue
            }
            // xref / unknown: pass through raw; unresolved if empty unexpected
            values[field] = src[field]
        }
        return { values: values, unresolved: unresolved }
    },

    _lookupUser: function (userName) {
        var gr = new GlideRecord('sys_user')
        gr.addQuery('user_name', userName)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : ''
    },

    _lookupGroup: function (name) {
        var gr = new GlideRecord('sys_user_group')
        gr.addQuery('name', name)
        gr.setLimit(1)
        gr.query()
        return gr.next() ? gr.getUniqueValue() : ''
    },

    type: 'BridgeRefTranslate',
}
