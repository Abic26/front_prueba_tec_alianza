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
import Tooltip from 'primevue/tooltip';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import router from './router'

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
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('Password', Password);
app.component('Checkbox', Checkbox);
app.directive('tooltip', Tooltip);

app.use(router)
app.mount('#app');
