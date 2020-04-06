import Vue from 'vue'
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import firebase from "firebase";
import {firestorePlugin} from "vuefire";

Vue.config.productionTip = false;
Vue.use(Vuetify);
const EventBus = new Vue();
export default EventBus;


//firebase.analytics();

Vue.use(firebase)
Vue.use(firestorePlugin)

new Vue({
  vuetify: new Vuetify({
    theme: {
      dark: true,
    }
  }),
  render: h => h(App),
}).$mount('#app');
