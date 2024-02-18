export function extractFileName(image: File): String {
    const fileName = image.name.split('.').slice(0, -1).join('.');
    return fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

export function getReducedSize(originalSize:number, finalSize: number): string {
    const diff = finalSize / originalSize;
    return ((1 - diff) * 100).toFixed(2);
}