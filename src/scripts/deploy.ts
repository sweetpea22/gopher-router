import hre from 'hardhat';
import verify from './verify';

// read hardhat config to see all chains 
export interface networkConfigItem {
  blockConfirmations?: number
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  goerli: {
    blockConfirmations: 6,
  },
  scrollGoerli: { blockConfirmations: 6},
  gnosis: { blockConfirmations: 6 },
}

export const developmentChains = ["hardhat", "localhost"]

async function main() {
  //@ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  // add deploy args here
  const jumpContract = await deploy(
    '',  {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 6
  })

    console.log(
    `Deployed jump contract on  at ${jumpContract.address}!`
    )
  
    // verify on block explorer
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify("0x8162c80C51b2d756E0b9678F5241d6aa71b64805", [{ numberOfLevels: 5 }])
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
