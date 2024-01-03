export const part2 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const regExp = new RegExp('(?=(' + words.join('|') + '|[1-9]))', 'g')

  const calibrationValues: number[] = []
  lines.forEach((line) => {
    const matches = Array.from(line.matchAll(regExp), (match) => match[1])

    const numbers = matches.map((number) => {
      if (words.includes(number)) {
        return `${words.indexOf(number) + 1}`
      }

      return number
    })

    const calibrationValue = numbers.at(0)! + numbers.at(-1)
    calibrationValues.push(parseInt(calibrationValue))
  })

  return calibrationValues.reduce((a, b) => a + b, 0)
}
