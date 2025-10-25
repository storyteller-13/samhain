// Trivia questions with memento mori theme
const triviaQuestions = [
{
        question: "halloween was originally known as what in the united states?",
        answers: [
            "all souls' night",
            "all hallows' eve",
            "samhain",
            "harvest festival"
        ],
        correct: 1,
        explanation: "all hallows' eve, the original name for halloween, derives from the christian tradition of the evening before all saints' day. the term 'hallow' means 'holy' or 'sacred,' and the night was once dedicated to honoring saints and martyrs."
    },
    {
        question: "what does 'memento mori' mean in latin?",
        answers: [
            "remember death",
            "remember zombies",
            "ghosts are cool",
            "vampires must die"
        ],
        correct: 0,
        explanation: "memento mori, meaning 'remember that you must die,' has its origins in stoic philosophy. stoics like marcus aurelius and seneca believed that acknowledging our mortality helps us live more virtuously, focusing on what truly matters. by remembering death, we are encouraged to live with intention and purpose, making the most of our limited time."
    },
    {
        question: "many american towns hold 'haunted house' attractions during october. the first professional haunted house in the USA was opened in which decade?",
        answers: [
            "late 1800s",
            "1930s",
            "1960s",
            "1980s"
        ],
        correct: 1,
        explanation: "the first professional haunted house opened in los angeles in 1930 at golden gate amusement park during the great depression. combining vaudeville and horror, it inspired other attractions, like chicago's 'spook house' at navy pier and haunted spots at coney island, providing a thrilling escape during tough economic times."
    },
    {
        question: "what 1978 film, directed by john carpenter, is credited with popularizing the slasher genre and introducing the iconic villain michael myers to american cinema?",
        answers: [
            "friday the 13th",
            "nightmare on elm street",
            "texas chainsaw massacre",
            "halloween"
        ],
        correct: 3,
        explanation: "halloween (1978) is credited with popularizing the slasher genre, influencing films like friday the 13th and a nightmare on elm street. its success introduced iconic elements like the masked killer, stalking sequences, and the final girl, while john carpenter's eerie score became a hallmark of horror."
    },
    {
        question: "which american singer released the song somebody's watching me, which has become a halloween favorite due to its creepy lyrics?",
        answers: [
            "michael jackson",
            "bobby pickett", 
            "rockwell",
            "ray parker jr."
        ],
        correct: 2,
        explanation: "rockwell released 'somebody's watching me' in 1984, featuring michael jackson on backing vocals. the song became a halloween classic due to its paranoid lyrics about being watched, perfectly capturing the spooky atmosphere of the season. interestingly, rockwell was the son of motown founder berry gordy, and the song's success was largely due to jackson's distinctive backing vocals."
    },
    {
        question: "which legendary music producer co-wrote and produced michael jackson's thriller album, creating the best-selling album of all time?",
        answers: [
            "quincy jones",
            "phil spector",
            "rick rubin",
            "george martin"
        ],
        correct: 0,
        explanation: "quincy jones co-wrote and produced michael jackson's thriller album, which became the best-selling album of all time with over 100 million copies sold worldwide. the album featured the iconic halloween-themed title track 'thriller' with its famous music video directed by john landis, revolutionizing music videos and becoming a halloween classic. jones also worked on jackson's previous albums 'off the wall' and 'bad', establishing one of the most successful artist-producer partnerships in music history."
    },
    {
        question: "who is going to win my heart and become my infinite lover?",
        answers: [
            "the bro",
            "the other bro",
            "the other other bro",
            "i dunno man, i am getting a lil confused here..."
        ],
        correct: 2,
        explanation: "well, let's see who is brave enough to get a date with me... we don't want to live in the interwebs forever, do we?"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Custom floating skulls for door 7 (memento mori theme)
document.addEventListener('DOMContentLoaded', function() {
    createFloatingSkulls();
    initializeTrivia();
});

function createFloatingSkulls() {
    // No floating elements
}

function changeSkullsToHearts() {
    // No floating elements to change
}

function initializeTrivia() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
    
}

function showQuestion() {
    const question = triviaQuestions[currentQuestion];
    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');

    questionNumber.textContent = `question ${currentQuestion + 1} of 7`;
    questionText.textContent = question.question;
    
    // Clear previous content including explanations
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerButton = document.createElement('button');
        answerButton.className = 'answer-btn';
        answerButton.textContent = answer;
        answerButton.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(answerButton);
    });
}

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    const answerButtons = document.querySelectorAll('.answer-btn');
    const question = triviaQuestions[currentQuestion];
    const isLastQuestion = currentQuestion === 6;
    
    // Remove previous selections and feedback
    answerButtons.forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
    });
    
    // Disable all buttons to prevent multiple selections
    answerButtons.forEach(btn => btn.disabled = true);
    
    // Show immediate feedback
    if (isLastQuestion) {
        // Last question: ALL ANSWERS ARE CORRECT
        answerButtons.forEach((btn, index) => {
            btn.classList.add('correct');
        });
    } else {
        // Other questions: normal logic with one correct answer
        answerButtons.forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === answerIndex && index !== question.correct) {
                btn.classList.add('incorrect');
            }
        });
    }
    
    // Highlight selected answer
    answerButtons[answerIndex].classList.add('selected');
    
    // Show explanation
    showAnswerExplanation(question, answerIndex);
    
    // Show next button instead of submit
    const nextBtn = document.createElement('button');
    nextBtn.className = 'submit-btn';
    nextBtn.textContent = currentQuestion === triviaQuestions.length - 1 ? 'See Results' : 'Next Question';
    nextBtn.addEventListener('click', checkAnswer);
    
    const answersContainer = document.getElementById('answersContainer');
    if (!document.querySelector('.submit-btn')) {
        answersContainer.appendChild(nextBtn);
    }
}

