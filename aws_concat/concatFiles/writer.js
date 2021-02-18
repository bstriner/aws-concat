import { processor } from './processor'
import fs from 'fs'
function writer({
    path,
    items,
    mapper,
    concurrency = 5
}) {
    return new Promise(async (resolve, reject) => {
        try {
            const stream = fs.createWriteStream(path)
            stream.on('finish', resolve)
            stream.on('error', reject)
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
        } catch (e) {
            reject(e)
        }
    })
}

export { writer }