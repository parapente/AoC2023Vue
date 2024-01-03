export const part2 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  const powers: number[] = []
  lines.forEach((line) => {
    const sets = line.split(':')[1].split(';')

    const red = [0]
    const green = [0]
    const blue = [0]
    sets.forEach((set) => {
      const groups = set.split(',')
      groups.forEach((group) => {
        const [value, color] = group.trim().split(' ')

        if (color === 'red') {
          red.push(parseInt(value))
        } else if (color === 'green') {
          green.push(parseInt(value))
        } else if (color === 'blue') {
          blue.push(parseInt(value))
        }
      })
    })

    const power = [Math.max(...red), Math.max(...green), Math.max(...blue)].reduce(
      (a, b) => a * b,
      1
    )
    powers.push(power)
  })

  return powers.reduce((a, b) => a + b, 0)
}
