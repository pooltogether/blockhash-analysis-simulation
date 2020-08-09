#!/usr/bin/env node

module.exports = function simulate({
  blockReward,
  uncleReward,
  numRounds,
  miningPercentage, 
  oddsOfWinning,
  prize
}) {

  function collectPrize() {
    if (Math.random() < oddsOfWinning) {
      return prize
    }
    return 0
  }

  function round({ prizes, mining }) {
    let result = {
      prizes,
      mining
    }

    if (Math.random() <= miningPercentage) {
      // if we mined the block
      let prizeMoney = collectPrize()
      if (prizeMoney == 0) {
        result = round(result) // run again
        result.mining += uncleReward
      } else {
        result.mining += blockReward
        result.prizes += prizeMoney
      }
    } else {
      // Someone else mined this block
      result.prizes += collectPrize()
    }

    return result
  }

  function mine() {
    if (Math.random() <= miningPercentage) {
      return blockReward
    } else {
      return 0
    }
  }

  function main() {
    let result = {
      prizes: 0.0,
      mining: 0.0
    }
    let pureMining = 0.0
    let purePrizeTotal = 0.0

    for (let i = 0; i < numRounds; i++) {
      purePrizeTotal += collectPrize()
      result = round(result)
      pureMining += mine()
    }

    return {
      purePrizeTotal,
      pureMining,
      gamedPrizes: result.prizes,
      gamedMining: result.mining
    }
  }

  return main()
}