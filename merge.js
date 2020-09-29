const fs = require("fs")
const ProgressBar = require("./progressBar")

const files = fs.readdirSync("./files")
const len = files.length
const pb = new ProgressBar("合并进度", len)

let currentfile
let stream

let dhh = fs.createWriteStream("./done.mp3")

function main() {
  if (!files.length) {
    dhh.end("Done")
    return
  }

  currentfile = "./files/" + files.shift()

  stream = fs.createReadStream(currentfile)

  stream.pipe(dhh, { end: false })

  stream.on("end", function () {
    pb.render({ completed: len - files.length, total: len })
    main()
  })
}

main()