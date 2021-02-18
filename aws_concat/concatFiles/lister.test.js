import { S3 } from 'aws-sdk'
import { lister } from './lister'
const s3 = new S3()
describe('lister', () => {
    it('lists', async () => {
        console.log("listing")
        for await (const item of lister({
            s3,
            params: {
                Bucket: 'sagemaker-us-east-1-683880991063',
                Prefix: 'testdata/testoutput/None'
            }
        })) {
            console.log(`s3://${item.Bucket}/${item.Key}`)
        }
        console.log("complete")
    })
})

// aws --profile default s3 ls s3://sagemaker-us-east-1-683880991063/testdata/testoutput/None