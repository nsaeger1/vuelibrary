<template>
    <v-card class="mx-auto">
    <v-toolbar>
        <v-overflow-btn rounded background-color="primary" dense
                        :items="types" v-model="selected"/>
        <v-spacer/>
        <v-btn icon @click="testItem">
            <v-icon >mdi-export</v-icon>
        </v-btn>
        <v-btn icon @click="dialog=true">
            <v-icon >mdi-plus-circle</v-icon>
        </v-btn>
    </v-toolbar>

    <List  :type="selected" :auth-user="authUser" v-if="authUser"/>
        <Form :dialog="dialog" v-on:close-dialog="dialog=false" :auth-user="authUser"/>
    </v-card>
</template>

<script>
    import List from "@/components/List";
    import Form from "./Form";
    export default {
        name: "MediaTable",
        components: {
            Form,
            List,
        },
        props: {
            authUser: {required: true}
        },
        data() {
            return {
                dialog: false,
                selected: 'Library',
                types: ['Library','Wish List'],
            }
        },
        methods: {
          testItem() {
              this.$emit('test-item')
          }
        }
    }
</script>

<style scoped>

</style>