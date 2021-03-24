const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
//You can change the Values below to change the questions.
let questions = [
    {
        question: 'What is the minimal mass requirements to tricksplit?',
        choice1: '8000 mass',
        choice2: '9000 mass',
        choice3: '7000 mass',
        choice4: '???',
        answer: 2,
    },
    {
        question:
            "How many recombines can a gold member hold",
        choice1: "18",
        choice2: "27",
        choice3: "Unlimited",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Who is the current owner of Agma.io?",
        choice1: "Fisa",
        choice2: "Happy?",
        choice3: "Sora",
        choice4: "No one owns agma.io",
        answer: 3,
    },
    {
        question: "Who created this Quiz?",
        choice1: "Happy?",
        choice2: "Sora",
        choice3: "Squirrel",
        choice4: "Samira",
        answer: 1,
    }
]
//Points gained per question
const SCORE_POINTS = 100
//max amount of questions
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()