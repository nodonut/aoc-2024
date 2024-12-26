import Bun from 'bun'

async function main() {
  const filePath = Bun.argv.at(-1)

  if (!filePath) {
    console.error('provide valid filepath')
  }

  const fileContent = await getFileContent(filePath!)
  const instructions = extractInstructions(fileContent)
  time('A', solutionA, 1, instructions)
  time('B', solutionB, 1, instructions)
}

export function solutionA(instructions: RegExpMatchArray | null) {
  if (!instructions) {
    return
  }
  let total = 0

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]
    const result = evaluateMul(instruction)
    if (!Number.isNaN(result)) {
      total += result
    }
  }

  return total
}

export function solutionB(instructions: RegExpMatchArray | null) {
  if (!instructions) {
    return
  }

  let total = 0
  let enabled = true

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i]
    if (instruction === 'do()') {
      enabled = true
    }

    if (instruction === 'don\'t()') {
      enabled = false
    }

    if (enabled) {
      const result = evaluateMul(instruction)
      if (!Number.isNaN(result)) {
        total += result
      }
    }
  }

  return total
}

export function evaluateMul(instruction: string) {
  const cleaned = instruction.replace(/[mul()]/gi, '')
  const nums = cleaned.split(',').filter(v => v.length > 0).map(Number)

  return nums[0] * nums[1]
}

export function extractInstructions(text: string) {
  return text.match(/(mul\(\d*,\d*\))|(do\(\)|don't\(\))/g)
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
