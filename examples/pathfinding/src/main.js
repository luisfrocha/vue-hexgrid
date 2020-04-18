import Vue from 'vue';
// @ts-ignore
import App from './App.vue';

Vue.config.productionTip = false;

// @ts-ignore
new Vue( { render: h => h( App ) } ).$mount( '#app' );
