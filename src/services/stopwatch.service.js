import angular from 'angular';


class StopWatch {

	constructor() {
		this.reset();
	}

	/**
	 * Starts / resumes measuring time.
	 */
	start() {
		if (this.paused) {
			this.started += Date.now() - this.paused;
			this.paused = 0;
		} else {
			this.started = Date.now();
		}
	}


	/**
	 * Pauses time measurement.
	 */
	pause() {
		this.paused = Date.now();
	}


	/**
	 * Resets stopwatch to initial state.
	 */
	reset() {
		this.paused = 0;
		this.started = 0;
	}


	/**
	 * Returns current time passed (in milliseconds).
	 * @returns {number}
	 */
	get elapsed() {
		if (this.paused) {
			return this.paused - this.started;
		}

		if (!this.started) {
			return 0;
		}

		return Date.now() - this.started;
	}

}


export default angular.module('services.stopWatch', [])
	.service('stopWatch', StopWatch)
	.name;