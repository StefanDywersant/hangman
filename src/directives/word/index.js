import angular from 'angular';
import word from './word.directive';
import './word.scss';


export default angular.module('directives.word', [])
	.directive('word', word)
	.name;