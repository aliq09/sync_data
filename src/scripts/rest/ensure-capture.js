(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    new BridgeApi().ensureCapture(request, response)
})(request, response)
