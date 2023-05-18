<template>
    {{ setTestExam() }}
    <Navbar />
    <v-container>
        <ExamTitleCard :title="title" :author="author" :subject="subject" :description="description"/>

        <v-container>
            <h1>{{ getQuestion().text }}</h1>
            <v-row class="mt-3" style="text-align: start;" v-for="item in getQuestion().answers">
                <v-btn @click="response[index].answers[item.id - 1] = !response[index].answers[item.id - 1]" class="btn" :color="`${buttonColor(response[index].answers[item.id - 1])}-lighten-3`"></v-btn>
                <h3 class="pt-3 pl-2">{{ item.text }}</h3>
            </v-row>
        </v-container>

        <v-container>
            <v-btn v-if="this.index !== 0" class="mr-10" @click="previousQuestion">Назад</v-btn>
            <v-btn v-if="this.index + 1 !== this.maxIndex" class="ml-10" @click="nextQuestion">Следующий вопрос</v-btn>
            <v-btn v-if="this.index + 1 == this.maxIndex" class="ml-10" @click="finishExam">Завершить</v-btn>
        </v-container>

        <v-container>
            {{ this.response }}
        </v-container>
        
    </v-container>
</template>

<script>
import state from '../../helpers/state'

export default {
    data: () => ({
        title: '',
        description: '',
        author: '',
        subject: '',
        questions: '',

        answers: [],

        updated: false,
        index: 0,
        maxIndex: 0,

        response: []
    }),
    methods: {
        setAnswers () {
            let response = []
            let answers = []
            for (let i = 0; i < this.questions.length; i += 1) {
                for (let j = 0; j < this.questions[i].answers.length; j += 1) {
                    answers.push(false)
                }
                response.push({
                    id: i,
                    answers: answers
                })

                answers = []
            }

            return response
        },
        setTestExam() {
            const data = state.getTest()

            this.title = data.title
            this.description = data.description
            this.author = data.author
            this.subject = data.subject
            this.questions = data.questions

            this.response = this.setAnswers()
        },
        getQuestion() {
            if (this.updated == false) {
                for (let i = 0; i < this.questions[this.index].answers.length; i += 1) {
                    this.answers.push(false)
                }
                this.updated = true
            }

            this.maxIndex = this.questions.length

            return this.questions[this.index]
        },
        nextQuestion() {
            if (this.index + 1 < this.maxIndex) {
                this.index += 1
            }
        },
        previousQuestion() {
            if (this.index > 0) {
                this.index -= 1
            }
        },
        finishExam() {
            return this.response
        },
        buttonColor(bool) {
            if (bool) {
                return 'green'
            }
            else return 'red'
        }
    }
}
</script>

<style scoped>
  .btn {
    min-width: 40px;
    margin-top: 10px;
    margin-right: 10px;
  }
</style>