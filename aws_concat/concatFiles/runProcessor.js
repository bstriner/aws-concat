import { writer } from './writer'
import { downloader } from './downloader'
import { lister } from './lister'
import { parseS3 } from './parse-s3'

async function runProcessor({
    s3,
    path,
    inputS3,
    concurrency = 5,
    process,
    mapper
}) {
    console.log(`Writing files to ${path}`)
    let url = parseS3(inputS3)
    let fileList = lister({
        s3, params: {
            Prefix: url.Key,
            Bucket: url.Bucket
        }
    })
    let items = downloader({ s3, fileList })
    await process({
        path,
        items,
        concurrency,
        mapper
    })
    console.log(`Wrote files to ${path}`)
}

export { runProcessor }