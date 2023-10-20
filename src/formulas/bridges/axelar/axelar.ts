import { AxelarAssetTransfer, Environment,   AxelarQueryAPI,
  CHAINS } from "@axelar-network/axelarjs-sdk";

const axelarAssetTransfer = new AxelarAssetTransfer({
  environment: Environment.TESTNET,
});

interface IAxelarFeeProps {
  originChain: string;
  destinationChain: string;
}

const supportedNetworks = [
  "optimism",
  "goerli",
  "mantle",

]

export async function getFee(originChain:string, destinationChain:string) {
  const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
  });

  console.log(CHAINS.TESTNET);
  // todo: handle unsupported networks better here
  // warning!! assuming we are using axlWETH // 
  if (supportedNetworks.includes(originChain) && supportedNetworks.includes(destinationChain)) {

    // goerli on axelar is known as ethereum-2
    if (originChain === "goerli") {
      const fee = await axelarQuery.getTransferFee(
          CHAINS.TESTNET.ETHEREUM,
          destinationChain,
          "eth-wei",
          1000000
      );
      return Object.values(fee)[0]["amount"]
    } else if (destinationChain === "goerli") {
      const fee = await axelarQuery.getTransferFee(
        originChain,
        CHAINS.TESTNET.ETHEREUM,
          "eth-wei",
          1000000
      );
      return Object.values(fee)[0]["amount"]

    }

    const fee = await axelarQuery.getTransferFee(
        originChain,
        destinationChain,
        "eth-wei",
        1000000
    );
    return Object.values(fee)[0]["amount"]
  }

  return console.error("Unsupported network"); 
}

