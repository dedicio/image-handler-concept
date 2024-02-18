import sharp from "sharp";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2MB
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
}

const server = Bun.serve({
    port: 4000,
    async fetch(req) {
        if (req.method === 'OPTIONS') {
            return new Response('Departed', {
                headers: CORS_HEADERS
            });
        }

        const url = new URL(req.url);

        if (url.pathname === '/action') {
            const formdata = await req.formData();
            const image = formdata.get('image');

            if (!image || !(image instanceof File)) {
                throw new Error('Must upload a valid image file.');
            }

            const {
                type: imageType,
                name: imageName,
                size: imageSize,
            } = image;

            if (!ACCEPTED_IMAGE_TYPES.includes(imageType)) {
                throw new Error("Invalid image type");
            }

            if (imageSize > MAX_IMAGE_SIZE) {
                throw new Error("Image size too large");
            }

            const fileName = imageName
                .split('.')
                .slice(0, -1)
                .join('.');
            const sanitazedFileName = fileName
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase();

            const imageBuffer = await image.arrayBuffer();
            const { data, info } = await sharp(imageBuffer)
                .webp()
                .toBuffer({ resolveWithObject: true });

            await Bun.write(`${sanitazedFileName}.webp`, data);

            const body = {
                fileName: `${sanitazedFileName}.webp`,
                width: info.width,
                height: info.height,
                size: info.size,
            };

            return new Response(
                JSON.stringify(body),
                {
                    status: 200,
                    statusText: "OK",
                    headers: {
                        ...CORS_HEADERS,
                        'Access-Control-Allow-Origin': '*',
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Listening on http://localhost:${server.port}`);
