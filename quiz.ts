import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";


type Data = {
  text: string;
  options: string[];
  correctAnswer: number;
};

let QuizData: Data[] = JSON.parse(fs.readFileSync("q.json", "utf-8"));


let scor = 0;
let userName = "";


async function mainFunction(): Promise<void> {
  let exit = false;
  const user = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: chalk.yellow.bold.italic("Enter Your Name:"),
    },
  ]);
  const username = user.name;
  userName = username;

  do {
    const Actions = await inquirer.prompt([
      {
        name: "option",
        type: "list",
        message: chalk.yellow.bold.italic("choose choose an Action:"),
        choices: ["Start Quiz", "Exit"],
      },
    ]);
    switch (Actions.option) {
      case "Start Quiz":
        await startQuiz();
        break;
      case "Exit":
        exit = true;
        console.log(chalk.magenta.bold.italic(`Exting the quiz`));
        break;

      default:
        break;
    }
  } while (!exit);
}

async function startQuiz() {
  console.log(chalk.magenta.bold.underline.italic("Welcome to the Quiz!"));

  for (let i = 0; i < QuizData.length; i++) {
    await presentQuestion(i + 1, QuizData[i]);
  }
  displayScore();
}

async function presentQuestion(questionNumber: number,question: Data): Promise<void> {
  console.log(chalk.green.bgWhite.bold.italic(`Question: ${questionNumber}: ${question.text}`));

  const answers = await inquirer.prompt([
    {
      name: "answer",
      type: "list",
      message: chalk.yellow.bold.italic("choose correct answer:"),
      choices: question.options,
    },
  ]);

  if (question.options.indexOf(answers.answer) != question.correctAnswer) {
    console.log(chalk.red.bold.italic("Inccorect answer"));
  } else {
    console.log(chalk.green.bold.italic(`Correct Answer`));
    scor++;
  }
}

function displayScore(): void {
  console.log(
    chalk.magenta.bold.italic(` Dear ${chalk.cyan.bold.italic( userName)} Your final scor is :${scor} out of ${QuizData.length}`
    )
  );
}
mainFunction()