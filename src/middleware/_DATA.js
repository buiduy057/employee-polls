let users = {
  maisamaximo: {
    id: "maisamaximo",
    password: "12345",
    name: "Maisa Maximo",
    avatarURL:
      "https://cdn.pixabay.com/photo/2018/10/29/21/46/human-3782189_1280.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  jsdaniell: {
    id: "jsdaniell",
    password: "password123",
    name: "José Daniel",
    avatarURL:
      "https://cdn.pixabay.com/photo/2023/03/02/11/38/man-7825138_1280.jpg",
    answers: {
      vthrdm985a262al8qx3do: "optionOne",
      xj352vofupe1dqz9emx13r: "optionTwo",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  diego3g: {
    id: "diego3g",
    password: "password123",
    name: "Diego Fernandes",
    avatarURL:
      "https://cdn.pixabay.com/photo/2019/12/04/09/30/man-4672229_1280.jpg",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  kubowania: {
    id: "kubowania",
    password: "password123",
    name: "Ania Kubow",
    avatarURL:
      "https://cdn.pixabay.com/photo/2020/10/28/14/01/man-5693573_640.jpg",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
    },
    questions: [],
  },
};

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "maisamaximo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["maisamaximo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "diego3g",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "Hire more frontend developers",
    },
    optionTwo: {
      votes: ["diego3g", "maisamaximo"],
      text: "Hire more backend developers",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "maisamaximo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "Conduct a release retrospective 1 week after a release",
    },
    optionTwo: {
      votes: ["maisamaximo"],
      text: "Conduct release retrospectives quarterly",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "jsdaniell",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "Have code reviews conducted by peers",
    },
    optionTwo: {
      votes: ["maisamaximo"],
      text: "Have code reviews conducted by managers",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "jsdaniell",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["jsdaniell"],
      text: "Take a course on ReactJS",
    },
    optionTwo: {
      votes: ["diego3g"],
      text: "Take a course on unit testing with Jest",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "diego3g",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["diego3g", "kubowania"],
      text: "Deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["jsdaniell"],
      text: "Deploy to production once every month",
    },
  },
};

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: author.id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question) {
  return new Promise((resolve, reject) => {
    if (
      !question.optionOneText ||
      !question.optionTwoText ||
      !question.author
    ) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      resolve(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      resolve(true);
    }, 500);
  });
}
