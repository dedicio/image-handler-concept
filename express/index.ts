import express from 'express';
import multer from 'multer';
import * as handler from './app/handler.ts';
import type { Express } from 'express';

const { ADDRESS = '0.0.0.0', PORT = '5000' } = process.env;

const server: Express = express();
const storage = multer();

server.post(
    '/upload',
    storage.single('image'),
    async (req, res) => {
        const result = await handler.upload(req);
        const message = result.body ? JSON.parse(await result.text()) : '';
        res
            .status(result.status)
            .json(message);
    }
);

// server.post(
//     '/move',
//     handler.move,
// );

server.listen(+PORT, () => {
    console.log(`Server listening at ${ADDRESS}:${PORT}`);
});
