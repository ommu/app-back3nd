var VERSION = 'v1',
	assetsToCache = [
	// '/',
];

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'), 

workbox.googleAnalytics.initialize(),
workbox.precaching.cleanupOutdatedCaches(),
workbox.routing.registerRoute(
	/(.*(?:googleapis|gstatic)\.com\/.*)|(.*\.(?:woff|woff2|ttf|eot)(\?.*)?$)/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'google-fonts-cache-'+VERSION,
		maxAgeSeconds: 7 * 24 * 60 * 60
	}), "GET"),
workbox.routing.registerRoute(
	/\.js$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'js-cache-'+VERSION,
		plugins: [new workbox.cacheableResponse.Plugin({
			statuses: [200],
			headers: {
				"Content-Type": "application/javascript"
			},
			maxAgeSeconds: 7 * 24 * 60 * 60
		})]
	}), "GET"),
workbox.routing.registerRoute(
	/\.css$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'css-cache-'+VERSION,
		plugins: [new workbox.cacheableResponse.Plugin({
			statuses: [200],
			headers: {
				"Content-Type": "text/css"
			},
			maxAgeSeconds: 7 * 24 * 60 * 60
		})]
	}), "GET");

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(VERSION)
		.then(function(cache) {
			return cache.addAll(assetsToCache);
		})
	);
});