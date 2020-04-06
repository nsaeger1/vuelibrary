<template>
    <v-card class="mx-auto">
    <v-toolbar>
        <v-overflow-btn rounded background-color="primary" dense
                        :items="types" v-model="selected"/>
        <v-spacer/>
        <v-btn icon @click="testItem">
            <v-icon >mdi-export</v-icon>
        </v-btn>
        <v-btn icon @click="addItem">
            <v-icon >mdi-plus-circle</v-icon>
        </v-btn>
    </v-toolbar>

    <List :library="library" :type="selected"/>
    </v-card>
</template>

<script>
    import List from "@/components/List";
    import EventBus from "@/main.js";
    export default {
        name: "MediaTable",
        components: {
            List,
        },
        props: {
            types: {
                type: Array,
            },
            library: {
                type: Array,
            },
        },
        data() {
            return {
                selected: 'Game'
            }
        },
        methods: {
          addItem() {
              EventBus.$emit('add-item', this.selected);
          },
          testItem() {
              this.$emit('test-item')
          }
        }
    }
</script>

<style scoped>

</style>