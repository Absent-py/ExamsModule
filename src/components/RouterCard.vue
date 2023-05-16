<template>
    <v-card class="pa-1 mt-5" @click="this.$router.push(routerPath)">
        <v-card-title>{{ this.title }}</v-card-title>
    </v-card>
</template>

<script>
export default {
    props: {
        title: String,
        routerPath: String,
        icon: String
    }
}
</script>