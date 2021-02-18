
async function processor({ downloads, concurrency = 5, fn }) {
    if (concurrency < 1) {
        concurrency = 1
    }
    let queue = []
    for await (let dl of downloads) {
        queue.push(dl.data)
        if (queue.length >= concurrency) {
            let val = await queue.shift()
            await fn(val)
        }
    }
    for (let val of queue) {
        val = await val
        await fn(val)
    }
}
export { processor }