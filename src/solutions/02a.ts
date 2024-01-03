export const part1 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  const gameIDs: number[] = []
  lines.forEach((line) => {
    const id = /^Game (\d+)/.exec(line)![1]
    const sets = line.split(':')[1].split(';')

    let ok = true
    sets.forEach((set) => {
      let red = 0
      let green = 0
      let blue = 0

      const groups = set.split(',')
      groups.forEach((group) => {
        const [value, color] = group.trim().split(' ')

        if (color === 'red') {
          red = parseInt(value)
        } else if (color === 'green') {
          green = parseInt(value)
        } else if (color === 'blue') {
          blue = parseInt(value)
        }
      })

      if (red > 12 || green > 13 || blue > 14) {
        ok = false
      }
    })

    if (ok) {
      gameIDs.push(parseInt(id))
    }
  })

  return gameIDs.reduce((a, b) => a + b, 0)
}
