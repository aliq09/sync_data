import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'atf-capture-skip-integration': {
                        table: 'sys_atf_test'
                        id: 'd395eeceef2b41d08017aed42850fde0'
                    }
                    'atf-capture-skip-step': {
                        table: 'sys_atf_step'
                        id: '018c4d343d5547fe82d8f436bc678abc'
                    }
                    'atf-idempotent-replay': {
                        table: 'sys_atf_test'
                        id: '75d477b06c064abb9f85172ac2fffb91'
                    }
                    'atf-idempotent-replay-step': {
                        table: 'sys_atf_step'
                        id: '58ef88a963ea4f3691ded4f7de26db50'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '38c6d9f0e8824a328db050ebb81ea0c0'
                    }
                    'br-policy-ensure-capture': {
                        table: 'sys_script'
                        id: '59045330674d4c7a964d0d1081f0c62c'
                    }
                    BridgeApi: {
                        table: 'sys_script_include'
                        id: 'f9112f3dfa5a46ba98ec8614e7963e62'
                    }
                    BridgeApply: {
                        table: 'sys_script_include'
                        id: '240f15326eb94ab6919add44740cd0b6'
                    }
                    BridgeCapture: {
                        table: 'sys_script_include'
                        id: '663298ff02b14bdeb0e3171e131f2321'
                    }
                    BridgeConfig: {
                        table: 'sys_script_include'
                        id: 'c5014653bb474c0e8395e27b1b2ecfc3'
                    }
                    BridgePolicyHelper: {
                        table: 'sys_script_include'
                        id: '1a9bba09a6004d9dbedb36f2e271c8a3'
                    }
                    BridgeRefTranslate: {
                        table: 'sys_script_include'
                        id: '413f4c6a1b8e4026a3378e16e4e478a9'
                    }
                    BridgeSeed: {
                        table: 'sys_script_include'
                        id: '08496eb0b7514b8fb29dc24c89646ed9'
                    }
                    BridgeTransport: {
                        table: 'sys_script_include'
                        id: '3672051d7deb4445ac9cda193f55d3ab'
                    }
                    'job-drain': {
                        table: 'sysauto_script'
                        id: 'fba81b6094ff49f5a13529d2c343c059'
                    }
                    'mod-dlq': {
                        table: 'sys_app_module'
                        id: 'c2446b93ee6247488dbb7908a67eecaf'
                    }
                    'mod-outbox': {
                        table: 'sys_app_module'
                        id: 'efdc64ac74f34b3eabee9e5766f80067'
                    }
                    'mod-peers': {
                        table: 'sys_app_module'
                        id: 'ee119c0145ec4f5680d6b3ad61827628'
                    }
                    'mod-policies': {
                        table: 'sys_app_module'
                        id: '4cc5cbce1cd64f0b906b4dda3fdf8e8f'
                    }
                    'mod-receipts': {
                        table: 'sys_app_module'
                        id: 'c103270815e04809a75d8b9d167aa558'
                    }
                    'mod-runs': {
                        table: 'sys_app_module'
                        id: 'be5ae7e198d74f728650e0ed6857bbae'
                    }
                    'mod-sep-configuration': {
                        table: 'sys_app_module'
                        id: 'daf9aa602a3f4b24bac51825bdbde1b5'
                    }
                    'mod-sep-lab': {
                        table: 'sys_app_module'
                        id: 'b81b3873f09440429cbff68a7395f41d'
                    }
                    'mod-sep-operations': {
                        table: 'sys_app_module'
                        id: 'b9928013d7474413a3b9981f3255aa1c'
                    }
                    'mod-sep-traceability': {
                        table: 'sys_app_module'
                        id: 'd4343dbc76564c88937bcf209f6ef103'
                    }
                    'mod-test': {
                        table: 'sys_app_module'
                        id: '61008bfbbe414775a4b73073cf6dcc60'
                    }
                    'mod-xref': {
                        table: 'sys_app_module'
                        id: '64c7c038ecc14ceaae156e80ff5cc391'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '1c478f472a3b442099982ee58f01bd3c'
                    }
                    'prop-batch': {
                        table: 'sys_properties'
                        id: 'fc451097fdb44e2087c26e8ac529de4e'
                    }
                    'prop-dlq': {
                        table: 'sys_properties'
                        id: 'a617d2031fa048d7b2132b2d4efb4fc6'
                    }
                    'prop-enabled': {
                        table: 'sys_properties'
                        id: '884560259ad34a9eb4d6c87f492e608a'
                    }
                    'prop-integration-user': {
                        table: 'sys_properties'
                        id: '9e3668d4fb664cb3857cdfd73c834ba6'
                    }
                    'prop-lag': {
                        table: 'sys_properties'
                        id: 'e071fcb0836e402fa0aa1621f3ebb63e'
                    }
                    'prop-max-attempts': {
                        table: 'sys_properties'
                        id: '36d7a85682724b33b4ec78f282d34c11'
                    }
                    'route-apply': {
                        table: 'sys_ws_operation'
                        id: 'c62e1ecfb538429582170d2e0fc8038c'
                    }
                    'route-ensure-capture': {
                        table: 'sys_ws_operation'
                        id: '9347b715185044faa6fe6e396bda78b0'
                    }
                    'route-seed': {
                        table: 'sys_ws_operation'
                        id: '41307945be3e4fcf82421794edfd3db3'
                    }
                    'sync-bridge-api': {
                        table: 'sys_ws_definition'
                        id: 'b82d6de400e74b3789ba20718ad714b0'
                    }
                    'sync-bridge-menu': {
                        table: 'sys_app_application'
                        id: 'a41d13e7cffe417ea29af547fafbaba8'
                    }
                }
                composite: [
                    {
                        table: 'sys_choice_set'
                        id: '01012b9f1d3544de983f15c0b9090978'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'mode'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '014d2f709ae54591aab52484ba2eace4'
                        key: {
                            list_id: {
                                id: '1c795b69a2234d9e9b7b1312226539fa'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'sys_updated_on'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '0157d50086684e6b979b0711e2722f83'
                        key: {
                            sys_ui_form: {
                                id: '5c72267d9ab74a159d1d6b4a3ef4c24e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'c9d80087c71c47ddb8d75ad17ecb2b84'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Authentication'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '01ab753fd890451ebb702965a141c486'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'peer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '01bbb9716bb84011a1e96b2ca619a799'
                        key: {
                            list_id: {
                                id: '32fbd4c48bcd4c45b065a0f850883762'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '03a17e83c3324b06be5b1df223165465'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'target_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '044da62cc2bd4d47b749b13e744cac1c'
                        key: {
                            sys_ui_section: {
                                id: '630616e1037e4173ad8ba32aac2cc8f1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Seed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'seed_policy'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0491af7746f349acac8c05787e81efb2'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'attempts'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '04adbbeb35d24f309126e5b4792b1bbf'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'direction'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '04b77fd6d15b44fbafb9636bb352f22c'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'type'
                            value: 'divergence'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '082ff7647953495d847b2c6af7d5e6b6'
                        key: {
                            sys_ui_form: {
                                id: '515444c7dbe64861847df1abe436a116'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '5f678a0de9cd4b0296a7ffb01fa55a9d'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'What to sync'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '0897e692be484075b0feeb6da2c57ee0'
                        key: {
                            list_id: {
                                id: 'dda94de13e1e47809eb29395dbd18c5e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'base_url'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '096faef922234dd6b72bc21ae8ef545a'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            caption: 'Mapping'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '099cb39387344672ac36cfdf09c37933'
                        key: {
                            sys_ui_section: {
                                id: '8d148b6e53234f218ae91271784c5b9b'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Routing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'state'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0a23eea7edf14264966801fa0a9a3894'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'mode'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0a470e16702d4aa89f0d01cdc462fba3'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'op'
                            value: 'update'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '0a81f5b422aa4fd99abd3a900c45a920'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            caption: 'Where'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0c002503486e4c8cbcfd4fcfea95bd79'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '0ce21ea258674f389b209566d90d7866'
                        key: {
                            name: 'x_33764_sbridge_run'
                            caption: 'Run'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d9058eed7d24c3e8077f0d2fefa5a95'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0d97197d4fd74c1285cd87766cc79609'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0e037b07d3f74160a9310da82c2c023a'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0eab40a1ff374dd8a3d1609e33afd970'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'value'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0ff6ada7f80d43af93d11dd85a0dbac1'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'preserve_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '102935f839bf4734917f3227e7f1a2c6'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1399fb03fb9a4fd1a070aeb704d79c63'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '139f38b1846a488d9b7dcfcd175c04f2'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            caption: 'Detail'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '14f75761649a40cab410d3d2729a0cf3'
                        key: {
                            list_id: {
                                id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'owner_peer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '151a3fb97d124de69f9d518aeb2bd399'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'owner_peer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1621e03ab19a416f95df4541728d640c'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'base_url'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '172dce6e1c0e401abd6df1beb3f7ce30'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'op'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '18920f377f4343d392df2b3d2aa220ee'
                        key: {
                            sys_ui_section: {
                                id: 'cbe16c6814ce45c5a7bb004ab291e01b'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '19873e50fc0348aba81ad58d816d732b'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '19b0a0d12eab41918da2a20f772d157f'
                        key: {
                            list_id: {
                                id: '357cdbb4c1ba4ffc8ea0ac15091450a1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'ended'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1a1a498112c343f395c69ec8a9e44946'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'failed'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '1be06e02ca6644f483970b2b345e6044'
                        key: {
                            list_id: {
                                id: '1c795b69a2234d9e9b7b1312226539fa'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '1be3e59b54af4157b9c06aec8be18ee9'
                        key: {
                            sys_ui_form: {
                                id: '5c72267d9ab74a159d1d6b4a3ef4c24e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '911088125c85400fa29a167d4b4fd6fb'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Monitoring'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1c3b4a5689c944ed9c1b81c1fda5d7c7'
                        key: {
                            sys_ui_section: {
                                id: '5f678a0de9cd4b0296a7ffb01fa55a9d'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'What to sync'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'field_list'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '1c795b69a2234d9e9b7b1312226539fa'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1da33e48837f41bc9d4a68dedd0c87d0'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'connection_alias'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1e26df874db44edb942585bd4097979f'
                        key: {
                            sys_ui_section: {
                                id: '3010c440cdc14c06bf45097de624ae55'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    caption: 'Receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_sys_id'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '1ed587884ff54db78d346265184120e0'
                        key: {
                            list_id: {
                                id: '93767b6364e74e9090454f3806de25b4'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'resolved'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '20ad79f223a74e5dbd70ab2697ac914d'
                        key: {
                            sys_ui_section: {
                                id: 'cbe16c6814ce45c5a7bb004ab291e01b'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'owner'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2114cf160912400cb030788934cad6d3'
                        key: {
                            sys_ui_section: {
                                id: 'cbe16c6814ce45c5a7bb004ab291e01b'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'value'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '21f24e536c8d45079fe25345c9a641ff'
                        key: {
                            sys_ui_section: {
                                id: '6bbe53797f4649d68f22f7fdd57333a0'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Advanced mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_map'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '22264935be5b4f3dad0575f5f38f3c23'
                        key: {
                            name: 'x_33764_sbridge.admin'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '235455370b334e68836b25eb3b1bdc58'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            caption: 'Detail'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '23bd9ac88e044b61bf1d35876ec1d7e3'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '24a6cfb932fe4bc89becaa7768695034'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'owner_peer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2670e650ae7e462eb1004c7afb4ca3de'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '289154a8beef452d88f21a035260187e'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'mode'
                            value: 'cmdb'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '28d3372598bb48db973dda8fb7b8c6bf'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '290a7094bb9a46a49e4061a274cc0c0e'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'table'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '293b09f199d74c57abd05754fc715a3d'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'peer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2a12cd13bd9b4271bab8ffa168b3c39e'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'sys_created_on'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '2a3dd0ad4f3e4a1c89dd45b6f99c61d2'
                        key: {
                            document_key: '58ef88a963ea4f3691ded4f7de26db50'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2a45234008ef4b698db617d2a580bfdf'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'direction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2a45f9182c7a417baac33b8933c1e26b'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2a5b6a80435d486f8180589fbd986e20'
                        key: {
                            name: 'x_33764_sbridge_peer'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2aa0818fdc364c44b44cb9d9e7a5697e'
                        key: {
                            sys_ui_section: {
                                id: '6bbe53797f4649d68f22f7fdd57333a0'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Advanced mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_table'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2c377474149246fe994668b6a6c6b080'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'base_url'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2f0e5a86f9a7456ea950cbf85be6313a'
                        key: {
                            sys_ui_section: {
                                id: '096faef922234dd6b72bc21ae8ef545a'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    caption: 'Mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_sys_id'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f8e75a32b224dcc93973f12e8251c59'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'seed_cursor'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '2fd34f29be264c8fbf7af46f4af7d602'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '3010c440cdc14c06bf45097de624ae55'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            caption: 'Receipt'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '3084fe0ed9044c34a25e605c85a86f94'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '30b28b915f4d4e658a028010950511e9'
                        key: {
                            sys_ui_section: {
                                id: 'bdbb7307a3e040e195c1059c5c764b80'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Apply behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'propagate_deletes'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '32fbd4c48bcd4c45b065a0f850883762'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '33975416a48a4bfda0cbc40d09f1249a'
                        key: {
                            sys_ui_section: {
                                id: '911088125c85400fa29a167d4b4fd6fb'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Monitoring'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_successful_drain'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '33e0bc7fe3f841c094ba6b1d9e803651'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3475f0aa274a4088b9fb60aeb855d467'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3485803ec78b491c89c4ddaf875656e0'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'field_list'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '34d06bd834c748e29c46f4dd7c3372ea'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3521e31320854c62957f941f70ac3641'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'owner'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '357cdbb4c1ba4ffc8ea0ac15091450a1'
                        key: {
                            name: 'x_33764_sbridge_run'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '36a0a731764a47329ec5d26af81ec34a'
                        key: {
                            sys_ui_section: {
                                id: 'bdbb7307a3e040e195c1059c5c764b80'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Apply behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'preserve_sys_id'
                            position: '1'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '36bf618db1fc47dbb3819f7247dc806a'
                        key: {
                            name: 'x_33764_sbridge_xref'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '36c999bd076b4f61a6d2599d01f4d8e3'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'oauth_profile'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '370bbecd45e540d280bf4ec805aba590'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'type'
                            value: 'drain'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '379e2baf1b254fcc83ef858ac5ab4da5'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'seq'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '38cb174b87db4812bf4329f85620c921'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'peer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '38ea35043f0446dbbb49720a90080fae'
                        key: {
                            sys_ui_section: {
                                id: '0ce21ea258674f389b209566d90d7866'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'peer'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c9221320d984efa892b453dcdb32aea'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3d07a660f25746d6a049203bffe3ccbf'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3e24e3554dfa4f099701088a1d4fa667'
                        key: {
                            sys_ui_section: {
                                id: '235455370b334e68836b25eb3b1bdc58'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    caption: 'Detail'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'payload'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4026af815322425f80507d21cc241825'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'mode'
                            value: 'change'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '407c43ff76924618a9b29effc4e4f5d7'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '41947247107e4d748504401b3a8ece7d'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '42e5d70dfc11456287ad7e084baa77e3'
                        key: {
                            logical_table_name: 'x_33764_sbridge_run'
                            col_name_string: 'peer,type'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '438e28d85124491a9852727453d93547'
                        key: {
                            list_id: {
                                id: 'dda94de13e1e47809eb29395dbd18c5e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'last_successful_drain'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '43ab7c5f08fa4ed4a9bae1ec741d243c'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'capture_ready'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4492c32897cd4234953e9af1b6e750cf'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'ref_map'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '44e728c3a7f34c6fa822c26f319de9a4'
                        key: {
                            sys_ui_section: {
                                id: '5f678a0de9cd4b0296a7ffb01fa55a9d'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'What to sync'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'direction'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '4548bece7d0a40d7ae2e3e267f80e828'
                        key: {
                            list_id: {
                                id: '32fbd4c48bcd4c45b065a0f850883762'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'target_sys_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '468368c261a74a7e9e92108537907f2f'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'state'
                            value: 'sent'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '47626d7325e24292819beaa065bef3f5'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'table'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '47e72d5690cb41a195944932e66c39a8'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '48736bb8a3d14345a14ef7a7c147e501'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'direction'
                            value: 'outbound'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '49cf851125e448c1ac59b8af7f12081b'
                        key: {
                            name: 'x_33764_sbridge_run'
                            caption: 'Results'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a575b264c5640b09dba39b478703fe5'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'op'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c791bc0389e470485d96ea6efe747ab'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'started'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4c8a40876ef54675ba6d0b9a550a3ffa'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'last_seq'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '4eb323b5ff7d4b6fb0b2cae892ad22b4'
                        key: {
                            name: 'x_33764_sbridge_peer'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '4f83408d3c53431a9f6a567cb7864123'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '50ae99a5c20c4525bc2b8a335270b171'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'attempts'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '50d47daad404414f81023de800af09a2'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '51456bc464cf4f0f91ba39b76d80bbe7'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'error'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '515444c7dbe64861847df1abe436a116'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '52147771a0b7463eb0c7b32e0541652a'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '533642c768fa490eb4ab6bf13518989c'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'processed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '54cb446a366c4065a8c7e13a4f63187b'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'source_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '54f7c9f592474dc1a9afee5594bf2cc0'
                        key: {
                            list_id: {
                                id: '93767b6364e74e9090454f3806de25b4'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'error'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '5512a4463927493f8c685bd8c8225833'
                        key: {
                            list_id: {
                                id: '23bd9ac88e044b61bf1d35876ec1d7e3'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '55335ecd72054394a4aa4c82f1760f70'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'mode'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '558562fb98ee45fc9929f2f94d4cda42'
                        key: {
                            sys_ui_section: {
                                id: '8d148b6e53234f218ae91271784c5b9b'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Routing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'peer'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '55acb49005944ae8b6fa1e0255d55213'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '56a130ad0be44f83a53b38e105932b11'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'target_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '56aea2af016a412ea99d86040c43dad8'
                        key: {
                            sys_ui_section: {
                                id: '49cf851125e448c1ac59b8af7f12081b'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Results'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'max_lag_seconds'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '57f090a3d37b409fa7b43ca90f8b208d'
                        key: {
                            sys_ui_section: {
                                id: '0a81f5b422aa4fd99abd3a900c45a920'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Where'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'peer'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5877a17c1462488594a2e713fc033820'
                        key: {
                            sys_ui_section: {
                                id: '630616e1037e4173ad8ba32aac2cc8f1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Seed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'seed_cursor'
                            position: '1'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '59b4f8ab1b084ce1bb64e1e7d4826529'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '59d765eb4d474f47a36f4eb3d1839b6d'
                        key: {
                            sys_ui_form: {
                                id: '4f83408d3c53431a9f6a567cb7864123'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '139f38b1846a488d9b7dcfcd175c04f2'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    caption: 'Detail'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '59fac625d521482d9347d3b9f2da1166'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'last_successful_drain'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5a25798034694689a287cffcdf32302c'
                        key: {
                            sys_ui_section: {
                                id: '71d5360067fc44c28014b4255ccaece7'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_sys_id'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5a29a392941c414cb63496f2ced432c5'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'last_successful_drain'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b6a96a95b40445599f6adfd6a8c31ef'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'error'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '5b9eed4c43a142c7b0d019f6bd77bec9'
                        key: {
                            logical_table_name: 'x_33764_sbridge_policy'
                            col_name_string: 'table,direction'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '5bf027390d39450c80c348df03fced91'
                        key: {
                            id: '58ef88a963ea4f3691ded4f7de26db50'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '5c2e41c98ac5461ba08b4cb9c6f2e2ac'
                        key: {
                            list_id: {
                                id: '357cdbb4c1ba4ffc8ea0ac15091450a1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '5c72267d9ab74a159d1d6b4a3ef4c24e'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c77bc3e5d2b499c8432e188542116e5'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'attempts'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5c8a24d26aaf4be9aac5d4d4d6ef4005'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'target_map'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5eada9b293924bde9e22b5db2c30876b'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'direction'
                            value: 'inbound'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f2c6d51f04745cc868ccc62d5390228'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '5f5a0640732045839599880bd8eb0c0d'
                        key: {
                            list_id: {
                                id: '357cdbb4c1ba4ffc8ea0ac15091450a1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'processed'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '5f678a0de9cd4b0296a7ffb01fa55a9d'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            caption: 'What to sync'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '61ac61879b934449907586ca6292e18d'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'seed_policy'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '630616e1037e4173ad8ba32aac2cc8f1'
                        key: {
                            name: 'x_33764_sbridge_run'
                            caption: 'Seed'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '63e417df196a4a6d983bc11bcd2b8062'
                        key: {
                            sys_ui_form: {
                                id: '93512e57221442e18ef51da2fb13ab06'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '49cf851125e448c1ac59b8af7f12081b'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Results'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6495c05e4b01482c9d702bc6bf18337b'
                        key: {
                            sys_ui_section: {
                                id: '90b1265be6ed4d2cb509befd1ef81af8'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'base_url'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64a1258af2154c75b4eab93df1c51a52'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '64d7229577db428ba4b5f3195be7236d'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '64ede45cab1d41a58b7b24b4735216e9'
                        key: {
                            sys_ui_section: {
                                id: '49cf851125e448c1ac59b8af7f12081b'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Results'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'processed'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '65efffad793240fd9bf663c3cd547eb3'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '68bb67b6158449dfa46860aa4cae0173'
                        key: {
                            role: {
                                id: '22264935be5b4f3dad0575f5f38f3c23'
                                key: {
                                    name: 'x_33764_sbridge.admin'
                                }
                            }
                            contains: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6a3eec14ba8e426e9629a0189c3aa11b'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6ad8cf0540d14e73ace76dfa02f3bf37'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'mode'
                            value: 'direct'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6ae583c0124a40758bbf099b92bc22a7'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'mode'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '6b1d00c5ac1748e69826b3c315813714'
                        key: {
                            name: 'x_33764_sbridge.operator'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '6bbe53797f4649d68f22f7fdd57333a0'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            caption: 'Advanced mapping'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6bed4254676b48b6b48866bd228f2f05'
                        key: {
                            sys_ui_section: {
                                id: '5f678a0de9cd4b0296a7ffb01fa55a9d'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'What to sync'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'condition'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6ce7c07bb3c04fd4abe8c7068c70280d'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'role'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '6d1468ccf01f43e9aea5e42a61332be6'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6d616b94637e445e847d88bd7e181a4c'
                        key: {
                            sys_ui_section: {
                                id: '911088125c85400fa29a167d4b4fd6fb'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Monitoring'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_error'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e751daf531a496fac4a1fad757d79bf'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '70418a12b3514c2a9427a1cf9aa5e19e'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'seed_policy'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '70568d321fe74cb3bb1f235c7f438379'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'op'
                            value: 'insert'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '708b969eb3ba44f28a0ab0b5b46ab03b'
                        key: {
                            sys_ui_section: {
                                id: '71d5360067fc44c28014b4255ccaece7'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'attempts'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '71688f45c22f412fa9ce82dfcea035a2'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'value'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '71d5360067fc44c28014b4255ccaece7'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            caption: 'Record'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '71ff930ea13148358c19e893e675d89c'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'max_lag_seconds'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7403f1a00dd44c5dadb3e1a5a40705a8'
                        key: {
                            sys_ui_section: {
                                id: '90b1265be6ed4d2cb509befd1ef81af8'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'active'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7434a96541ae4b98af9feb921c83274e'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'mode'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '747eb49c072c4473b993cddaf9a7dac5'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'ended'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7492a52b7d684b2784928033920216dc'
                        key: {
                            sys_ui_section: {
                                id: '5f678a0de9cd4b0296a7ffb01fa55a9d'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'What to sync'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'table'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '74f60a0d2a274ff29fc89c654d16a152'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'resolved'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '75f690a78c2c44b8a0403c785f52ce8c'
                        key: {
                            sys_ui_section: {
                                id: '49cf851125e448c1ac59b8af7f12081b'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Results'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'failed'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '7632b75b09c643ff9f3a3e34379c41b2'
                        key: {
                            sys_ui_form: {
                                id: '47e72d5690cb41a195944932e66c39a8'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '235455370b334e68836b25eb3b1bdc58'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    caption: 'Detail'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '76c1ac86757b4ad7a52f408d03964dbb'
                        key: {
                            name: 'x_33764_sbridge_run'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7732559334d4475aa6b67688d605a8ac'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'type'
                            value: 'bulk_seed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '77eca5cc6a90405dbb536a447de52364'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'seed_cursor'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7936e6d325a74dceaac724518ed0bee5'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'state'
                            value: 'dead'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '79536edec93d4ac784109474946db8b6'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'role'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '79b4b2cc00b245d0ba1d62fc90c5234e'
                        key: {
                            logical_table_name: 'x_33764_sbridge_receipt'
                            col_name_string: 'peer,source_sys_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7abf36dab369464cbc95c3c958e97d65'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'ended'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7af4451d3ae64d2db520b7feea72fd68'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'target_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7b45fcec46f94516b8dfe4bde9514c40'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'failed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7be36c75bc294321ab65e262fc147321'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'peer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7c2c7a4a9cf14f6695ee71795a7ea2f5'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'peer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '7c8ba8a8a97f4eb3b95c9b165cb3a74b'
                        key: {
                            logical_table_name: 'x_33764_sbridge_outbox'
                            col_name_string: 'peer,state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7dc6d48eea2d4aeba9c0b218c932f35e'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '7e67a153a96c49df9f2da448fff05bea'
                        key: {
                            list_id: {
                                id: '23bd9ac88e044b61bf1d35876ec1d7e3'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'target_sys_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8045ad43f8a24f7aa5ed8830d4ed2213'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'role'
                            value: 'local'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '80543cd057d341c8a49fbdcb5682ed87'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8085edf325d84b2f8691042206a90ffa'
                        key: {
                            sys_ui_section: {
                                id: '94d6858123274a569aa7cd77bf09f5a3'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    caption: 'Status'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'resolved'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '81533ad5fa0841dab1d84584eaa4ef18'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'last_error'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '81a9a6c0f5c042ad967e6392e0f77bc8'
                        key: {
                            sys_ui_section: {
                                id: 'bdbb7307a3e040e195c1059c5c764b80'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Apply behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'mode'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '847bb9f219f8478395a562c6456fecb7'
                        key: {
                            list_id: {
                                id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '84c9ffacc010483c88e025577a943d23'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'op'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8535925999fb4ace8bd65945084d6e4c'
                        key: {
                            sys_ui_section: {
                                id: 'bdbb7307a3e040e195c1059c5c764b80'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Apply behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'capture_ready'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '861c20b24a7d440f92fe55a1ab8e2876'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '874bcc2b46b14e9a9c614f54849f3dcd'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'role'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8866da1db7ab48549e98a1cabdbc998e'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'capture_ready'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '88bc0b6733f64899a0f12af17d7cf0a2'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '88f331778b87483b8878948a512b968d'
                        key: {
                            list_id: {
                                id: '93767b6364e74e9090454f3806de25b4'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'sys_created_on'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '8979acb6ea874429a394f1798395b03e'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '89e44ef5d4034585a861c2a7eac154a0'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8be782a307fe4d508ebaa27824cee8f0'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'last_seq'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '8d148b6e53234f218ae91271784c5b9b'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            caption: 'Routing'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8d866bee287044d5bce795a0e9b2d8d2'
                        key: {
                            sys_ui_section: {
                                id: 'cfd21185dd3b4ac1a003c5ae0b963fe6'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Payload'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'payload'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '8e8cf5832eab4a8ca8db6ca790dd8054'
                        key: {
                            list_id: {
                                id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'capture_ready'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '8fe8f0e698374d48b99b47ff4bff93be'
                        key: {
                            logical_table_name: 'x_33764_sbridge_peer'
                            col_name_string: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '900c126c2c6f4d9191d98f07b88a6db8'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'condition'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '90b1265be6ed4d2cb509befd1ef81af8'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            caption: 'Identity'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '911088125c85400fa29a167d4b4fd6fb'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            caption: 'Monitoring'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '91171d75318f4a8e9479aa89ecebc274'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'max_lag_seconds'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '91599b5365494cb9b545d7b9f6d548bd'
                        key: {
                            sys_ui_form: {
                                id: '2fd34f29be264c8fbf7af46f4af7d602'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '8d148b6e53234f218ae91271784c5b9b'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Routing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '9332e0b73f4d4fc3997a0237be9a0cad'
                        key: {
                            id: '018c4d343d5547fe82d8f436bc678abc'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '93512e57221442e18ef51da2fb13ab06'
                        key: {
                            name: 'x_33764_sbridge_run'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '93767b6364e74e9090454f3806de25b4'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '940a9cfeb5a64f0385bf06c18714e0ba'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '94d6858123274a569aa7cd77bf09f5a3'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            caption: 'Status'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96b1ad0681ea422f970a7ec42ce83b0f'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'processed'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '978198084e8c477cbf56d83c9d62e848'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'field_list'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '981cb3ddd5c040ec98c4aab508876a7c'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'target_map'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '986731b777e94074aea5d41be02ee4ba'
                        key: {
                            document_key: '018c4d343d5547fe82d8f436bc678abc'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '99ec481f9089459ab1474cc8aec4bacc'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'source_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9a016ca8ee494217ae034aebcb3c2992'
                        key: {
                            sys_ui_section: {
                                id: '6bbe53797f4649d68f22f7fdd57333a0'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Advanced mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'ref_map'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '9a3855de59fd45788c4902f969549547'
                        key: {
                            sys_ui_form: {
                                id: '93512e57221442e18ef51da2fb13ab06'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '0ce21ea258674f389b209566d90d7866'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9a7331428593440abc6c35608691d791'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9ac61fe787e445739bda1b34ca34c14f'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'state'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9c77c2848ed04ef0981536cb2589e07f'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'op'
                            value: 'delete'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d509712359c48bba98644e126acc77f'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '9e25f63829394a479c12a67466fe9968'
                        key: {
                            sys_ui_form: {
                                id: '2fd34f29be264c8fbf7af46f4af7d602'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'cfd21185dd3b4ac1a003c5ae0b963fe6'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Payload'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9ebb708ad9bf4cd48809cece28e7fd59'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'mode'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9fc468a5eb884a6aa4929825362b6980'
                        key: {
                            sys_ui_section: {
                                id: '139f38b1846a488d9b7dcfcd175c04f2'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    caption: 'Detail'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'notes'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '9ffb52cebd2e4b9fa2f9ac500667ab7d'
                        key: {
                            list_id: {
                                id: '1c795b69a2234d9e9b7b1312226539fa'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a079bbbf693a475ea695f826e7989738'
                        key: {
                            sys_ui_section: {
                                id: '3010c440cdc14c06bf45097de624ae55'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    caption: 'Receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'peer'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'a0ffc7a1def04c6c90392331b7fba391'
                        key: {
                            sys_ui_form: {
                                id: '515444c7dbe64861847df1abe436a116'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '6bbe53797f4649d68f22f7fdd57333a0'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Advanced mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a17029eebe3047afad1007f75c1bb663'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'condition'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'a440c29943d24418a49e37da18059b11'
                        key: {
                            logical_table_name: 'x_33764_sbridge_xref'
                            col_name_string: 'peer,source_table,source_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'a728188b58d14445ba6bace9206fa5b7'
                        key: {
                            list_id: {
                                id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a7d5372c8c28425b9e4f6b611128fabd'
                        key: {
                            name: 'x_33764_sbridge_xref'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a873324c1e7a49018743dbe37f5b034a'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ab5905e608e54015ba632d9ba918ec9c'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'ref_map'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'af8f516cc3d34971ae94e7b4acac66fb'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'preserve_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'b040698f310c443a8e493c4d81b57ba5'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'op'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'b1403a608d134546b1ef44a19dc7ece5'
                        key: {
                            list_id: {
                                id: '23bd9ac88e044b61bf1d35876ec1d7e3'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'last_seq'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b15ff0c8f5a44131b0efca96bf309e4c'
                        key: {
                            document_key: '58ef88a963ea4f3691ded4f7de26db50'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1c63791969246d296c1659737bcecec'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b26f640b9d54480b94a99c4d0f5324a9'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'b29dbb3c50514e088d447998e82020bf'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b2b3f16826c143258b8df292100cb19b'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b2d296e6705f4929b09fe0c03fef7663'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'seq'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b33f67de18234a80912900ced1d3fb51'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b545315f4d1645419f28ab6247c813ba'
                        key: {
                            sys_ui_section: {
                                id: '90b1265be6ed4d2cb509befd1ef81af8'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'role'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b5ed0016cb07431c981af8ec878f4aaf'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'propagate_deletes'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'b6c4154172b6417fb789f49bc1deda8b'
                        key: {
                            list_id: {
                                id: '1c795b69a2234d9e9b7b1312226539fa'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'value'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'b75505be6edc42ce8f4dfa8031f64041'
                        key: {
                            sys_ui_form: {
                                id: '515444c7dbe64861847df1abe436a116'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'bdbb7307a3e040e195c1059c5c764b80'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Apply behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b77e95776b4c48769e0f178bb17e33b7'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9daefc5e8214ddca527033bf64e9bd4'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b9ec7bd4b39442d697b29b116c4a7e12'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bb391e5e8a85446f9e5ef4cb10865c9d'
                        key: {
                            sys_ui_section: {
                                id: '90b1265be6ed4d2cb509befd1ef81af8'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bd34531cce9d47cfb4544e7929c95ea3'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'target_table'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bd6c22ce1b074d4facae4e3591b63c24'
                        key: {
                            sys_ui_section: {
                                id: 'c9d80087c71c47ddb8d75ad17ecb2b84'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Authentication'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'oauth_profile'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bdacc035c5f34263ab534e01b694309f'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'source_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'bdbb7307a3e040e195c1059c5c764b80'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            caption: 'Apply behaviour'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'be59cc7873164efb8a6817d407969933'
                        key: {
                            sys_ui_section: {
                                id: '0a81f5b422aa4fd99abd3a900c45a920'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Where'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'owner_peer'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bec754fa5e2245af87e4005fa1237b11'
                        key: {
                            sys_ui_section: {
                                id: '0ce21ea258674f389b209566d90d7866'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'ended'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf91105b3ff646b8b668f1cd90851aaa'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            element: 'owner'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'c18b6c10f2124f3080e2d2d4e50cc3dc'
                        key: {
                            logical_table_name: 'x_33764_sbridge_dlq'
                            col_name_string: 'outbox_ref'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c1dd70ce403f4332ad75737ea1aba9ac'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c1fcdd8ef677453bb910c82d47fa0f24'
                        key: {
                            list_id: {
                                id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'table'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'c3afbbebd6f245818236a6acfe1265f8'
                        key: {
                            logical_table_name: 'x_33764_sbridge_dlq'
                            col_name_string: 'resolved'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c4ad41d1becc4530b4f648c3cf165a80'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'payload'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'c5717bfbfba44af786243a25c5772e45'
                        key: {
                            logical_table_name: 'x_33764_sbridge_policy'
                            col_name_string: 'peer'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'c5792e4462a24bac90d47e404593d841'
                        key: {
                            role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                            contains: {
                                id: 'f5f25fcb4c514e85a2e8485639714bae'
                                key: {
                                    name: 'x_33764_sbridge.reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c62a6136ff1b43c694c38c88f036f33f'
                        key: {
                            sys_ui_section: {
                                id: '3010c440cdc14c06bf45097de624ae55'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    caption: 'Receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_seq'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c649fe2cd8994cd181c99d90add1e795'
                        key: {
                            list_id: {
                                id: 'f6f97d3d05414f2388fa9ed4d8215964'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'mode'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'c760e22b9f864e6abaf51ed0562e0ccb'
                        key: {
                            sys_ui_form: {
                                id: '47e72d5690cb41a195944932e66c39a8'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '94d6858123274a569aa7cd77bf09f5a3'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    caption: 'Status'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c8a9577ae75d4da4bda2fa4651f32ac9'
                        key: {
                            sys_ui_section: {
                                id: '8d148b6e53234f218ae91271784c5b9b'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Routing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'mode'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c8d44340f962442cb45573a28f012e8a'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'state'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c8d6b6de17cd46ecb4bd51fb41960324'
                        key: {
                            list_id: {
                                id: 'dda94de13e1e47809eb29395dbd18c5e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c9178b0241454e1c8a9dec612fa3c316'
                        key: {
                            list_id: {
                                id: '23bd9ac88e044b61bf1d35876ec1d7e3'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c9709c18b366486792dbda7aae23a432'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c9a0239582734ce89d8ddef42e3db808'
                        key: {
                            list_id: {
                                id: '93767b6364e74e9090454f3806de25b4'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'outbox_ref'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'c9d80087c71c47ddb8d75ad17ecb2b84'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            caption: 'Authentication'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ca8054e88fb240ae98658dc61a8875bb'
                        key: {
                            sys_ui_section: {
                                id: '8d148b6e53234f218ae91271784c5b9b'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Routing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'table'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'cbc74178b1cc457e8359953dcaa81190'
                        key: {
                            list_id: {
                                id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'direction'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'cbe16c6814ce45c5a7bb004ab291e01b'
                        key: {
                            name: 'x_33764_sbridge_test_record'
                            caption: 'Identity'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cc160a91dce14806b0f5a26c69af17fe'
                        key: {
                            sys_ui_section: {
                                id: '3010c440cdc14c06bf45097de624ae55'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    caption: 'Receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_sys_id'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc413d4770ee418a9e9cefda651dfb22'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'cc7e7bd0816b4c358fa6269f8d55f307'
                        key: {
                            sys_ui_form: {
                                id: '102935f839bf4734917f3227e7f1a2c6'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '096faef922234dd6b72bc21ae8ef545a'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    caption: 'Mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cc809c2523b140fdb70f1aa2ddddd72e'
                        key: {
                            sys_ui_section: {
                                id: '5f678a0de9cd4b0296a7ffb01fa55a9d'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'What to sync'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'active'
                            position: '0'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ccd2a717e2074558ba9eac290f9ff4ff'
                        key: {
                            name: 'x_33764_sbridge_policy'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cce5075c1d7d40a1bb25c90573bb3422'
                        key: {
                            sys_ui_section: {
                                id: '71d5360067fc44c28014b4255ccaece7'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'seq'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cf09c31551b9496386a6d6c296ebdeda'
                        key: {
                            sys_ui_section: {
                                id: '096faef922234dd6b72bc21ae8ef545a'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    caption: 'Mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_table'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'cf4989953dc742b4ba4b927de80f4932'
                        key: {
                            list_id: {
                                id: '357cdbb4c1ba4ffc8ea0ac15091450a1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'cfd21185dd3b4ac1a003c5ae0b963fe6'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            caption: 'Payload'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd001252c3da24a6dad15118bafc7f661'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'direction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd10504c36bb34bb49e9d29081c886cb3'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'last_error'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'd1a741001acf427bbb90994c5424f4aa'
                        key: {
                            document_key: '018c4d343d5547fe82d8f436bc678abc'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd3e582cbab0648ad8630264830e410aa'
                        key: {
                            list_id: {
                                id: '32fbd4c48bcd4c45b065a0f850883762'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'd4be400971cf4c63be31846e33551552'
                        key: {
                            sys_ui_form: {
                                id: '5c72267d9ab74a159d1d6b4a3ef4c24e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '90b1265be6ed4d2cb509befd1ef81af8'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'd55fba8e939547ddbbc84d818b5bdcf2'
                        key: {
                            logical_table_name: 'x_33764_sbridge_peer'
                            col_name_string: 'active'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'd5ddcb9d8fad494b988f1f188fd777fc'
                        key: {
                            logical_table_name: 'x_33764_sbridge_outbox'
                            col_name_string: 'source_sys_id,peer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd6ee0436bd094560a93355d1dcbd886f'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'resolved'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd7677728897448dba2980b0e684ac86a'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'payload'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd852ccc600d6486baaf0fe80dd5c47c6'
                        key: {
                            list_id: {
                                id: 'dda94de13e1e47809eb29395dbd18c5e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'role'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd8a9c8dfaa9641daa29e01d03b98fdb0'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'payload'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd96b04358c8748a58c74a4ac07c79d88'
                        key: {
                            sys_ui_section: {
                                id: '235455370b334e68836b25eb3b1bdc58'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    caption: 'Detail'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'error'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'db5d6e8778da47818433b105f170d0e1'
                        key: {
                            sys_ui_form: {
                                id: '515444c7dbe64861847df1abe436a116'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '0a81f5b422aa4fd99abd3a900c45a920'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    caption: 'Where'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'db86f1bfc1764029a77d980e36cee8b0'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'payload'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc9e07933c8f4a42b644987016705d2c'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'dca7985d8a714d67bfe1125eebbb7d4d'
                        key: {
                            sys_ui_section: {
                                id: '71d5360067fc44c28014b4255ccaece7'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'op'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'dda94de13e1e47809eb29395dbd18c5e'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'dedf2905ccb444dfad65aad9f26b72c5'
                        key: {
                            sys_ui_form: {
                                id: '4f83408d3c53431a9f6a567cb7864123'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: 'cbe16c6814ce45c5a7bb004ab291e01b'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    caption: 'Identity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'df53eedbca5242d6a9c8b0d96e04b622'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'oauth_profile'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e21b06dc6bb441f5b1f0c3b558025a03'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'table'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'e2660de9d42f40a092e46eea24039162'
                        key: {
                            sys_ui_form: {
                                id: '93512e57221442e18ef51da2fb13ab06'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '630616e1037e4173ad8ba32aac2cc8f1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Seed'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e3c4f973f0d14b60ae835f273ac5bf38'
                        key: {
                            sys_ui_section: {
                                id: '0ce21ea258674f389b209566d90d7866'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'started'
                            position: '2'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e42a2a9381744dfc815d14ce9b4b6c9a'
                        key: {
                            name: 'x_33764_sbridge_run'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e469c5ab82624587a5950f612b1d6f77'
                        key: {
                            list_id: {
                                id: '357cdbb4c1ba4ffc8ea0ac15091450a1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'failed'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e65b85df1feb4a91bb6dd226b3df4ff3'
                        key: {
                            sys_ui_section: {
                                id: 'c9d80087c71c47ddb8d75ad17ecb2b84'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Authentication'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'connection_alias'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e6a14acd82534050b4ff82156d035a35'
                        key: {
                            sys_ui_section: {
                                id: '0ce21ea258674f389b209566d90d7866'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    caption: 'Run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'type'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e6dae55839b149fd9fc38891a87920da'
                        key: {
                            list_id: {
                                id: '357cdbb4c1ba4ffc8ea0ac15091450a1'
                                key: {
                                    name: 'x_33764_sbridge_run'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'started'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e7396c4f89ab4b5f8d987e789e9e85d1'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'state'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e73e203f4a3e4d4fabf423be9f6f11bf'
                        key: {
                            sys_ui_section: {
                                id: '096faef922234dd6b72bc21ae8ef545a'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    caption: 'Mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_sys_id'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e7af59350dbe436cb46b78e9e398f485'
                        key: {
                            sys_ui_section: {
                                id: '94d6858123274a569aa7cd77bf09f5a3'
                                key: {
                                    name: 'x_33764_sbridge_dlq'
                                    caption: 'Status'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'outbox_ref'
                            position: '1'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e8fce6bbc92b42cd8437e26103eecf19'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'eb4270cc2278426baf850386bdf4a5b8'
                        key: {
                            sys_ui_section: {
                                id: '139f38b1846a488d9b7dcfcd175c04f2'
                                key: {
                                    name: 'x_33764_sbridge_test_record'
                                    caption: 'Detail'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'description'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'eb72eac640b54c04ad39bc0637844a46'
                        key: {
                            sys_ui_form: {
                                id: 'b29dbb3c50514e088d447998e82020bf'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '3010c440cdc14c06bf45097de624ae55'
                                key: {
                                    name: 'x_33764_sbridge_receipt'
                                    caption: 'Receipt'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ec8e1f2662a544d48a99ce8b5cb0fb18'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'mode'
                            value: 'bulk_seed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ee42c5710ad2466eaed826eb3d390023'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'efe5640742d347dbb185e1466133f67a'
                        key: {
                            list_id: {
                                id: 'dda94de13e1e47809eb29395dbd18c5e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f024529fd23843c3b041d15540b314d1'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'role'
                            value: 'peer'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f220aa50b9b74464961beac946268f21'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'propagate_deletes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f355f9ce95cb42bbaa23d039cb6648db'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3986cd5598347bdac1d75279056de27'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'target_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'f3a29f55bd174013bb1397cda36a708b'
                        key: {
                            list_id: {
                                id: 'dda94de13e1e47809eb29395dbd18c5e'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'last_error'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f3e5bd98bdee46f1ad83955eae820d0f'
                        key: {
                            name: 'x_33764_sbridge_policy'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f40428826a824b508fd2b5a5eda3d896'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f4aa5158470a48318bff53ef6a16bee4'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'source_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f53d26ecdd3d42d1b2bb51fdc7f9a0e9'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'target_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'f5f25fcb4c514e85a2e8485639714bae'
                        key: {
                            name: 'x_33764_sbridge.reader'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f666819780f545c497aa57d901340628'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'f6f97d3d05414f2388fa9ed4d8215964'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                            element: 'NULL'
                            relationship: 'NULL'
                            parent: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f82ae92003d548de9a23d5dd7ffebb7c'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'outbox_ref'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f9bf44a7c8b34de48f9190a4c05e4a46'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            element: 'connection_alias'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fb2777350b8a48af8d0631b1a007d4ab'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'started'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'fb66402caffb48f1ae71e544d01ed650'
                        key: {
                            list_id: {
                                id: '6fe8a758f2ae41bb83e196aa6dda7e22'
                                key: {
                                    name: 'x_33764_sbridge_policy'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'mode'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fb85a3a169d043b9a20e00b583a0358e'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                            element: 'outbox_ref'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc2ae32dc488432c8c65eac94b411f00'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ffd702e006da45fb8c5c501e7098a28a'
                        key: {
                            list_id: {
                                id: '32fbd4c48bcd4c45b065a0f850883762'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                    element: 'NULL'
                                    relationship: 'NULL'
                                    parent: 'NULL'
                                }
                            }
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'ffd8c242cd844f21b994fb6e9f163fc0'
                        key: {
                            sys_ui_form: {
                                id: '2fd34f29be264c8fbf7af46f4af7d602'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '71d5360067fc44c28014b4255ccaece7'
                                key: {
                                    name: 'x_33764_sbridge_outbox'
                                    caption: 'Record'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ffeb4e2b3c524ccfae7ffe94983ed732'
                        key: {
                            sys_ui_section: {
                                id: '096faef922234dd6b72bc21ae8ef545a'
                                key: {
                                    name: 'x_33764_sbridge_xref'
                                    caption: 'Mapping'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'peer'
                            position: '0'
                        }
                    },
                ]
            }
        }
    }
}
