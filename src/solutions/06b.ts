export const part2 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  const times = [
    parseInt(
      [...lines[0].matchAll(/(\d+)/g)]
        .map((m) => parseInt(m[1]))
        .reduce((previous, current) => {
          return previous + current
        }, '')
    )
  ]
  const distances = [
    parseInt(
      [...lines[1].matchAll(/(\d+)/g)]
        .map((m) => parseInt(m[1]))
        .reduce((previous, current) => {
          return previous + current
        }, '')
    )
  ]
  const results: number[] = []

  const waysToBeat = (time: number, distance: number) => {
    // Use binary search to find the lowest value that goes beyond the distance threshold
    let press = Math.floor(time / 2)
    let min = 0
    let max = press
    let done = false

    while (!done) {
      const prev = press
      if (press * (time - press) > distance) {
        max = press
        press = Math.floor((max + min) / 2)
      } else {
        min = press
        press = Math.floor((max + min) / 2)
      }

      if (prev === press) {
        done = true
      }
    }

    const result = (Math.floor(time / 2) - max + (time % 2)) * 2 + (time % 2 ? 0 : 1)
    return result
  }

  times.forEach((time, index) => {
    results.push(waysToBeat(time, distances[index]))
  })

  return results.reduce((prev, current) => {
    return prev * current
  }, 1)
}
