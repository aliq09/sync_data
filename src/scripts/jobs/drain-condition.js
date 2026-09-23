// Only run when outbox has depth > 0 (stops noisy empty drain runs).
var gr = new GlideRecord('x_33764_sbridge_outbox')
gr.addQuery('state', 'IN', 'pending,failed')
gr.setLimit(1)
gr.query()
answer = gr.hasNext()
