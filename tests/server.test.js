const { app, server } = require('../server')
const request = require('supertest')

test("Test request with valid payload", async function () {
    const testPayload = {
        name: "test name",
        email: "test.email@example.com",
        interests: "testing"
    }

    const response = await request(app)
        .post('/update-profile')
        .send(testPayload)

    console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("info")
    expect(response.body.info).toBe("User profile data updated successfully!")

    server.close()
})


test("Test request with invalid payload 1", async function () {
    const testPayload = {}

    const response = await request(app)
        .post('/update-profile')
        .send(testPayload)

    console.log(response.body)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Invalid payload. Couldn't update user profile data!")

    server.close()
})

test("Test request with invalid payload 2", async function () {
    const testPayload = {
        name: "test name",
        email: "test.email",
        interests: "testing"
    }
    const response = await request(app)
        .post('/update-profile')
        .send(testPayload)

    console.log(response.body)

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Invalid payload. Couldn't update user profile data!")

    server.close()
})