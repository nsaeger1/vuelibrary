<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-row>
                <v-col>
                    Step One:
                </v-col>
            </v-row>
            <v-card-title>

                <v-row>
                    <v-col cols="9">
                        <v-text-field label="Search" v-model="searchTerm"/>
                    </v-col>
                    <v-spacer/>
                    <v-col>
                        <v-btn color="blue darken-1" @click="searchBooks">search</v-btn>
                    </v-col>
                </v-row>
                <v-data-table :headers="headers" :items="searchResults" v-if="searchResults.length>1">
                    <template v-slot:item.actions="{item}">
                        <v-btn icon>
                            <v-icon small class="mr-2" @click="selectGame(item)">mdi-alpha-s-circle</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-card-title>
            <v-row>
                <v-col>
                    Step Two:
                </v-col>
            </v-row>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Name" v-model="newGame.name"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Min Players" v-model="newGame.minPlayers"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Max Players" v-model="newGame.maxPlayers"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="Avg Game Time" v-model="newGame.avgTime"></v-text-field>
                    </v-col>
                </v-row>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Close</v-btn>
                <v-btn color="blue darken-1" @click="add">Add
                </v-btn>
                <v-btn color="blue darken-1" text></v-btn>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import db from './firebaseInit'
    import axios from 'axios'

    export default {
        name: "Form",
        props: {
            dialog: {
                type: Boolean,
                required: true,
            },
            authUser: {
                required: true,
            },
            item: {
                type: Array
            },
            types: {
                type: Array
            },
        },
        data() {
            return {
                newGame: new Game(),
                message: '',
                searchTerm: 'flux',
                searchResults: [],
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
            }
        },
        methods: {
            close: function () {
                this.newGame = new Game();
                this.$emit('close-dialog');
            },
            add: function () {
                let theGame = this.newGame;
                db.collection('Users').doc(this.authUser.uid).collection(this.type)
                    .add(theGame)
                    .then((docRef) => {
                        console.log("Document written:", docRef);
                        this.close();
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error)
                    });
                this.close();
            },
            selectGame(item) {
                const index = this.searchResults.indexOf(item);
                this.newGame = this.searchResults[index];
                this.searchResults.length = 0;
            },

            searchBooks() {
                // prepare and perform search
                if (this.searchTerm) {
                    // clear results
                        this.searchResults.length = 0;

                    // display message
                    this.searching = true;

                    // build request arguments

                    let url = 'https://www.boardgameatlas.com/api/search';
                    let config = {
                        params: {
                            name: this.searchTerm,
                            client_id: 'dElk5osZ5x',
                            fuzzy_match: "true",
                        },
                    };

                    // execute ajax request using promises

                    axios
                        .get(url, config)
                        .then((response) => {
                            console.log(response.data);

                            response.data.games.forEach(testGame =>
                                this.searchResults.push(new Game(testGame.id, testGame.name, testGame.min_players, testGame.max_players, (testGame.max_playtime + testGame.min_playtime) / 2))
                            );

                        })
                        .catch(error => {
                            //a bad search term or internet
                            console.error('AJAX SEARCH ERROR', error)
                            // TODO: let user know
                        })
                        .finally(() => {
                            this.searching = false;

                        })

                }
            },
        },
        mounted() {
        },
    }

    let Game = function (id, name, min, max, avg) {
        return {
            id: id || null,
            name: name || '',
            minPlayers: min || 2,
            maxPlayers: max || 4,
            avgTime: avg || 120,
        };

    }
</script>

<style scoped>

</style>