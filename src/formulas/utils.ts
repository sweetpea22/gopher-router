import {ethers, BigNumber} from "ethers";
import {ChainInfo, AccountDetails, Transfer} from "../app/interfaces";
import { calculateBaseGasCost, calculateBridgeCost } from "./gasCosts";
import { TokenNames, getToken } from "@/app/constants";

export const sortByTransfersByCost = (t: Transfer[]): Transfer[] => {
    return t.sort((a ,b) => {
        if(a.feeData.cost.gt(b.feeData.cost)) {
          return 1;
        } else if (a.feeData.cost.lt(b.feeData.cost)){
          return -1;
        } else {
          return 0;
        }
      });
}

export const sortByTransfersByBalance = (t: Transfer[]): Transfer[] => {
  return t.sort((a ,b) => {
      if(a.balance.gt(b.balance)) {
        return 1;
      } else if (a.balance.lt(b.balance)){
        return -1;
      } else {
        return 0;
      }
    });
}

interface IGetAllTransfers {
  amount: BigNumber;
  accountDetails: AccountDetails[];
  destinationChain?: ChainInfo;
  to: string;
  from: string;
  isToken: boolean,
  tokenName: TokenNames
}
/**
 * Returns all the possibile transfers with assosiated costs, on one single chain.
 * @param amount 
 * @param AccountDetails 
 * @param costFn 
 * @returns 
 */
export const getAllTransfers = async ({amount, accountDetails, destinationChain, to, from, isToken, tokenName}: IGetAllTransfers): Promise<Transfer[]> => {
  const transfers = [];
  for (const x in accountDetails) {
    const account = accountDetails[x];
  // const tranfers = await Promise.all(accountDetails.map(async (account) => {
    const feeData = destinationChain ? await calculateBridgeCost(account.chain, destinationChain, to, from, isToken, tokenName) : await calculateBaseGasCost(account.chain, from);
    // if (!feeData || Object.keys(feeData).length === 0) return {} as Transfer;
    if (feeData && Object.keys(feeData).length > 0) {
      const hasFullBalance = account.balance.gte(amount.add(feeData.cost));
      // return {
      transfers.push({
          chain: account.chain,
          balance: account.balance,
          hasFullBalance,
          feeData,
      } as Transfer)
    }
  // }));
  }
  return transfers.filter(x => Object.keys(x).length > 0);  // const tranfers = await Promise.all(accountDetails.map(async (account) => {
};

/**
 * Returns all the native balances for the supplied chains
 * @param chains 
 * @returns 
 */
export const getAllBalances = async (address: string, chains: ChainInfo[], isToken: boolean, tokenName: TokenNames): Promise<AccountDetails[]> => {
    const accountDetails = [];
    for (const x in chains) {
      const chain = chains[x];
    // return await Promise.all(chains.map(async (chain) => {
        const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
        if (isToken) {
          const token = getToken(tokenName);
          const tokenAddress = token.chainMap[chain.name];
          const abi = ["function balanceOf(address owner) view returns (uint256)"];
          const erc20 = new ethers.Contract(tokenAddress, abi, provider);
          try {
            const balance = await erc20.balanceOf(address);
            // return {
            accountDetails.push({
              chain,
              balance
            })
          } catch (e) {
            console.log(chain.name, e)
          }
        }
        const balance = await provider.getBalance(address);
        // return {
        accountDetails.push({
            chain,
            balance
        });
    // }));
    };
};
