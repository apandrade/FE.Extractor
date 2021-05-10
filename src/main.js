import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Panel from 'primevue/panel';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';
import Menubar from 'primevue/menubar';
import Fieldset from 'primevue/fieldset';
import InputSwitch from 'primevue/inputswitch';
import Chart from 'primevue/chart';
import ProgressSpinner from 'primevue/progressspinner';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import axios from 'axios';
import VueAxios from 'vue-axios';
import titleMixin from './mixins/titleMixin';

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

const app = createApp(App)
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(VueAxios, axios)
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Panel', Panel);
app.component('ScrollPanel', ScrollPanel);
app.component('Menubar', Menubar);
app.component('Card', Card);
app.component('Fieldset', Fieldset);
app.component('InputSwitch', InputSwitch);
app.component('Chart', Chart);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Toast', Toast);
app.mixin(titleMixin);
app.mount('#app');

