export const part2 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  const seedRanges = [...lines[0].matchAll(/(\d+)/g)]
    .map((m) => parseInt(m[1]))
    .flatMap((_, i, a) => (i % 2 ? [] : [a.slice(i, i + 2)]))

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

  /**
   *
   * @param seed The seed number we want to plant
   * @returns The location and the number of next seeds that fall to that location range
   */
  const findLocation = (seed: number): [number, number] => {
    // Set value and skip to default if we don't fall to any map
    let value = seed
    let skip = 1

    // Set maxSkip to something really big
    let maxSkip = Number.MAX_SAFE_INTEGER

    // Pass through each map to find the seed location
    maps.forEach((map) => {
      // Go through all ranges of the map and find where the value falls
      const definition = map
        .filter((d) => {
          const returnValue = value >= d[1] && value < d[1] + d[2]
          if (returnValue) {
            skip = d[1] + d[2] - value
            if (skip < maxSkip) {
              maxSkip = skip
            }
          }

          return returnValue
        })
        .flat()

      // If we found a match calculate the value
      if (definition.length) {
        value = value - definition[1] + definition[0]
      } else {
        // The value will stay the same as the previous value
        // Calculate distance from the next range
        const dist = map
          .filter((d) => {
            return d[1] - value
          })
          .flat()
          .filter((value) => value)
          .sort()

        if (dist.length) {
          skip = dist[0]
        } else {
          // We didn't find a next range
          skip = Number.POSITIVE_INFINITY
        }

        if (skip < maxSkip) {
          maxSkip = skip
        }
      }
    })

    if (maxSkip === Number.MAX_SAFE_INTEGER) {
      maxSkip = 1
    }

    return [value, maxSkip]
  }

  const maps = readMaps(lines.slice(2))

  let minLocation = Number.MAX_SAFE_INTEGER
  seedRanges.forEach((range) => {
    console.log(`range: ${range[0]} - ${range[0] + range[1] - 1}`)

    for (let i = 0; i < range[1]; i++) {
      const [seedLocation, skip] = findLocation(range[0] + i)

      if (seedLocation < minLocation) {
        console.log(`min location: ${seedLocation}, ${range[0] + i}`)
        minLocation = seedLocation
      }

      // Skip all next seeds that fall to the same location range as their
      // location will always be greater than the current location
      i = i + skip - 1
    }
  })

  return minLocation
}
