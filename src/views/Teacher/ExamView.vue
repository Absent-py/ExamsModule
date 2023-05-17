<template>
    {{ setTestExam() }}
    <Navbar />
    <v-container>
        <ExamTitleCard :title="title" :author="author" :subject="subject" :description="description"/>

        <v-container>
            <h1>{{ getQuestion().text }}</h1>
            <v-row class="mt-3" style="text-align: start;" v-for="item in getQuestion().answers">
                <v-btn @click="answers[item.id - 1] = !answers[item.id - 1]" class="btn" :color="`${buttonColor(answers[item.id - 1])}-lighten-3`"></v-btn>
                <h3 class="pt-3 pl-2">{{ item.text }}</h3>
            </v-row>
        </v-container>

        <v-container>
            <v-btn class="mr-10" @click="previousQuestion">Назад</v-btn>
            <v-btn v-if="this.index + 1 !== this.maxIndex" class="ml-10" @click="nextQuestion">Следующий вопрос</v-btn>
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
        setTestExam() {
            const data = state.getTest()

            this.title = data.title
            this.description = data.description
            this.author = data.author
            this.subject = data.subject
            this.questions = data.questions
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
            this.response.push({
                id: this.index,
                answers: this.answers
            })

            this.answers = []
            this.updated = false

            if (this.index + 1 < this.maxIndex) {
                this.index += 1
            }
        },
        previousQuestion() {
            this.index -= 1
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