import { processor } from './processor'
import { PassThrough } from 'stream'
import { S3 } from 'aws-sdk'
import { parseS3 } from './parse-s3'

function uploader({
    //s3,
    path,
    items,
    mapper,
    concurrency = 5
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = parseS3(path)
            const stream = new PassThrough()
            stream.on('error', reject)
            var upload = new S3.ManagedUpload({
                params: Object.assign({}, url, { Body: stream })
            });
            const fn = async (item) => {
                if (mapper) {
                    item = mapper(item)
                }
                stream.write(item)
            }
            await processor({
                downloads: items,
                fn: fn,
                concurrency: concurrency
            })
            stream.end()
            await upload.promise()
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

export { uploader }