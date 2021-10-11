// 1. Find a way to generate random numbers
// 2. Create a function to generate numbers from a given scope
// 3. Print the drafted numbers
// 4. Add a mechanism to prevent drafting same numbers

function randomize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function lotto(min, max, numbersCount) {
    if (min > max) {
        return console.log("Error, highest random number has been entered as lowest.");
    } else if (numbersCount > max - min) {
        return console.log("Error, the requested amount of numbers to draft is impossible.");
    }

    const numbers = [];

    while (numbers.length < numbersCount) {
        const randomNumber = randomize(min, max);

        if (numbers.includes(randomNumber)) {
            console.log(`Repeated number is ${randomNumber}`);
            continue;
        } else {
            numbers.push(randomNumber);
        }
    }

    return console.log(`Randomized numbers are: ${numbers.join(", ")}`);
}

const numbers = prompt(
    "Please state the scope of the lottery (lowest number, highest number, amount of randomized numbers)"
);
const splitNumbers = Array.from(numbers.split(", "), Number);

lotto(...splitNumbers);
