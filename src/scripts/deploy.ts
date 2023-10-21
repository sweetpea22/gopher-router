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
  opGoerli: {
    blockConfirmations: 6,
  },
  scrollGoerli: {
    blockConfirmations: 6
  },
}

export const developmentChains = ["hardhat", "localhost"]

async function main() {
  //@ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  // Deploy Axelar on Goerli
  const SendWrappedViaAxelar = await deploy(
    'SendWrappedViaAxelar',  {
    from: deployer,
      args: [
        '0xe432150cce91c13a887f7D836923d5597adD8E31',
        '0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6'
      ],
    log: true,
    waitConfirmations: 6
  })
  console.log(
  `Deployed Axelar Bridge Contract on Goerli at ${SendWrappedViaAxelar.address}!`
  )

  // Axelar on Op Goerli
  // const SendWrappedViaAxelar = await deploy(
  //   'SendWrappedViaAxelar',  {
  //   from: deployer,
  //     args: [
  //       '0xe432150cce91c13a887f7D836923d5597adD8E31',
  //       '0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6'
  //     ],
  //   log: true,
  //   waitConfirmations: 6
  // })
  // console.log(
  // `Deployed Axelar Bridge Contract on Goerli at ${SendWrappedViaAxelar.address}!`
  // )

  // Deploy CCIP
  const TokenTrasferor = await deploy(
    'TokenTrasferor',  {
    from: deployer,
      args: [
        '0xD0daae2231E9CB96b94C8512223533293C3693Bf',
        '0x779877A7B0D9E8603169DdbD7836e478b4624789'
      ],
    log: true,
    waitConfirmations: 6
  })
  console.log(
  `Deployed CCIP Bridge Contract on Sepolia  at ${TokenTrasferor.address}!`
  )

  // CCIP on Op Goerli
  // const TokenTrasferor = await deploy(
  //   'TokenTrasferor',  {
  //   from: deployer,
  //     args: [
  //       '0xEB52E9Ae4A9Fb37172978642d4C141ef53876f26',
  //       '0xdc2CC710e42857672E7907CF474a69B63B93089f'
  //     ],
  //   log: true,
  //   waitConfirmations: 6
  // })
  // console.log(
  // `Deployed CCIP Bridge Contract on Sepolia  at ${TokenTrasferor.address}!`
  // )

  

  // verify on block explorer
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
  await verify("0x8162c80C51b2d756E0b9678F5241d6aa71b64805", [{ numberOfLevels: 5 }])
}

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
