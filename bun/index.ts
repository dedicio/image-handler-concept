
import { CORS_HEADERS } from './app/constants.ts';
import * as handler from './app/handler.ts';

const server = Bun.serve({
    port: 4000,
    async fetch(req) {
        if (req.method === 'OPTIONS') {
            return new Response('Departed', {
                headers: CORS_HEADERS
            });
        }

        const url = new URL(req.url);

        if (url.pathname === '/upload') {
            return handler.upload(req);
        }

        // if (url.pathname === '/move') {
        //     return handler.move(req);
        // }

        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Listening on http://localhost:${server.port}`);