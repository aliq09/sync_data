/**
 * item_option_new is not in the SDK table map. Register it so Fluent record
 * ACLs can name the catalog variable table. The shape is only used for typing;
 * the installed ACL name is the string item_option_new.
 */
export {}

declare global {
    namespace Now {
        namespace Internal {
            interface Tables {
                item_option_new: Tables['sc_cat_item']
            }
        }
    }
}
