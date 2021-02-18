import { S3 } from 'aws-sdk'
import { lister } from './lister'
import { downloader } from './downloader'
const s3 = new S3()
describe('downloader', () => {
    it('downloads', async () => {
        console.log("downloading")
        let fileList = lister({
            s3,
            params: {
                Bucket: 'sagemaker-us-east-1-683880991063',
                Prefix: 'testdata/testoutput/None'
            }
        })
        let downloads = downloader({ s3, fileList })
        for await (let dl of downloads) {
            dl = await dl.data
            console.log(dl.Body)
        }
        console.log("downloaded")
    })
})

