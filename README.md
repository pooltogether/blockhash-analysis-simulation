# PoolTogether Gaming Analysis

This project analyzes blockhash manipulation with respect to PoolTogether.

Suppose a miner has x% of the hash capacity and is seeking a prize of y.  They have z% of the tickets.

Did they mine the block?
- YES x%: Did they win?
  - YES: z%: BLOCK_REWARD + y ether.
  - NO: (1-z)%: Mine block as uncle and recurse; UNCLE_REWARD + ev
- NO: (100 - x)%: Did they win?
  - YES z%: y ether	
  - NO: (1 - z)%: 0 ether

Essentially we have four scenarios:

| Scenario | Odds | Reward |
| -------- | ---- | ------ |
| Win the block, win the prize | x * z | BLOCK_REWARD + y |
| Win the block, lose the prize | x * (1 - z) | UNCLE_REWARD & try again |
| Lose the block, win the prize | (1 - x) * z | y |
| Lose the block, lost the prize | (1 - x) * (1 - z) | 0 |

Let’s assume the hashpower is 4% and the user has 50% of the tickets.  BLOCK_REWARD is 2 Ether and UNCLE_REWARD is 1.66 Ether. The prize is y.

| Scenario | Odds | Reward |
| -------- | ---- | ------ |
| Win the block, win the prize | 2% | 2 + y |
| Win the block, lose the prize | 2% | 1.66 & try again |
| Lose the block, win the prize | 48% | y |
| Lose the block, lost the prize | 48% | 0 |

# Simulation

This repository contains a JavaScript Monte Carlo simulation of the algorithm.

## Results

???????????????????
Block reward: 2 Ether
Uncle reward: 1.66 Ether
Prize: 1.5 Ether
Miner hash power: 4%
Miner ticket odds: 50%
===================
Average prize rewards per block: 0.750102
Average mining rewards per block: 0.080464
Average gamed prize rewards per block: 0.7654035
Average gamed mining rewards per block: 0.07488612000003936
>>>>>>>>>>>>>>>>>>>
Income for pure prize  +  pure mining: 0.830566
Income for gamed prize + gamed mining: 0.8402896200000394
Income boost gamed / prize: 1.17%

# References

This analysis is largely based on Nick Johnson’s [analysis](https://www.reddit.com/r/ethereum/comments/73sddu/smartbillions_just_put_45113717_1500_eth_to_their/dntau2d?utm_source=share&utm_medium=web2x) and monte carlo [simulation](https://www.reddit.com/r/ethereum/comments/74d3dc/smartbillions_lottery_contract_just_got_hacked/dnydjc1?utm_source=share&utm_medium=web2x).
