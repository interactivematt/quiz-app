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
  score: 0
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

function generateStartScreen() {
  return `<div class="step" id="start-screen">
      <h3>I have a party trick where if someone names a movie, I can tell you the exact year (and maybe even month) that it came out.</h3>
      <p>Now it's your turn! Good luck.</p>
      <button type="submit" class="start-btn">Start Quiz</button>
  </div>`;
}

function generateQuizQuestion() {
  return `<div class="step" id="question">
  <ul id="total">
    <li class="question">You're on number {} out of 5.</li>
    <li class="score">{}/5 correct so far.</li>
  </div>
  <form id="question-form">
    <fieldset>
      <div class="question">
        <legend></legend>
      </div>
      <div class="answers">
        <div id="option-container-1">
          <input type="radio" name="options" id="option1" value="" tabindex="1" required>
          <label for="option1"></label>
        </div>
        <div id="option-container-2">
          <input type="radio" name="options" id="option2" value="" tabindex="2" required>
          <label for="option2"></label>
        </div>
        <div id="option-container-3">
          <input type="radio" name="options" id="option3" value="" tabindex="3" required>
          <label for="option3"></label>
        </div>
        <div id="option-container-4">
          <input type="radio" name="options" id="option4" value="" tabindex="4" required>
          <label for="option4"></label>
        </div>
      </div>
      <button>Submit</button>
    </fieldset>
  </form>
</div>`;
}

function generateSummary(){
  return `<div class="step" id="summary">
  <form>
    <fieldset>
      <div>
        <h3>You scored {} out of 5.</h3>
      </div>
      <button>Restart quiz</button>
    </fieldset>
  </form>
</div>`
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz(){
  console.log('`renderQuiz` ran');
  // render the start screen in the DOM
  $('main').html(generateStartScreen());
  return;
}



/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startQuiz() {
  // clicks start quiz
  $(`main`).on('click', '.start-btn', function (event) {
    console.log('`startQuiz` ran');
    STORE.quizStarted === false;
    renderQuiz();
  });
}

function nextQuestion() {
  // clicks to go to next question
  console.log('`nextQuestion` ran');
}

function submitAnswer() {
  // clicks submit answer
  console.log('`submitAnswer` ran');
}

function restartQuiz() {
  // clicks restart quiz
  console.log('`restartQuiz` ran');
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