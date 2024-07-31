import { createApp } from 'vue';
import App from './App.vue';
import "./style.css"
import "primeicons/primeicons.css";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Card from 'primevue/card';
import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);
app.component('InputText', InputText);
app.component('FloatLabel', FloatLabel);
app.component('Card', Card);
app.component('Dialog', Dialog);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);

app.mount('#app');
