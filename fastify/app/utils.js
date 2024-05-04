export function extractFileName(imageName) {
    const fileName = imageName.split('.').slice(0, -1).join('.');
    return fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

export function getReducedSize(originalSize, finalSize) {
    const diff = finalSize / originalSize;
    return ((1 - diff) * 100).toFixed(2);
}

export function buildErrorResponse(message, code = 400) {
    return new Response(message, { status: code });
}