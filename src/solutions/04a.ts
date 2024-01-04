export const part1 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  let points = 0
  lines.forEach((line) => {
    const [part1, part2] = line.split(':')
    const cardId = parseInt(/(\d+)/g.exec(part1)![1])

    const [winningPart, scratchPart] = part2.split(' | ')

    const winningNumbers = winningPart
      .split(' ')
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n))
    const scratchNumbers = scratchPart
      .split(' ')
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n))

    const winningScratchNumbers = scratchNumbers.filter((n) => winningNumbers.includes(n))
    if (winningScratchNumbers.length !== 0) {
      points += 2 ** (winningScratchNumbers.length - 1)
    }
  })

  return points
}
