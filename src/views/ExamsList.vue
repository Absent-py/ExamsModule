<template>
  <v-container>
    <v-container class="mb-5">
      <v-row>
        <h2>{{ author }}</h2>
        <v-spacer></v-spacer>
        <v-btn color="red-lighten-3" @click="exit"><h4>Выйти</h4></v-btn>
      </v-row>
    </v-container>
    <h1>Доступные тестирования</h1>
  </v-container>
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
        <v-btn v-if="dialog_type === 'none'" class="mt-9" block color="grey-darken-2" @click="">
          <h4>{{ dialog_button }}</h4>
        </v-btn>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ExamsList",
  data: () => ({
    author: 'Шевнина Юлия Сергеевна',

    dialog: false,
    dialog_text: '',
    dialog_button: '',
    dialog_type: '',
    dialog_data: 0
  }),
  methods: {
    exit() {
      this.dialog_text = 'Вы уверены, что хотите выйти?';
      this.dialog_button = 'Выйти';
      this.dialog_type = 'return';
      this.dialog = true;
    },
    returnToMain() {
      this.dialog = false;
      this.$router.push('/');
    }
  }
}
</script>