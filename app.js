/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What year was Jurassic Park released in theaters?',
      answers: [
        '1993',
        '1997',
        '1992',
        '1989'
      ],
      correctAnswer: '1993',
      movie: 'jurassic-park'
    },
    {
      question: 'What year was The Matrix released in theaters?',
      answers: [
        '2005',
        '2003',
        '2001',
        '1999'
      ],
      correctAnswer: '1999',
      movie: 'the-matrix'
    },
    {
      question: 'What year was The Dark Knight released in theaters?',
      answers: [
        '2011',
        '2010',
        '2008',
        '2004'
      ],
      correctAnswer: '2008',
      movie: 'the-dark-knight'
    },
    {
      question: 'What year was Toy Story released in theaters?',
      answers: [
        '1992',
        '1995',
        '1998',
        '2000'
      ],
      correctAnswer: '1995',
      movie: 'toy-story'
    },
    {
      question: 'What year was Back to the Future released in theaters?',
      answers: [
        '1985',
        '1987',
        '1980',
        '1991'
      ],
      correctAnswer: '1985',
      movie: 'back-to-the-future'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0, 
  currentQuestion: 0
};


/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function startScreen() {
  return `<div class="step" id="start-screen">
  <div class="half">
    <h2>I have a party trick where if someone names a movie, I can tell you the exact year (and maybe even month) that it came out.</h2>
    <h4>Now it's your turn! Good luck.</h4>
    <button type="button" id="start-btn">Start Quiz</button>
  </div>
  <div class="feature">
    <img src="assets/home.png" alt="Quiz home image.">
  </div>
</div>`;
}

function questionsHeader() {
  return `
  <ul id="total">
    <li class="question">Question: <span>${STORE.currentQuestion + 1} of ${STORE.questions.length}</span></li>
    <li class="score">Score: <span>${STORE.score} of ${STORE.questions.length}</span></li>
  </ul>
  `;
}

function questions() {
  let currentQuestion = STORE.questions[STORE.currentQuestion];
  return `
  <div class="step">
    <div class="feature">
      <img src="assets/${currentQuestion.movie}.jpg" alt="${currentQuestion.movie} movie poster">
    </div>
    <form class="half" id="question-form">
      <fieldset>
          <div class="question">
              <legend><h3>${currentQuestion.question}</h3></legend>
          </div>
          <div class="answers">
            ${answers()}
          </div>
        <div class="buttons">
          <button type="button" id="next-btn" tabindex="6"> Next </button>
          <button type="submit" id="answer-btn" tabindex="5">Submit</button>
        </div>
      </fieldset>
    </form >
    
  </div>
  `;
  
}

function answers() {
  const answerList = STORE.questions[STORE.currentQuestion].answers;
  let html = '';
  let i = 0;

  answerList.forEach(answer => {
    html += `
      <div class="radio" id="option-container-${i}">
        <input type="radio" name="answers" id="option${i + 1}" value= "${answer}" tabindex ="${i + 1}" required> 
        <label for="option${i + 1}"> ${answer}</label>
      </div>
    `;
    i++;
  });
  return html;
}

function resultsScreen() {
  return `
  <div class="step" id="summary">
      <form class="half">
          <fieldset>
          <ul>
          <li class="score">Score: <span>${STORE.score} of ${STORE.questions.length}</span></li>
          </ul>
          <div class="buttons">
            <button type="button" id="reset-btn">Restart Quiz</button>
          </div>
          </fieldset>
      </form>
  </div>
  `;
}

function feedback(answerStatus) {
  let correctAnswer = STORE.questions[STORE.currentQuestion].correctAnswer;
  let html = '';
  if (answerStatus === 'correct') {
    html = `
    <div class="right-answer">That is correct!</div>
    `;
  }
  else if (answerStatus === 'incorrect') {
    html = `
      <div class="wrong-answer">Sorry, the correct answer is <strong>${correctAnswer}</strong>.</div>
    `;
  }
  return html;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  let html = '';
  if (STORE.quizStarted === false) {
    $('main').html(startScreen());
    return;
  } else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length) {
    html = questionsHeader();
    html += questions();
    $('main').html(html);
  } else {
    $('main').html(resultsScreen());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startQuiz() {
  // clicks start quiz
  $('main').on('click', '#start-btn', function (event) {
    STORE.quizStarted = true;
    renderQuiz();
  });
}

function nextQuestion() {
  // clicks to go to next question
  $('body').on('click', '#next-btn', (event) => {
    renderQuiz();
  });
}

function submitAnswer() {
  // clicks submit answer
  $('body').on('submit', '#question-form', function (event) {
    event.preventDefault();
    const currentQuestion = STORE.questions[STORE.currentQuestion];
    // get value of answers
    let selection = $('input[name=answers]:checked').val();
    let optionContainerId = `#option-container-${currentQuestion.answers.findIndex(i => i === selection)}`;

    if (selection === currentQuestion.correctAnswer) {
      STORE.score++;
      $(optionContainerId).append(feedback('correct'));
    }
    else {
      $(optionContainerId).append(feedback('incorrect'));
    }
    STORE.currentQuestion++;
    /* SHOW AND HIDE THE BUTTONS */
    $('#answer-btn').hide();
    $('input[type=radio]').each(() => {
      $('input[type=radio]').attr('disabled', true);
    });
    $('#next-btn').show();
  });
}

function restartQuiz() {
  // clicks restart quiz
  $('body').on('click', '#reset-btn', () => {
    resetQuiz();
    renderQuiz();
  });
}

function resetQuiz() {
  STORE.quizStarted = false;
  STORE.currentQuestion = 0;
  STORE.score = 0;
}

/********** CALLBACK FUNCTION **********/
function handleQuiz() {
  renderQuiz();
  startQuiz();
  nextQuestion();
  submitAnswer();
  restartQuiz();
}

$(handleQuiz);