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
      correctAnswer: '1993'
    },
    {
      question: 'What year was The Matrix released in theaters?',
      answers: [
        '2005',
        '2003',
        '2001',
        '1999'
      ],
      correctAnswer: '1999'
    },
    {
      question: 'What year was The Dark Knight released in theaters?',
      answers: [
        '2011',
        '2010',
        '2008',
        '2004'
      ],
      correctAnswer: '2008'
    },
    {
      question: 'What year was Toy Story released in theaters?',
      answers: [
        '1992',
        '1995',
        '1998',
        '2000'
      ],
      correctAnswer: '1995'
    },
    {
      question: 'What year was Back to the Future released in theaters?',
      answers: [
        '1985',
        '1987',
        '1980',
        '1991'
      ],
      correctAnswer: '1985'
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
    <h3>I have a party trick where if someone names a movie, I can tell you the exact year (and maybe even month) that it came out.</h3>
    <p>Now it's your turn! Good luck.</p>
    <button type="button" id="start-btn">Start Quiz</button>
</div>`;
}

function questionsHeader() {
  return `
  <ul id="total">
    <li class="question">You're on number ${STORE.currentQuestion + 1} out of ${STORE.questions.length}.</li>
    <li class="score">${STORE.score}/${STORE.questions.length} answers correct so far.</li>
  </ul>
  `;
}

function questions() {
  let currentQuestion = STORE.questions[STORE.currentQuestion];
  return `
    <form id="question-form">
      <fieldset>
          <div class="question">
              <legend> ${currentQuestion.question}</legend>
          </div>
          <div class="answers">
            ${answers()}
          </div>
        <button type="submit" id="answer-btn" tabindex="5">Submit</button>
        <button type="button" id="next-btn" tabindex="6"> Next Question </button>
      </fieldset>
    </form >
  `;
  
}

function answers() {
  const answerList = STORE.questions[STORE.currentQuestion].answers;
  let html = '';
  let i = 0;

  answerList.forEach(answer => {
    html += `
      <div id="option-container-${i}">
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
      <form>
          <fieldset>
          <div>
            <legend>
              <h3>You scored ${STORE.score} out of ${STORE.questions.length}.</h3>
            </legend>
          </div>
          <button type="button" id="reset-btn">Reset</button>
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
      <div class="wrong-answer">That is incorrect. The correct answer is ${correctAnswer}.</div>
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