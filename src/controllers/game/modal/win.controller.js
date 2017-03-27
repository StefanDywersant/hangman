import './modal.scss';


export default function WinModalController($scope, close, elapsed) {
	$scope.elapsed = elapsed;
	$scope.again = close;
};


WinModalController.$inject = ['$scope', 'close', 'elapsed'];