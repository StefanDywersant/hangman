import './modal.scss';


export default function LooseModalController($scope, close) {
	$scope.again = close;
};


LooseModalController.$inject = ['$scope', 'close'];