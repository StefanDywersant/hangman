routing.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function routing($urlRouterProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('/');
}