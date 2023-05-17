<template>
    <Navbar />
    <v-container>
        <v-card>
            <v-card-title>Вы вошли как преподаватель</v-card-title>
            Для вас как преподавателя доступен функционал создания тестирований, их импорт и экспорт, а также просмотр тестирований с отображением верных ответов
        </v-card>

        <RouterCard title="Создание тестирования" routerPath="/teacher/exam/create/"/>

        <RouterCard title="Просмотр тестирования" routerPath="/teacher/exam/view/"/>

    </v-container>
</template>
