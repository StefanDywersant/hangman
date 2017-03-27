import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';
import home from './controllers/home';
import game from './controllers/game';
import './app.scss';

angular.module('app', [uirouter, home, game])
	.config(routing);