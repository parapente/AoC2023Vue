export const part2 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  // Read the part numbers and gears
  const partNumbers: Array<{ value: string; row: number; column: number }> = []
  const gears: Array<{ value: string; row: number; column: number }> = []
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

    const symbolMatches = [...line.matchAll(/[*]/g)]
    gears.push(
      ...symbolMatches.map((n) => {
        if (typeof n.index !== 'undefined') {
          return { value: n[0], row: lineIndex, column: n.index }
        } else {
          throw new Error(`Invalid index for gear!`)
        }
      })
    )
  })

  const gearRatios: Array<number> = []
  gears.forEach((gear) => {
    // See if there are part numbers next to the gear
    const adjacentParts = partNumbers.filter((part) => {
      const minx = part.column !== 0 ? part.column - 1 : 0
      const miny = part.row !== 0 ? part.row - 1 : 0
      const maxx = part.column + part.value.length
      const maxy = part.row !== lines.length - 1 ? part.row + 1 : lines.length - 1

      return minx <= gear.column && gear.column <= maxx && miny <= gear.row && gear.row <= maxy
    })

    if (adjacentParts.length === 2) {
      gearRatios.push(adjacentParts.reduce((a, b) => a * parseInt(b.value), 1))
    }
  })

  return gearRatios.reduce((a, b) => a + b, 0)
}
