<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>

                <v-overflow-btn v-model="selected" :items="types"/>

                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name" ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Players" ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Game Time" ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Close</v-btn>
                <v-btn color="blue darken-1" text  >Add
                </v-btn>
                <v-btn color="blue darken-1" text ></v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import EventBus from "@/main.js";

    export default {
        name: "Form",
        props: {
            item: {
                type: Array
            },
            types: {
                type: Array
            },
        },
        data() {
            return {
                dialog: false,
                selected: null,
            }
        },
        methods: {
          close: function () {
              this.dialog = false;
          }
        },

        mounted() {
            EventBus.$on('add-item', selected => {
                this.selected = selected;
                this.dialog = true;
            });
        },
    }
</script>

<style scoped>

</style>