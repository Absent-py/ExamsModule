<template>
  <v-container class="container">
    <h1 class="mb-5">Exams Module</h1>
    <v-card class="card">
      <p>Данный модуль предназначен для создания и прохождения тестирований, обработки результатов, а также их импорт и экспорта. Проект выполнен на Фреймворке Vue.js 3 + Vite + TS + Vuetify.</p>
    </v-card>
    <v-card class="card" @click="$router.push('/create')">
      <v-card-text>
        <v-row align="center" justify="center">
          <p>1. Перейдите во вкладку 'Создание тестирования'</p>
          <v-spacer></v-spacer>
          <font-awesome-icon class="fa-2x" icon="fa-solid fa-plus" />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Start"
}
</script>

<style scoped>
.container {
  max-width: 80%;
}
.card {
  max-width: 70%;
  margin: auto auto 30px;
  padding: 10px;
}
</style>
