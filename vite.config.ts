import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [
		uni(),
		Unocss(),
		AutoImport({
			imports: [
				'vue',
				'uni-app',
				'pinia',
				{
					from: 'uni-mini-router',
					imports: ['createRouter', 'useRouter', 'useRoute']
				}
			],
			dts: 'src/auto-imports.d.ts',
			dirs: ['src/store'],
		})
	],
	server: {
		proxy: {
		  "/api": {
			target: "http://localhost:10000/",
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, ""),
		  },
		},
	  },
});