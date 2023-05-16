<template>
    <v-container>
      <v-container class="mb-5">
        <v-row>
          <h2>{{ author }}</h2>
          <v-spacer></v-spacer>
          <v-btn class="mr-5" color="grey-darken-2" @click="saveNExit"><h4>Сохранить и выйти</h4></v-btn>
          <v-btn color="red-lighten-3" @click="exit"><h4>Выйти</h4></v-btn>
        </v-row>
      </v-container>
      <h1 class="mb-15">Создание тестирования</h1>
  
      <v-row>
        <v-col>
          <v-card>
            <v-container>
              <h4>Введите название теста</h4>
              <v-text-field v-model="name" variant="underlined"></v-text-field>
              <h4>Выберите предметную область</h4>
              <v-combobox v-model="current_subject" :items="subjects" variant="underlined"></v-combobox>
              <h4>Введите описание теста</h4>
              <v-textarea v-model="description" variant="underlined"></v-textarea>
              <h4>Добавленные вопросы</h4>
              <v-container>
                <draggable
                    :disabled="tryToDrag()"
                    v-model="questions"
                    @start="drag=true"
                    @end="updateQuestions"
                    item-key="id">
                  <template #item="{element}">
                    <v-container>
                      <v-card>
                        <v-container>
                          <v-row>
                            <p class="mr-7">{{ element.id }}.</p>
                            <p>{{ element.text }}</p>
                            <v-spacer></v-spacer>
                            <v-btn v-if="edit_state === false" variant="plain" icon @click="editDialog(element.id)">
                              <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                            </v-btn>
                            <v-btn v-if="edit_state === false" variant="plain" icon @click="deleteQuestion(element.id)">
                              <font-awesome-icon icon="fa-solid fa-trash" />
                            </v-btn>
  
                          </v-row>
                          <v-row>
                            <p class="mr-7">Верные варианты:</p>
                            <p>{{ getRightAnswers(element.right) }}</p>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-container>
                  </template>
                </draggable>
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
              <p v-if="getQuestionType() > 1">Если процент совпавших ответов больше 50, а несовпавших меньше 50, тогда студент получит баллы за частично верный ответ</p>
  
              <v-container v-if="current_answer > 0" v-for="item in this.answers" :key="item">
                <p>Вариант ответа № {{ item.id }}</p>
                <v-container>
                  <v-row>
                    <v-btn class="btn" @click="toggleTrueQuestion(item.id)" v-if="item.truth === true" color="green-lighten-3"></v-btn>
                    <v-btn class="btn" @click="toggleTrueQuestion(item.id)" v-if="item.truth === false" color="red-lighten-3"></v-btn>
                    <v-text-field v-model="item.text"></v-text-field>
                    <v-btn class="ml-3" variant="plain" icon @click="deleteAnswer(item.id)">
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </v-btn>
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
          <v-card class="mt-5" color="red-lighten-3" v-if="edit_state === true">
            <v-container>
              <h4>Режим редактирования</h4>
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
          <v-btn v-if="dialog_type === 'return'" class="mt-9" block color="grey-darken-2" @click="returnToMain">
            <h4>{{ dialog_button }}</h4>
          </v-btn>
          <v-btn v-if="dialog_type === 'edit'" class="mt-9" block color="grey-darken-2" @click="editQuestion(dialog_data)">
            <h4>{{ dialog_button }}</h4>
          </v-btn>
          <v-btn v-if="dialog_type === 'none'" class="mt-9" block color="grey-darken-2" @click="">
            <h4>{{ dialog_button }}</h4>
          </v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import draggable from 'vuedraggable'
  import state from '../../helpers/state'
  
  export default {
    name: "ExamCreation",
    components: {
      draggable
    },
    data: () => ({
      drag: false,
  
      author: 'Шевнина Юлия Сергеевна',
  
      current_subject: '',
      subjects: [
          'Физика',
          'Химия',
          'Высшая математика',
          'Теория вероятностей',
          'Информационные системы и технологии',
          'Менеджмент',
          'Управление процессами'
      ],
  
      name: '',
      description: '',
  
      current_question: 1,
      question: '',
      questions: [],
      answers: [],
      current_answer: 0,
      test: [],
  
      score: 3,
      part_score: 1,
  
      snackbar: false,
      snackbar_text: '',
  
      dialog: false,
      dialog_text: '',
      dialog_button: '',
      dialog_type: '',
      dialog_data: 0,
  
      edit_state: false,
    }),
    methods: {
      tryToDrag() {
        if (this.edit_state === false) {
          return false;
        }
        else {
          return true;
        }
      },
      updateQuestions() {
        this.drag = false;
        for (let i = 0; i < this.questions.length; i++) {
          this.questions[i].id = i + 1;
        }
      },
      numberValidation(string) {
        let valid = '0123456789';
        if (string[0] === '0') {
          return false;
        }
        for (let i = 0; i < string.length; i++) {
          if (valid.includes(string[i]) === false) {
            return false;
          }
        }
        return true;
      },
      addAnswer() {
        this.answers.push({
          'id': this.current_answer + 1, 'text': '', 'truth': false
        });
        this.current_answer += 1;
        this.getQuestionType()
      },
      deleteAnswer(id) {
        let quantity = this.answers.length;
        this.answers.splice(id - 1, 1);
        for (let i = 0; i < this.answers.length; i++) {
          if (this.answers[i].id > id - 1) {
            this.answers[i].id -= 1;
          }
        }
        let new_quantity = this.answers.length;
        if (quantity !== new_quantity) {
          this.current_answer -= 1;
        }
      },
      toggleTrueQuestion(id) {
        this.answers[id - 1].truth = !this.answers[id - 1].truth;
      },
      editDialog(id) {
        this.dialog_text = 'Вы собираетесь отведактировать вопрос №' + id + '. Текущие данные будут удалены! Вы увереныы, что хотите продолжить?';
        this.dialog_button = 'Редактировать';
        this.dialog_type = 'edit';
        this.dialog_data = id;
        this.dialog = true;
      },
      editQuestion(id) {
        this.dialog = false;
  
        let current_question_data = this.questions[id - 1];
        this.current_question = current_question_data.id;
        this.question = current_question_data.text;
        this.answers = current_question_data.answers;
        this.current_answer = current_question_data.answers.length;
        this.score = current_question_data.score;
        this.part_score = current_question_data.part_score;
  
        this.edit_state = true;
      },
      deleteQuestion(id) {
        let quantity = this.questions.length;
        this.questions.splice(id - 1, 1);
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].id > id - 1) {
            this.questions[i].id -= 1;
          }
        }
        let new_quantity = this.questions.length;
        if (quantity !== new_quantity) {
          this.current_question -= 1;
        }
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
  
        let type;
        if (this.getQuestionType() === 1) {
          type = 'single';
        }
        else {
          type = 'multiple';
        }
  
        if (this.numberValidation(this.score) === false) {
          this.snackbar_text = 'Балл должен быть числом!';
          this.snackbar = true;
          return 0
        }
  
        if (type === 'multiple') {
          if (this.numberValidation(this.part_score) === false) {
            this.snackbar_text = 'Частичный балл должен быть числом!';
            this.snackbar = true;
            return 0
          }
  
          if (Number(this.part_score) >= Number(this.score)) {
            this.snackbar_text = 'Частичный балл не может быть больше суммарного!';
            this.snackbar = true;
            return 0
          }
        }
  
        let right = [];
        for (let i = 0; i < this.answers.length; i++) {
          if (this.answers[i].truth === true) {
            right.push(this.answers[i].text);
          }
        }
  
        if (this.edit_state === false) {
          this.questions.push({
            'id': this.current_question,
            'text': this.question,
            'answers': this.answers,
            'part_score': Number(this.part_score),
            'score': Number(this.score),
            'type': type,
            'right': right
          });
  
          this.current_question += 1;
          this.current_answer = 0;
          this.answers = [];
          this.question = '';
  
          this.score = 3;
          this.part_score = 1;
        }
        else {
          this.questions[this.dialog_data - 1] = {
            'id': this.current_question,
            'text': this.question,
            'answers': this.answers,
            'part_score': Number(this.part_score),
            'score': Number(this.score),
            'type': type,
            'right': right
          };
  
          this.current_question = this.questions.length + 1;
          this.current_answer = 0;
          this.answers = [];
          this.question = '';
  
          this.score = 3;
          this.part_score = 1;
  
          this.edit_state = false;
        }
  
      },
      commitTest() {
        if (this.name === '') {
          this.snackbar_text = 'Введите название тестирования!';
          this.snackbar = true;
          return 0;
        }
  
        if (this.current_subject === '') {
          this.snackbar_text = 'Укажите предметную область!';
          this.snackbar = true;
          return 0;
        }
  
        if (this.description === '') {
          this.snackbar_text = 'Введите описание тестирования!';
          this.snackbar = true;
          return 0;
        }
  
        if (this.questions.length < 1) {
          this.snackbar_text = 'Тест должен содержать хотя бы один вопрос!';
          this.snackbar = true;
          return 0;
        }
  
        let max_score = 0;
        for (let i = 0; i < this.questions.length; i++) {
          max_score += this.questions[i].score;
        }
  
        this.test = [{
          'title': this.name,
          'description': this.description,
          'author': this.author,
          'subject': this.current_subject,
          'questions': this.questions,
          'max_score': max_score
        }];

        state.addExam(this.test[0])
  
        this.dialog_text = 'Ваш тест полностью готов! Если вы уверены, что все заполнено правильно, то можете переходить к просмотру теста';
        this.dialog_button = 'Перейти к тесту';
        this.dialog_type = 'return';
        this.dialog = true;
      },
      downloadTest() {
        // Write some code!!!
        this.dialog_text = 'Вы можете экспортировать тест в формате jSON, потом его можно будет также импортировать';
        this.dialog_button = 'Сохранить тест';
        this.dialog_type = 'none';
        this.dialog = true;
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
      exit() {
        this.dialog_text = 'Вы уверены, что хотите выйти? Данное тестирование не будет сохранено!';
        this.dialog_button = 'Выйти';
        this.dialog_type = 'return';
        this.dialog = true;
      },
      saveNExit() {
        // Write some code!!!
        this.dialog_text = 'Вы можете выйти из текущего тестирования с сохранением промежуточного варианта, сможете продолжить, когда вы вернетесь!';
        this.dialog_button = 'Сохранить и выйти';
        this.dialog_type = 'return';
        this.dialog = true;
      },
      returnToMain() {
        this.dialog = false;
        this.$router.push('/');
      }
    },
  }
  </script>
  
  <style scoped>
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