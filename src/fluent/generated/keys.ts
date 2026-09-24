import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    'acl-ajax-execution': {
                        table: 'sys_security_acl'
                        id: '2d990988f6064b32a6d8defa48da55fe'
                    }
                    'acl-ui-execute': {
                        table: 'sys_security_acl'
                        id: '9667c8e8b04a42a782c3e8aff792c263'
                    }
                    'acl-ui-preview': {
                        table: 'sys_security_acl'
                        id: '70470d95c30d4dfaafa7c5d59d3f3fbd'
                    }
                    'atf-capture-skip-integration': {
                        table: 'sys_atf_test'
                        id: 'd395eeceef2b41d08017aed42850fde0'
                    }
                    'atf-capture-skip-step': {
                        table: 'sys_atf_step'
                        id: '018c4d343d5547fe82d8f436bc678abc'
                    }
                    'atf-dual-write-shadow': {
                        table: 'sys_atf_test'
                        id: '5f4461160530499e841e6d1b81d3f9c3'
                    }
                    'atf-dual-write-shadow-step': {
                        table: 'sys_atf_step'
                        id: '303112dfbd494896bf0355b22f8c183a'
                    }
                    'atf-execution-control': {
                        table: 'sys_atf_test'
                        id: '6f805c4ad0d545b9b778b61ba9ea8782'
                    }
                    'atf-execution-control-step': {
                        table: 'sys_atf_step'
                        id: '828bd8e3134440018f6442652feee41c'
                    }
                    'atf-idempotent-replay': {
                        table: 'sys_atf_test'
                        id: '75d477b06c064abb9f85172ac2fffb91'
                    }
                    'atf-idempotent-replay-step': {
                        table: 'sys_atf_step'
                        id: '58ef88a963ea4f3691ded4f7de26db50'
                    }
                    'atf-live-progress': {
                        table: 'sys_atf_test'
                        id: '2372906764d94b0a8e9fc628df14f3c9'
                    }
                    'atf-live-progress-step': {
                        table: 'sys_atf_step'
                        id: '717049a287a04d26a8a02cb1bab0b8b8'
                    }
                    'atf-staged-ack': {
                        table: 'sys_atf_test'
                        id: '2b519fca0b9042c3902dbbf3c8ec6f1d'
                    }
                    'atf-staged-ack-step': {
                        table: 'sys_atf_step'
                        id: 'e22d6d5beda546f6bc898060c240433c'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '38c6d9f0e8824a328db050ebb81ea0c0'
                    }
                    'br-dex-number': {
                        table: 'sys_script'
                        id: 'ab994e35f10a44c6922ea26e22c75581'
                        deleted: false
                    }
                    'br-policy-ensure-capture': {
                        table: 'sys_script'
                        id: '59045330674d4c7a964d0d1081f0c62c'
                    }
                    'br-policy-link-config': {
                        table: 'sys_script'
                        id: '1d8e595a78984a969b363a3a6829d7f9'
                    }
                    'br-sch-number': {
                        table: 'sys_script'
                        id: '265633fa1c674634ab0038e6eb92c1b7'
                    }
                    'br-sch-refresh': {
                        table: 'sys_script'
                        id: 'a353ba3353884d43b828a9b314f4ca94'
                    }
                    'br-trn-number': {
                        table: 'sys_script'
                        id: '8c81d5c664de438e912870a618bc97b4'
                        deleted: false
                    }
                    BridgeAck: {
                        table: 'sys_script_include'
                        id: '1cceda4b1d434ce58f80b104fdd81373'
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
                    BridgeDualWrite: {
                        table: 'sys_script_include'
                        id: 'cc9f9de280834c1c82679a0083769cb4'
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
                    'cs-hide-bottom-config-buttons': {
                        table: 'sys_script_client'
                        id: '7860c40669a344e2a35dece10e27d2de'
                    }
                    'cs-hide-bottom-dex-buttons': {
                        table: 'sys_script_client'
                        id: '4690a79b3b55447c9195efc5209e8068'
                    }
                    'cs-live-execution-progress': {
                        table: 'sys_script_client'
                        id: 'f64c65a9e0774ae89f889de6a15aa134'
                    }
                    'dex-rel-audit': {
                        table: 'sys_ui_related_list_entry'
                        id: '2f0f01644cb9484ca7b2355f9bc44a93'
                    }
                    'dex-rel-errors': {
                        table: 'sys_ui_related_list_entry'
                        id: 'c3ae0ba463294a1997edf8eee80546b5'
                    }
                    'dex-rel-mappings': {
                        table: 'sys_relationship'
                        id: 'ce74c5123a424289b7b71ede5b70fe29'
                    }
                    'dex-rel-mappings-entry': {
                        table: 'sys_ui_related_list_entry'
                        id: '8685de4f393e4268a13946070d7b2502'
                    }
                    'dex-rel-record-results': {
                        table: 'sys_ui_related_list_entry'
                        id: 'ab974c0c4b0945738871f5f6246ace01'
                    }
                    'dex-rel-transfers': {
                        table: 'sys_ui_related_list_entry'
                        id: '2844f9c6715a4282a037978e255ef331'
                    }
                    'dex-related-list': {
                        table: 'sys_ui_related_list'
                        id: '6a3ef6b3c7a140dfab56887a5699bb09'
                    }
                    'fix-dex-snapshot-section': {
                        table: 'sys_script_fix'
                        id: '92a5895da553408f931fb924bcfc3480'
                    }
                    'job-continue-executions': {
                        table: 'sysauto_script'
                        id: '569194e451a04084ae6d5017503747a9'
                    }
                    'job-drain': {
                        table: 'sysauto_script'
                        id: 'fba81b6094ff49f5a13529d2c343c059'
                    }
                    'job-execution-schedules': {
                        table: 'sysauto_script'
                        id: '2d33fdf7bdc84586afff64b9d261849a'
                    }
                    'mod-api-diagnostics': {
                        table: 'sys_app_module'
                        id: '76975b11b8404d84bdefc86f289cccf0'
                    }
                    'mod-audit': {
                        table: 'sys_app_module'
                        id: 'bada462ff9774ba39756c489f6b03057'
                    }
                    'mod-configurations': {
                        table: 'sys_app_module'
                        id: '0a0ab80706354c968dcdd8d95cd81e85'
                    }
                    'mod-connections': {
                        table: 'sys_app_module'
                        id: '3320f75f36f5483cbb7f8c04e8054869'
                    }
                    'mod-dlq': {
                        table: 'sys_app_module'
                        id: 'c2446b93ee6247488dbb7908a67eecaf'
                    }
                    'mod-executions': {
                        table: 'sys_app_module'
                        id: 'd2dd47e155674f88984d29af9ed5ebf2'
                    }
                    'mod-failed': {
                        table: 'sys_app_module'
                        id: '7f52f9fc6cbe4993b0485095c90c2707'
                    }
                    'mod-outbox': {
                        table: 'sys_app_module'
                        id: 'efdc64ac74f34b3eabee9e5766f80067'
                    }
                    'mod-overview': {
                        table: 'sys_app_module'
                        id: '8d97b3cea55644fea9505b861389b898'
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
                    'mod-schedules': {
                        table: 'sys_app_module'
                        id: 'eb08d30cfca1406fae7558ac3fb3e181'
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
                    'mod-settings': {
                        table: 'sys_app_module'
                        id: '79be932868be48c5a5058b0c7d2445fa'
                    }
                    'mod-test': {
                        table: 'sys_app_module'
                        id: '61008bfbbe414775a4b73073cf6dcc60'
                    }
                    'mod-transfers': {
                        table: 'sys_app_module'
                        id: '3ba59481de2d498b9d0cba4f44c95c15'
                    }
                    'mod-xref': {
                        table: 'sys_app_module'
                        id: '64c7c038ecc14ceaae156e80ff5cc391'
                    }
                    'mvcfg-rel-executions': {
                        table: 'sys_ui_related_list_entry'
                        id: 'b6dc9dc45f1d478eb14097df8d0bc6d0'
                    }
                    'mvcfg-rel-schedules': {
                        table: 'sys_ui_related_list_entry'
                        id: '54d370596e1b44b89e3eefd3c2cca315'
                    }
                    'mvcfg-related-list': {
                        table: 'sys_ui_related_list'
                        id: '0f92adc40be94db9bc0bb8b9363806ab'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '1c478f472a3b442099982ee58f01bd3c'
                    }
                    'prop-ack-enabled': {
                        table: 'sys_properties'
                        id: '0551c809d52d498f8ed51517dfa47d31'
                    }
                    'prop-ack-timeout': {
                        table: 'sys_properties'
                        id: 'dc63bcf7a614413387d2542de22ed7b2'
                    }
                    'prop-batch': {
                        table: 'sys_properties'
                        id: 'fc451097fdb44e2087c26e8ac529de4e'
                    }
                    'prop-dlq': {
                        table: 'sys_properties'
                        id: 'a617d2031fa048d7b2132b2d4efb4fc6'
                    }
                    'prop-dual-write': {
                        table: 'sys_properties'
                        id: '71808c10d4444bb4ac3a00f04af81e18'
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
                    'route-ack-v1': {
                        table: 'sys_ws_operation'
                        id: '932a4b1a10934667b68c485777a4b9fb'
                    }
                    'route-apply': {
                        table: 'sys_ws_operation'
                        id: 'c62e1ecfb538429582170d2e0fc8038c'
                    }
                    'route-ensure-capture': {
                        table: 'sys_ws_operation'
                        id: '9347b715185044faa6fe6e396bda78b0'
                    }
                    'route-executions': {
                        table: 'sys_ws_operation'
                        id: '7cf1993cdf854ea2be6ef4e56fab4eb8'
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
                    SyncBridgeExecutionAjax: {
                        table: 'sys_script_include'
                        id: 'b5a6fac4b816483a8ca8938638b454eb'
                    }
                    SyncBridgeExecutionService: {
                        table: 'sys_script_include'
                        id: 'fad19ca9672749349f64f85e3010da5d'
                    }
                    SyncBridgeProgress: {
                        table: 'sys_script_include'
                        id: '4930525dc4c54565a1b9c50158844173'
                    }
                    'ua-activate-config': {
                        table: 'sys_ui_action'
                        id: '1ca075935d5d4ef4a01b535ee28148d9'
                    }
                    'ua-cancel-dex': {
                        table: 'sys_ui_action'
                        id: '8926238fed4c4288ae2e8a359400f89b'
                    }
                    'ua-clone-config': {
                        table: 'sys_ui_action'
                        id: '21b39921267c477ea3a83a7b87ecc602'
                    }
                    'ua-deactivate-config': {
                        table: 'sys_ui_action'
                        id: 'fbf65396eb374ca5878c91391f3f56e7'
                    }
                    'ua-dry-run': {
                        table: 'sys_ui_action'
                        id: 'e1bb879c252744a4b49083467120da2e'
                    }
                    'ua-execute-now': {
                        table: 'sys_ui_action'
                        id: '0515c1a5e0514c0a8d353009882676b6'
                    }
                    'ua-preview-records': {
                        table: 'sys_ui_action'
                        id: 'c503610bfd134f34ba887bf278f1cee1'
                    }
                    'ua-reconcile-dex': {
                        table: 'sys_ui_action'
                        id: '8c2dd4b675e84c0b817aa5be162facd9'
                    }
                    'ua-retry-dex': {
                        table: 'sys_ui_action'
                        id: '680e6b3a9b544c01821761f550fb9377'
                    }
                    'ua-schedule-config': {
                        table: 'sys_ui_action'
                        id: '21d04652d2f8446484b7c88596b7ad0a'
                    }
                    'ua-validate-config': {
                        table: 'sys_ui_action'
                        id: '6d0f4fcec53f4ccc8c77e19b2ae49536'
                    }
                    'ua-view-latest-execution': {
                        table: 'sys_ui_action'
                        id: '174d7879a38944f18ebcc9aa75ababc4'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '0060b358cea84e0b83fcc63a6ad4aa99'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'comments_and_work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '009bbd58ab2543239538a735c69d309a'
                        key: {
                            sys_ui_section: {
                                id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Timing'
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
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '01012b9f1d3544de983f15c0b9090978'
                        key: {
                            name: 'x_33764_sbridge_outbox'
                            element: 'mode'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0118f07d45714721938e9e509c4983b8'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_index'
                        id: '018710de73c94cc6a95b0a0ca0559381'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer_audit'
                            col_name_string: 'receipt'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '018712f92ed44b39b44878a3eb45f22c'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'action'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '01a413524f1d4ebbac1ba7116e8a98ad'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'receipt'
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
                        id: '0201237691574ed8838b0efd7ec1c7bd'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'sequence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '02c5e9947fd54331a3af322925cbcf07'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'outbox'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '02d2c70055584bdbbd662871a5ea2779'
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: 'd4bcf7a1a08146f5ad9785c9be493901'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Activity'
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
                        table: 'ua_table_licensing_config'
                        id: '02e61f5c3bea45cf9df692f2d7331fc4'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '0303e439c56c4e3dbf00ee1abc4b86db'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Timeline'
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
                        id: '0308f4436bbc49358a74dfd16c6ff764'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'Target'
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
                        id: '03a17e83c3324b06be5b1df223165465'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'target_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '03bdff258f404ad8a5ec2df7c157c2e3'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'http_status'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '03ff577b4e634de984af4410aea117a7'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '08d71da8cd134a4fbbeaed05a3d9799b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity.xml'
                            position: '2'
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
                        table: 'sys_ui_policy_action'
                        id: '0472ed2c32a94ba6a4f908701c107e17'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'execution_mode'
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
                        table: 'sys_documentation'
                        id: '04a494bef7784d1d8ac65397236acf01'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'source_table'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '04e46312d8d841b58495965b11ba2821'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'sent_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '05704c6dd6fc47139d8c571932762a72'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'comments_and_work_notes'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0594a675cae14536ab486dd68cf8745b'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '059e64e02ad64432ae08f33d88a6d87e'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                        table: 'sys_documentation'
                        id: '05a310830a104f60b2359609a760b81e'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'source_read_completed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '05dca9cf66ad4f35bebd376cda11b63c'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06080085a5074c579f317ddcff61d878'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '062868e0cc194e4d84f3baf13a6f07c5'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'f278da717e8240ada234446c8d847389'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Audit'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_33764_sbridge_data_execution.x_33764_sbridge_transfer_audit.execution'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '065ca2cd2dc742afadac67314e77adb7'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'remote_received_at'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '066d1300092a420bbe6f97d930e0e2c5'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '06b11f44cf964f5bae7d6456a00eb2d1'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'received_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '07353611f7ba4b7cb0bf085fec289535'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'match_strategy'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '07747621fe4b4cdd8e6bea2487064dc6'
                        key: {
                            sys_ui_section: {
                                id: '77c0ec55553240a29ca7139188491f2d'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Instance'
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
                        table: 'sys_index'
                        id: '08aa3b8ba41a4da3add4b046ee0100ab'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer_audit'
                            col_name_string: 'correlation_id'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '08d71da8cd134a4fbbeaed05a3d9799b'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Activity'
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
                        id: '08ecbd212d1d473f8bf591937d50be38'
                        key: {
                            sys_ui_section: {
                                id: '77c0ec55553240a29ca7139188491f2d'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Instance'
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
                        table: 'sys_ui_element'
                        id: '08f56cd827704b73a4b1e68d14ced7f4'
                        key: {
                            sys_ui_section: {
                                id: '0308f4436bbc49358a74dfd16c6ff764'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Target'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'apply_mode'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '08fe56bcd8024f74b4c17f76d6a8c362'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '0926c79c1d12408988987228b40ac5f7'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                            element: 'target_table'
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
                        table: 'sys_db_object'
                        id: '09af718e026e4c4686d5de34e1d7e92c'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '09ebd19be492406598a930c2ee6c21a3'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'transport_status'
                            value: 'pending'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        id: '0aa65b43e57e490a8ebac143361c44b0'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'movement_config'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0ab9116f071a4250b3d5f6db3f564ec3'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'initiated_by'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '0acdabbe4d764b4ea35398ea5ba7d5c8'
                        key: {
                            sys_ui_action: '680e6b3a9b544c01821761f550fb9377'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '0b074d92b20340619564ad30ef8fe03b'
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: '9d4d4129ab064c0ca59d5f2d53203f98'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Live execution'
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
                        id: '0b162ce8a1b84be7acf49bbc068d9163'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: '0b82966e99b44f4c8eadb3b891a2f97b'
                        key: {
                            document_key: 'e22d6d5beda546f6bc898060c240433c'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0bd4647e530440af94b16fde8ca26aea'
                        key: {
                            sys_ui_section: {
                                id: '3c5d47700f7d4d899108a7349bc58a12'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
                                    caption: 'Transfer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'http_status'
                            position: '5'
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
                        table: 'sys_documentation'
                        id: '0c00c2aa99cc4c0c95cfd9dbf8c97af5'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'policy'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '0c2dbfed661c48a1b1f2f9f7734dbd97'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: '0c4561e5a0b14fc3bc0566139d59d5cf'
                        key: {
                            endpoint: 'x_33764_sbridge_preview.do'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0cbbd038444b4779a6379e81071492a8'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                            language: 'en'
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
                        table: 'sys_choice_set'
                        id: '0cfb5299990d4be381eee4afdfca312c'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'direction'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0d066d929c3a4b4795625640a7540373'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'dlq'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '0d79c7957f4b4beeae84ddc5b3d2b313'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'trigger_type'
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
                        table: 'sys_ui_list_element'
                        id: '0de61e0a0ec8453cbc8e4e660faa5927'
                        key: {
                            list_id: {
                                id: 'b73a57f03d84433d9d38e81a6e4e261d'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                            element: 'execution'
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
                        table: 'sys_documentation'
                        id: '0e0ca98cafbf4ae48b8ee5655f79cef6'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'transfer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '0e454a7d82a5452d82f82116f9073969'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'sent'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_choice'
                        id: '0ed6c5d352764c6682a79b1b63f80fb4'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            value: 'saturday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0f6996b8e54d4a4592ce873c10bc3c1e'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0fd7e9e9694a4654ade373f154698662'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
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
                            position: '3'
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
                        table: 'sys_choice'
                        id: '1028ca8d3c2343968861f771a1b72309'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'validated'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_choice'
                        id: '1038f3e19a0d45afae7d2f401311915f'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                            value: 'fail'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1071f81e00e044c4838e028156d6f391'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '109bf0a2b602474cbf0999f4652e4330'
                        key: {
                            sys_ui_action: '8926238fed4c4288ae2e8a359400f89b'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_number'
                        id: '1107e19aa4814f71b582336f4698e46a'
                        key: {
                            category: 'x_33764_sbridge_execution_schedule'
                            prefix: 'SCH'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '1152e0cd423241b0a20de56491953483'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'timezone'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1154121212e940b1934ed247b6ee73ee'
                        key: {
                            sys_ui_section: {
                                id: 'dda8548190e74264b5c6bb19921120a7'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'remote_audit_id'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '11648a3dc9aa49ed8cf4bc7e02ea3705'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_received_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '11e2d28c3bb64882bbe7fd01d75e05ad'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'movement_config'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '11e408cd19ea49629e7381681254cc4e'
                        key: {
                            logical_table_name: 'x_33764_sbridge_processing_error'
                            col_name_string: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1292aa9a876d4b68bd2892f3e3f5cb32'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            value: 'retry'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '12c366f9ac2b4722b076001c9f0a4055'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '12e33aa8dba9408f9db5f7f6031e171d'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Transfers'
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
                        id: '12e5182d89014123bfd5fec07768e4a1'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '137ce85575014549b04963785c2972a2'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '138a5056445e4aaeabd3a979adcf3cea'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'message_type'
                            value: 'send'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'ua_table_licensing_config'
                        id: '1426ab1b6b36498fad0b66d8848e018d'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
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
                        table: 'sys_choice'
                        id: '152bb9b10e6e4b1d811508a574a5808a'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                            value: 'successful_with_warnings'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '154213aa52bd45b690e1c5a62c98871f'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'initiated_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '155edf8e151446a5bacc13b6c9b97660'
                        key: {
                            sys_ui_section: {
                                id: 'd8c047f6c9154b05a322ef517a037f17'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'previous_execution'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '15f9377d6d8a49baa9cb9c0c77b26ff6'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            language: 'en'
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
                        table: 'sys_ui_element'
                        id: '16264d33691545be9d04f7abe082d6f5'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'error'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '16afe95d49a34b31b9e8e77171f1b3cb'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '16cd183da9724067848779afbe105311'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1718e20418014a5eac3e7daa1a2c9611'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_validated_at'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '172d5cd852ba43d6b2d5ca0b6b4a191b'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'transport_status'
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
                        id: '17fdb9691e5446a29af84067fe26c969'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'duration_seconds'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '180cb41f17e042d3b841749e86807ae1'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'remote_audit_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1865aa3f37bd4ef4a3ef3ba92fba842a'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'payload_hash'
                            language: 'en'
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
                        table: 'sys_ui_list_element'
                        id: '18ae1b363baa4b7c85cfb7db5c482d42'
                        deleted: true
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'sent_count'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '18cc2a404e2d4b7393bfe0ba1f32b5f2'
                        key: {
                            sys_ui_section: {
                                id: 'dda8548190e74264b5c6bb19921120a7'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '18e3bc46e3c944e7a0d933140591445f'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'sent_count'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '18f224040c2e44609fddece60e10e905'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_received_at'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '190f5215deb340c78d0b120fb3540b5a'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'execution'
                            language: 'en'
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
                        id: '19dc7ee337504cfd810499d3cc69b24c'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'previous_result'
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
                        table: 'sys_choice'
                        id: '1a25f7af34f04c45819ca25a61c501a6'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            value: 'accepted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1a2b6deb06d74424802e1b6bb17ea15f'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1a68f36f34ac410891738685b089c682'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'direction'
                            value: 'inbound'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ad4205dd683445aa8ac0471f14dcf74'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_execution'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1b05e5eaf3a24849ac78e5888463744b'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b39795352ca435b8dcbd9e1c8a4fd87'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'updated_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1b5b20c210014b6c96dba51f592bb345'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_completed_at'
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
                        table: 'sys_choice'
                        id: '1c01c3ca48094355a57697d80fa30cdb'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1c1ac77063364dc38fe26a43be56386d'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
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
                            position: '7'
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
                        table: 'sys_ui_element'
                        id: '1c914cf0cb624a46b2f3a6a4f0f23981'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_processing_completed_at'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1cd421dc552445cc8cd2ca797b6e88fb'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'started_at'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '1d7574c8d78146859566a24885bbaf57'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'execution_result'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1d97c484774f4b9e8b0afd0ad5dd06b4'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'filter'
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
                        table: 'sys_ui_list_element'
                        id: '1e0d74cbb7b242988dff6d7d34077e88'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                        table: 'sys_ui_policy_action'
                        id: '1e4a8fc4f5ab44f49624ed2d814730ff'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'target_processing_completed_at'
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
                        table: 'sys_documentation'
                        id: '1ee971d4a283426fa91abfd81d160752'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'overlap_policy'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1f5b4bcedb4c488784839d4737a3d2f7'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transaction_id'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f779007d0f74cdab12b21a6ecaceeb2'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_instance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '1fb22b95ab1343ce90a1ebfa3eee8f81'
                        key: {
                            logical_table_name: 'x_33764_sbridge_data_execution'
                            col_name_string: 'execution_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1fb82d4800a942c6b6a60cce1c71a52c'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1fd7055ae3c94028b0daa784b4b1ae5d'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'previous_result'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1fede68e66cb451096c4afa68017576c'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'platform_job'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '201d17a7c4314d03832a3ee3c20813b8'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'platform_job'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '207c7df9da484a85846bbf9fb4154a45'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'transfer'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '20b8e1c3018547b5bdee08222c2c9ebb'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '20d01f881c7a480893f9238015af953c'
                        key: {
                            name: 'x_33764_sbridge_transfer'
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
                        id: '21cf234c24854430ac1f2c33449efa02'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'schedule'
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
                        table: 'sys_ui_element'
                        id: '2233e05582b048dcb26a277966134597'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '22d3f5f49c534afeb5db665622de13b7'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_instance'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '232782c1068c4763a85b5ac41b34a928'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'execution_state'
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
                        table: 'sys_ui_list_element'
                        id: '2390e58381c144b082842d6d14dc14e0'
                        key: {
                            list_id: {
                                id: '9f4bbe7600ff42e096ba392797c63d95'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
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
                            element: 'result'
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
                        id: '23f182cce1914ea183eda9da99f5d1bb'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'queued_at'
                            language: 'en'
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
                        table: 'sys_ui_policy_action'
                        id: '24d5cb9d21eb4cc7a1d9d06b5a5234c8'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'configuration'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2556ebaf3cbd4a1ca182960226ccaaeb'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'acknowledged_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2575b016bde24f74a4036e6330851711'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'outbox'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '25b3e7bff2f74369877350fbb6b46d7e'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '25b4029a00c44ee994812ef7580e6457'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            caption: 'Error'
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
                        id: '25b829739cfc45b2bbc8454251d30633'
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
                            element: 'movement_config'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '25b92a33fe3143bb83bbce4321963fd8'
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'ack_required'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '25f1a99139f843bb91051407ac3db3b0'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'triggered_by'
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
                        id: '268625cac725435fa7979f8935e93c11'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'concurrent_execution_policy'
                            value: 'prevent'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '26d28d87a22d41f589e5c077b8d3efef'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'acknowledged_at'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '286db1072b294346b41f51e0702c464c'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'NULL'
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
                        id: '28e3c38e01aa4bbda52cd62644b13487'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'reference_handling'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '28fb7e079f584a80b9590ff216921bc9'
                        key: {
                            sys_ui_section: {
                                id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Timing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'retry_count'
                            position: '4'
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
                        table: 'sys_ui_element'
                        id: '2990039081434ff99084306c1b028d2a'
                        key: {
                            sys_ui_section: {
                                id: 'dda8548190e74264b5c6bb19921120a7'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'receipt'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '29c9310bb7404486873f35ebdc99c740'
                        key: {
                            list_id: {
                                id: 'b73a57f03d84433d9d38e81a6e4e261d'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                        table: 'sys_choice'
                        id: '2a19c533f78e45f4bcb7d6352c9aebe6'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_index'
                        id: '2a8e18d7bb1a4960a0898b78e30d474f'
                        key: {
                            logical_table_name: 'x_33764_sbridge_processing_error'
                            col_name_string: 'resolved'
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
                        table: 'sys_documentation'
                        id: '2ac150dde82a48cb867ba9fb0615bdb2'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'record_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '2afb79c8b7b54c16bf4799f9355a0bf2'
                        key: {
                            sys_ui_action: '174d7879a38944f18ebcc9aa75ababc4'
                            sys_user_role: {
                                id: 'f5f25fcb4c514e85a2e8485639714bae'
                                key: {
                                    name: 'x_33764_sbridge.reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2bc50a5ae3d1494db9144bb4f02f57aa'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2c1945d7683f47e5b2bb0d3dc82f59a6'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'acknowledged_count'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2c1ffadfe0da4c5bbd415c24baf78ca5'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'reference_handling'
                            value: 'null_and_flag'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        id: '2c4ab623a7c944189d682a38a4a0fe82'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_completed_at'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2cbc3fc60ce74a6582eeaf2635bf49e8'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
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
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2cd3fc35303d410aa9cb92e6dc096f98'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2cfe03f3c0b247ea8188b5d47623caa7'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                            element: 'next_execution_at'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2d06cb3f285844c49c12c1b77d462619'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_received_at'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2d50cbaefb984c3fb9f64047f32927eb'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'configuration'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2d6984095ae14860b90dbc1358f58448'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d9f51cb34cc4939908557708a33adad'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'transfer_completed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2dab09cacdde4e5380e4407b23939f02'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'record_count'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2db6d410cb1a4f1da3bc010495d43da1'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'inserted_count'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '2dc07e52d1574108a1cebc111ee703b8'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'schedule'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2df47581c24c42ff8d33aca6ff96e64f'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'error'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2e511d0f06bc4452974d7dc980cb75b3'
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '2e59000b301d4b1caa73156a352023f1'
                        key: {
                            list_id: {
                                id: '9f4bbe7600ff42e096ba392797c63d95'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
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
                        table: 'ua_table_licensing_config'
                        id: '2e9a0ccc818745e78cd1fd9fa8c83291'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '2eb89d1cf905457cb6b5d6a9879800da'
                        key: {
                            sys_ui_section: {
                                id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Timing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'http_status'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '2ecf407de698480da12afd17cf2aa654'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'message_type'
                            value: 'ack'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        id: '2f557390c1bf48769aaa05a863e6778f'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'correlation_id'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '2fb0cd17743b4d5984afa45a7a2ab11d'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
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
                        table: 'sys_choice_set'
                        id: '30cbc3485a954f45a3c89cd3967c43b8'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'direction'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3112525bdbb24ebfab2b8013a77aad70'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '5649ba761b174efe8ee0598682777559'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Record results'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_33764_sbridge_data_execution.x_33764_sbridge_record_result.execution'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '3169f10d783542449ccf95658c8166a8'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer'
                            col_name_string: 'correlation_id'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '319d7efe8d764ed29bc699121de6e266'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'received_count'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '322e8045e111425db1ac62fcc1a907ce'
                        key: {
                            sys_ui_section: {
                                id: '9651f74eeaea4ddda03fdc68ac4faa55'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity.xml'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3237943f1fe944f59c9451b7c9e567a3'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'record_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '32593aa9607b48c8ab351e4a281adb05'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'match_strategy'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '32a30ae5bb9849229ef81025dad6f7cc'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'initiated_by'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '32d7f25558de4fd585c8fb86c85996e0'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'config_snapshot'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '32d81c0ea028445abcb2e0cc07b1df62'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '32de29dde27f482d86a8be20830b4424'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'previous_execution'
                            language: 'en'
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
                        table: 'sys_ui_policy'
                        id: '33344230880144c982d530dfb1b5cca6'
                        deleted: true
                        key: {
                            table: 'x_33764_sbridge_transfer_audit'
                            short_description: 'Hide empty staged acknowledgement fields'
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
                        table: 'sys_ui_element'
                        id: '33d2ec7be9204ef483457eb3019749e0'
                        key: {
                            sys_ui_section: {
                                id: '3c5d47700f7d4d899108a7349bc58a12'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
                                    caption: 'Transfer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '33df943045ad4599a1bd6e5098e53d75'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'run'
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
                        table: 'sys_ui_policy_action'
                        id: '35fbed7d05ca47d18274edcac34553e1'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'triggered_by'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '361b82af6c1946adad5a35ff3b34b31f'
                        key: {
                            logical_table_name: 'x_33764_sbridge_record_result'
                            col_name_string: 'execution'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '362904e1cc1346e69c32b15447d257d1'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3635bed3b5064a309711306edda2371c'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'correlation_id'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3677462c458e44379ba9124a8719a895'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '369b38241bf447c6afddd4b82ee0f921'
                        key: {
                            sys_ui_section: {
                                id: 'e4aac3330b4d4d6bb9d7ca8c29dbeb56'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Source'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'filter'
                            position: '2'
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
                        table: 'sys_ui_form_section'
                        id: '36a0d82de3794f3ea5df8eb30b907919'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
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
                        table: 'sys_ui_list'
                        id: '36a3b480e56f4d3d99ab9b259c624ed5'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
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
                        id: '36b30ade9afb4183bc7093b1b3e1bb48'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'local_instance'
                            language: 'en'
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
                        table: 'sys_ui_policy_action'
                        id: '372e5f9002894880b2273bb8488b20aa'
                        deleted: true
                        key: {
                            ui_policy: {
                                id: '33344230880144c982d530dfb1b5cca6'
                                key: {
                                    table: 'x_33764_sbridge_transfer_audit'
                                    short_description: 'Hide empty staged acknowledgement fields'
                                }
                            }
                            field: 'acknowledged_at'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '374e775e63f245e6816a14cf01c53fed'
                        key: {
                            ui_policy: {
                                id: '683ce3d7f44a4cf690ed1001d182ad5d'
                                key: {
                                    table: 'x_33764_sbridge_transfer_audit'
                                    short_description: 'Inactive. Acknowledgement fields stay visible in 0.4.0.'
                                }
                            }
                            field: 'ack_stage'
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
                        table: 'sys_db_object'
                        id: '37a1e8d2143948aa8e0bb50125f6534d'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '37bbdaba4bb440259c2c56b1f4be7fb2'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer_completed_at'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '37f46d94d88d452eb426e97bf759902f'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
                            value: 'hourly'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '38aa779042004fbfb6c8e6cb54d7640a'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '38c9938250fa45deb4a5f2314bfca638'
                        key: {
                            sys_ui_section: {
                                id: '9651f74eeaea4ddda03fdc68ac4faa55'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '0'
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
                        id: '391621f74fa249aeb3f1a570626f0c0f'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'record_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '39608521c362456c9b5899905e2c8167'
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
                            element: 'movement_config'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '3976dc1a56b04ce699f981a1f6636af9'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'correlation_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '39874b84ea7941c1a453538ababc9e70'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'source_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '39b6045d06af4d62b3fb4abb688947c0'
                        key: {
                            name: 'x_33764_sbridge_transfer'
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
                        table: 'sys_documentation'
                        id: '3a0dc07e642d4857a9432dd2a8084bec'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'target_instance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a1503319d8d4c2da6ed0bfff75bc7a2'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'next_execution'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3a26f83a7d1747f5ae417fec49a369db'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'inserted_count'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3a52376e76df48c0a5e505c1af4d9bf8'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '3b0067839d7947f6904c1f8bfba2e7bb'
                        key: {
                            logical_table_name: 'x_33764_sbridge_execution_schedule'
                            col_name_string: 'next_execution'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '3b53a82640ba4b30bba00996321410f4'
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: 'e4aac3330b4d4d6bb9d7ca8c29dbeb56'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Source'
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
                        id: '3ba04b73f3f34f9da56631b738b81496'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_result'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3bb7bc13511f41849c5ea5ee3498b903'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'started_at'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '3bc18384caa243b796af707b45175498'
                        key: {
                            sys_ui_action: '1ca075935d5d4ef4a01b535ee28148d9'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '3bdc11873b324059a34a4cdc60983085'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '3c5d47700f7d4d899108a7349bc58a12'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            caption: 'Transfer'
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
                        id: '3c6dace3efc64fb184ad0fbfa4f2fe41'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3c722480427b478ab298c111c7d38f53'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_run_at'
                            position: '4'
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
                        id: '3d0fe72cb7974396ade0455c94a4556f'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'payload_hash'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '3df2b6ab72f7411a96dc24516b9ffbb6'
                        key: {
                            sys_ui_section: {
                                id: 'd4bcf7a1a08146f5ad9785c9be493901'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '3dfaafc009d349378ac2df15a6604449'
                        key: {
                            role: {
                                id: '22264935be5b4f3dad0575f5f38f3c23'
                                key: {
                                    name: 'x_33764_sbridge.admin'
                                }
                            }
                            contains: {
                                id: 'e23d3a38a8184f1d91a18fb34399ed49'
                                key: {
                                    name: 'x_33764_sbridge.diagnostics'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3e0983bcee3f4c21a9cd27311fd016cf'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            value: 'processed'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_ui_element'
                        id: '3e58c6fad171401cafd2ec43d9d8cdc3'
                        key: {
                            sys_ui_section: {
                                id: 'c5a43b1bfce04f3ab2e2a1aba264c5ca'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Parties'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3ed18b59b3e84f03aced3b6a8af1dbba'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'operation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3f09072433c2483480b141241031d67a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'comments'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3f20b464112b4cb18052c37b40d732ec'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'message_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3f5e7088c92344b0bb0f1c4c91658dae'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'transfer_sent_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3f6e17afc4bd4ae09171683c69b11cda'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'queued_at'
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
                        id: '40f466a725d64e2ab3dddd7c6c856c17'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '412b62069f9548cb924848a23b014a08'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'acknowledged_at'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '413de89ed05a48c5ac3d4a7cc6c6084f'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'operation'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '41649541fa3b42499a928576fda960c1'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '12e33aa8dba9408f9db5f7f6031e171d'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Transfers'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_33764_sbridge_data_execution.x_33764_sbridge_transfer.execution'
                            position: '0'
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
                        table: 'sys_documentation'
                        id: '4204680db7f04ace8bd8104d888dc269'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'triggered_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4231fd1063b0441e9b103570f8628efa'
                        key: {
                            sys_ui_section: {
                                id: '922b8eccea4a474db47344115b2dab69'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '42384837aa2b416f9f6ed4043e662d1d'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'updated_count'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_policy'
                        id: '424eab7705ce4b618dc35142a61f6edd'
                        key: {
                            table: 'x_33764_sbridge_data_execution'
                            short_description: 'Lock a data execution after it leaves Draft'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '42c180ce3d874321b05f9ce69a74aa9d'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            caption: 'Evidence'
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
                        table: 'sys_index'
                        id: '42e5d70dfc11456287ad7e084baa77e3'
                        key: {
                            logical_table_name: 'x_33764_sbridge_run'
                            col_name_string: 'peer,type'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '430391f3f6dc45bfa0ec0d21a5b7fe2b'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4358a6e79b3e4ae0b323e923e1fc1e8f'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '435fbc7a9de24965849652dfb5421c06'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'received'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        id: '43b55f61f7e0473492e73c00bd7ac29c'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'work_notes'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4429b5eca38f467eb331dcb087122cea'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_execution'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '4438a55640bc42359360e4a51751081b'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'failed_count'
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
                        table: 'sys_dictionary'
                        id: '449fd4da2fcd4736846bfcb16be9758a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'acknowledged_at'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '44ad1717357b4f12823b0826a3d985b4'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'initiated_by'
                            position: '7'
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
                        table: 'sys_ui_element'
                        id: '456e495c512c4252a3bdc812ad80c562'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'duration_seconds'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '45792b67565d4fd2b236b5676ea7954b'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Milestones'
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
                        id: '4593df4318b44daf874e046b48909857'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_validation_status'
                            position: '7'
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
                        table: 'sys_ui_element'
                        id: '468381c81611486085960845e4c94f96'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer_completed_at'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4713eadab85e4984a37d867715a5927b'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'run'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '471cbffcd9dd4335ab14a50b1a328809'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Errors'
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
                        table: 'sys_choice'
                        id: '47ad237f34ca4865989649ad120c0183'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'queued'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        id: '4831c26ce4d3472387829471638c92f8'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                            value: 'retry'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '48615ac9cfd94b45ab6f66d731786398'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'batch_size'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4869516698584cfdb4caaed72c8ae2cf'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'error'
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
                        table: 'sys_dictionary'
                        id: '487e02f9db4440d487fe93d72972e653'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'payload_hash'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '4920856e0b09499ba173d99c935adeba'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer'
                            col_name_string: 'outbox'
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
                        table: 'sys_choice'
                        id: '4ab4021940594d8fa87f7f20a0484141'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'operation'
                            value: 'delete'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4b1a5c7fb02449b190c6f080fe18e075'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                            value: 'successful'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4b51ee5e8e794248822ec26ef83e5b14'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_read_completed_at'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4be8e8682b294b61990a33e750830438'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '4c27e767676c4bb08c8820010017669f'
                        key: {
                            sys_ui_form: 'a39c161c38d7471dbf6001749a463750'
                            sys_ui_section: {
                                id: '5edf9b4f473a422198044825a384682b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Configuration Snapshot'
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
                        id: '4c514cadc88644f695a82517b576f4bb'
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'concurrent_execution_policy'
                            position: '1'
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
                        table: 'sys_dictionary'
                        id: '4c7a90f48a734418a3d5d0beec1fcd89'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
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
                        table: 'sys_ui_element'
                        id: '4c95880de5754348824442a1ebe3393e'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'duration_seconds'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '4cd96c278874491fbe195d09cb4a4311'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'Executions'
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
                        id: '4d179e03c4eb4faab38129280b6a6cb0'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d94f00877a44663a3a562ded28360c4'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'comments'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4e068a80ba4e4b3ea4404efc00e72d23'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'operation'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '4e37e8db8788458f922b4a1eed7ec488'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            caption: 'Result'
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
                        id: '4e3bf04ae2cd455081fd0d0111276c24'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '4e96ad54639142869a2e37660f7348b1'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'number'
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
                        table: 'sys_ui_list'
                        id: '4f74daac87514b558134534ca25e81e8'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
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
                        table: 'sys_documentation'
                        id: '502d4098e6fd48b78a15fa510917ed26'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'source_instance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5090c1efc5c84492a85df0f40acde2ed'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validation_status'
                            value: 'never'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '50a39e7289974f029ef8f9acb7def116'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
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
                        table: 'sys_dictionary'
                        id: '50df7f8b94a04c7d9bb2aa684cfe7a60'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'record_count'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '50e2cf28aebe4a38ad02f2185a2b5417'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_state'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '50e9b3468efa4f3599a98f848ab9b9d6'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'concurrent_execution_policy'
                            value: 'queue'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '510b7aa0b2cf4c66bd865f2169c7345a'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'local_instance'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '512617b5cc624763a7bfb028ef4aac68'
                        key: {
                            sys_ui_form: {
                                id: 'b89bb8a4914946b6b24227800b1070db'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                                id: '9651f74eeaea4ddda03fdc68ac4faa55'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Activity'
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
                        id: '513fdddaca0e431ca42df92621e44252'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'acknowledged_at'
                            position: '7'
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
                        table: 'sys_ui_element'
                        id: '515980d2b1b34b4e8e7f356cc37cd498'
                        key: {
                            sys_ui_section: {
                                id: 'c5a43b1bfce04f3ab2e2a1aba264c5ca'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Parties'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'local_instance'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '51c148f257c14de9a631dbbec168500d'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'target_instance'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '51e5d4daaaca4143b8f3b2335cfd7816'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'result'
                            position: '2'
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
                        table: 'sys_ui_list_element'
                        id: '521d3fc2ec974473ba84350dbe68357e'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'sent_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5231506d533547efa6b68539d227b10b'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'updated_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '530fd647cfb64378b4a4f8612748a21f'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                        table: 'sys_ui_element'
                        id: '5327a72b54c9491ca32c344ff284558a'
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_validation_status'
                            position: '4'
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
                        table: 'sys_choice'
                        id: '534492fe0fda4ceba7e3f17774d2e5fd'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                            value: 'successful'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '53465185ced34c7c8911c0b353ce38fb'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_run_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '53628a26e4a64dea9d0099a4c4f5c5d9'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_month'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5369eb86152940bf8555d2b375df92b2'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'remote_audit_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5387fceac9764dbb8b4ef7646d8e72f0'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            value: 'recovery'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '539cb6bb695a4491ac576e5d5c7aae7f'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '539d5065435442d480edbfb16c2522e7'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'validating'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '53e44f909d9a4fc2955b773417cd9252'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'failed_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '54a37e117fff40c09808aac467bb7793'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'error'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '54a8b0d81a6140ff9ad84682998c7026'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'skipped_count'
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
                        table: 'sys_ui_form_section'
                        id: '54fb9274a51448bb886d14a938053555'
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: 'af38a4f95475482d82e5c6af3fb6dff7'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'General'
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
                        table: 'sys_ui_policy_action'
                        id: '5577506df39b43c784e8ee56009a3bff'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'duration_seconds'
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
                        table: 'sys_index'
                        id: '55886564b69a4fe38648e651a8f62ba0'
                        key: {
                            logical_table_name: 'x_33764_sbridge_data_execution'
                            col_name_string: 'legacy_key'
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
                        table: 'sys_documentation'
                        id: '55ce4a1f1abe44d8a5d0c6002b12c1b0'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'sent_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '561c401214384a5692b3bb921dfb9b95'
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '562f0b331a51493c8fc9a90185d64257'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'updated_count'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '5649ba761b174efe8ee0598682777559'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Record results'
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
                        table: 'sys_variable_value'
                        id: '56c5b0df9b834250ac3051795263f0c1'
                        key: {
                            document_key: 'e22d6d5beda546f6bc898060c240433c'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '57650166e632487fb060d792be3a7338'
                        key: {
                            sys_ui_section: {
                                id: '3c5d47700f7d4d899108a7349bc58a12'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
                                    caption: 'Transfer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'correlation_id'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '57a6014a2f2642af95982d720ba45497'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
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
                        table: 'sys_ui_action_role'
                        id: '57de7c66e34143698df10f39632e5a39'
                        key: {
                            sys_ui_action: 'c503610bfd134f34ba887bf278f1cee1'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '57eb55b691994924bc397a1b0df69c52'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'message_type'
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
                        table: 'sys_ui_element'
                        id: '5877a9a201cc4bf0a0341bdc83217a9a'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'source_table'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '58862e80dbdf4d52a1400f4efc63357e'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'transport_status'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5955326e62794d4caeee1d110c41d378'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'batch_size'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '596adf04be5a48c6903937127ebe1b43'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'transaction_id'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '597275aae4d44be8aa7b931f86b8c21e'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: 'f278da717e8240ada234446c8d847389'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Audit'
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
                        table: 'ua_table_licensing_config'
                        id: '59b4f8ab1b084ce1bb64e1e7d4826529'
                        key: {
                            name: 'x_33764_sbridge_dlq'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '59b8b8a91de54a79a0583251e202cdad'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'message_type'
                            position: '1'
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
                        table: 'sys_ui_form_section'
                        id: '5a0164b7a92040f58bbcf0c5637fec7f'
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
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
                        id: '5a1d423d4b734e77ac1be1a31c1c6a55'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'error'
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
                        table: 'sys_ui_policy_action'
                        id: '5a26239f31a94b9b9b6db9eddc4f2edd'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'transfer_completed_at'
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
                        table: 'sys_ui_policy_action'
                        id: '5a7d97a540e74e68bd78addf8d3245ec'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'filter_snapshot'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ad414bb14364ab88a6c51deee48f1e1'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_processing_completed_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5adbd7ec29834248bf27910340d00f5f'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'payload'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ae5102d59284c6dbc87e84bf6bc4ce7'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'remote_instance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b0a3ecfd4484eb18620f8f148efe1a3'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'comments_and_work_notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5b432dd6d798427a8cf5dfedfaf26909'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'preparing'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5b453ad267074b298d63929d12f18a6e'
                        key: {
                            sys_ui_section: {
                                id: '0308f4436bbc49358a74dfd16c6ff764'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Target'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_instance'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5b65e08d9f004f14a42ef754fa30d8ea'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'operation'
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
                        table: 'sys_documentation'
                        id: '5b97d078308c4635a69b1dd5b6bb88cc'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'NULL'
                            language: 'en'
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
                        table: 'sys_ui_form_section'
                        id: '5bb23c8292414f2bb5c6159b570209fb'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
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
                        id: '5bd1f844a2594181b36faffbaacd9f57'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '5be96c3f3fc845b8857a25a0ee85d866'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'concurrent_execution_policy'
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
                        table: 'sys_choice'
                        id: '5c7238f9eae143fbb5e5a0a0aa83818b'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'processed'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_documentation'
                        id: '5cac06264b23448aa5cb88d8fb42ff8e'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ce4b435ee424320b88909b682c1005a'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '5d3ba93eacc2420d805a98770cffed0d'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            value: 'thursday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '5d7216345d2f40df85c620894b22b0eb'
                        key: {
                            logical_table_name: 'x_33764_sbridge_data_execution'
                            col_name_string: 'run'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5d7b1756a50d448c81e163c4985fd1e9'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5db2e71db7a04776a7366683fcb2e576'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'comments'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5ddb4ab077e94ea28be3b34763451b07'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validation_status'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5de456adb846475d8d69ba490b10e72f'
                        key: {
                            sys_ui_section: {
                                id: '77c0ec55553240a29ca7139188491f2d'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Instance'
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
                        table: 'sys_ui_policy_action'
                        id: '5e1cd83cbacf49a6be0e10242340ff50'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'source_read_completed_at'
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
                        table: 'sys_ui_section'
                        id: '5edf9b4f473a422198044825a384682b'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Configuration Snapshot'
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
                        id: '5eed4947684a4154893b56f48ecfd858'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'previous_result'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5ef0b07c890345e3afb870a6164958dd'
                        key: {
                            sys_ui_section: {
                                id: 'c5a43b1bfce04f3ab2e2a1aba264c5ca'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Parties'
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
                            position: '3'
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
                        table: 'sys_choice'
                        id: '5f6c950860dc41e696a8db2cd79e94b7'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
                            value: 'monthly'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '5fd46a6a953141f0adb3a8d22edbfa77'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '471cbffcd9dd4335ab14a50b1a328809'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Errors'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_33764_sbridge_data_execution.x_33764_sbridge_processing_error.execution'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '60b74558d2a2474aa5d3ee1b22c666c8'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'sequence'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: '611095c777b64fc481b5197a00e3cb51'
                        key: {
                            id: '717049a287a04d26a8a02cb1bab0b8b8'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6129c56894a2447abfd2d23696926336'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'operation'
                            value: 'upsert'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '616d5e46545b46dc87fa5dc29cf314fe'
                        key: {
                            sys_ui_section: {
                                id: 'd8c047f6c9154b05a322ef517a037f17'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'next_execution'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '619b0e798f854b698e4148d109f30da1'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'awaiting_receipt'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_choice'
                        id: '6202644c637e44a68c340c938fd21ed5'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'operation'
                            value: 'insert'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '62c9f021227b435eabffba0a0bdaddcb'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '62ddf885e16d4f90b389b78c1bd84112'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'error'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '62e6249b6a44498cb715b0fcb46e550d'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'skipped_count'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '62e7f8aedb834200b3bb94ae2e7ec6a6'
                        key: {
                            list_id: {
                                id: 'b73a57f03d84433d9d38e81a6e4e261d'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                        table: 'sys_documentation'
                        id: '632b79b444ea4142b4dec4107f86a413'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'outbox'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '638a513482e44055932cf86f5388b7c0'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6399f12d326d4c35a8af0f6d0cec740d'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'trigger_reference'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '63c0ec75d9794f3488926c1d7932c5f1'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'name'
                            language: 'en'
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
                        deleted: true
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
                        table: 'sys_choice'
                        id: '64df599f75bf464ea5032ce9a83c71e8'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'dead'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        id: '656c8748304c482d82d32a5608fd301f'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'source_table'
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
                        table: 'sys_ui_element'
                        id: '661b597cf8f2492d86f6e3806864e200'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6661db0ae7fe4716a09d16e593f80455'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_run_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '66795f6ff0ef486d88f14330bbc31e84'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'transfer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '668f3a18e5b543a2af6084dd47c9051e'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '66973ce82c8c43d8a203f0ae887f641f'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'queued_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '66cb5294109a4b859406dcef52216398'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'timezone'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: '66ed96f0ad274cce842ed0b456949aac'
                        key: {
                            sys_ui_action: '21d04652d2f8446484b7c88596b7ad0a'
                            sys_user_role: {
                                id: '22264935be5b4f3dad0575f5f38f3c23'
                                key: {
                                    name: 'x_33764_sbridge.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '67128177a81d40818af9d7a6b2fb9daa'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'overlap_policy'
                            value: 'queue'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6762542ddc1640679586c36ce70d6a29'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'http_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6762cd459ceb45b0b86d1c6b7a7f10af'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'number'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '678e48f48a3748d28e4363f60035cdcf'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'field_list'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '67b6a30283fe41fba13520f26feaa4e0'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            value: 'wednesday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '67ce2de89c3b4d909907ac1425f9c7b9'
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '67dc37dfb9bd43e496bbbeb57ca827a9'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '681f6c57c4594ed7a21c582de74e4f8c'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '682fe833ad9c46acbb894ce42a38f495'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: '4cd96c278874491fbe195d09cb4a4311'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Executions'
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
                        table: 'sys_ui_policy'
                        id: '683ce3d7f44a4cf690ed1001d182ad5d'
                        key: {
                            table: 'x_33764_sbridge_transfer_audit'
                            short_description: 'Inactive. Acknowledgement fields stay visible in 0.4.0.'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '68895778059b44128620bc7ae975ae68'
                        key: {
                            sys_ui_section: {
                                id: 'af38a4f95475482d82e5c6af3fb6dff7'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'General'
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
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '689c499476ee493196ff2f22b81c1ca4'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'number'
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
                        table: 'sys_ui_element'
                        id: '68d2cb871dfc4ad9806ab54e5a0ed8c8'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
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
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6923d0bf56ce433b828c40b4a433fc45'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'execution'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '694f862bab554b87a2694333436dff7b'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'legacy_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '6965eb9e610b4014aa3b068acc8f6088'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'selected_count'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '69d91d878e8045d897e52bb13120078b'
                        key: {
                            sys_ui_section: {
                                id: 'c5a43b1bfce04f3ab2e2a1aba264c5ca'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Parties'
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
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6a30e92552d347afbae2c15685d72db7'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'http_status'
                            language: 'en'
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
                        table: 'sys_ui_element'
                        id: '6a72dff8125b4a4ab428e231c081f07b'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'record_count'
                            position: '7'
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
                        table: 'sys_ui_element'
                        id: '6af96145ddd4475383ce1dffa57b16de'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_processing_completed_at'
                            position: '4'
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
                        table: 'sys_ui_element'
                        id: '6b5fba4a3eb84bb2ad4cf8903655fac1'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '6b7c8531d1994171960b85d3f745863a'
                        key: {
                            sys_ui_form: {
                                id: 'b89bb8a4914946b6b24227800b1070db'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
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
                        id: '6b8beadcf0a342cc8afeaf4808a5c655'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'target_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6bbc7dfbc38a40f88fc648a0e60e8325'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validation_status'
                            value: 'valid'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_documentation'
                        id: '6c1c09dee3c14765b02f99c201e2958e'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'execution'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '6c3062bc70b34686bb1f8af5ea259fb9'
                        deleted: true
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                            element: 'source_instance'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c6131fe6a9443d7a5bda149b2f26ab3'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6cd18cd7228640b38b9fcafd7e06cc0b'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'message_type'
                            value: 'receive'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_choice_set'
                        id: '6d337f5af97e483296d3b019c8909f19'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6d433382cd84435caf9c7f87254acaf1'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6d51aec6d18a46abadce130f54651ace'
                        key: {
                            sys_ui_section: {
                                id: '9d4d4129ab064c0ca59d5f2d53203f98'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Live execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
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
                        table: 'sys_documentation'
                        id: '6d80c3c3457545fb9f80fc1a4446ffae'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'duration_seconds'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6d90bfd61a784ccfbb7eef19b6dcd7ce'
                        key: {
                            sys_security_acl: '9667c8e8b04a42a782c3e8aff792c263'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '6d960de4fca74b86a979ff7c5f6d2466'
                        key: {
                            logical_table_name: 'x_33764_sbridge_movement_config'
                            col_name_string: 'policy'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6e08ef23adfe4232aaab911dabba6443'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'configuration'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6e51ee4f5791477ea95a7bf454c43982'
                        key: {
                            sys_ui_section: {
                                id: 'e4aac3330b4d4d6bb9d7ca8c29dbeb56'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Source'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_instance'
                            position: '0'
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
                        table: 'sys_ui_policy_action'
                        id: '6ea38069734b4256985349faaa7037ff'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'target_received_at'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6f782d10bb004b6cb6ea5c250fee37da'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'frequency'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6f9d90a925984cd58f6ff6390d361b0e'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'apply_mode'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '6fa0b95e102647109dbdcf2ddde9c941'
                        key: {
                            sys_security_acl: '2d990988f6064b32a6d8defa48da55fe'
                            sys_user_role: {
                                id: 'f5f25fcb4c514e85a2e8485639714bae'
                                key: {
                                    name: 'x_33764_sbridge.reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6fa43cc511c845b6808621c04d07c929'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer_sent_at'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '6faa3383c2b243cc813dc3e77c95e78b'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_state'
                            position: '3'
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
                        table: 'sys_documentation'
                        id: '707d2160cf3946c7b37357da01adb71c'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'NULL'
                            language: 'en'
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
                        table: 'sys_choice'
                        id: '70dce34dc2a0455a9cdb8ed1e0ea6e3e'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'processing_target'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7167e42e924544a2bcb84239a6526f8c'
                        key: {
                            sys_ui_section: {
                                id: '9d4d4129ab064c0ca59d5f2d53203f98'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Live execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_execution'
                            position: '1'
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
                        table: 'sys_ui_policy_action'
                        id: '71dbf40619e741a78b0648a95dd2d437'
                        deleted: true
                        key: {
                            ui_policy: {
                                id: '33344230880144c982d530dfb1b5cca6'
                                key: {
                                    table: 'x_33764_sbridge_transfer_audit'
                                    short_description: 'Hide empty staged acknowledgement fields'
                                }
                            }
                            field: 'remote_audit_id'
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
                        table: 'sys_choice'
                        id: '728a5f7ce5b949f9946cf2c5b3e15639'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
                            value: 'weekly'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '72a7d654598749e5b9408ce754a13ea9'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '72f91ef536ca40ec9830c09e93f56334'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '7389ade502834711b49bc88e5022f71f'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '5649ba761b174efe8ee0598682777559'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Record results'
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
                        id: '74025e23d4a149629b18913bfbf89d33'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'source_table'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7403f1a00dd44c5dadb3e1a5a40705a8'
                        deleted: true
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
                        table: 'sys_index'
                        id: '7418e3f642cb41cb80680d7fe70c59be'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer_audit'
                            col_name_string: 'transfer'
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
                        id: '74c087c79097455691c58f2a02ff8ccc'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validation_status'
                            language: 'en'
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
                        table: 'sys_ui_list_element'
                        id: '74f7b6e1f76b4958b64b843bed4adf04'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'remote_audit_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75ca4e02a24849969859c5d7010203ca'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'source_instance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '75da50414dc44aa0aaebe3b250721fcc'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'transaction_id'
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
                        table: 'sys_ui_form_section'
                        id: '763d59e451424750b8b6672e24600aaf'
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
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
                        id: '767ecd89a47b45b3a5036f2d68b6a9e5'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '76a9839c4b7b41b4a6d23dd2ded5bdc6'
                        key: {
                            sys_ui_form: {
                                id: 'b04621cdf8624b81a69e02ba6936a11f'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                                id: 'f84d394b242040e7b22dec1051ef93af'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Links'
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
                        table: 'sys_ui_list_element'
                        id: '76eca80a60064ce2beb5271af845d6ff'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'execution_result'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '772369a0bc8c4ebb8b5f17f05c63a29e'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'dlq'
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
                        table: 'sys_ui_element'
                        id: '7758a5e9476b412aa4c3672a7e125125'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '776164c43d4b482bbd3457f1471bd021'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                            value: 'partially_completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '77c0ec55553240a29ca7139188491f2d'
                        key: {
                            name: 'x_33764_sbridge_peer'
                            caption: 'Instance'
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
                        id: '77c8508830f440d592dc6a27f267be04'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'direction'
                            value: 'outbound'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '77dafdb83a834e0d96f5ad5206b6bfd8'
                        key: {
                            list_id: {
                                id: '9f4bbe7600ff42e096ba392797c63d95'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
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
                            element: 'execution'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '77ea8a3182734de39a8bb5af99a098b4'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'description'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: '788439ba114f4b6ba84f9a23e4c15301'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'filter_snapshot'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '78a5fa474346477683c2888f12154067'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '78b48fa6a5924ab9a141c84692f603b3'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                        id: '78d3f96c38a64610891db1c700324fcd'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
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
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '78fa2b55ac014b8a85da62c3a98496ca'
                        key: {
                            sys_ui_section: {
                                id: 'af38a4f95475482d82e5c6af3fb6dff7'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'General'
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
                        table: 'sys_ui_action_role'
                        id: '7953eb477f7347f78b86a87dc5074feb'
                        key: {
                            sys_ui_action: '21b39921267c477ea3a83a7b87ecc602'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '795a97412cfc4f98a02088935aaee368'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'message_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '799c828c076c45e98087bbc19636ccf4'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'direction'
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
                        id: '79e040d301d345328ed826cadd9689a1'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'error'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7a13090306b8454fa23128eb1a10380c'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            value: 'flow'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '7a51d5d94118415f8a4ee39ebcfefef8'
                        key: {
                            name: 'x_33764_sbridge_transfer'
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
                        table: 'sys_index'
                        id: '7a7cfe9eb0a2435e8e38557aafc872c3'
                        key: {
                            logical_table_name: 'x_33764_sbridge_processing_error'
                            col_name_string: 'dlq'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '7a9356ae3e0b452495409eefdf9bcc49'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'started_at'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '7a9da15ee03e4efb9f60dfe62705aad9'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'message_type'
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
                        table: 'sys_ui_form_section'
                        id: '7aec9124c8ff4eedb5cf39b9b136eafa'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '471cbffcd9dd4335ab14a50b1a328809'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Errors'
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
                        id: '7af4451d3ae64d2db520b7feea72fd68'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'target_sys_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7b0666ccf37f42d68342354d0f3d3cce'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'duration_seconds'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7b143bfdb48f4a21940b08850bcd8631'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                            value: 'delete'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7b175d54635a4246808e576f687b1c17'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'config_snapshot'
                            language: 'en'
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
                        table: 'sys_ui_element'
                        id: '7b8ee2bb827d47b1b5d7d107cd0d047e'
                        key: {
                            sys_ui_section: {
                                id: '25b4029a00c44ee994812ef7580e6457'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Error'
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
                            position: '1'
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
                        table: 'sys_ui_list_element'
                        id: '7c9b866f850a446681505fbf5669e453'
                        key: {
                            list_id: {
                                id: 'b73a57f03d84433d9d38e81a6e4e261d'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                            element: 'transfer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7ca249cafdf142bd8553ca7a3959467b'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'result'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '7cea33574efc467db7e48c6c0a1c228e'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '08d71da8cd134a4fbbeaed05a3d9799b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Activity'
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
                        table: 'sys_ui_list'
                        id: '7d554a8903c6493a97c93711b4a2f1a4'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
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
                        id: '7d660a8457e942b096cc2dde8b47dc4c'
                        key: {
                            sys_ui_form: {
                                id: 'dbc2f55417e54544876936006e91d1fa'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                                id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Timing'
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
                        id: '7d73cdc558044930b489aedd3a5c91a3'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'attempts'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7d7a3c14785042d89e99fd5a5e68b446'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '08d71da8cd134a4fbbeaed05a3d9799b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'comments'
                            position: '1'
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
                        table: 'sys_documentation'
                        id: '7e7c70c6170546bdaf811ece8bbc9222'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'source_instance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7ed147a2e3c445bcba811405c79ecf72'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'result'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7ef6a6d388a54687aa95ec0190e39257'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                            value: 'dry_run'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '7f9c361b02cc45899712893d8cc60d95'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            caption: 'Schedule'
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
                        id: '7fe8935773174a2fafe639e58b301c0d'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                            value: 'recovery'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '80284204e1e44c5798f98a9e2c29f25b'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_processing_completed_at'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '802908993055490ab10f822b419737bc'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_received_at'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '803eadb3f84545f0a7a23f26a133bcdc'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
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
                        table: 'sys_documentation'
                        id: '814ff5965b534dc58a4a4b867c357703'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'name'
                            language: 'en'
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
                        table: 'sys_documentation'
                        id: '8177876afdc1495cb984f0f000ec9c12'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'comments_and_work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '819924d911d04fe9afe15f8d90b04d07'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'remote_instance'
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
                        table: 'sys_variable_value'
                        id: '81e7fa2d9fc04bd7b393dd8c14ebe1e5'
                        key: {
                            document_key: '828bd8e3134440018f6442652feee41c'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '81e83361c1184b1c931eeea87d7d6ae9'
                        key: {
                            sys_ui_section: {
                                id: 'f84d394b242040e7b22dec1051ef93af'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'dlq'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '82092220890e47039195ec8ee477cd35'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'result'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '82a59cb526594c80a28cf33d2b4c3682'
                        key: {
                            sys_ui_section: {
                                id: 'd8c047f6c9154b05a322ef517a037f17'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'previous_result'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '833a84f043104a72b7265f7ca832815e'
                        key: {
                            sys_ui_section: {
                                id: 'd8c047f6c9154b05a322ef517a037f17'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'overlap_policy'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '836ce0c405db470ba58788e10042fe87'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'run_time'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '83db9ebd2ec347ac83b34c3fe05389f9'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'run_time'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '843d4c14605a4425bd07d33d5cca8318'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'direction'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '84596318867e41ba83af1e2717ecbc0d'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'execution'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '8477bca745f849e496c5da28d403e727'
                        key: {
                            sys_ui_form: {
                                id: 'b89bb8a4914946b6b24227800b1070db'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                                id: 'd8c047f6c9154b05a322ef517a037f17'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                        id: '849187e21f7d4e658236dfc6dec4a606'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'apply_mode'
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
                        table: 'sys_choice_set'
                        id: '84f677c575bb4f5dbd1be064391adc9f'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
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
                        table: 'sys_index'
                        id: '8567ea1260df4d199359e04007597655'
                        key: {
                            logical_table_name: 'x_33764_sbridge_data_execution'
                            col_name_string: 'configuration'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8576b1a5a7d74da59bd5151b46cefa50'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'filter_snapshot'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '860f89c4a2524a3786e986675221d8ea'
                        key: {
                            ui_policy: {
                                id: '683ce3d7f44a4cf690ed1001d182ad5d'
                                key: {
                                    table: 'x_33764_sbridge_transfer_audit'
                                    short_description: 'Inactive. Acknowledgement fields stay visible in 0.4.0.'
                                }
                            }
                            field: 'acknowledged_at'
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
                        table: 'sys_ui_element'
                        id: '862edb70414f4bff82085614acaf9212'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '864fdf461ca546ce933b8b11ab26a4b5'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'retry_count'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '86e3ab3d834e4a539d45a91a13e2c6be'
                        key: {
                            logical_table_name: 'x_33764_sbridge_record_result'
                            col_name_string: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '8737ff6a81f245788023ed2f45413b48'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'target_instance'
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
                        id: '876e3630e2174edc8c4fc7c610d8cbb6'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '87a7a0a5c17748cd9a2c7bea0dac642b'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '87d075f15894499880392e2047d40565'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Execution'
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
                        id: '87ead180e1ac4f1e897835482a83e895'
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
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
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '88166629d15944b4a33ccc75acbb3c43'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            value: 'manual'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '8851c06e8a5c4fe8817733154ba28e74'
                        deleted: true
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '12e33aa8dba9408f9db5f7f6031e171d'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Transfers'
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
                        id: '8866da1db7ab48549e98a1cabdbc998e'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'capture_ready'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '88b4c165ff0a4815837a6b51a834ba95'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'transfer_sent_at'
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
                        table: 'sys_ui_list_element'
                        id: '89e6fc2493c54cf88a015466ff2f05da'
                        key: {
                            list_id: {
                                id: 'b73a57f03d84433d9d38e81a6e4e261d'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                        table: 'sys_dictionary'
                        id: '8a28c8bea8994640ba85bbb314638839'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'http_status'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8aa17d1825b44eaebf2ed6c9c823090b'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_instance'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8af52437fc014cf2a4dcbf80e90bc900'
                        key: {
                            sys_ui_section: {
                                id: '3c5d47700f7d4d899108a7349bc58a12'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
                                    caption: 'Transfer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8ba6174550f6448e8ad6a1095dcbf9eb'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'started_at'
                            position: '9'
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
                        table: 'sys_ui_element'
                        id: '8cb0f5fed7784838bce4e35aef3b228c'
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'next_execution_at'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8ce6575400444d61ac95f765db710974'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'http_status'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8d1092bc93b24027a3ed9fef78373a1a'
                        key: {
                            sys_ui_section: {
                                id: '0308f4436bbc49358a74dfd16c6ff764'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Target'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'match_strategy'
                            position: '4'
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
                        table: 'sys_choice'
                        id: '8d53c9f6bd9146c6a0d5bcb0e06ac8cb'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            value: 'scheduled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8d76712eb1514542a6c9a34bbba76c79'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
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
                        table: 'sys_choice'
                        id: '8d88e43840074552a41a37d2e5d7a7c9'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
                            value: 'daily'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '8db96f69637e4238bf6e448afe5a883c'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'acknowledged_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8dc8e3ca1d5c4ffebd673060636b2489'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'timezone'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e2022fcfd42473796fe38bace058bc9'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'reference_handling'
                            value: 'resolve'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8e22eece2aae41c48c5170ce3669647f'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'started_at'
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
                        table: 'sys_ui_form_section'
                        id: '8ec79f200f854365a3689c6c2671f5b0'
                        key: {
                            sys_ui_form: {
                                id: 'cdd3db833450434390ee1469444044de'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
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
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
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
                        id: '8f114f9347d747d390abe597f1c4d770'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '8f4f1238c69e42f0a30a5222b8d51305'
                        deleted: true
                        key: {
                            ui_policy: {
                                id: '33344230880144c982d530dfb1b5cca6'
                                key: {
                                    table: 'x_33764_sbridge_transfer_audit'
                                    short_description: 'Hide empty staged acknowledgement fields'
                                }
                            }
                            field: 'ack_stage'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8f7862345de945d8b945ae3b006db771'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'draft'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8f90dc4c98914a3abb80fb79ac32b32f'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'target_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8fce4cd8370c4d4ea08e2e1ea3d00d31'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'correlation_id'
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
                        table: 'sys_dictionary'
                        id: '8fea48017d474ce7adc993c6a1f981a1'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'remote_received_at'
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
                        table: 'sys_documentation'
                        id: '90165cb2f6574d10a95c87f0b7b45324'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'source_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '90881ee4ec3f44a6817cf2e031f36d17'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'filter_snapshot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: '90895fb20f114fc7861d514423ea786d'
                        key: {
                            sys_ui_form: {
                                id: '20d01f881c7a480893f9238015af953c'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                                id: '3c5d47700f7d4d899108a7349bc58a12'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
                                    caption: 'Transfer'
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
                        table: 'sys_ui_section'
                        id: '90b1265be6ed4d2cb509befd1ef81af8'
                        deleted: true
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
                        table: 'sys_choice'
                        id: '90de30ada9e04889a076b844c812502b'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'match_strategy'
                            value: 'sys_id'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_dictionary'
                        id: '9127565975c742edaa0c2b783dc11256'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'operation'
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
                        table: 'sys_security_acl_role'
                        id: '917d590178364d83b487113dd6d5dcd7'
                        key: {
                            sys_security_acl: '70470d95c30d4dfaafa7c5d59d3f3fbd'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9188611cbce14506b38eed534b1a6441'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'comments_and_work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91a89ffa0e4f40fa9d5fd5d9402032fb'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '91b5a283f1ff4869b3e980f70862fbbe'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'target_instance'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '922b8eccea4a474db47344115b2dab69'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Notes'
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
                        id: '931ac5dc05b848d49ea383815554be9c'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'apply_mode'
                            value: 'direct'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_ui_element'
                        id: '9347e02044a242debe42f0ee05076aaa'
                        key: {
                            sys_ui_section: {
                                id: '922b8eccea4a474db47344115b2dab69'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity.xml'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: '93494a1c4d2a4da4b3501ebc3e0e45d4'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'execution_completed_at'
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
                        id: '93a3c2925637447588f137491d134295'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'comments_and_work_notes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '93ab2af21f324a46b24484b7e34eb90d'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'overlap_policy'
                            value: 'do_not_start_if_running'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '93d6bf0a3210454ca630bf7b809d9bde'
                        deleted: true
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                            element: 'policy'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '93ea3d7f31a644e784f01ebecc6f9189'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'reading_source'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_dictionary'
                        id: '9438ee4be4bb4ac7b63d3991d1bf7892'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'active'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '948d816bb1b64855907be5119f5283aa'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'work_notes'
                            language: 'en'
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
                        id: '94ffb499c2ed48b28b08bfbce86ac2cf'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '95263466712f418eb98415cd62f1d06d'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'started_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '957352c1ef0b4001ae0d9a4c277b323f'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'filter'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '95ae794313374252b437947235fcf81a'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validated_at'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '95cd1c66c7f84360a348477a90680686'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'operation'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '95f3c9c80a7c40d5a477febbc6e946ec'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                            value: 'skip'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '9651f74eeaea4ddda03fdc68ac4faa55'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            caption: 'Activity'
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
                        id: '96948ba80f6547a1a740396857b2a039'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            value: 'validated'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '96ac9c3c6a9147dcb4748e9fbb7cf5e4'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'transfer'
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
                        table: 'sys_ui_policy_action'
                        id: '96d6df1a278b4083ab6cc5210d543e53'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'sent_count'
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
                        table: 'sys_ui_section'
                        id: '98d4adba49a64ca5b3eee8ca5514eecb'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Scope'
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
                        id: '9922ec7edba245a4aa2668d2b91e8b73'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'configuration'
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
                        table: 'sys_security_acl_role'
                        id: '9a3aa6bbb5754df9a289e59422e3dcd4'
                        key: {
                            sys_security_acl: '2d990988f6064b32a6d8defa48da55fe'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9a559ad43db24a62babd2398abf2ea5d'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'operation'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a561f62474f4c649a381c05695ed8a0'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'sequence'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9a5d9ff799134f509d1728edee956ee4'
                        key: {
                            sys_ui_section: {
                                id: 'af38a4f95475482d82e5c6af3fb6dff7'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'General'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a600d75118442c3b586e6d49b75ff3f'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'acknowledged_count'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9a71880ebd01413abdb65957d8d0426b'
                        key: {
                            name: 'x_33764_sbridge_transfer'
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
                        table: 'sys_ui_element'
                        id: '9a9686adbbb4451da8cfd02c2c613d16'
                        key: {
                            sys_ui_section: {
                                id: 'f84d394b242040e7b22dec1051ef93af'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution'
                            position: '0'
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
                        table: 'sys_dictionary'
                        id: '9af454d80f6243759fb8bb9941873b45'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'correlation_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9bb344927fc046348f1f2aa11706acd7'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'execution'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9bbd00725a41422ab5de21e6169b16ef'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'transfer'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9bde061f81f749e0ac5f6f1ed3fc0bca'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'triggered_by'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9bed20ee0be84665b282f4889a1b1fc2'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '4cd96c278874491fbe195d09cb4a4311'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Executions'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '12M.x_33764_sbridge_movement_config.x_33764_sbridge_data_execution.configuration'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9c6c9ee55e4b4f21a1e6c1ee0556a08f'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'transport_status'
                            value: 'success'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_ui_element'
                        id: '9c8a72d305dd4b9882ab1cab24d85033'
                        key: {
                            sys_ui_section: {
                                id: 'f84d394b242040e7b22dec1051ef93af'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9cd2c842005349c49c43e3aeb0d91ed4'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'finalising'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d3116a4ff6a45e09156a7888a1bd70d'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'schedule'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '9d4c60fc43ec42f5a1191398ba9fc713'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            value: 'sunday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '9d4d4129ab064c0ca59d5f2d53203f98'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'Live execution'
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
                        id: '9d509712359c48bba98644e126acc77f'
                        key: {
                            name: 'x_33764_sbridge_policy'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9e03fd237a7b45ca980bfb50bdb08cfa'
                        key: {
                            sys_ui_section: {
                                id: '922b8eccea4a474db47344115b2dab69'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Notes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'comments'
                            position: '1'
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
                        id: '9f1b0fcb010d4c7387b66efcda686f4b'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_execution'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9f1ca4599e744ced847c22d16b48d812'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9f2b3ebb713849e491e08457c2adebc3'
                        key: {
                            sys_ui_section: {
                                id: '9d4d4129ab064c0ca59d5f2d53203f98'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Live execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_run_at'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: '9f4bbe7600ff42e096ba392797c63d95'
                        key: {
                            name: 'x_33764_sbridge_record_result'
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
                        table: 'sys_choice_set'
                        id: '9f6a6977d2c144f2b83413e02d3539c8'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'match_strategy'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9fa4e95484be48a59423c8d73c562114'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: '9fc0c8b66c8a4bdbb2e663d76634b8b7'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'configuration'
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
                        table: 'sys_dictionary'
                        id: '9fdaaa71009e4ba8bddf2b720150f476'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'run_time'
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
                        id: 'a08d523155bb40b49b9648accfc927b4'
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
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
                        table: 'sys_ui_element'
                        id: 'a12a7f2d317d48d1831d9495900adf93'
                        key: {
                            sys_ui_section: {
                                id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Timing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'acknowledged_at'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'a15af36fa2bf4173987ed2c0a7b28c66'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer'
                            col_name_string: 'execution'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1690aad1a194c0896014ac6d94f1f42'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'work_notes'
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
                        table: 'sys_choice'
                        id: 'a1873de4bab64ca1a5d76bec41ce275e'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a1e8443cb7ac4b2bb553f7b6215a7fa7'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_completed_at'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a23f4429fab04976835cc0ea4baf5ac1'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'execution'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'a25c837926504870a03001e1dad7673a'
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '922b8eccea4a474db47344115b2dab69'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Notes'
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
                        id: 'a2778eb1d6cd4d068ea9fdb551e95a5c'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_read_completed_at'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a2ee475aa688429999132649558faeb5'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a2f0ae4b16ba4f3c8ed0ff52f261f198'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'selected_count'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a34eeb6f699845aab022043e5764d6db'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'skipped_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a358c735ae954dbe8e112994344d163a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'a39c161c38d7471dbf6001749a463750'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
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
                        id: 'a3c46dea5efc477d8edc3521fe02601c'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'execution'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'a3c841532dab4680b3c2e3d5ada44bef'
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: '0308f4436bbc49358a74dfd16c6ff764'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Target'
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
                        id: 'a440c29943d24418a49e37da18059b11'
                        key: {
                            logical_table_name: 'x_33764_sbridge_xref'
                            col_name_string: 'peer,source_table,source_sys_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a4822f93809741f584956ce229bb4161'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            value: 'system'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'a4931fe476d441148c73828f56ae976f'
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
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
                        id: 'a4d9c29723cc45d8a098cccfd96efdee'
                        key: {
                            sys_ui_section: {
                                id: '9651f74eeaea4ddda03fdc68ac4faa55'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'comments'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a5016e31b2014aefb2b45e86b5686ec1'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_result'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a52fda9620344d8f8d52477447474e0f'
                        key: {
                            sys_ui_section: {
                                id: '0308f4436bbc49358a74dfd16c6ff764'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Target'
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
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a55e2121b3f84b629f25b30e7c046d66'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'execution'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a5b13b438ebf4b9880fd4fd4204c10fe'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'remote_received_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'a5f634a3255446b4a96c3610e3e21b04'
                        key: {
                            list_id: {
                                id: '9f4bbe7600ff42e096ba392797c63d95'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
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
                        table: 'sys_index'
                        id: 'a5fa9940d72e4b108bae796a89559f22'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer'
                            col_name_string: 'stage'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'a6d335149b3a4256a68a7363387c7918'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer'
                            col_name_string: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a70fa2a281af43379222a2fbf8332a79'
                        key: {
                            sys_ui_section: {
                                id: '77c0ec55553240a29ca7139188491f2d'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Instance'
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
                        table: 'sys_ui_list_element'
                        id: 'a73264c2547343a1951d9c028599939b'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                        table: 'sys_dictionary'
                        id: 'a7337ea354e84599bfa16f904f8943ed'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'failed_count'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'a744b6540a214ec4954e763b61dcc457'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validation_status'
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
                        table: 'sys_choice'
                        id: 'a8eeb69b29894714ba2c838273fff143'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a98d052839334e7eb94e0b36a6165a98'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'a9a8494c57274f35967685d4ebebd3a7'
                        key: {
                            document_key: '717049a287a04d26a8a02cb1bab0b8b8'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'a9b5c6fe6d4d421a8d0b112be502489e'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'match_strategy'
                            value: 'mapping'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'aa2899f7b78945cf9e5a98ee39eee059'
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'aa504df00727401e8c0824e4bcbff16b'
                        key: {
                            document_key: '303112dfbd494896bf0355b22f8c183a'
                            variable: '42f2564b73031300440211d8faf6a777'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'aa8158830a8143928e2bf6580bc728f7'
                        key: {
                            sys_ui_action: '8c2dd4b675e84c0b817aa5be162facd9'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
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
                        id: 'abf4033de7c548cab6d71d8770404f5d'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'sent_at'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ac7629faf65e419fb959933ec51e1ce1'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'sent_count'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'aca9dcaa1ece49b6a958c0610704f9e5'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                            value: 'execute'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'acca1e217f9f4e9c88079f7967c5669f'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'preserve_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'aced0101058f4bfcbbd240a149259d7e'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'day_of_month'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ad7ae49d279445d0a17e073dd562e85a'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'reference_handling'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'addd78754a134829b3de6a564418e680'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'result'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ae4990fd10e44ad399410146d3a5dae6'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'ack_required'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ae5041da5b9e4711bc78067ca39ea9dd'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ae510c32837e4b7bad03f68ae2fc4a22'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'attempts'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ae86d33e333c48cfa238eebcb5e27283'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'aec63fb50f0e4234988cb00406aa8499'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'next_execution_at'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'aed21b4a30154787af33e18a8ae0ba73'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
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
                        table: 'sys_ui_section'
                        id: 'af38a4f95475482d82e5c6af3fb6dff7'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'General'
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
                        table: 'sys_ui_form'
                        id: 'b04621cdf8624b81a69e02ba6936a11f'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
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
                        id: 'b119f5ddc33042449a538fe10c1cb959'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'acknowledged_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b131dbfb8aa347c9bccd1afb0b10826a'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_month'
                            language: 'en'
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
                        table: 'sys_ui_element'
                        id: 'b166373a92134cc2ae1279458b2fe719'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'initiated_by'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b18fbbdfab2f448090ba1c01d9dc8ec9'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                            value: 'partially_completed'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_ui_list_element'
                        id: 'b1cc829f72c34f6db8183d1d0b2dd27a'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'stage'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b1da34133c33477dbffdb831041c43d5'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b1ecb4f93f5945aabc55fdfe9c78aaa3'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'acknowledged_at'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b24d594307444a1581cf757c14c5e1bc'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b26ad867296649fc93243c16c43d8669'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '4'
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
                        table: 'sys_ui_element'
                        id: 'b296d653cb9a499c944a6940e26da8c1'
                        key: {
                            sys_ui_section: {
                                id: 'd4bcf7a1a08146f5ad9785c9be493901'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'comments'
                            position: '1'
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
                        table: 'sys_choice'
                        id: 'b2fedab5a07b40cd99c9f0321cb491b8'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                            value: 'successful_with_warnings'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'b30d576a0a1d49fb8044159f751b820a'
                        key: {
                            list_id: {
                                id: '9f4bbe7600ff42e096ba392797c63d95'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
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
                        table: 'sys_dictionary'
                        id: 'b33f67de18234a80912900ced1d3fb51'
                        key: {
                            name: 'x_33764_sbridge_run'
                            element: 'peer'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b36115cdca1e42e99dafd063128e5ce6'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b392267162ed443a8eb857e2b983026a'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validation_status'
                            value: 'valid_with_warnings'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b4428c94bf644290ae537fad24fa1b50'
                        key: {
                            sys_ui_section: {
                                id: 'dda8548190e74264b5c6bb19921120a7'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'outbox'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b4578851fe9e4d6b94a77a6ac910eec7'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'source_sys_id'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'b47b32e79c414d97b73cc9a2a18dc241'
                        key: {
                            document_key: '303112dfbd494896bf0355b22f8c183a'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b545315f4d1645419f28ab6247c813ba'
                        deleted: true
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
                        table: 'sys_ui_list_element'
                        id: 'b5954d9dfb2547e699509b5809cec97a'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'started_at'
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
                        table: 'sys_choice'
                        id: 'b686dd97114246e9a50a304f01d23521'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'operation'
                            value: 'insert'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_ui_element'
                        id: 'b6c844f54e2646118c57f7abddc4e96f'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '08d71da8cd134a4fbbeaed05a3d9799b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'work_notes'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_list'
                        id: 'b73a57f03d84433d9d38e81a6e4e261d'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
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
                        table: 'sys_choice_set'
                        id: 'b7c2ad2d1db94cf6b87742d1a8dc4a46'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'b89bb8a4914946b6b24227800b1070db'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
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
                        id: 'b8f4167b6d0b4cf1933814590e6bfdf8'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'failed_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'b9190386e18e44fd98bcaac20eaa4d9e'
                        key: {
                            sys_ui_section: {
                                id: '3c5d47700f7d4d899108a7349bc58a12'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
                                    caption: 'Transfer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'stage'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b9bddcbee2df45a59106ea4345423c9b'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_type'
                            value: 'api'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_documentation'
                        id: 'ba3ecafe64a2471cad0e38b0e38d4957'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba54c3470fac4b269682b69a654b0720'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'target_instance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ba60b213eaa14e778c307b3d02316e17'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'babf5d9355c44157a0d1a7d4db854422'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'bae74fb3f2054ed1bba90fd976cb90db'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'execution_state'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'baf5621e702b4498a54b9b7e6029dbd1'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'selected_count'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb26091f1d87428f9a10b21e6e614767'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'propagate_deletes'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bb391e5e8a85446f9e5ef4cb10865c9d'
                        deleted: true
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
                        table: 'sys_ui_element'
                        id: 'bb93f716c1d2410ab96904ff8d064a59'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_mode'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bbc896b4926d4a7588649acd977fc9af'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bbf7c76477e940d3a9b253a378fab14a'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'resolved'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc44f58d133e4e41aab525ca466a9d86'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'bc53a99cbcfb429b940ce16836ca64df'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'received'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bc6a532e15d64367a264a078095ea01d'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'active'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'bd027bc211594d659bd7e3950ad064f7'
                        key: {
                            sys_ui_section: {
                                id: '25b4029a00c44ee994812ef7580e6457'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Error'
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
                        table: 'sys_dictionary'
                        id: 'bd86e85ea5184eafa0e53527163f84a3'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
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
                        table: 'sys_ui_list_element'
                        id: 'be0edb036a054a549e8f5413eaede68a'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                        id: 'be115c2ff0f54845a2889aca2ee7931f'
                        key: {
                            sys_ui_section: {
                                id: '25b4029a00c44ee994812ef7580e6457'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Error'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be163bbc8055448daa7819337ed9c171'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'source_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be1a589baebd4eb68c26cb8b8dcccaca'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'retry_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be2a623206c64bf78be7fda6cd5118cc'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'source_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'be2b3aae73c94dc1beff11977920898e'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'previous_execution'
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
                        table: 'sys_ui_list_element'
                        id: 'be6338a7f64d4790af260c733c146694'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'ack_stage'
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
                        table: 'sys_ui_element'
                        id: 'bed81785176a4418b2ea84d005e6272a'
                        key: {
                            sys_ui_section: {
                                id: 'af38a4f95475482d82e5c6af3fb6dff7'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'General'
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
                        table: 'sys_documentation'
                        id: 'beeb51fb18364286aeee100a1ad8fece'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_reference'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'befe6df39e654449aa399793aa5a984e'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                        id: 'beffdd06ef9949bf859e4284b2f17091'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            value: 'friday'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_documentation'
                        id: 'c000d1b66fa74d248bd34740c76f23ae'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'selected_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c0135b48bb074db98a88ea7b52794b55'
                        key: {
                            sys_ui_section: {
                                id: '25b4029a00c44ee994812ef7580e6457'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Error'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'c05b9fce4ad6425fa2094b1accc6cc23'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'inserted_count'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c0620f514ffe458a8cd8afa6b623db82'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_mode'
                            value: 'reconciliation'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'c0d2d0f4e70b4ff78aa6affd2ccb99a7'
                        key: {
                            sys_ui_form: {
                                id: 'dbc2f55417e54544876936006e91d1fa'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
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
                        id: 'c0f4bb95d0a24b1688d65c4d26da76b1'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'configuration'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c0fce38d2e75488fb2fbe9fac3956b72'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'NULL'
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
                        table: 'sys_ui_list_element'
                        id: 'c1b65796d1a148f38029d2d16d4b3b33'
                        key: {
                            list_id: {
                                id: '9f4bbe7600ff42e096ba392797c63d95'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
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
                            element: 'action'
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
                        table: 'sys_documentation'
                        id: 'c24ac9e17f9c4f9dab643a3135c83850'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'inserted_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c25dc5900c144d268d8e1bb8992eb7b0'
                        deleted: true
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                            element: 'target_instance'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c274dcb7eab34042925775cc27e30048'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'received_count'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c2c69058235a423fa3cb19c40603a7c1'
                        key: {
                            sys_ui_section: {
                                id: '9d4d4129ab064c0ca59d5f2d53203f98'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Live execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c3001c9e4648444a8e0d9e543416b551'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'c304c068f0ec4eb3af9085cc96c233e2'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_result'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c338bd1a7d664c3c9f80b4662e686f75'
                        key: {
                            sys_ui_section: {
                                id: '5edf9b4f473a422198044825a384682b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Configuration Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'config_snapshot'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c3852c3c5ef44b7c8842147fe137d075'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'legacy_key'
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
                        table: 'sys_documentation'
                        id: 'c40e6fbc87444a42ac721e832f6a90b9'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'c4125f29ac824bdd86e085767be795c6'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'target_table'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c45fb50ca860466bb1fd9aa7cb321472'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'execution'
                        }
                    },
                    {
                        table: 'sys_ui_page'
                        id: 'c4a4d145761f43f9ba143816114feadc'
                        key: {
                            endpoint: 'x_33764_sbridge_execute.do'
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
                        table: 'sys_ui_element'
                        id: 'c5598c456c0b4731b0edb80473a6da1a'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'outbox'
                            position: '7'
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
                        table: 'sys_choice_set'
                        id: 'c58683619add4e9f859c3b7418cf1f45'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'overlap_policy'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'c5a43b1bfce04f3ab2e2a1aba264c5ca'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            caption: 'Parties'
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
                        id: 'c5ba2ba594214188a05797228eed37b9'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c5ef4b1a00bb4b36b40d93dcd395993f'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'skipped_count'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c5f815f614a042f7960d376c736c61c2'
                        key: {
                            sys_ui_section: {
                                id: 'f84d394b242040e7b22dec1051ef93af'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Links'
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
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c6198c8721924894adde7f5389ed1eae'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'run'
                            language: 'en'
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
                        table: 'sys_ui_element'
                        id: 'c6bb9ab2130f4f688287bd495b8fbdc9'
                        key: {
                            sys_ui_section: {
                                id: '3c5d47700f7d4d899108a7349bc58a12'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
                                    caption: 'Transfer'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transport_status'
                            position: '3'
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
                        table: 'sys_choice'
                        id: 'c7636cc4adf14425a457ef3586d116a6'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'stage'
                            value: 'accepted'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c76dfcbb802543e48fc7b036740b180a'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'result'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'c7799a212c5f4166a1fc725f539b2865'
                        key: {
                            sys_ui_section: {
                                id: 'e4aac3330b4d4d6bb9d7ca8c29dbeb56'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Source'
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
                        id: 'c7c20951e5d543309c8242ad1e8d5cd8'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                            element: 'correlation_id'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'c7d874c2aef8461aac724541ac84995b'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'configuration'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c7e2d7e72a68446c89bd7165044450b9'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'target_instance'
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
                        table: 'sys_ui_form_section'
                        id: 'c8f18cf5ecbc4249b369bd3cea75a2da'
                        key: {
                            sys_ui_form: {
                                id: 'a39c161c38d7471dbf6001749a463750'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
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
                        table: 'sys_choice'
                        id: 'c9239c686c5a4bf8adc3bd25a2a6229a'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            value: 'received'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_ui_action_role'
                        id: 'c98e1c5c79154dbf97812527664a6cfb'
                        key: {
                            sys_ui_action: 'e1bb879c252744a4b49083467120da2e'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
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
                        table: 'sys_choice'
                        id: 'c9a72086c0504a9b8261c726c903a2f2'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'queued'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        id: 'c9fe6080b79d4711b6dbfb0932da7ef9'
                        key: {
                            sys_ui_section: {
                                id: '0308f4436bbc49358a74dfd16c6ff764'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Target'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'operation'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ca09072fea19408c939f5a861e756c46'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'concurrent_execution_policy'
                            value: 'allow'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_documentation'
                        id: 'cb18f99b4c884a88a0acee0164250038'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'source_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cb1d959525a94c1692f236d716406162'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'cb3fd3d1b1c140bcb082f43f4df27962'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'cb8b171042af4c8fad4b00005c006211'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                        table: 'sys_number'
                        id: 'cbb2674588e945518ee915e50bb7dade'
                        key: {
                            category: 'x_33764_sbridge_data_execution'
                            prefix: 'DEX'
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
                        table: 'sys_ui_list_element'
                        id: 'cc3f2302be0148a7856017d862dec319'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'trigger_type'
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
                        table: 'sys_ui_element'
                        id: 'cc9b36f0f66e4299a656b80a37e9fd68'
                        key: {
                            sys_ui_section: {
                                id: 'c5a43b1bfce04f3ab2e2a1aba264c5ca'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Parties'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'remote_instance'
                            position: '1'
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
                        table: 'sys_documentation'
                        id: 'cd05c8c2d438426a8164a070fa4dddd9'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'received_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cd115bd5801a4fa484e15a1375b31ac0'
                        key: {
                            sys_ui_section: {
                                id: '9d4d4129ab064c0ca59d5f2d53203f98'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Live execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cd419260d5d7405c9eab9e164f21258b'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'configuration'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cd60bdb138764f8f8750f64540b195b3'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'cd802b7095f94f989e14862efe675de8'
                        key: {
                            sys_ui_form: {
                                id: 'b04621cdf8624b81a69e02ba6936a11f'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                                id: '25b4029a00c44ee994812ef7580e6457'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
                                    caption: 'Error'
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
                        table: 'sys_ui_form'
                        id: 'cdd3db833450434390ee1469444044de'
                        key: {
                            name: 'x_33764_sbridge_record_result'
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
                        id: 'ce36f174f88742f6a40d68ef6c8279e4'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'source_read_completed_at'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ce92941cc6754d8caa5f63f79b0d0856'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'frequency'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'cea918834c344747a8a398836c02fc96'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'Transfer behaviour'
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
                        table: 'sys_dictionary'
                        id: 'cf0dd64534e74a1a82642035528d505a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'transfer_sent_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'cf37faa623074749b403db3e56130be3'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'match_strategy'
                            value: 'business_key'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_documentation'
                        id: 'cfd98d4f4a2048f28eff360a8c9603df'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'apply_mode'
                            language: 'en'
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
                        table: 'sys_dictionary'
                        id: 'd00f57018c084d7cbd8b71173d934f4a'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'concurrent_execution_policy'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd029b2b028ae45b687e98718ff2fe24d'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd0732843f1b24a71a4932310205afa5e'
                        key: {
                            list_id: {
                                id: '7d554a8903c6493a97c93711b4a2f1a4'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                        table: 'sys_ui_action_role'
                        id: 'd080bcab12644b1ba84b8793b0ff9c6d'
                        key: {
                            sys_ui_action: '6d0f4fcec53f4ccc8c77e19b2ae49536'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd081c1e69afd419ebd69797d0e1e2c08'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validation_status'
                            value: 'invalid'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd0923c6d02e54f30b8a29bbd804c277f'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer_sent_at'
                            position: '2'
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
                        table: 'sys_ui_policy_action'
                        id: 'd160763662e34e6798079f0878bc797b'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'source_table'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd173cd17296242bda05f73425b5abeea'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_table'
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
                        table: 'sys_ui_element'
                        id: 'd1bf83cc05724461bda83a8847dc9b89'
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'batch_size'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd1c2b5f954214e44a5103de4aa30f005'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'number'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd1f168fb81e5415ab25b10517b34852c'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'acknowledged_count'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'd255793749ae4c9bbac0ec2e05506658'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd2912ac3f8f24950a507edea89b9a060'
                        key: {
                            sys_ui_section: {
                                id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Timing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'remote_received_at'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd2d302bdb7b3471387956085f0758c3a'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'operation'
                            value: 'update'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_dictionary'
                        id: 'd40c5c2ff1f942159771c27816aea8a9'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'overlap_policy'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'd419c87b566a4ac7b01facc8ac2d686a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'awaiting_acknowledgement'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'd476ddc2464a4ce3b0e6cd0e0bfd1d08'
                        key: {
                            sys_ui_section: {
                                id: 'd8c047f6c9154b05a322ef517a037f17'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'platform_job'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'd4bcf7a1a08146f5ad9785c9be493901'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'Activity'
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
                        id: 'd4be400971cf4c63be31846e33551552'
                        deleted: true
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
                        table: 'sys_dictionary'
                        id: 'd50f060063b1496f8fa100388744d8b8'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'payload'
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
                        table: 'sys_ui_policy_action'
                        id: 'd57db9641a23423db3b595778d01a02f'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'source_instance'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'd5cdbad0c9f64650b8d8dad47388155f'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'Execution'
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
                        id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            caption: 'Timing'
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
                        table: 'sys_index'
                        id: 'd5ddcb9d8fad494b988f1f188fd777fc'
                        key: {
                            logical_table_name: 'x_33764_sbridge_outbox'
                            col_name_string: 'source_sys_id,peer'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'd6a19c361d224c8981bc59eb2b884dd2'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                        table: 'sys_documentation'
                        id: 'd6a9f956f2f142afb0fd597b22330527'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'preserve_sys_id'
                            language: 'en'
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
                        table: 'sys_index'
                        id: 'd7961b1215df4ebe8034f4d5bd0ce177'
                        key: {
                            logical_table_name: 'x_33764_sbridge_execution_schedule'
                            col_name_string: 'configuration'
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
                        table: 'sys_ui_section'
                        id: 'd8c047f6c9154b05a322ef517a037f17'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
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
                        table: 'sys_documentation'
                        id: 'd8c09c45652e4871827b3e96b686f0d1'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_completed_at'
                            language: 'en'
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
                        table: 'sys_ui_list_element'
                        id: 'd9ba6794758b49468ca8fc9bc8ad1b74'
                        key: {
                            list_id: {
                                id: 'b73a57f03d84433d9d38e81a6e4e261d'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                        table: 'sys_dictionary'
                        id: 'd9c016f41349488eb35f0b9985819ddf'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'configuration'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'da372cf712df4c13940efc32cefdbd06'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                            element: 'last_validation_status'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'da667552afc24b7392b663bc4b388233'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'failed_count'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'daaf018b50d145978f78b80d2a410b4f'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
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
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dafe22302bec49fab6dfd2ef64c5dc2e'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'policy'
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
                        table: 'sys_documentation'
                        id: 'db9cfc2de31d42988ee8bd4bf0719b35'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'comments'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: 'dbc2f55417e54544876936006e91d1fa'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
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
                        id: 'dbfb465c366f443abf8df1fa606eda4f'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'source_instance'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc2462eb1673434c9ae2a226bb9ba09f'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'source_read_completed_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc51a32e198741f99a06559d3e6f26e1'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'source_instance'
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
                        table: 'sys_ui_form_section'
                        id: 'dca14e30b2fe419598b3f228473fbb66'
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
                                id: '77c0ec55553240a29ca7139188491f2d'
                                key: {
                                    name: 'x_33764_sbridge_peer'
                                    caption: 'Instance'
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
                        table: 'sys_ui_form_section'
                        id: 'dcb08740488e494aa5911c1977b06e05'
                        key: {
                            sys_ui_form: {
                                id: '57a6014a2f2642af95982d720ba45497'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
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
                        id: 'dcf26f76beca49be8bd498d9920bf527'
                        key: {
                            id: '828bd8e3134440018f6442652feee41c'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'dda34d45b2014ffaaf8973c1bae0e683'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer_completed_at'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'dda8548190e74264b5c6bb19921120a7'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            caption: 'Links'
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
                        table: 'sys_ui_element'
                        id: 'dddedd0b79434bdca1b53205f4e5b058'
                        key: {
                            sys_ui_section: {
                                id: 'd5d9d6a1f22b4957b71c1240f7d5c518'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Timing'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'sent_at'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'debe85368f96497687f76deb72c44a8a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'source_table'
                            language: 'en'
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
                        table: 'sys_ui_element'
                        id: 'df32dac8df7946c4aee84ea5e73b1dfe'
                        key: {
                            sys_ui_section: {
                                id: 'dda8548190e74264b5c6bb19921120a7'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Links'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'df33f903cca5446e9b461e55cedb5350'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'acknowledged_at'
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
                        table: 'sys_choice_set'
                        id: 'dfcf7102e6d248238cb4f65ad099131b'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dfd58783b0fc4b188fce8894dcdbe0e3'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'configuration'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'e0c855ab6ffa4e56a41bd66b00acb26f'
                        key: {
                            ui_policy: {
                                id: '683ce3d7f44a4cf690ed1001d182ad5d'
                                key: {
                                    table: 'x_33764_sbridge_transfer_audit'
                                    short_description: 'Inactive. Acknowledgement fields stay visible in 0.4.0.'
                                }
                            }
                            field: 'remote_audit_id'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e0d8e4fee6424d7bb6ef589b3c69a696'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_result'
                            position: '3'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'e1078cb0a950463d878fc5ee54e302ce'
                        key: {
                            id: '303112dfbd494896bf0355b22f8c183a'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e1516d8f016d4f1199a3b17ad8369392'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'execution_completed_at'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'e1e9eabde70943b08eda1f4a2bf44b54'
                        key: {
                            sys_ui_form: {
                                id: 'dbc2f55417e54544876936006e91d1fa'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                                id: 'c5a43b1bfce04f3ab2e2a1aba264c5ca'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Parties'
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
                        id: 'e1f4630cdfab43f994b8f51e1cf4242c'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'direction'
                            value: 'bidirectional'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e2023d296ac242bc9e88a02ac4092e83'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'target_table'
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
                        table: 'sys_user_role'
                        id: 'e23d3a38a8184f1d91a18fb34399ed49'
                        key: {
                            name: 'x_33764_sbridge.diagnostics'
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
                        id: 'e2817588366b442088cd401ceeb825f0'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'timezone'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e299ac07548b43e9b26e2f85b1506a74'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_completed_at'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e299e42d513d4175b2757fd1aabd0955'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'error'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e29f9de369d64f89afd211b1ef026fc2'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                            element: 'last_result'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e2c0373046f24e4cbd17d231c34786ef'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            value: 'rejected'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e3798846ef264bfea066419d55321fbd'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'next_execution_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e3bc81c7a1c245b986a4fa7d0b295e9a'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'receipt'
                            language: 'en'
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
                        id: 'e46d044bb98a496eafef755e2de620cf'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'e4aac3330b4d4d6bb9d7ca8c29dbeb56'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            caption: 'Source'
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
                        id: 'e4cc0510568a4aa7836b2f29e80d57a4'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'concurrent_execution_policy'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e51d91ff35d745aab8fc283f3434faf1'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'frequency'
                            value: 'once'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'e53d139edba8413d9624a4116c93e7ef'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'acknowledged_at'
                        }
                    },
                    {
                        table: 'sys_ui_action_role'
                        id: 'e5800cce8a034b2ab52b5a64125c6e34'
                        key: {
                            sys_ui_action: 'fbf65396eb374ca5878c91391f3f56e7'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'e5c4bba4027e421d9e2331e3bcfe750e'
                        key: {
                            logical_table_name: 'x_33764_sbridge_processing_error'
                            col_name_string: 'execution'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e5d036b5841b415bbeaf73177cd4cf08'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'legacy_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'e61006dc76374da8a57a29cb7e2b82b4'
                        key: {
                            name: 'x_33764_sbridge_transfer'
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
                        id: 'e670a256b5464e05b5194e7754df4fbf'
                        key: {
                            sys_ui_section: {
                                id: '0303e439c56c4e3dbf00ee1abc4b86db'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Timeline'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'queued_at'
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
                        table: 'sys_documentation'
                        id: 'e6e9b78fbde044639ffb953f3e1c3c28'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'field_list'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e6ee1730bace4416bc8fd3ea93eefdfe'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'completed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e723a07186d1463ca37ce7484216f2c7'
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'policy'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e7242751a3f446be82e6e79610fef582'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'http_status'
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
                        table: 'sys_ui_action_role'
                        id: 'e77812fc1add493596cd1a4231312036'
                        key: {
                            sys_ui_action: '0515c1a5e0514c0a8d353009882676b6'
                            sys_user_role: {
                                id: '6b1d00c5ac1748e69826b3c315813714'
                                key: {
                                    name: 'x_33764_sbridge.operator'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'e781e775fb8e4a688ab230b4b72f620f'
                        key: {
                            list_id: {
                                id: '36a3b480e56f4d3d99ab9b259c624ed5'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
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
                        table: 'sys_documentation'
                        id: 'e788d86c99e2445999de189c50ef3898'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'direction'
                            language: 'en'
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
                        table: 'sys_index'
                        id: 'e80061add3424d64a476e4774219f668'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer_audit'
                            col_name_string: 'execution'
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
                        table: 'sys_choice'
                        id: 'e901f7c068714188a16b341d28df85bd'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                            value: 'failed'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e9ba9fe2e9c4457ba2591dcd6a4bc445'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'source_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'e9cd5609c19744c285c3ff68b7660eee'
                        key: {
                            sys_ui_section: {
                                id: '42c180ce3d874321b05f9ce69a74aa9d'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Evidence'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'ack_stage'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea08fe56a82746acbf7ce4979c39f028'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ea34b77a94c3463d8808e921f1ecb274'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'eae7ce3e5ddf4c4186cbd4b6aa43cf12'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_processing_completed_at'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eafb61492c16427a93a4e62bff18ff34'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'legacy_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'eb2d77b20cad42fabedd1f2de8349ffd'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'run'
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
                        table: 'sys_dictionary'
                        id: 'eb81305464c34e2d8f7fcad392109a9b'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'target_sys_id'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'eb9dc438a1674d6d8be5b1cfb8b74bd3'
                        key: {
                            list_id: {
                                id: 'b73a57f03d84433d9d38e81a6e4e261d'
                                key: {
                                    name: 'x_33764_sbridge_processing_error'
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
                        table: 'sys_ui_element'
                        id: 'ebcec9d165cc49ceba602f76219ff1e5'
                        key: {
                            sys_ui_section: {
                                id: '9d4d4129ab064c0ca59d5f2d53203f98'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Live execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_result'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ebfd458b42414fb3b579be652ec203d7'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'transport_status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ec0b4acedfde4ede8b9eaba017164dff'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'trigger_reference'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: 'ec19c8462fa34cb4840efbe64f0ccd43'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'transport_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ec1caeee937848e7aec42efca7361149'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_validated_at'
                            language: 'en'
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
                        table: 'sys_variable_value'
                        id: 'ed9a81e8b69d44b3a19d2bec86651c2f'
                        key: {
                            document_key: '717049a287a04d26a8a02cb1bab0b8b8'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'edde34115d764601a2ec926b35a2f38c'
                        key: {
                            logical_table_name: 'x_33764_sbridge_transfer_audit'
                            col_name_string: 'legacy_key'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eddeaa8c564b4054b1972564945d6137'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'work_notes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ee1cb75963e94f72bfd9f36939909588'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'source_instance'
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
                        table: 'sys_choice'
                        id: 'ee7eeb903ebc4019b2b47fa28e7357fa'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'operation'
                            value: 'delete'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ee7f81dfbb10463ea6f591bf28f14ee6'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                            value: 'insert'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ee94ffb2a1a1464dadcdefed20f3f1a4'
                        key: {
                            sys_ui_section: {
                                id: 'd4bcf7a1a08146f5ad9785c9be493901'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Activity'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'activity.xml'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_variable_value'
                        id: 'eeb72e7e4d85413cba601c7838995afc'
                        key: {
                            document_key: '828bd8e3134440018f6442652feee41c'
                            variable: '989d9e235324220002c6435723dc3484'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'eef48bdfa6824202adc2b1c2dd9da86f'
                        key: {
                            list_id: {
                                id: 'aed21b4a30154787af33e18a8ae0ba73'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
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
                            element: 'next_execution'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ef16d07991214baba28a00df78786793'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'apply_mode'
                            value: 'cmdb'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ef45f96376bc4710ae312b2bf02105c2'
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'efdf461359964620b72e694dec48f9d0'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '12'
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
                        table: 'sys_documentation'
                        id: 'efe9276c183c4c1ea9e02dd221e4e28f'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'propagate_deletes'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_policy_action'
                        id: 'efffc30473c74f2d88359e11d9372516'
                        key: {
                            ui_policy: {
                                id: '424eab7705ce4b618dc35142a61f6edd'
                                key: {
                                    table: 'x_33764_sbridge_data_execution'
                                    short_description: 'Lock a data execution after it leaves Draft'
                                }
                            }
                            field: 'trigger_reference'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f0179982e24d47598ca80a32e73d24aa'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'policy'
                            position: '5'
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
                        table: 'sys_ui_element'
                        id: 'f02881487e474894873012a1f4b79262'
                        key: {
                            sys_ui_section: {
                                id: 'd5cdbad0c9f64650b8d8dad47388155f'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'last_validated_at'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f0a9309e0cbf4ce1aab27618a081aadd'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            value: 'monday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f0b3b608284341c2a25e000e3c52c5e0'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'ack_required'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f0d4a514d5944dfaba17dd0bcbe271d7'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'execution_result'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f117e41716d842dea0157f0817148ca6'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'number'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f15af4f855c44f6480f10023467ee2b4'
                        key: {
                            sys_ui_section: {
                                id: 'fe55b099253141f78817b349dda75b5b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Counts'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'selected_count'
                            position: '1'
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
                        table: 'sys_ui_element'
                        id: 'f238a1bf0a0c4021b4c4920cf011f0ed'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
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
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f26b006d9f774cb982e239eceaffd635'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'direction'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'f278da717e8240ada234446c8d847389'
                        deleted: true
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Audit'
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
                        id: 'f2afaad853a3466cb32d40604e5e80a1'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f2b3d936c46746cb92a9e6dcd7c901e5'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f2c4268d3c3f47158d04336e210d2cb9'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'schedule'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f30bf1551a13404c9814f35a010c52f1'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'overlap_policy'
                            value: 'allow'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_ui_section'
                        id: 'f370e505d8da4a2bb9f783a1badbf058'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Header'
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
                        id: 'f3986cd5598347bdac1d75279056de27'
                        key: {
                            name: 'x_33764_sbridge_xref'
                            element: 'target_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f39bab998bc54d7bb9e8858b4deb2532'
                        key: {
                            sys_ui_section: {
                                id: '98d4adba49a64ca5b3eee8ca5514eecb'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Scope'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'target_instance'
                            position: '4'
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
                        table: 'sys_ui_element'
                        id: 'f3b1209fe9b54082b5f39db3d5d91707'
                        key: {
                            sys_ui_section: {
                                id: '4e37e8db8788458f922b4a1eed7ec488'
                                key: {
                                    name: 'x_33764_sbridge_record_result'
                                    caption: 'Result'
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
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f3e10484ef864e9d91e91908217bb33b'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            language: 'en'
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
                        id: 'f4955956a42c42b49f278a756a28543f'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'source_sys_id'
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
                        table: 'sys_choice'
                        id: 'f4b916df9c124672b11495cd344b2de8'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'day_of_week'
                            value: 'tuesday'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f4d376cb20534a899ed5e45c7e835554'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'last_result'
                            value: 'cancelled'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'f4e20b02284b43d4b26ed34574a58f7b'
                        key: {
                            role: {
                                id: 'e23d3a38a8184f1d91a18fb34399ed49'
                                key: {
                                    name: 'x_33764_sbridge.diagnostics'
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
                        table: 'sys_documentation'
                        id: 'f53d26ecdd3d42d1b2bb51fdc7f9a0e9'
                        key: {
                            name: 'x_33764_sbridge_receipt'
                            element: 'target_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f55fc22fba304823a70abb01cae1dad3'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '87d075f15894499880392e2047d40565'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Execution'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'initiated_by'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f5ee5eebb7744072aa9616c62a4b1d88'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'NULL'
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
                        table: 'sys_documentation'
                        id: 'f611b081bbfa495c8f6925a0262f3055'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            element: 'resolved'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'f61d0ca4c2a74498a3514dbe7afb45a9'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'action'
                            value: 'update'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'f64584a10f2f47649d6a913d03a6c5b9'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'operation'
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
                        table: 'sys_choice'
                        id: 'f6dac2485c78454d9ba9f3f923bd72df'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'operation'
                            value: 'update'
                            language: 'en'
                            dependent_value: 'NULL'
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
                        table: 'sys_db_object'
                        id: 'f7634d55682347f997b83eb1198a05c9'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8222d3508cb449286149d51ed75aaba'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'correlation_id'
                            language: 'en'
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
                        id: 'f83237f21b394bfc8daebbb4483be140'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'next_execution'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'f84d394b242040e7b22dec1051ef93af'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                            caption: 'Links'
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
                        id: 'f8630bee1e9a44da99efe6ae836a902a'
                        key: {
                            sys_ui_section: {
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'source_instance'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8c57bfeac8443598d2dda4b05973924'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'target_received_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f944f214ba104beaadb5b440c8f0790c'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'target_table'
                        }
                    },
                    {
                        table: 'sys_element_mapping'
                        id: 'f95b80a8b3304027a355f4f8de6c9eaf'
                        key: {
                            id: 'e22d6d5beda546f6bc898060c240433c'
                            table: 'var__m_atf_input_variable_41de4a935332120028bc29cac2dc349a'
                            field: 'script'
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
                        id: 'f9e6f50d65f94126b9c01caab899fc9f'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'transfer_completed_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9f701bbd0a842709fbc26bfd30bc20e'
                        key: {
                            name: 'x_33764_sbridge_execution_schedule'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f9fbac8a48c7406a9cf594ff72f3fe4d'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'source_table'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fa19db1168024b068e6531631f226253'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'next_execution_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fa2dec72cf424cf08ec57339d31a7ebe'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'error'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fadf9e1d9a424111afba13e00ff155b2'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'reference_handling'
                            value: 'preserve'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fae48a80cc9149e7a13ca5da2db53c15'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'legacy_key'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fb0bbb880bbb4dd8b0a81c5374666f0c'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'direction'
                            value: 'outbound'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fb0c03a701ac4c28abbf7ee95bf07663'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'reference_handling'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fb221b326afe4b5b8cd19140ede9b83c'
                        key: {
                            sys_ui_section: {
                                id: 'cea918834c344747a8a398836c02fc96'
                                key: {
                                    name: 'x_33764_sbridge_movement_config'
                                    caption: 'Transfer behaviour'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'reference_handling'
                            position: '1'
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
                        table: 'sys_ui_element'
                        id: 'fb50092688c44f79aba0a0ec10f47700'
                        key: {
                            sys_ui_section: {
                                id: 'f370e505d8da4a2bb9f783a1badbf058'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Header'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'trigger_type'
                            position: '5'
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
                        table: 'ua_table_licensing_config'
                        id: 'fbe1a85f2de845df890849e341dde6f4'
                        key: {
                            name: 'x_33764_sbridge_processing_error'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fc029185a6a246109529ce185977a3eb'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'transport_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fc20e7c1dc474e10bb958d2f1112c8fe'
                        deleted: true
                        key: {
                            sys_ui_section: {
                                id: '45792b67565d4fd2b236b5676ea7954b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Milestones'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'transfer_sent_at'
                            position: '6'
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
                        table: 'sys_choice'
                        id: 'fc3cc08da1f94754b09365ef31c18d1a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'execution_state'
                            value: 'sending'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'fc714677f6c94697a6a6a1283e4a98b5'
                        key: {
                            sys_ui_section: {
                                id: '7f9c361b02cc45899712893d8cc60d95'
                                key: {
                                    name: 'x_33764_sbridge_execution_schedule'
                                    caption: 'Schedule'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'day_of_week'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'fcafc3513e524d46808e958a2c19adc3'
                        key: {
                            sys_ui_form: {
                                id: '20d01f881c7a480893f9238015af953c'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                                id: '39b6045d06af4d62b3fb4abb688947c0'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                        table: 'sys_ui_form_section'
                        id: 'fcb99e924c42428d9da66de3a9e1a0d2'
                        key: {
                            sys_ui_form: {
                                id: 'dbc2f55417e54544876936006e91d1fa'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
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
                                id: 'dda8548190e74264b5c6bb19921120a7'
                                key: {
                                    name: 'x_33764_sbridge_transfer_audit'
                                    caption: 'Links'
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
                        id: 'fd40f7eb7c724d1fa2646218253bea75'
                        key: {
                            sys_ui_section: {
                                id: '5edf9b4f473a422198044825a384682b'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
                                    caption: 'Configuration Snapshot'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'run'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fd49fb9dd1144e8cb247250edc88e63d'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'ack_stage'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fd4e3893961b46d7aa3ec94c71c0ef92'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                            element: 'transfer'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fda4a009aaea463b94911380ef178e6e'
                        key: {
                            name: 'x_33764_sbridge_movement_config'
                            element: 'direction'
                            value: 'inbound'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_number'
                        id: 'fdbd67e49e2c43649d2ce09728039c02'
                        key: {
                            category: 'x_33764_sbridge_transfer'
                            prefix: 'TRN'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fdd159e50c1049c0a4831d4d13bd6a41'
                        key: {
                            name: 'x_33764_sbridge_transfer_audit'
                            element: 'result'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fde93fbe3e9249ac8ee384e9d82ff7e3'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'config_snapshot'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: 'fe55b099253141f78817b349dda75b5b'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            caption: 'Counts'
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
                        id: 'fea59b53ef6f4ca8a64638915230c68f'
                        key: {
                            name: 'x_33764_sbridge_transfer'
                            element: 'outbox'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'fee4e596aa8e4dfc84e7a61421be66f2'
                        key: {
                            list_id: {
                                id: '4f74daac87514b558134534ca25e81e8'
                                key: {
                                    name: 'x_33764_sbridge_data_execution'
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
                            element: 'execution_mode'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ff8baa39fcc141ceba0853792518bce8'
                        key: {
                            name: 'x_33764_sbridge_record_result'
                        }
                    },
                    {
                        table: 'sys_ui_list_element'
                        id: 'ff97b8badac147218a371fe67bbf0b6a'
                        key: {
                            list_id: {
                                id: '7a51d5d94118415f8a4ee39ebcfefef8'
                                key: {
                                    name: 'x_33764_sbridge_transfer'
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
                            element: 'number'
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
                    {
                        table: 'sys_documentation'
                        id: 'ffeefc07f239435992a1341b72d0003a'
                        key: {
                            name: 'x_33764_sbridge_data_execution'
                            element: 'legacy_key'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
