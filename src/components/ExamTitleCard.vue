<template>
    <v-card style="text-align: start;">
        <v-card-title class="bg-green">
            <v-row class="pa-2">
                <h3>{{ title }}</h3>
                <v-spacer/>
                <h3>{{ author }}</h3>
            </v-row>
        </v-card-title>
        <v-container class="pa-2">
            <h3 class="mb-1">{{ subject }}</h3>
            {{ description }}
        </v-container>
    </v-card>
</template>

<script>
export default {
    props: {
        title: String,
        author: String,
        subject: String,
        description: String
    }
}
</script>