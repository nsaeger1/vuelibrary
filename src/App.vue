
<template>
  <v-app id="library">
    <v-navigation-drawer
            :src="'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'"
            app
            clipped
            permanent
            width="200px"
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-all-inclusive</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item >
          <v-list-item-action>
            <v-icon>mdi-gamepad</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><router-link to="/library">Library</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item >
          <v-list-item-action>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title><router-link to="/cart">Cart</router-link></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="login">
          <v-list-item-action>
            <v-icon>mdi-library</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
            app
            clipped-left
            color="primary"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Library</v-toolbar-title>
      <v-spacer/>
      <v-avatar v-if="authUser"><img :src="authUser.photoURL"></v-avatar>
      <v-switch v-model="$vuetify.theme.dark"/>

    </v-app-bar>

    <v-content>
      <router-view :auth-user="authUser"/>
      <!--<v-container fluid fill-height>
        <MediaTable :types="types" :library="library" @test-item="testItem"/>
        <Form :types="types.reduce((arr, type) => arr.concat(type.id), [])"/>

      </v-container>-->
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import firebase from 'firebase';
  import './components/firebaseInit'
  export default {
    name: 'App',
    components: {
      //MediaTable,
     // Form,
    },
    data() {
      return {

        tempItem: {},
        authUser: null,
      }
    },
    methods: {
      login() {
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
        //.signInWithEmailAndPassword(email, password)
                .signInWithPopup(provider)
                .catch(function (error) {
                  // Handle Errors here.
                  //let errorCode = error.code;
                 // let errorMessage = error.message;

                  console.log(error);
                });

      },
      testItem() {
        //let newItem = new Game('Millennium Blades', 1,8, 140,);
       // console.log(newItem)
      },
      removeGame: function (game) {
        this.games.splice(this.games.indexOf(game), 1);
      },
      addItem() {
        this.dialog = true;
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

      filter: function (filter) {
        this.filterType = filter;
      },
    },
    computed: {},
    created: function() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          /*let photoURL = user.photoURL;
          var displayName = user.displayName;
          var email = user.email;
          var uid = user.uid;*/
          //store the logged in user in our app

          //this.authUser = user;  // without custom model setup
          this.authUser = new User(user);
          console.log('Signed in as: ', this.authUser);

        } else {
          // User is signed out.
          console.log('Not signed in.');

          this.authUser = null
        }
      });
    },

  }
  let User = function(firebaseUser ){
    let m = {
      displayName: '',
      email: '',
      photoURL: '',
      uid: '',
    };

    if(firebaseUser){
      m.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
      m.email = firebaseUser.email ? firebaseUser.email : '';
      m.photoURL = firebaseUser.photoURL ? firebaseUser.photoURL : '';
      m.uid = firebaseUser.uid ? firebaseUser.uid : '';
    }

    return m;
  }


</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
