<template>
    <v-app id="library">
        <v-navigation-drawer
                :src="'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'"
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item @click="filter(0)">
                    <v-list-item-action>
                        <v-icon>mdi-all-inclusive</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="filter(1)">
                    <v-list-item-action>
                        <v-icon>mdi-gamepad</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Games</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="filter(2)">
                    <v-list-item-action>
                        <v-icon>mdi-library</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Books</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
                app
                clipped-left
                color="primary"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Library</v-toolbar-title>
            <v-spacer/>
            <v-switch v-model="$vuetify.theme.dark"/>

        </v-app-bar>

        <v-content>
            <v-container fluid fill-height>
                <MediaTable :types="types" :library="library" @test-item="testItem"/>
                <Form :types="types.reduce((arr, type) => arr.concat(type.id), [])"/>

            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    var firebaseConfig = {
        apiKey: "AIzaSyD_q3tf35Oc_CGJ3XNlWcKoEYdbdXlw92A",
        authDomain: "aechs-basement.firebaseapp.com",
        databaseURL: "https://aechs-basement.firebaseio.com",
        projectId: "aechs-basement",
        storageBucket: "aechs-basement.appspot.com",
        messagingSenderId: "646280503808",
        appId: "1:646280503808:web:644498bd3452a1e2b42ee5",
        measurementId: "G-JMS34YF3ES"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    import Form from "@/components/Form";
    import MediaTable from "@/components/MediaTable";
    import firebase from 'firebase';

    const db = firebase.firestore();
    export default {
        name: 'App',
        components: {
            MediaTable,
            Form,
        },
        data() {
            return {
                drawer: false,
                filterType: 0,
                newItem: {
                    name: '',
                    players: [2, 4],
                    avgTime: 30,
                    pages: 450,
                },
                types: [],
                library: [
                    //new LibraryItem(new Item('Game', {name: 'Millennium Blades', minPlayer: 1, maxPlayer: 8, avgTime: 140,})),
                    //new LibraryItem(new Item('Book', {title: 'Harry Potter', pages: 435})),
                    //new LibraryItem(new Item('Book', {title: 'Wizards First Rule', pages: 435})),
                    //new LibraryItem(new Item('Magazine', {title: 'Spider Man', pages: 35, issue: 34})),
                    //new LibraryItem(new Item('Book', {title: 'Ender\'s Game', pages: 350,})),
                    //new LibraryItem(new Item('Game', {name: 'Munchkin', minPlayers: 2, maxPlayer: 6, avgTime: 30,})),
                    //new LibraryItem(new Item('Game', {name: 'Clank', minPlayers: 2, maxPlayer: 4, avgTime: 45,})),
                    //new LibraryItem(new Item('Movie', {title: 'Princess Bride', runTime: 98, rating: 5})),
                    //new LibraryItem(new Item('Computer', {Brand: 'Asus', RAM: 16, Graphics: 'Nvidia', hardrive: '1TB'})),

                ],
                tempItem: {},
            }
        },
        firestore: {
          //library: db.collection('Items')
            types: db.collection('Types')
        },
        methods: {
            testItem() {
                let newItem = new LibraryItem(new Item('Game', {name: 'Millennium Blades', minPlayer: 1, maxPlayer: 8, avgTime: 140,}));
                console.log(newItem)
                db.collection('Items').add(newItem)
            },
            removeGame: function (game) {
                this.games.splice(this.games.indexOf(game), 1);
            },
            removeBook: function (book) {
                this.books.splice(this.books.indexOf(book), 1)
            },
            addItem(item) {
                this.dialog = true;
                this.selected = item;
            },
            editItem(item) {
                this.newItem = item;
                this.tempItem = {};
                Object.assign(this.tempItem, item);
                if (item.players) {
                    this.newItem.game = true;
                }
                this.newItem.editing = true;
                this.item = item.players ? 'Game' : 'Book';
                this.dialog = true;
            },
            closeItem: function () {
                if (this.newItem.editing) {
                    Object.assign(this.newItem, this.tempItem)
                }
                this.dialog = false;
                setTimeout(() => this.newItem = {
                    name: '',
                    players: [2, 4],
                    avgTime: 30,
                    pages: 450,
                });
            },
            saveItem: function (type, traits) {
               new LibraryItem(new Item(type, traits))
            },
            filter: function (filter) {
                this.filterType = filter;
            },
        },
        computed: {
           /* types: function () {
                let array = [];
                this.library.forEach(obj =>
                    array.push(obj.mediaType())
                );
                return [...new Set(array)];
                //return this.library.reduce((unique, item) => unique.include(item) ? unique : [...unique, item], [])
            },*/
            selectedTraits: function () {

                return false;
            }

        },
        mounted: function () {
            if (localStorage.getItem('books')) {
                this.books = JSON.parse(localStorage.getItem('books'));
            }
            if (localStorage.getItem('games')) {
                this.games = JSON.parse(localStorage.getItem('games'));
            }
        },
        watch: {
            games: {
                handler: function (newList) {
                    localStorage.setItem('games', JSON.stringify(newList))
                },
                deep: true,
            },
            books: {
                handler: function (newList) {
                    localStorage.setItem('books', JSON.stringify(newList))
                },
                deep: true,
            }
        },
        created() {
            this.$bind('Types', db.collection('Types'))
                .then(types => {
                    console.log(types.reduce((arr, type) => arr.concat(type.id), []))
                })
            this.$bind('Items', db.collection('Items'))
                .then(items => {
                    console.log(items[0].type)
                    items.forEach(item => this.library.push(new LibraryItem(new Item(item.type, item.traits))))

                })

        }
    }

    function LibraryItem(media) {
        this.media = media;

        this.mediaType = function () {
            return this.media.type;
        };
    }

    function Item(type, traits) {
        this.type = type;
        this.traits = traits;
    }

</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
