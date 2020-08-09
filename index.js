#!/usr/bin/env node

const blockReward = 2.0
const uncleReward = 1.66
const numRounds = 1000000
const miningPercentage = 0.04
const oddsOfWinning = 0.1
const prize = 1.5

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

  console.log("???????????????????")
  console.log(`Block reward: ${blockReward} Ether`)
  console.log(`Uncle reward: ${uncleReward} Ether`)
  console.log(`Prize: ${prize} Ether`)
  console.log(`Miner hash power: ${parseInt(miningPercentage * 100)}%`)
  console.log(`PoolTogether ticket odds: ${parseInt(oddsOfWinning * 100)}%`)
  console.log("===================")
  console.log(`Average prize rewards per block: ${purePrizeTotal / numRounds}`)
  console.log(`Average mining rewards per block: ${pureMining / numRounds}`)
  console.log(`Average gamed prize rewards per block: ${result.prizes / numRounds}`)
  console.log(`Average gamed mining rewards per block: ${result.mining / numRounds}`)
  console.log(">>>>>>>>>>>>>>>>>>>")
  let purePrizePlusMining = (purePrizeTotal + pureMining) / numRounds
  console.log(`Income for pure prize  +  pure mining: ${purePrizePlusMining}`)
  let gamedPrizePlusMining = (result.prizes + result.mining) / numRounds
  console.log(`Income for gamed prize + gamed mining: ${gamedPrizePlusMining}`)
  console.log(`Income boost gamed / prize: ${(((gamedPrizePlusMining / purePrizePlusMining) - 1) * 100).toFixed(2)}%`)
}

main()