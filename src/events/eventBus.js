import { reactive } from 'vue';

const eventBus = reactive({
    events: [],
    $on(event, callback) {
        this.events[event] = this.events[event] || [];
        this.events[event].push(callback);
    },
    $emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
});

export default eventBus;
