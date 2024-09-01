import path from 'node:path'

const getMimeType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.mp3':
            return 'audio/mpeg';
        case '.wav':
            return 'audio/wav';
        case '.ogg':
            return 'audio/ogg';
        default:
            return 'application/octet-stream';
    }
};

export default getMimeType;