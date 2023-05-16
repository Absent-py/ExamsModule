<template>
    <v-container>
        <v-card class="pa-3">
            Это демонстрация системы. Для начала выберите статус зарегистированного пользователя
        </v-card>
        <v-row class="mt-5 mb-5">
            <v-col>
                <v-btn @click="status = 'student'" class="button" block>Студент</v-btn>
            </v-col>
            <v-col>
                <v-btn @click="status = 'teacher'" class="button" block>Преподаватель</v-btn>
            </v-col>
        </v-row>

        <v-card v-if="status == 'student'" style="text-align: start;">
            <v-card-title>Система дает возможности для студента:</v-card-title>
            <ul class="ml-10">
                <li>Прохождения тестирования</li>
                <li>Получения результатов прохождения</li>
            </ul>
            <v-btn @click="commitStatus" class="mt-3" block>Начать как студент</v-btn>
        </v-card>

        <v-card v-if="status == 'teacher'" style="text-align: start;">
            <v-card-title>Система дает возможности для преподавателя:</v-card-title>
            <ul class="ml-10">
                <li>Создание тестирования</li>
                <li>Импорт / экспорт прохождения</li>
                <li>Просмотр тестирования</li>
            </ul>
            <v-btn @click="commitStatus" class="mt-3" block>Начать как преподаватель</v-btn>
        </v-card>

    </v-container>
</template>

<script>
import State from '../helpers/state'

export default {
    data: () => ({
        status: ''
    }),
    methods: {
        commitStatus() {
            State.setStatus(this.status)
            this.$router.push('/teacher/')
        }
    }
}
</script>

<style scoped>
.button {
    min-height: 50px;
}
</style>