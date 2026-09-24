(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    new BridgeApi().ack(request, response)
})(request, response)
