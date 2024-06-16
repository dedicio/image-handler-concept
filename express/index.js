import express from 'express';
import multer from 'multer';
import * as handler from './app/handler.js';

const { ADDRESS = '0.0.0.0', PORT = '5000' } = process.env;

const server = express();
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

server.listen(+PORT, ADDRESS, () => {
    console.log(`Server listening at ${ADDRESS}:${PORT}`);
});
