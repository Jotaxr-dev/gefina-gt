import { 
    describe, 
    it, 
    expect } from "vitest";
import supertest from "supertest";

import app from "./app.ts";

const request = supertest(app);

describe(
    "rotas de faturas",
    () => {
        it(
            "devolve a descrição de faturas",
            async () => {
                const response = await request.get("/api/invoices");

                expect(response.status).toBe(200);
                expect(Array.isArray(response.body)).toBe(true);
            }
        );
    }
);