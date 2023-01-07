
export interface BackpackItem {
    value: number;
    weight: number;
}

export function calculateWeightAndValue(items: BackpackItem[], pickedItems: number): { weight: number; value: number } {
    let weight = 0, value = 0;

    const len = items.length;
    const last = items.length - 1;
    for (let i = 0; i < len; i++) {
        if (pickedItems & (1 << i)) {
            weight += items[last - i].weight;
            value += items[last - i].value;
        }
    }

    return { weight, value };
}

/**
 * returns picked item bit that has lowest value/weight ratio
 */
export function findLowestValueWeightRatio(items: BackpackItem[], pickedItems: number): number {
    let lowestValueBit = -1, lowestRatio = Number.MAX_VALUE;

    if (pickedItems === 0) return lowestValueBit;

    const len = items.length;
    const last = items.length - 1;

    for (let i = 0; i < len; i++) {
        if (!(pickedItems & (1 << i))) continue;

        const itemIndex = last - i;
        const item = items[itemIndex];
        const ratio = item.weight === 0 ? Number.MAX_VALUE : item.value / item.weight;

        if (ratio < lowestRatio) {
            lowestValueBit = i;
            lowestRatio = ratio;
        }
    }

    return lowestValueBit;
}

export function ensureWeightIsBelowMaximum(items: BackpackItem[], pickedItems: number, maxWeight: number): number {
    if (pickedItems === 0) return 0;

    const { weight } = calculateWeightAndValue(items, pickedItems);

    if (weight <= maxWeight) {
        return pickedItems;
    }

    const lowestValueBit = findLowestValueWeightRatio(items, pickedItems);
    const lowestValueMask = 1 << lowestValueBit;

    return ensureWeightIsBelowMaximum(items, pickedItems ^ lowestValueMask, maxWeight);
}
