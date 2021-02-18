
function parseS3(url) {
    let uri = new URL(url)
    if (!uri.protocol.startsWith('s3')) {
        throw `Expected [s3] protocol got [${uri.protocol}]: ${url}`
    }
    let key = uri.pathname
    if (key.startsWith("/")) {
        key = key.slice(1)
    }
    return {
        Bucket: uri.hostname,
        Key: key
    }
}

export { parseS3 }