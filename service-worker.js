'use strict';

const version = new URL(location).searchParams.get('v');

var cacheVersion = 'v1';
if (version)
	cacheVersion = version;

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'),

workbox.googleAnalytics.initialize(),
workbox.precaching.cleanupOutdatedCaches(),

workbox.routing.registerRoute(
	/(.*(?:googleapis|gstatic)\.com\/.*)|(.*\.(?:woff|woff2|ttf|eot)(\?.*)?$)/,
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: 'fonts-icons-'+cacheVersion,
		maxAgeSeconds: 7 * 24 * 60 * 60
	}), "GET"),

workbox.routing.registerRoute(
	/\.js$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'js-'+cacheVersion,
		plugins: [new workbox.cacheableResponse.Plugin({
			statuses: [200],
			headers: {
				"Content-Type": "application/javascript"
			},
			maxAgeSeconds: 7 * 24 * 60 * 60,
            purgeOnQuotaError: true
		})]
	}), "GET"),

workbox.routing.registerRoute(
	/\.css$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'css-'+cacheVersion,
		plugins: [new workbox.cacheableResponse.Plugin({
			statuses: [200],
			headers: {
				"Content-Type": "text/css"
			},
			maxAgeSeconds: 7 * 24 * 60 * 60,
            purgeOnQuotaError: true
		})]
	}), "GET"),

workbox.routing.registerRoute(
	/\/assets\/.*(\.(png|svg|jpg|jpeg))$/,
	new workbox.strategies.CacheFirst({
		cacheName: 'asset-image-'+cacheVersion,
		plugins: [new workbox.cacheableResponse.Plugin({
			statuses: [200],
			maxAgeSeconds: 7 * 24 * 60 * 60,
            purgeOnQuotaError: true
		})]
	}), "GET");

// self.addEventListener('install', function(event) {
// 	event.waitUntil(
// 		caches.keys().then((keyList) => {
// 			return Promise.all(
// 				keyList
// 				.map((key) => {
// 					return caches.delete(key);
// 				})
// 			);
// 		})
// 	);
// });

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    caches.delete(cacheName);
                })
            );
        })
    );
});