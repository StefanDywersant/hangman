import './game.scss';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import 'angular-modal-service';
import routing from './game.routes';
import config from '../../constants/config.constant';

import GameController from './game.controller';
import WinModalController from './modal/win.controller';
import LooseModalController from './modal/loose.controller';
import StageModalController from './modal/stage.controller';

import keyboard from '../../directives/keyboard';
import hangman from '../../directives/hangman';
import word from '../../directives/word';

import answerRepository from '../../services/answerRepository.service';
import GameLogic from '../../services/gameLogic.service';
import stopWatch from '../../services/stopwatch.service';

import timeFormat from '../../filters/timeFormat.filter';


export default angular.module(
		'app.game',
		[uirouter, keyboard, hangman, word, answerRepository, GameLogic, stopWatch, timeFormat, config, 'angularModalService']
	)
	.config(routing)
	.controller('GameController', GameController)
	.controller('WinModalController', WinModalController)
	.controller('LooseModalController', LooseModalController)
	.controller('StageModalController', StageModalController)
	.name;