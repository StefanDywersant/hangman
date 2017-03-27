import angular from 'angular';


export default angular.module('constants', [])
	.constant('ANSWERS_URL', 'assets/answers.json')
	.constant('ALPHABET', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
	.constant('STAGES_COUNT', 5)
	.constant('ALLOWED_MISTAKES', 7)
	.name;