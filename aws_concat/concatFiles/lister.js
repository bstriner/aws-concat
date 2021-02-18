async function* lister({ s3, params }) {
    params = Object.assign({}, params)
    let done = false
    while (!done) {
        let response = await s3.listObjectsV2(params).promise()
        for (const item of response.Contents) {
            yield Object.assign({}, params, item)
        }
        if (response.IsTruncated) {
            params.ContinuationToken = NextContinuationToken
        } else {
            done = true
        }
    }
}

export { lister }