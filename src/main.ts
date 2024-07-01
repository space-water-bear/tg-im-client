import { createSSRApp } from "vue";
import App from "./App.vue";
import router from './router'
import uvUI from "@climblee/uv-ui";
import { persist } from './store/persist'
import 'uno.css'


const pinia = createPinia()
pinia.use(persist)

export function createApp() {
	const app = createSSRApp(App);
	app.use(uvUI);
	app.use(router)
	app.use(pinia)
	return {
		app,
		pinia
	};
}