export const part1 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  // Read the part numbers and symbols
  const partNumbers: Array<{ value: string; row: number; column: number }> = []
  const symbols: Array<{ value: string; row: number; column: number }> = []
  lines.forEach((line, lineIndex) => {
    const numberMatches = [...line.matchAll(/\d+/g)]
    partNumbers.push(
      ...numberMatches.map((n) => {
        if (typeof n.index !== 'undefined') {
          return { value: n[0], row: lineIndex, column: n.index }
        } else {
          throw new Error(`Invalid index for number ${n[0]}!`)
        }
      })
    )

    const symbolMatches = [...line.matchAll(/[^0-9.]/g)]
    symbols.push(
      ...symbolMatches.map((n) => {
        if (typeof n.index !== 'undefined') {
          return { value: n[0], row: lineIndex, column: n.index }
        } else {
          throw new Error(`Invalid index for symbol ${n[0]}!`)
        }
      })
    )
  })

  // See if they are really part numbers
  const realPartNumbers = partNumbers.filter((part) => {
    const minx = part.column !== 0 ? part.column - 1 : 0
    const miny = part.row !== 0 ? part.row - 1 : 0
    const maxx = part.column + part.value.length
    const maxy = part.row !== lines.length - 1 ? part.row + 1 : lines.length - 1

    const adjacentSymbols = symbols.filter((symbol) => {
      return (
        minx <= symbol.column && symbol.column <= maxx && miny <= symbol.row && symbol.row <= maxy
      )
    })

    return adjacentSymbols.length !== 0
  })

  return realPartNumbers.reduce((a, b) => a + parseInt(b.value), 0)
}
