import Bun from 'bun'

async function main() {
  const filePath = Bun.argv.at(-1)

  if (!filePath) {
    console.error('provide valid filepath')
  }

  const inputA = await getFileContent('./input.txt')
  // const partB = await getFileContent('./prod.txt')
  time('A', solutionA, 1, inputA)
  // time('B', solutionB, 1)
}

export function solutionA() {
}

export function solutionB() {
}

function time(part: string, cb: (arg: any) => void, count: number, args: any) {
  const start = performance.now()
  let result

  for (let i = 0; i < count; i++) {
    result = cb(args)
  }

  const end = performance.now()

  const diff = end - start

  console.log(`ANSWER ${part}: ${result}, time taken: ${diff.toFixed(2)}ms`)
}

async function getFileContent(filePath: string): Promise<string> {
  const bunFile = Bun.file(filePath)

  return bunFile.text()
}

main()
