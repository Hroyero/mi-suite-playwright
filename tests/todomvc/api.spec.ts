import { test, expect } from '@playwright/test'

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Test - JSONPlaceholder', () =>{
    // GET
    test('GET — obtener lista de usuarios', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);
        expect(body.length).toBeGreaterThan(0);

        //Check first user structure
        const firstUser = body[0];
        expect(firstUser).toHaveProperty('id');
        expect(firstUser).toHaveProperty('name');
        expect(firstUser).toHaveProperty('username');
        expect(firstUser).toHaveProperty('email');
        expect(firstUser).toHaveProperty('address');

    });

    test('GET — get specific user ', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users/1`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.id).toBe(1);
        expect(body.name).toBe('Hollmans R');
        expect(body.email).toBeDefined();
    });

    test('GET — user that dosent exist returns 404 ', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users/999`);

        expect(response.status()).toBe(404);
    });

    //-----POST ------

    test('POST — create new post ', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/posts`, {
            data: {
              title: 'My first api test',
              body: 'Learning with Playwright',
              userId: 1
            }
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.title).toBe('My first api test');
        expect(body.body).toBe('Learning with Playwright');
        expect(body.id).toBeDefined();
    });


        //-----PUT ------
        test('PUT — update full post', async ({ request }) => {
            const response = await request.put(`${BASE_URL}/posts/1`, {
              data: {
                id: 1,
                title: 'Update title',
                body: 'Update content',
                userId: 1
              }
            });
        
            expect(response.status()).toBe(200);
        
            const body = await response.json();
            expect(body.title).toBe('Update title');
            expect(body.userId).toBeDefined();
          });


          // ── PATCH ───────────────────────────────────────────

    test('PATCH — actualizar solo el título', async ({ request }) => {
        const response = await request.patch(`${BASE_URL}/posts/1`, {
        data: {
            title: 'Solo cambié el título'
        }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.title).toBe('Solo cambié el título');
    });

      // ── DELETE ──────────────────────────────────────────

    test('DELETE — delete post', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/posts/1`);
        expect(response.status()).toBe(200);
    });

     // ── GET posts de un usuario específico ──────────────

    test('GET — posts del usuario 1', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/posts?userId=1`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);

        // Todos los posts deben ser del usuario 1
        body.forEach((post: any) => {
        expect(post.userId).toBe(1);
        });
    });

});