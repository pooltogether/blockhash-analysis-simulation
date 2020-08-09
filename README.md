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

[JSFiddle here](https://jsfiddle.net/xqmgv3aw/13/)

## Some Results

The expected value is the ticket odds * the prize.  For example for a user with 10% of the tickets and a prize of 2 Ether their expected value is 0.1 * 2 = 0.2.

We can see here the expected value of 0.28 is almost not worth gaming:

```
???????????????????
Block reward: 2 Ether
Uncle reward: 1.66 Ether
Miner hash power: 4%
PoolTogether ticket odds: 28%
Prize: 1 Ether
Expected value: 0.28
===================
Average prize rewards per block: 0.279189
Average mining rewards per block: 0.080138
Average gamed prize rewards per block: 0.288262
Average gamed mining rewards per block: 0.07220924000005476
===================
Income for pure prize  +  pure mining: 0.359327
Income for gamed prize + gamed mining: 0.36047124000005476
Income boost gamed / prize: 0.32%
```

However if we boost the users odds to 50% and increase the prize, we see they can increase their income by 1.71%:

```
???????????????????
Block reward: 2 Ether
Uncle reward: 1.66 Ether
Miner hash power: 4%
PoolTogether ticket odds: 50%
Prize: 3 Ether
Expected value: 1.5
===================
Average prize rewards per block: 1.498827
Average mining rewards per block: 0.079664
Average gamed prize rewards per block: 1.530771
Average gamed mining rewards per block: 0.07476410000003891
===================
Income for pure prize  +  pure mining: 1.578491
Income for gamed prize + gamed mining: 1.605535100000039
Income boost gamed / prize: 1.71%
```

Now let's increase the prize and decrease the user's chance:

```
???????????????????
Block reward: 2 Ether
Uncle reward: 1.66 Ether
Miner hash power: 4%
PoolTogether ticket odds: 10%
Prize: 10 Ether
Expected value: 1
===================
Average prize rewards per block: 0.99751
Average mining rewards per block: 0.079516
Average gamed prize rewards per block: 1.04016
Average gamed mining rewards per block: 0.06995318000006666
===================
Income for pure prize  +  pure mining: 1.077026
Income for gamed prize + gamed mining: 1.1101131800000668
Income boost gamed / prize: 3.07%
```

We can see that with only 10% of the tickets owned they can boost their income by 3%.  Let's increase the prize by several orders of magnitude and decrease their odds:

```
???????????????????
Block reward: 2 Ether
Uncle reward: 1.66 Ether
Miner hash power: 4%
PoolTogether ticket odds: 5%
Prize: 100 Ether
Expected value: 5
===================
Average prize rewards per block: 4.9908
Average mining rewards per block: 0.08011
Average gamed prize rewards per block: 5.2191
Average gamed mining rewards per block: 0.06946278000006993
===================
Income for pure prize  +  pure mining: 5.07091
Income for gamed prize + gamed mining: 5.2885627800000705
Income boost gamed / prize: 4.29%
```

# References

This analysis is largely based on Nick Johnson’s [analysis](https://www.reddit.com/r/ethereum/comments/73sddu/smartbillions_just_put_45113717_1500_eth_to_their/dntau2d?utm_source=share&utm_medium=web2x) and monte carlo [simulation](https://www.reddit.com/r/ethereum/comments/74d3dc/smartbillions_lottery_contract_just_got_hacked/dnydjc1?utm_source=share&utm_medium=web2x).
