import angular from 'angular';
import hangman from './hangman.directive';
import './hangman.scss';


export default angular.module('directives.hangman', [])
	.directive('hangman', hangman)
	.name;