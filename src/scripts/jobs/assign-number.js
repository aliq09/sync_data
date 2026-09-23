/**
 * Inactive. Do not assign Data Execution or Transfer numbers here.
 * Table autoNumber (prefix DEX or TRN, 6 digits) fills an empty number on insert.
 * Writing prefix + GlideDateTime.getNumericValue() produced DEX1790… / TRN1790… and
 * blocked that counter. Leave the field untouched.
 */
;(function executeRule(current) {
    return
})(current, previous)
