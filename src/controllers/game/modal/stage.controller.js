import './modal.scss';


export default function LooseModalController($scope, $timeout, close, stage, lastAnswer) {
	Object.assign($scope, {stage, lastAnswer});
	$timeout(() => close(), 4000);
};


LooseModalController.$inject = ['$scope', '$timeout', 'close', 'stage', 'lastAnswer'];