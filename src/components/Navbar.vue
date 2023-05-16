<template>
    <v-row class="ma-5">
        <v-spacer></v-spacer>
        <v-btn @click="logout">Выйти</v-btn>
    </v-row>
</template>

<script>
import state from '../helpers/state'

export default {
    methods: {
        logout() {
            state.setStatus('')
            this.$router.push('/')
        }
    }
}
</script>