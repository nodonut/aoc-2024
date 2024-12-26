import Bun from 'bun'

async function main() {
  const filePath = Bun.argv.at(-1)

  if (!filePath) {
    console.error('provide valid filepath')
  }

  const fileContent = await getFileContent(filePath!)
  console.log('ANSWER A: ', solutionA(fileContent))
  console.log('ANSWER B: ', solutionB(fileContent))
}

function solutionA(fileContent: string) {
  const lines = fileContent.split('\n')

  let safeLevelCount = 0
  for (const line of lines) {
    const levels = line.split(' ').map(Number)
    if (levels.length > 1) {
      if (checkLevels(levels)) {
        safeLevelCount += 1
      }
    }
  }

  return safeLevelCount
}

function solutionB(fileContent: string) {
  const lines = fileContent.split('\n')

  let safeLevelCount = 0
  for (const line of lines) {
    const levels = line.split(' ').map(Number)
    for (let i = 0; i < levels.length; i++) {
      const splicedLevels = levels.toSpliced(i, 1)
      if (levels.length > 1) {
        if (checkLevels(splicedLevels)) {
          safeLevelCount += 1
          break
        }
      }
    }
  }

  return safeLevelCount
}

function checkLevels(levels: number[]): boolean {
  return checkIncRec(levels, 0, 1) || checkDecRec(levels, 0, 1)
}

function checkIncRec(levels: number[], curr: number, next: number) {
  const currNum = levels[curr]
  const nextNum = levels[next]

  if (!nextNum) {
    return true
  }

  if (nextNum <= currNum) {
    return false
  }

  if (!within(currNum, nextNum)) {
    return false
  }

  return checkIncRec(levels, curr + 1, next + 1)
}

function checkDecRec(levels: number[], curr: number, next: number) {
  const currNum = levels[curr]
  const nextNum = levels[next]

  if (!nextNum) {
    return true
  }

  if (nextNum >= currNum) {
    return false
  }

  if (!within(currNum, nextNum)) {
    return false
  }

  return checkDecRec(levels, curr + 1, next + 1)
}

function within(a: number, b: number) {
  if (a > b) {
    const diff = a - b
    return diff <= 3 && diff >= 1
  }
  const diff = b - a
  return diff <= 3 && diff >= 1
}

async function getFileContent(filePath: string): Promise<string> {
  const bunFile = Bun.file(filePath)

  return bunFile.text()
}

main()
