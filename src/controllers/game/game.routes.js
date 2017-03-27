routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('game', {
			url: '/game',
			template: require('./game.html'),
			controller: 'GameController',
			controllerAs: 'game'
		});
}