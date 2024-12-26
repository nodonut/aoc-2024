import Bun from 'bun'

async function main() {
  const filePath = Bun.argv.at(-1)

  if (!filePath) {
    console.error('provide valid filepath')
  }

  const fileContent = await getFileContent(filePath!)

  const answerA = solutionA(parseFileContent(fileContent))

  console.log('ANSWER A', answerA)

  const answerB = solutionB(parseFileContent(fileContent))

  console.log('ANSWER B', answerB)
}

function solutionA({
  rightLocationIds,
  leftLocationIds,
}: {
  rightLocationIds: number[]
  leftLocationIds: number[]
}) {
  let total = 0
  for (let i = 0; i < rightLocationIds.length; i++) {
    const diff = leftLocationIds[i] - rightLocationIds[i]

    if (Number.isNaN(diff)) {
      continue
    }

    total += Math.abs(diff)
  }

  return total
}

function solutionB({
  rightLocationIds,
  leftLocationIds,
}: {
  rightLocationIds: number[]
  leftLocationIds: number[]
}) {
  let total = 0

  for (let i = 0; i < leftLocationIds.length; i++) {
    const leftNumber = leftLocationIds[i]

    const similarityScore = getSimilarityScore(rightLocationIds, leftNumber)

    total += leftNumber * similarityScore
  }

  return total
}

async function getFileContent(filePath: string): Promise<string> {
  const bunFile = Bun.file(filePath)

  return bunFile.text()
}

function getSimilarityScore(arr: number[], value: number): number {
  let similarityScore = 0

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      similarityScore += 1
    }
  }

  return similarityScore
}

function parseFileContent(data: string): {
  rightLocationIds: number[]
  leftLocationIds: number[]
} {
  const leftLocationIds = []
  const rightLocationIds = []

  for (const line of data.split('\n')) {
    const [leftLid, rightLid] = line.split('   ')

    leftLocationIds.push(Number(leftLid))
    rightLocationIds.push(Number(rightLid))
  }

  return {
    leftLocationIds: leftLocationIds.toSorted((a, b) => b - a),
    rightLocationIds: rightLocationIds.toSorted((a, b) => b - a),
  }
}

main()
