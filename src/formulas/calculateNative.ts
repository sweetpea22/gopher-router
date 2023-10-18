import { ethers, BigNumber } from "ethers";
import {ChainInfo, AccountDetails, Transfer, BundledTransfers} from "../app/interfaces";
import {getAllBalances, getAllTransfers, sortByTransfersByBalance, sortByTransfersByCost} from "./utils";
import {calculate_base_gas_cost, calculate_bridge_cost} from "./gasCosts";
import { findCheapestCombination } from "./lowestCost";

const chains: ChainInfo[] = []; // import from somewhere

/**
 * Finds the cheapest bundle of transactions and returns those with their total cost.
 * @param transferAmount 
 * @param transfers 
 * @returns 
 */
export const calculateBundledTransactions = (transferAmount: BigNumber, transfers: Transfer[]): BundledTransfers => {
    let bundledTransfers = findCheapestCombination(transferAmount, transfers);
    if (bundledTransfers.length === 0) {
        return {
            transfers: bundledTransfers,
            bundleCost: BigNumber.from(0)
        }
    }
    const bundleCost = bundledTransfers.reduce((p,c) => p.add(c.cost), BigNumber.from(0));
    const newBunlde = calculateAmountToSend(transferAmount, bundledTransfers);
    console.log({newBunlde})
    return {
        transfers: newBunlde,
        bundleCost
    }
};

export const calculateAmountToSend = (transferAmount: BigNumber, transfers: Transfer[]): Transfer[] => {
    const sorted = sortByTransfersByBalance(transfers).reverse();
    return sorted.map(transfer => {
        if (transfer.balance.gt(transferAmount)) {
            // Use remainder
            const amountToTransfer = transferAmount;
            transferAmount = BigNumber.from(0);
            return {...transfer, amountToTransfer};
        } else {
            // Use full balance
            transferAmount = transferAmount.sub(transfer.balance);
            return {...transfer, amountToTransfer: transfer.balance}
        }
    })
}

/**
 * Returns best path to perfomring a native transfer
 * @param chains 
 * @param amount 
 * @param destinationChain 
 * @returns 
 */
export const calculateNativeTransfer = async (from: string, chains: ChainInfo[], amount: BigNumber, destinationChain: ChainInfo | null = null): Promise<Transfer[]> => {
    // Step 1 - Get balances across all chains
    const accountDetails = await getAllBalances(from, chains);

    // Step 2.1 - If `destinationChain == null`
    // In this case we can simply find the best set of chains to combine that will make the transfer occur at the cheapest rate
    // Best outcome, we transfer everything from one single chain
    if (destinationChain == null) {
        
        // Contains a list of transfers with assosiated costs across all the chains
        let possibleTransfers = await getAllTransfers(amount, accountDetails, calculate_base_gas_cost);
        
        // Sort the transfers based on cheapest -> most expensive
        possibleTransfers = sortByTransfersByCost(possibleTransfers);
        
        // Find the cheapest single chain transfer, since its sorted it will always be the first one found
        const bestSingleChainTransfer = possibleTransfers.find(transfer => {
            if (transfer.hasFullBalance) {
                transfer.amountToTransfer = amount;
                return true;
            }
        });

        // Calculate multi-chain transfers
        const { transfers, bundleCost } = calculateBundledTransactions(amount, possibleTransfers);
        // Return the cheapeast option
        return bestSingleChainTransfer && bestSingleChainTransfer.cost!.lte(bundleCost) ? [bestSingleChainTransfer] : transfers;

    // Step 2.2 - If `destinationChain != null`
    // In this case we need to calculate the costs of bridging between chains, and finding the cheapest bundle
    // The best outcome is that the destinationChain is the cheapest, otherwise we need to combine all the options    
    } else {
        // There HAS TO BE a better way
        const destinationAccountDetails = accountDetails.find(chain => chain.chain.name === destinationChain.name);
        const bridgeChainsBalances = accountDetails.filter(chain => chain.chain.name !== destinationChain.name);

        // Lists of transfers with assosiated costs across all the chains
        const currentChainTransfer = await getAllTransfers(amount, [destinationAccountDetails!], calculate_base_gas_cost); // always length=1
        let bridgedTransfers = await getAllTransfers(amount, bridgeChainsBalances, calculate_bridge_cost);
        
        // Sort the birdgedTransfer based on cheapest -> most expensive
        bridgedTransfers = sortByTransfersByCost(bridgedTransfers);

        if (currentChainTransfer[0].hasFullBalance) {
            // We want to prioritize the destinationChain if it has balance
            const { transfers, bundleCost } = calculateBundledTransactions(amount, bridgedTransfers);
            return currentChainTransfer[0].cost!.lte(bundleCost) ? currentChainTransfer : transfers;
        } else {
            const bundledTransfers = [...currentChainTransfer, ...bridgedTransfers];
            const { transfers } = calculateBundledTransactions(amount, bundledTransfers);
            return transfers;
        }
    }
};
