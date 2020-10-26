/**
 * Example store structure
 */
const store = {
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

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)