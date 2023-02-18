<template>
  <v-container >
    <h1 class="mb-15">Создание тестирования</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <h4>Введите название теста</h4>
            <v-text-field v-model="name" variant="underlined"></v-text-field>
            <h4>Введите описание теста</h4>
            <v-textarea v-model="description" variant="underlined"></v-textarea>
            <h4>Добавленные вопросы</h4>
            <v-container v-for="item in this.questions" :key="item">
              <v-card>
                <v-container>
                  <v-row>
                    <p class="mr-7">{{ item.id }}.</p>
                    <p>{{ item.text }}</p>
                  </v-row>
                  <v-row>
                    <p class="mr-7">Верные варианты:</p>
                    <p>{{ getRightAnswers(item.right) }}</p>
                  </v-row>
                </v-container>
              </v-card>
            </v-container>
            <v-container>
              <v-row>
                <v-btn color="grey-darken-2" class="mt-5 ml-15" @click="commitTest"><h4>Сохранить тест</h4></v-btn>
                <v-spacer></v-spacer>
                <v-btn color="grey-darken-2" class="mt-5 mr-15" @click="downloadTest"><h4>Экспорт JSON</h4></v-btn>
              </v-row>
            </v-container>
          </v-container>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-container>
            <h4>Введите текст вопроса № {{ current_question }}</h4>
            <v-textarea v-model="question" variant="underlined"></v-textarea>

            <p v-if="getQuestionType() === 1">Данный вопрос с выбором одного варианта ответа</p>
            <p v-if="getQuestionType() > 1">Данный вопрос с множественным выбором ответов</p>

            <v-container v-if="current_answer > 0" v-for="item in this.answers" :key="item">
              <p>Вариант ответа № {{ item.id }}</p>
              <v-container>
                <v-row>
                  <v-btn class="btn" @click="toggleTrueQuestion(item.id)" v-if="item.truth === true" color="green-lighten-3"></v-btn>
                  <v-btn class="btn" @click="toggleTrueQuestion(item.id)" v-if="item.truth === false" color="red-lighten-3"></v-btn>
                  <v-text-field v-model="item.text"></v-text-field>
                </v-row>
              </v-container>
            </v-container>

            <v-card color="grey-darken-2" class="card_btn" @click="addAnswer()">
              <v-container>
                <v-row>
                  <h4 class="ml-5 small-margin">Добавить вариант ответа</h4>
                  <v-spacer></v-spacer>
                  <font-awesome-icon class="fa-2x" icon="fa-solid fa-plus" />
                </v-row>
              </v-container>
            </v-card>

            <v-container>
              <div v-if="getQuestionType() === 1">
                <p>Баллы за правильный ответ</p>
                <v-text-field v-model="score"></v-text-field>
              </div>
              <div v-if="getQuestionType() > 1">
                <p>Баллы за частично правильный ответ</p>
                <v-text-field v-model="part_score"></v-text-field>
                <p>Баллы за правильный ответ</p>
                <v-text-field v-model="score"></v-text-field>
              </div>

            </v-container>

            <v-btn color="grey-darken-2" @click="commit_question()"><h4>Сохранить вопрос</h4></v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar color="red-lighten-3" rounded="pill" v-model="snackbar">
    <p>{{ snackbar_text }}</p>
    <template v-slot:actions></template>
  </v-snackbar>
  <v-dialog
      v-model="dialog"
      width="auto"
  >
    <template v-slot:activator="{ props }">
    </template>
    <v-card>
      <v-container align="center">
        <h4>{{ dialog_text }}</h4>
        <v-btn class="mt-9" block color="grey-darken-2" @click="dialog = false">
          <h4>{{ dialog_button }}</h4>
        </v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ExamCreation",
  data: () => ({
    name: '',
    description: '',

    current_question: 1,
    question: '',
    questions: [],
    answers: [],
    current_answer: 0,
    test: [],

    score: 1,
    part_score: 1,

    snackbar: false,
    snackbar_text: '',

    dialog: false,
    dialog_text: '',
    dialog_button: '',
  }),
  methods: {
    addAnswer() {
      this.answers.push({
        'id': this.current_answer + 1, 'text': '', 'truth': false
      });
      this.current_answer += 1;
      this.getQuestionType()
    },
    toggleTrueQuestion(id) {
      this.answers[id - 1].truth = !this.answers[id - 1].truth;
    },
    commit_question() {
      if (this.question === '') {
        this.snackbar_text = 'Введите вопрос!';
        this.snackbar = true;
        return 0;
      }

      if (this.answers.length < 1) {
        this.snackbar_text = 'Добавить хотя бы один вариант ответа!';
        this.snackbar = true;
        return 0;
      }

      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].text === '') {
          this.snackbar_text = 'Введите все варианты ответа!';
          this.snackbar = true;
          return 0
        }
      }

      if (this.getQuestionType() < 1) {
        this.snackbar_text = 'Должен быть хотя бы один правильный вариант ответа!';
        this.snackbar = true;
        return 0
      }

      let right = [];
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].truth === true) {
          right.push(this.answers[i].text);
        }
      }

      let type;
      if (this.getQuestionType() === 1) {
        type = 'single';
      }
      else {
        type = 'multiple';
      }

      this.questions.push({
        'id': this.current_question,
        'text': this.question,
        'answers': this.answers,
        'part_score': this.part_score,
        'score': Number(this.score),
        'type': type,
        'right': right
      });

      this.current_question += 1;
      this.current_answer = 0;

      this.answers = [];
      this.question = '';
    },
    commitTest() {
      let max_score = 0;
      for (let i = 0; i < this.questions.length; i++) {
        max_score += this.questions[i].score;
      }

      this.test = [{
        'title': this.name,
        'description': this.description,
        'questions': this.questions,
        'max_score': max_score
      }];
      this.dialog = true;
      this.dialog_text = 'Ваш тест полностью готов! Если вы уверены, что все заполнено правильно, то можете переходить к просмотру теста';
      this.dialog_button = 'Перейти к тесту';
    },
    downloadTest() {

      this.dialog = true;
      this.dialog_text = 'Вы можете экспортировать тест в формате jSON, потом его можно будет также импортировать';
      this.dialog_button = 'Сохранить тест';
    },
    getQuestionType() {
      let count = 0;
      for (let i = 0; i < this.answers.length; i++) {
        if (this.answers[i].truth === true) {
          count++;
        }
      }
      return count;
    },
    getRightAnswers(array) {
      let answers = '';
      for (let i = 0; i < array.length; i++) {
        answers += array[i] + ' ';
      }
      return answers;
    },
  },
}
</script>

<style>
.card_btn {
  width: 80%;
  margin: auto auto 30px;
}
.btn {
  min-width: 40px;
  margin-top: 10px;
  margin-right: 10px;
}
.small-margin {
  margin-top: 2px;
}
</style>
