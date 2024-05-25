export function getRandomInt(min : number, max: number): number{
    min = Math.ceil(min);  // Ensure the minimum is rounded up
    max = Math.floor(max); // Ensure the maximum is rounded down
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum and minimum are inclusive
}