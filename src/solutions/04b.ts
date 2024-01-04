export const part2 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  const cards: Record<number, number> = {}
  lines.forEach((line) => {
    const [part1, part2] = line.split(':')
    const cardId = parseInt(/(\d+)/g.exec(part1)![1])
    cards[cardId] = cards[cardId] ? cards[cardId] + 1 : 1

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
    for (let i = 0; i < winningScratchNumbers.length; i++) {
      cards[cardId + i + 1] = cards[cardId + i + 1]
        ? cards[cardId + i + 1] + 1 * cards[cardId]
        : 1 * cards[cardId]
    }
  })

  return Object.values(cards).reduce((a, b) => a + b, 0)
}
