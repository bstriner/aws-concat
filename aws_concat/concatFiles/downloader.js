
async function download({ s3, params }) {
    let data = await s3.getObject(params).promise()
    return Object.assign({}, params, data)
}

async function* downloader({ s3, fileList }) {
    for await (let file of fileList) {
        yield {
            data: download({
                s3: s3,
                params: {
                    Bucket: file.Bucket,
                    Key: file.Key
                }
            })
        }
    }
}

export { downloader }