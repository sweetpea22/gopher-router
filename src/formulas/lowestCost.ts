import { BigNumber } from 'ethers';
import { Transfer } from '../app/interfaces';

function calculateCost(combination: Transfer[]): BigNumber {
    return combination.reduce((acc, item) => acc.add(item.feeData.cost), BigNumber.from('0'));
}

const INFINITY = BigNumber.from('999999999999999999999999999'); // Choose a large value as "infinity"

export function findCheapestCombination(x: BigNumber, items: Transfer[]): Transfer[] {
    const n = items.length;
    let minCost = BigNumber.from(INFINITY);
    let optimalCombination: Transfer[] | null = null;

    for (let r = 1; r <= n; r++) {
        // Generate combinations of r items
        const indices = Array.from({ length: r }, (_, i) => i);

        while (indices[0] < n - r + 1) {
            const combination = indices.map(index => items[index]);
            const totalAmount = combination.reduce((acc, item) => acc.add(item.balance), BigNumber.from('0'));

            if (totalAmount.gte(x)) {
                const totalCost = calculateCost(combination);
                if (totalCost.lt(minCost)) {
                    minCost = totalCost;
                    optimalCombination = combination;
                }
            }

            // Generate next combination
            let i = r - 1;
            while (i >= 0 && indices[i] === n - r + i) {
                i--;
            }

            if (i < 0) {
                break;
            }

            indices[i]++;
            for (let j = i + 1; j < r; j++) {
                indices[j] = indices[i] + j - i;
            }
        }
    }

    return optimalCombination != null ? optimalCombination : [];
}