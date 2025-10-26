const triviaQuestions = [
{
        question: "what was halloween originally known as in the united states?",
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
        question: "which american singer released the 'song somebody's watching me', which has become a halloween favorite due to its creepy lyrics?",
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
        question: "what is the name of the hotel where jack torrance takes his family to work during the winter in the shining?",
        answers: [
            "the grandview hotel",
            "the overlook hotel",
            "the mountain lodge",
            "the winterfell hotel"
        ],
        correct: 1,
        explanation: "the overlook hotel is the iconic haunted location in stephen king's 'the shining' (1977) and stanley kubrick's 1980 film adaptation. inspired by the real-life stanley hotel in estes park, colorado, the overlook serves as a character itself — a massive, isolated mountain resort that becomes increasingly malevolent. the hotel's history includes a previous caretaker who murdered his family, and its supernatural influence drives jack torrance to madness. kubrick's film was shot at the timberline lodge in oregon for exterior shots, while the interior was built on soundstages in england, creating one of cinema's most memorable haunted locations."
    },
    {
        question: "in this haunted game, who will capture the princess's heart?",
        answers: [
            "the charming vampire with impeccable manners",
            "the brooding werewolf who howls at the moon",
            "the ethereal ghost who's been haunting for centuries",
            "now, this is a halloween mystery..."
        ],
        correct: 3,
        explanation: "well, let's see who is brave enough to get a date with her... we don't want to live in the interwebs forever, do we?"
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

document.addEventListener('DOMContentLoaded', function() {
    createFloatingSkulls();
    initializeTrivia();
});

function createFloatingSkulls() {
}

function changeSkullsToHearts() {
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
    
    answerButtons.forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = false;
    });
    
    answerButtons.forEach(btn => btn.disabled = true);
    
    if (isLastQuestion) {
        answerButtons.forEach((btn, index) => {
            btn.classList.add('correct');
        });
    } else {
        answerButtons.forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === answerIndex && index !== question.correct) {
                btn.classList.add('incorrect');
            }
        });
    }

    answerButtons[answerIndex].classList.add('selected');
    
    showAnswerExplanation(question, answerIndex);
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'submit-btn';
    nextBtn.textContent = currentQuestion === triviaQuestions.length - 1 ? 'see results' : 'next question';
    nextBtn.addEventListener('click', checkAnswer);
    
    const answersContainer = document.getElementById('answersContainer');
    if (!document.querySelector('.submit-btn')) {
        answersContainer.appendChild(nextBtn);
    }
}

function showAnswerExplanation(question, selectedIndex) {
    const existingExplanation = document.querySelector('.answer-explanation');
    if (existingExplanation) {
        existingExplanation.remove();
    }
    
    const explanation = document.createElement('div');
    explanation.className = 'answer-explanation';
    
    const isCorrect = selectedIndex === question.correct;
    const isLastQuestion = currentQuestion === 6;
    
    if (isLastQuestion) {
        explanation.innerHTML = `
            <div class="explanation-content">
                <p class="explanation-text">this question was a tricky one!</p>
                <p class="explanation-text">time for the big finale...</p>
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
                <p class="explanation-text">not quite right...</p>
                <p class="explanation-text">${question.explanation}</p>
            </div>
        `;
    }
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.appendChild(explanation);
}

function checkAnswer() {
    const question = triviaQuestions[currentQuestion];
    const isLastQuestion = currentQuestion === 6;
    
    if (isLastQuestion) {
        score++; // Always increment score for the last question
        createExplosionEffect();
        showResults();
    } else if (selectedAnswer === question.correct) {
        score++;
    }
    
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
    
    document.body.classList.add('quiz-complete-pink');
    changeSkullsToHearts();
    
    const scoreDisplay = document.getElementById('scoreDisplay');
    const celebration = document.getElementById('celebration');
    
    const percentage = Math.round((score / triviaQuestions.length) * 100);
    
    scoreDisplay.innerHTML = `
        <h3>trivia complete!</h3>
        <p>you scored ${score} out of ${triviaQuestions.length} (${percentage}%)</p>
    `;
    
    if (percentage >= 50) {
        celebration.innerHTML = 'excellent! you truly understand the beauty of memento mori!';
    } else {
        celebration.innerHTML = 'not too bad! remember, every moment is a chance to learn!';
    }
    
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
        
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, 1500);
    }
    
    setTimeout(() => {
        explosionOverlay.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
        explosionOverlay.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(explosionOverlay)) {
                document.body.removeChild(explosionOverlay);
            }
        }, 100);
    }, 800);
}

