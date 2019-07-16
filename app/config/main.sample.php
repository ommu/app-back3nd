<?php
$params = \yii\helpers\ArrayHelper::merge(
	(\app\components\Application::isDev() && (is_readable(__DIR__ . '/../../../protected/config/params-dev.php')))?
		require(__DIR__ . '/../../../protected/config/params-dev.php'):
		require(__DIR__ . '/../../../protected/config/params.php'),
	(\app\components\Application::isDev() && (is_readable(__DIR__ . '/params-dev.php')))?
		require(__DIR__ . '/params-dev.php'):
		require(__DIR__ . '/params.php')
);
$bn = \app\components\Application::getAppId();

$config = [
	'id' => 'back3nd',
	'name' => 'OMMU by sudaryanto.id',
	'runtimePath' => dirname(__DIR__) . '/runtime',
	'bootstrap' => [
		'app\components\bootstrap\ModuleAutoLoader'
	],
	'components' => [
		'request' => [
			// !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
			'cookieValidationKey' => 'bdbe0c4a-008d-4a71-a7d9-89f17d908ee5'
		],
		'errorHandler' => [
			'errorAction' => 'site/error',
		],
		'session' => [
			'class' => 'yii\web\Session',
			'name' => $bn,
			'cookieParams' => ['lifetime' => 7 * 24 * 60 * 60],
			'timeout' => 7 * 24 * 3600,
			'useCookies' => true,
		],
		'jwt' => [
			'class'    => 'app\components\Jwt',
			'key'      => '7HgMBs0OzqYqXrQTz01GSRqFnj18Swta',
			'issuer'   => 'http://back3nd.ommu.co',
			'audiance' => 'http://back3nd.ommu.co',
			'id'       => 'bdbe0c4a-008d-4a71-a7d9-89f17d908ee5',
		],
		'moduleManager' => [
			'class'        => '\app\components\ModuleManager',
			'createBackup' => true,
		],
	],
	'params' => $params,
];

if (YII_ENV_DEV) {
	// configuration adjustments for 'dev' environment
	// $config['bootstrap'][] = 'debug';
	// $config['modules']['debug'] = [
	//     'class' => 'yii\debug\Module',
	//     // uncomment the following to add your IP if you are not connecting from localhost.
	//     //'allowedIPs' => ['127.0.0.1', '::1'],
	// ];

	$config['bootstrap'][] = 'gii';
	// $config['modules']['gii'] = [
	// 	'class' => 'yii\gii\Module',
	// ];
}

return $config;