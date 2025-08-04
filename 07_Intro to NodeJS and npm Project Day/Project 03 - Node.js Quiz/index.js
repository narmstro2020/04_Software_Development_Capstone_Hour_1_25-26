import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const questions = [
    {
        question: "What does 'npm' stand for?",
        answer: "Node Package Manager",
    },
    {
        question: "Which command initializes a package.json file?",
        answer: "npm init",
    },
    {
        question: "What keyword is used to export a function in ES Modules?",
        answer: "export",
    },
];

// TODO: create a score variable and initialize to 0.
// TODO: create a current variable and initialize to 0.

function askQuestion() {
    // TODO: check if current is less than the length of questions
        // TODO: call rl.question().  Passing in chalk.cyan(questions[current].question + " "), and an arrow function
        // arrow function:
        //     (userInput) => {
        //     if (userInput.trim().toLowerCase() === questions[current].answer.toLowerCase()) {
        //         console.log(chalk.green("Correct!"));
        //         score++;
        //     } else {
        //         console.log(chalk.red("Incorrect."));
        //         console.log("Correct answer:", chalk.yellow(questions[current].answer));
        //     }
        //     current++;
        //     askQuestion();
        // });
    // TODO: else
        // TODO: console log chalk.magenta()  The following:  Quiz complete! Your score is (score variable) / (length of questions)
        // You will need template strings for this.  I didn't write it in code.
        rl.close();
}

console.log(chalk.blue.bold("Welcome to the Node.js CLI Quiz!"));
askQuestion();
