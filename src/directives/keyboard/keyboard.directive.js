export default (ALPHABET, $document) => ({
	restrict: 'E',
	scope: {
		disabledKeys: '=',
		onKeyPress: '&'
	},
	link: ($scope) => {
		$scope.ALPHABET = ALPHABET;
		$document.bind('keypress', event => $scope.onKeyPress({key: String.fromCharCode(event.which).toUpperCase()}));
	},
	template: require('./keyboard.html')
});
