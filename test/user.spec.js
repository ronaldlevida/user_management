
const index = require('../index');
const request = require('supertest');


describe("user_management", () => {
    test("should return user list", async () => {
        const response = await request(index).get("/api/user");

        expect(response.statusCode).toBe(200);
    });
    test("should add user ", async () => {
        const data = {
            userName: "john2",
            firstName: "John2",
            lastName: "Doe",
            email: "one_doe@mail1.com2"
        }
        const response = await request(index).post("/api/user/add").send(data);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    data
                )
            ])
        );

        expect(response.statusCode).toBe(200);
    });
    test("should update user ", async () => {
        const data = {
            userName: "update",
            firstName: "John2",
            lastName: "Doe",
            email: "update_doe@mail1.com2"
        }
        const response = await request(index).put("/api/user/update/2").send(data);

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(
                    { userName: "update", email: "update_doe@mail1.com2" }
                )
            ])
        );

        expect(response.statusCode).toBe(200);
    });
    test("should delete user ", async () => {
        const response = await request(index).delete("/api/user/delete/2");
        expect(response.body).not.toContain({ id: 2 });
        expect(response.statusCode).toBe(200);

    });
    test("should the throw email exist error ", async () => {
        const data = {
            userName: "john2",
            firstName: "John2",
            lastName: "Doe",
            email: "john_doe@mail.com"
        }
        const response = await request(index).post("/api/user/add").send(data);
        expect(response.error).toBeDefined()
        expect(response.error.status).toBe(400)
        expect(response.error.text).toContain("email already exist!")
       
    });
    test("should the throw userName  missing ", async () => {
        const data = {
            firstName: "John2",
            lastName: "Doe",
            email: "john_doe@mail.com"
        }
        const response = await request(index).post("/api/user/add").send(data);
        expect(response.error).toBeDefined()
        expect(response.error.status).toBe(400)
        expect(response.error.text).toContain("missing userName!")
    });

    test("should the throw email missing ", async () => {
        const data = {
            userName: "john2",
            firstName: "John2",
            lastName: "Doe",
        }
        const response = await request(index).post("/api/user/add").send(data);
        expect(response.error).toBeDefined()
        expect(response.error.status).toBe(400)
        expect(response.error.text).toContain("missing email!")
       
    });
    test("should the throw userName exist error ", async () => {
        const data = {
            userName: "john",
            firstName: "John2",
            lastName: "Doe",
            email: "john_doe@mail.com2"
        }
        const response = await request(index).post("/api/user/add").send(data);
        expect(response.error).toBeDefined()
        expect(response.error.status).toBe(400)
        expect(response.error.text).toContain("userName already exist!")
       
    });
    test("should the throw email invalid error ", async () => {
        const data = {
            userName: "john2",
            firstName: "John2",
            lastName: "Doe",
            email: "john_doe@mail"
        }
        const response = await request(index).post("/api/user/add").send(data);
        expect(response.error).toBeDefined()
        expect(response.error.status).toBe(400)
        expect(response.error.text).toContain("email is invalid!")
       
    });
});
