<template>
    <Navbar />
    <v-container>
        <v-card>
            <v-card-title>Вы вошли как преподаватель</v-card-title>
            Для вас как преподавателя доступен функционал создания тестирований, их импорт и экспорт, а также просмотр тестирований с отображением верных ответов
        </v-card>

        <RouterCard title="Создание тестирования" routerPath="/teacher/exam/create/"/>

        <v-card class="mt-5">
            {{ getExam() }}
        </v-card>

    </v-container>
</template>

<script>
import state from '../../helpers/state'
export default {
    methods: {
        getExam() {
            return state.getExam()
        }
    }
}
</script>