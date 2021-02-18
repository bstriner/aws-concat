
function mapperJSON(data) {
    return JSON.stringify({
        Bucket: data.Bucket,
        Key: data.Key,
        Body: JSON.parse(data.Body.toString())
    }) + "\n"
}
function mapperRaw(data) {
    return data.Body
}

export {
    mapperJSON,
    mapperRaw
}