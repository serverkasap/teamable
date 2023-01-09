const { isInvalidEmail, isEmptyPayload } = require('../validator')

test('Valid Email', function () {
    const testPayload = {
        name: "Test name",
        email: "testemail@outlook.com",
        interests: "Testing"
    }

    const result = isInvalidEmail(testPayload)

    expect(result).toBe(false)
})

test('Invalid Email', function () {
    const testPayload = {
        name: "Test name",
        email: "testemail",
        interests: "Testing"
    }

    const result = isInvalidEmail(testPayload)

    expect(result).toBe(true)
})

test('Empty payload', function () {
    const testPayload = {}

    const result = isEmptyPayload(testPayload)

    expect(result).toBe(true)
})

test('Non-empty payload', function () {
    const testPayload = {
        name: "test name",
        email: "test.email@example.com",
        interests: "testing"
    }

    const result = isEmptyPayload(testPayload)

    expect(result).toBe(false)
})

test('Partial-empty payload', function () {
    const testPayload = {
        name: "test name",
    }

    const result = isEmptyPayload(testPayload)

    expect(result).toBe(false)
})