import Bun from 'bun'

async function main() {
  const filePath = Bun.argv.at(-1)

  if (!filePath) {
    console.error('provide valid filepath')
  }

  const fileContent = await getFileContent(filePath!)
  const grid = fileContent.split('\n').map(r => r.split('')).filter(i => Boolean(i.length))
  time('A', solutionA, 1, grid)
  time('B', solutionB, 1, grid)
}

const directions = [
  [0, -1], // left
  [0, 1], // right
  [1, 0], // down
  [-1, 0], // up
  [-1, -1], // top left
  [-1, 1], // top right
  [1, -1], // bottom left
  [1, 1], // bottom right
]

const diagonals: ([number, number])[] = [
  [-1, -1], // top left
  [-1, 1], // top right
  [1, -1], // bottom left
  [1, 1], // bottom right
]

export function solutionA(grid: string[][]) {
  let count = 0
  for (let c = 0; c < grid.length; c++) {
    for (let r = 0; r < grid[c].length; r++) {
      const curr = grid[c][r]
      if (curr === 'X') {
        for (let d = 0; d < directions.length; d++) {
          const [dc, dr] = directions[d]
          let nc = c
          let nr = r
          let xmas = 'X'

          for (let i = 0; i < 4; i++) {
            nc += dc
            nr += dr

            if (nc >= grid.length || nc < 0 || nr < 0 || nr >= grid[0].length) {
              break
            }

            xmas += grid[nc][nr]

            if (xmas === 'XMAS') {
              count++
              break
            }
          }
        }
      }
    }
  }

  return count
}

export function solutionB(grid: string[][]) {
  let count = 0
  const rowSize = grid[0].length
  const colSize = grid.length
  for (let c = 0; c < grid.length; c++) {
    for (let r = 0; r < grid[c].length; r++) {
      const curr = grid[c][r]
      if (curr === 'A') {
        const [topLeft, topRight, bottomLeft, bottomRight] = diagonals

        const topLeftAxis = getDiagIndex([c, r], topLeft)
        const bottomRightAxis = getDiagIndex([c, r], bottomRight)
        const topRightAxis = getDiagIndex([c, r], topRight)
        const bottomLeftAxis = getDiagIndex([c, r], bottomLeft)

        if (checkOutOfBounds(topLeftAxis, rowSize, colSize)
          || checkOutOfBounds(bottomRightAxis, rowSize, colSize)
          || checkOutOfBounds(topRightAxis, rowSize, colSize)
          || checkOutOfBounds(bottomLeftAxis, rowSize, colSize)) {
          continue
        }

        const axisA = `${grid[topLeftAxis[0]][topLeftAxis[1]]}A${grid[bottomRightAxis[0]][bottomRightAxis[1]]}`
        const axisB = `${grid[topRightAxis[0]][topRightAxis[1]]}A${grid[bottomLeftAxis[0]][bottomLeftAxis[1]]}`

        if ((axisA === 'SAM' || axisA === 'MAS') && (axisB === 'SAM' || axisB === 'MAS')) {
          count++
          continue
        }
      }
    }
  }

  return count
}

function checkOutOfBounds(indices: [number, number], rowMax: number, colMax: number) {
  const [c, r] = indices
  if (c < 0 || r < 0 || c >= colMax || r >= rowMax) {
    return true
  }

  return false
}

function getDiagIndex(curr: [number, number], diags: [number, number]): [number, number] {
  return [curr[0] + diags[0], curr[1] + diags[1]]
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
