import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCbCQsbgZ8sKKxkimanv8Xd55j38q2ph-A",
  authDomain: "movie-recommender-4119d.firebaseapp.com",
  databaseURL: "https://movie-recommender-4119d.firebaseio.com",
  projectId: "movie-recommender-4119d",
  storageBucket: "movie-recommender-4119d.appspot.com",
  messagingSenderId: "174959934551",
  appId: "1:174959934551:web:3e11a038505b1c873bf712",
  measurementId: "G-RQX640ETHM"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
