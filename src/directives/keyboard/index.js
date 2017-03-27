import angular from 'angular';
import config from '../../constants/config.constant';
import keyboard from './keyboard.directive';
import './keyboard.scss';


export default angular.module('directives.keyboard', [config])
	.directive('keyboard', ['ALPHABET', '$document', keyboard])
	.name;