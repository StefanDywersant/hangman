/**
 * Frequency of showing current time passed.
 * @type {number}
 */
const TIME_MEASUREMENT_FREQ = 123;


export default function GameController($scope, $interval, answerRepository, GameLogic, stopWatch, stagesCount, allowedMistakes, ModalService) {


	/**
	 * Game logic instance
	 * @type GameLogic
	 */
	this.logic = null;


	/**
	 * Controls loading message
	 * @type {boolean}
	 */
	this.loading = false;


	/**
	 * Game stages count
	 * @type {number}
	 */
	this.stagesCount = stagesCount;


	/**
	 * Allowed mistakes in single stage.
	 * @type {number}
	 */
	this.allowedMistakes = allowedMistakes;


	/**
	 * StopWatch instance
	 * @type StopWatch
	 */
	this.stopWatch = stopWatch;


	/**
	 * Time passed since game start (Stopwatch)
	 * @type {number}
	 */
	this.time = 0;


	/**
	 * StopWatch refresh interval
	 */
	this.intervalId = null;


	/**
	 * User just won whole game event handler.
	 */
	const onWin = () => {
		this.stopWatch.pause();

		ModalService.showModal({
				template: require('./modal/win.html'),
				controller: 'WinModalController',
				inputs: {
					elapsed: this.stopWatch.elapsed
				}
			})
			.then(modal => modal.close.then(setup));
	};


	/**
	 * User just lost whole game event handler.
	 */
	const onLoose = () => {
		this.stopWatch.pause();

		ModalService.showModal({
				template: require('./modal/loose.html'),
				controller: 'LooseModalController'
			})
			.then(modal => modal.close.then(setup));
	};


	/**
	 * User passed to next stage event handler.
	 * @param {number} stage Current stage number
	 * @param {string} lastAnswer Previous correct answer
	 */
	const onNextStage = (stage, lastAnswer) => {
		this.stopWatch.pause();

		ModalService.showModal({
				template: require('./modal/stage.html'),
				controller: 'StageModalController',
				inputs: {stage, lastAnswer}
			})
			.then(modal => modal.close.then(() => this.stopWatch.start()));
	};


	/**
	 * Initializes new game. Can be called multiple times ("try again" behaviour).
	 */
	const setup = () => {
		this.loading = true;

		answerRepository.random(stagesCount)
			.then((answers) => {
				this.logic = new GameLogic(answers);
				this.logic.on('win', onWin);
				this.logic.on('loose', onLoose);
				this.logic.on('stage', onNextStage);

				this.loading = false;

				this.stopWatch.reset();
				this.stopWatch.start();
			});
	};


	/**
	 * User guessed letter handler.
	 * @param {string} letter The letter chosen by user
	 */
	this.onGuess = (letter) => {
		this.logic.guess(letter);
	};


	// wire time measurement
	this.intervalId = $interval(() => this.time = this.stopWatch.elapsed, TIME_MEASUREMENT_FREQ);
	$scope.$on('$destroy', () => $interval.cancel(this.intervalId));

	// initialize new game
	setup();


}


GameController.$inject = [
	'$scope', '$interval', 'answerRepository', 'GameLogic', 'stopWatch',
	'STAGES_COUNT', 'ALLOWED_MISTAKES', 'ModalService'
];