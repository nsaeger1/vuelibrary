<template>
    <div>
        <v-data-table :headers="headers" :items="library">
            <template v-slot:item.actions="{ item }">
                <v-btn icon>
                    <v-icon small class="mr-2" @click="ediGame(item)">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon small @click="deleteGame(item)">mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import db from './firebaseInit'

    export default {
        name: "List",
        components: {},
        data() {
            return {
                selected: null,
                headers: [
                    {
                        text: 'Name',
                        value: 'name',
                    },
                    {
                        text: 'Min Players',
                        value: 'minPlayers',
                    },
                    {
                        text: 'Max Players',
                        value: 'maxPlayers',
                    },
                    {
                        text: 'Avg Time',
                        value: 'avgTime',
                    },
                    {
                        value: 'actions',
                    },
                ],
                library: [],
                test: [],

            }
        },
        props: {
            type: {type: String},
            authUser: {required: true},
        },
        methods: {
            removeGame() {
                //TODO remove Game
            },
            ediGame() {
                //const index = this.library.indexOf(item)
                //console.log(this.library[index])
                //console.log(this.test[0].id)
                this.test = db.collection('Users').doc(this.authUser.uid).collection('Wish List')

            },
            deleteGame(item) {
                const index = this.library.indexOf(item)
                confirm('Are you sure you want to delete this item?') &&
                db.collection('Games')
                    .doc(this.library[index].id).delete()
            }


        },
        firestore(){
            return {
                //library: db.collection('Games'),
                library: db.collection('Users').doc(this.authUser.uid).collection(this.type)
            }
        },
    }
</script>

<style scoped>

</style>