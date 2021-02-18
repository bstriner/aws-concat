import { S3 } from 'aws-sdk'
import { uploader } from './uploader'
import { runProcessor } from './runProcessor'
import { mapperRaw, mapperJSON } from './mapper'

const s3 = new S3()

async function handler(event) {
    console.log("concatFiles handler ", event)
    let {
        inputS3,
        outputS3,
        concurrency,
        mode
    } = event
    concurrency = concurrency || 5
    let mapper
    if (mode === 'json') {
        mapper = mapperJSON
    } else if (mode === 'raw') {
        mapper = mapperRaw
    } else {
        throw new Error(`Unknown mapper mode: ${mode}`)
    }
    console.log(`Writing files to ${outputS3}`)
    await runProcessor({
        s3,
        path: outputS3,
        inputS3: inputS3,
        concurrency: concurrency,
        process: uploader,
        mapper: mapperJSON
    })
}

export { handler }