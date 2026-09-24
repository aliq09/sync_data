var gr = new GlideRecord('x_33764_sbridge_data_execution')
gr.addQuery('legacy_key', 'STARTSWITH', 'ctrl:')
gr.addQuery(
    'execution_state',
    'IN',
    'queued,validating,preparing,reading_source,sending,awaiting_receipt,awaiting_acknowledgement,received,processing_target'
)
gr.setLimit(1)
gr.query()
answer = gr.hasNext()