function showAnswerExplanation(question, selectedIndex) {
    // Remove any existing explanation
    const existingExplanation = document.querySelector('.answer-explanation');
    if (existingExplanation) {
        existingExplanation.remove();
    }
    
    // Create explanation element
    const explanation = document.createElement('div');
    explanation.className = 'answer-explanation';
    
    const isCorrect = selectedIndex === question.correct;
    const isLastQuestion = currentQuestion === 6;
    
    if (isLastQuestion) {
        // Special handling for the last question
        explanation.innerHTML = `
            <div class="explanation-content">
                <p class="explanation-text">boom!</p>
                <p class="explanation-text">this question was a trick! time for the big finale!</p>
            </div>
        `;
    } else if (isCorrect) {
        explanation.innerHTML = `
            <div class="explanation-content correct-explanation">
                <p class="explanation-text">correct!</p>
                <p class="explanation-text">${question.explanation}</p>
            </div>
        `;
    } else {
        explanation.innerHTML = `
            <div class="explanation-content incorrect-explanation">
                <p class="explanation-text">not quite right.</p>
                <p class="explanation-text">${question.explanation}</p>
            </div>
        `;
    }
    
    // Add explanation to the answers container
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.appendChild(explanation);
}

function checkAnswer() {
    const question = triviaQuestions[currentQuestion];
    const isLastQuestion = currentQuestion === 6;
    
    // Update score
    if (isLastQuestion) {
        // Last question is always wrong, create explosion effect
        createExplosionEffect();
        // Immediately hide the question and show results
        showResults();
    } else if (selectedAnswer === question.correct) {
        score++;
    }
    
    // Move to next question immediately (only for non-last questions)
    if (!isLastQuestion) {
        currentQuestion++;
        if (currentQuestion < triviaQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }
}

function showResults() {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('triviaResults').style.display = 'block';
    
    // Apply pink styling immediately after the boom
    document.body.classList.add('quiz-complete-pink');
    // Change skulls to hearts when page turns pink
    changeSkullsToHearts();
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const celebration = document.getElementById('celebration');
    
    const percentage = Math.round((score / triviaQuestions.length) * 100);
    
    scoreDisplay.innerHTML = `
        <h3>trivia complete!</h3>
        <p>you scored ${score} out of ${triviaQuestions.length} (${percentage}%)</p>
    `;
    
    // Celebration message based on score
    if (percentage >= 85) {
        celebration.innerHTML = 'Excellent! You truly understand the beauty of memento mori!';
    } else if (percentage >= 70) {
        celebration.innerHTML = 'Great job! You have a good grasp of life\'s precious nature!';
    } else if (percentage >= 50) {
        celebration.innerHTML = 'Not bad! Remember, every moment is a chance to learn!';
    } else {
        celebration.innerHTML = 'Keep learning! The journey of understanding mortality is beautiful!';
    }
    
    // Force pink styling on result elements immediately
    setTimeout(() => {
        if (scoreDisplay) {
            const h3 = scoreDisplay.querySelector('h3');
            const p = scoreDisplay.querySelector('p');
            if (h3) {
                h3.style.color = '#ff1493';
                h3.style.textShadow = '0 0 15px rgba(255, 20, 147, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)';
            }
            if (p) {
                p.style.color = '#ff1493';
                p.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 20, 147, 0.6)';
            }
        }
        
        if (celebration) {
            celebration.style.color = '#ff1493';
            celebration.style.background = 'linear-gradient(135deg, rgba(255, 20, 147, 0.3), rgba(255, 105, 180, 0.3))';
            celebration.style.border = '2px solid rgba(255, 20, 147, 0.7)';
            celebration.style.textShadow = '0 0 10px rgba(255, 20, 147, 0.7)';
            celebration.style.boxShadow = '0 0 20px rgba(255, 20, 147, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
        }
    }, 100);
}

function createExplosionEffect() {
    // Create explosion overlay
    const explosionOverlay = document.createElement('div');
    explosionOverlay.style.position = 'fixed';
    explosionOverlay.style.top = '0';
    explosionOverlay.style.left = '0';
    explosionOverlay.style.width = '100vw';
    explosionOverlay.style.height = '100vh';
    explosionOverlay.style.background = 'radial-gradient(circle, #ff0000 0%, #ff4500 30%, #ff8c00 60%, #000000 100%)';
    explosionOverlay.style.zIndex = '9999';
    explosionOverlay.style.opacity = '0';
    explosionOverlay.style.transition = 'opacity 0.1s ease-out';
    explosionOverlay.style.pointerEvents = 'none';
    
    document.body.appendChild(explosionOverlay);
    
    // Create explosion particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '*';
        particle.style.position = 'fixed';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.fontSize = `${20 + Math.random() * 30}px`;
        particle.style.color = '#ff0000';
        particle.style.zIndex = '10000';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `explosionParticle 1s ease-out forwards`;
        particle.style.animationDelay = `${Math.random() * 0.5}s`;
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 1500);
    }
    
    // Trigger explosion
    setTimeout(() => {
        explosionOverlay.style.opacity = '1';
    }, 50);
    
    // Remove explosion overlay
    setTimeout(() => {
        explosionOverlay.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(explosionOverlay)) {
                document.body.removeChild(explosionOverlay);
            }
        }, 100);
    }, 800);
}

