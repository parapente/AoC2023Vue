export const part1 = (data: string): number | null => {
  if (!data) return null

  const lines = data.split('\n')
  lines.pop()

  const calibrationValues: number[] = []
  lines.forEach((line) => {
    const numbers = line.split('').filter((char) => {
      return /[1-9]/.test(char)
    })

    const calibrationValue = numbers.at(0)! + numbers.at(-1)
    calibrationValues.push(parseInt(calibrationValue))
  })

  return calibrationValues.reduce((a, b) => a + b, 0)
}
