import { runProcessor } from './runProcessor'
import { S3 } from 'aws-sdk'
import { writer } from './writer'
import { uploader } from './uploader'
import { mapperRaw, mapperJSON } from './mapper'
const s3 = new S3()
describe('runProcessor', () => {
    it('writesFilesJSON', async () => {
        await runProcessor({
            s3,
            path: 'test-output-1.jsonl',
            inputS3: 's3://sagemaker-us-east-1-683880991063/testdata/testoutput/None',
            concurrency: 5,
            process: writer,
            mapper: mapperJSON
        })
    })
    it('writesFilesRaw', async () => {
        await runProcessor({
            s3,
            path: 'test-output-2.jsonl',
            inputS3: 's3://sagemaker-us-east-1-683880991063/testdata/testoutput/None',
            concurrency: 5,
            process: writer,
            mapper: mapperRaw
        })
    })
    it('uploadsFilesJSON', async () => {
        await runProcessor({
            s3,
            path: 's3://sagemaker-us-east-1-683880991063/testdata/testoutput/test-output-3.jsonl',
            inputS3: 's3://sagemaker-us-east-1-683880991063/testdata/testoutput/None',
            concurrency: 5,
            process: uploader,
            mapper: mapperJSON
        })
    }, 10000)
})

// aws --profile default s3 cp s3://sagemaker-us-east-1-683880991063/testdata/testoutput/test-output-3.jsonl .