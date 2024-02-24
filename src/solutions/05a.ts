export const part1 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  const seeds = [...lines[0].matchAll(/(\d+)/g)].map((m) => parseInt(m[1]))

  const readMaps = (lines: string[]) => {
    const maps: Array<Array<Array<number>>> = []
    let map: Array<Array<number>>

    lines.forEach((line) => {
      if (line === '') {
        maps.push(map)
      } else if (line.includes('map:')) {
        map = []
      } else {
        map.push([...line.matchAll(/(\d+)/g)].map((m) => parseInt(m[0])))
      }
    })

    return maps
  }

  const findLocation = (seed: number): number => {
    let value = seed

    maps.forEach((map) => {
      const definition = map
        .filter((d) => {
          return value >= d[1] && value < d[1] + d[2]
        })
        .flat()

      if (definition.length) {
        value = value - definition[1] + definition[0]
      }
    })

    return value
  }

  const maps = readMaps(lines.slice(2))
  const locations = seeds.map((seed) => findLocation(seed))
  return Math.min(...locations)
}
