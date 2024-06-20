import fastify from 'fastify';
import multer from 'fastify-multer';
import * as handler from './app/handler.js';

const { ADDRESS = '0.0.0.0', PORT = '3000' } = process.env;

const server = fastify();
const storage = multer();

server.register(multer.contentParser);

server.route({
    method: 'POST',
    url: '/upload',
    preHandler: storage.single('image'),
    handler: handler.upload,
});

// server.route({
//     method: 'POST',
//     url: '/move',
//     handler: handler.move,
// });

server.listen({ host: ADDRESS, port: +PORT }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    console.log(`Server listening at ${address}`);
});
