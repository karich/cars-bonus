// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	ssr: true,

	runtimeConfig: {
		apiBase: process.env.API_BASE || "https://manageauto-api.ru/",
		feedsBase: process.env.FEEDS_BASE || "https://manageip.ru/",
		feedsDomain: process.env.FEEDS_DOMAIN || "https://cars-bonus.ru",
		sitemapBase:
			process.env.SITEMAP_BASE || "https://premium-api-admin.ru/sitemaps",
	},

	image: {
		domains: ["api9.acduhovskoi.store/", "car-images.ru"],
		formats: ["webp"],
	},

	plugins: ["~/plugins/directives.js"],

	css: [
		"@fancyapps/ui/dist/fancybox/fancybox.css",
		"~/assets/style.scss",
		"@fortawesome/fontawesome-svg-core/styles.css",
		"~/assets/fontawesome/css/fontawesome.css",
		"~/assets/fontawesome/css/solid.css",
		"~/assets/fontawesome/css/brands.css",
		"~/assets/fontawesome/css/regular.css",
	],

	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{ name: "og:type", content: "website" },
				{ name: "og:url", content: "/" },
				{ name: "og:image", content: "/og.png" },
				{ name: "og:logo", content: "/og-logo.svg" },
				{ name: "og:locale", content: "ru_RU" },
				{
					name: "viewport",
					content:
						"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
				},
				{
					name: "yandex-verification",
					content: "3dc8dafe6d19656c",
				},
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
				{ rel: "icon", type: "image/png", href: "/favicon.png" },
			],
			htmlAttrs: {
				lang: "ru",
			},

			noscript: [
				{
					children: `<div><img src="https://mc.yandex.ru/watch/97417106" style="position:absolute; left:-9999px;" alt="" /></div>`,
				},
			],

			script: [
				{
					innerHTML: `window.dataLayer = window.dataLayer || [];`,
					type: "text/javascript",
				},
				{
					innerHTML: `(function() {
						var BM_SERVER = 'https://pxcdn.bigmethods.ru/cdn_1';
						var BM_PIXEL_ID = '1fd25792-08c1-4226-bff9-db90b4616a37';
						var script = document.createElement('script');
						script.src = BM_SERVER + '?pixel_id=' + encodeURIComponent(BM_PIXEL_ID) + '&parent_url=' + encodeURIComponent(window.location.href);
						document.head.appendChild(script);
					})();`,
					type: "text/javascript",
				},
			],
		},
		rootId: "__cars-bonus",
	},

	modules: [
		"@pinia/nuxt",
		"pinia-plugin-persistedstate/nuxt",
		"vue3-carousel-nuxt",
		"@vueuse/nuxt",
		"@nuxt/image",
		"@nuxt/eslint",
		"nuxt-anchorscroll",
		"yandex-metrika-module-nuxt3",
	],

	eslint: {},

	yandexMetrika: {
		id: "97417106",
		clickmap: true,
		trackLinks: true,
		accurateTrackBounce: true,
		webvisor: true,
		ecommerce: true,
	},

	pinia: {
		storesDirs: ["./stores/**"],
	},
});
