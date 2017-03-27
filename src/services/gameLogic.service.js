import angular from 'angular';
import config from '../constants/config.constant';


/**
 * @typedef {string[]} HangmanWord
 */


const factory = function(allowedMistakes, alphabet) {


	/**
	 * Represents Hangman game logic.
	 */
	class GameLogic {


		/**
		 * Initializes hangman game.
		 * @param {HangmanWord[]} answers Answers for all stages list
		 * @param {{allowedMistakes: number, alphabet: string}} config Game configuration
		 */
		constructor(answers, config) {
			this.config = Object.assign({allowedMistakes, alphabet}, config);
			this.handlers = {};
			this.answers = answers;
			this.stage = 0;
			this.usedLetters = [];
			this.wrongLetters = [];
			this.wordState = this.answer.map(letter => letter == ' ' ? ' ' : null);
		}


		/**
		 * Returns current stage's answer.
		 * @returns {HangmanWord}
		 */
		get answer() {
			return this.answers[this.stage];
		}


		/**
		 * Checks if given letter exists in current answers.
		 * @param {string} letter Single character
		 */
		guess(letter) {
			// give up if the letter was tried already
			if (this.usedLetters.indexOf(letter) > -1) {
				return;
			}
			
			// ignore letters not present in alphabet
			if (this.config.alphabet.indexOf(letter) == -1) {
				return;
			}

			// add letter to used ones
			this.usedLetters.push(letter);

			// try to find & reveal the letter in the answer
			const found = this.answer.reduce((found, answerLetter, i) => {
				if (letter == answerLetter) {
					this.wordState[i] = letter;
					return true;
				}

				return found;
			}, false);

			// add letter to wrong ones if it wasn't found in the answer
			if (!found) {
				this.wrongLetters.push(letter);
			}

			// check whether the user won/lost/can play after this guess
			this.check();
		}


		/**
		 * Initializes next stage.
		 */
		nextStage() {
			this.stage++;
			this.usedLetters = [];
			this.wrongLetters = [];
			this.wordState = this.answer.map(letter => letter == ' ' ? ' ' : null);
		}


		/**
		 * Checks whether user just won, loose or can continue game.
		 */
		check() {
			if (this.wrongLetters.length >= this.config.allowedMistakes) {
				this.emit('loose');
			}

			if (this.wordState.join('') == this.answer.join('')) {
				if (this.stage == this.answers.length - 1) {
					this.emit('win');
				} else {
					this.nextStage();
					this.emit(
						'stage',
						this.stage, // current stage number
						this.answers[this.stage - 1].join('') // last answer
					);
				}
			}
		}


		/**
		 * Registers event handler.
		 *
		 * Available events:
		 *  - "win", callback: () => ... - user just won whole game,
		 *  - "loose", callback: () => ... - user just lost whole game,
		 *  - "stage", callback: (stage: number, lastAnswer: string) => ... - user passed to next stage
		 *
		 * @param {string} event Event name
		 * @param {function} handler Event handler
		 */
		on(event, handler) {
			if (this.handlers.hasOwnProperty(event)) {
				this.handlers[event].push(handler);
			} else {
				this.handlers[event] = [handler];
			}
		}


		/**
		 * Calls all handlers subscribed to given event.
		 *
		 * @param {string} event Event name
		 * @param {*} args Handler arguments
		 */
		emit(event, ...args) {
			if (this.handlers.hasOwnProperty(event)) {
				this.handlers[event].forEach(handler => handler.apply(null, args));
			}
		}


	}


	return GameLogic;


};


export default angular.module('services.GameLogic', [config])
	.factory('GameLogic', ['ALLOWED_MISTAKES', 'ALPHABET', factory])
	.name;