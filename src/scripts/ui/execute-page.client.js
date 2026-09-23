function sbridgeChoose(intent) {
    var field = document.getElementById('sbridge_intent')
    if (field) field.value = intent
    if (intent === 'execute') {
        return confirm('Execute this data movement? Target rows may be inserted or updated.')
    }
    return confirm('Run a dry execution? Target business tables will not be changed.')
}
