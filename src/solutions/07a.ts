export const part1 = (data: string): number | null => {
  if (!data) return null

  type Player = {
    hand: string
    bid: number
  }
  const lines = data.split('\n')
  lines.pop()
  const hands: Array<Player> = []
  const enum HandType {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind
  }

  const getHandType = (hand: string) => {
    let groups: number[] = []
    const cards = hand.split('').sort()
    let prev = ''
    let counter = 0
    for (let i = 0; i < cards.length; i++) {
      if (i === 0) {
        counter++
        prev = cards[i]
        continue
      }

      if (cards[i] === prev) {
        counter++
      } else {
        groups.push(counter)
        counter = 1
        prev = cards[i]
      }
    }
    groups.push(counter)
    groups = groups.sort((a, b) => b - a)

    if (groups[0] === 5) {
      return HandType.FiveOfAKind
    }
    if (groups[0] === 4) {
      return HandType.FourOfAKind
    }
    if (groups[0] === 3 && groups[1] === 2) {
      return HandType.FullHouse
    }
    if (groups[0] === 3) {
      return HandType.ThreeOfAKind
    }
    if (groups[0] === 2 && groups[1] === 2) {
      return HandType.TwoPair
    }
    if (groups[0] === 2) {
      return HandType.OnePair
    }

    return HandType.HighCard
  }

  const cardToNumber = (card: string) => {
    switch (card) {
      case 'T':
        return 10
      case 'J':
        return 11
      case 'Q':
        return 12
      case 'K':
        return 13
      case 'A':
        return 14
      default:
        return parseInt(card)
    }
  }

  const compareHands = (PlayerA: Player, PlayerB: Player) => {
    if (getHandType(PlayerA.hand) < getHandType(PlayerB.hand)) {
      return -1
    }
    if (getHandType(PlayerA.hand) > getHandType(PlayerB.hand)) {
      return 1
    }

    // Same hand type. Compare cards from left to right
    const cardsA = PlayerA.hand.split('')
    const cardsB = PlayerB.hand.split('')
    const cardsANum = cardsA.map(cardToNumber)
    const cardsBNum = cardsB.map(cardToNumber)
    for (let i = 0; i < cardsANum.length; i++) {
      if (cardsANum[i] < cardsBNum[i]) {
        return -1
      }
      if (cardsANum[i] > cardsBNum[i]) {
        return 1
      }
    }

    return 0
  }

  lines.forEach((line) => {
    const [hand, bid] = line.split(' ')
    hands.push({ hand, bid: parseInt(bid) })
  })

  const sortedHands = hands.sort(compareHands)
  let i = 0
  const winnings = sortedHands.reduce((previous, current) => {
    i++
    return i * current.bid + previous
  }, 0)

  return winnings
}
