export default () => ({
	restrict: 'E',
	scope: {
		step: '=',
		maxSteps: '='
	},
	link: ($scope) => {
		$scope.normalize = step => Math.ceil(step * 7 / $scope.maxSteps);
	},
	template: require('./hangman.html')
});
