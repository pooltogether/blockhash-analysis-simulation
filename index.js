#!/usr/bin/env node

const simulate = require('./simulate')

const blockReward = 2.0
const uncleReward = 1.66
const numRounds = 1000000
const miningPercentage = 0.04
const oddsOfWinning = 0.1
const prize = 100

function main() {

  let {
    purePrizeTotal,
    pureMining,
    gamedPrizes,
    gamedMining
  } = simulate({
    blockReward,
    uncleReward,
    numRounds,
    miningPercentage,
    oddsOfWinning,
    prize
  })

  console.log("???????????????????")
  console.log(`Block reward: ${blockReward} Ether`)
  console.log(`Uncle reward: ${uncleReward} Ether`)
  console.log(`Miner hash power: ${parseInt(miningPercentage * 100)}%`)
  console.log(`PoolTogether ticket odds: ${parseInt(oddsOfWinning * 100)}%`)
  console.log(`Prize: ${prize} Ether`)
  console.log(`Expected value: ${prize * oddsOfWinning}`)
  console.log("===================")
  console.log(`Average prize rewards per block: ${purePrizeTotal / numRounds}`)
  console.log(`Average mining rewards per block: ${pureMining / numRounds}`)
  console.log(`Average gamed prize rewards per block: ${gamedPrizes / numRounds}`)
  console.log(`Average gamed mining rewards per block: ${gamedMining / numRounds}`)
  console.log("===================")
  let purePrizePlusMining = (purePrizeTotal + pureMining) / numRounds
  console.log(`Income for pure prize  +  pure mining: ${purePrizePlusMining}`)
  let gamedPrizePlusMining = (gamedPrizes + gamedMining) / numRounds
  console.log(`Income for gamed prize + gamed mining: ${gamedPrizePlusMining}`)
  console.log(`Income boost gamed / prize: ${(((gamedPrizePlusMining / purePrizePlusMining) - 1) * 100).toFixed(2)}%`)
}

main()