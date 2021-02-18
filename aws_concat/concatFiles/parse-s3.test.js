const { parseS3 } = require('./parse-s3')

test('parse-s3', () => {
    let url = 's3://my-bucket/my/key.wav'
    let uri = parseS3(url)
    expect(uri).toEqual({
        Key: 'my/key.wav',
        Bucket: 'my-bucket'
    })
})
