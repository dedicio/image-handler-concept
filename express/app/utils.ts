export function extractFileName(imageName: string): String {
    const fileName = imageName.split('.').slice(0, -1).join('.');
    return fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

export function getReducedSize(originalSize:number, finalSize: number): string {
    const diff = finalSize / originalSize;
    return ((1 - diff) * 100).toFixed(2);
}

export function buildErrorResponse(message: string, code?: number): Response {
    return new Response(message, { status: code || 400 });
}