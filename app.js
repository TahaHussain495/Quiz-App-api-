let questions = [];
let index = 0;
let score = 0;

const quest = document.getElementById("question");
const option1 = document.getElementById("opt1");
const option2 = document.getElementById("opt2");
const option3 = document.getElementById("opt3");
const nextButton = document.getElementById("nxtbtn");

// Fetch questions from API
fetch('https://the-trivia-api.com/v2/questions')
    .then(res => res.json())
    .then(data => {
        questions = data.map(q => {
            // Mix correct and incorrect answers and pick 3 options
            const options = [q.correctAnswer, ...q.incorrectAnswers];
            const shuffled = options.sort(() => Math.random() - 0.5).slice(0, 3);

            return {
                question: q.question.text,
                option1: shuffled[0],
                option2: shuffled[1],
                option3: shuffled[2],
                correctAnswer: q.correctAnswer
            };
        });

        loadQuestion(); // Load the first question after fetch
    })
    .catch(error => {
        console.error("Failed to fetch questions", error);
        quest.innerText = "Failed to load quiz. Try again later.";
    });

function loadQuestion() {
    quest.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
}

function enableBtn() {
    nextButton.removeAttribute('disabled');
}

function complete() {
    const options = document.getElementsByName('answer');
// This creates an empty variable called selectedAnswer to store the answer the user chooses.
    let selectedAnswer = "";

    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selectedAnswer = options[i].nextElementSibling.innerText;
        }
    }

    if (selectedAnswer === questions[index].correctAnswer) {
        score++;
    }

    index++;

    if (index < questions.length) {
        loadQuestion();
        nextButton.setAttribute('disabled', 'true');
        resetRadioButtons();
    } else {
        Swal.fire({
            title: "Quiz completed",
            text: "You answered correctly " + score + " out of " + questions.length,
            icon: "success"
        });
    }
}

function resetRadioButtons() {
    const options = document.getElementsByName('answer');
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}








