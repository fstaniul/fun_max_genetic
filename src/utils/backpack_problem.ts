
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

function findLowestValue(items: BackpackItem[], pickedItems: number): number {
    const len = items.length;
    const last = items.length - 1;

    let lowestValue = Infinity;
    let lowestValueIndex = last;

    for (let i = 0; i < len; i++) {
        const index = last - i;
        if ((pickedItems & (1 << i)) && items[index].value < lowestValue) {
            lowestValue = items[index].value;
            lowestValueIndex = index;
        }
    }

    return lowestValueIndex;
}

export function ensureWeightIsBelowMaximum(items: BackpackItem[], pickedItems: number, maxWeight: number): number {
    if (pickedItems === 0) return 0;

    const { weight } = calculateWeightAndValue(items, pickedItems);

    console.log(weight, maxWeight);
    console.log(pickedItems.toString(2).padStart(items.length, "0"));
    console.table(items);

    if (weight <= maxWeight) {
        return pickedItems;
    }

    const lowestValueIndex = findLowestValue(items, pickedItems);
    const lowestValueBit = items.length - lowestValueIndex - 1;
    const lowestValueMask = 1 << lowestValueBit;

    return ensureWeightIsBelowMaximum(items, pickedItems ^ (lowestValueMask), maxWeight);
}
