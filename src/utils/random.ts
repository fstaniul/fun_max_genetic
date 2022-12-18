export const Random = {
    getBit(): number {
        return Math.round(Math.random());
    },
    getInt(min: number, max: number): number {
        [min, max] = [Math.min(min, max), Math.max(min, max)];
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    },
}
