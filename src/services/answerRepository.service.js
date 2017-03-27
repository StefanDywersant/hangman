import angular from 'angular';
import config from '../constants/config.constant';


/**
 * Randomly draws given count of items from list (without repetitions).
 * @param {object[]} list List of items
 * @param {number} count Desired count of items
 * @returns {object[]}
 */
const randomWithoutReps = function(list, count) {
	if (list.length < count) {
		throw new Error('Too few items to draw from');
	}

	const chosenIdxs = [];

	while (chosenIdxs.length < count) {
		const itemIdx = Math.floor(Math.random() * list.length);

		if (chosenIdxs.indexOf(itemIdx) == -1) {
			chosenIdxs.push(itemIdx);
		}
	}

	return chosenIdxs
		.map(idx => list[idx]);
};


const AnswerRepository = function($http, $q, $timeout, ANSWERS_URL) {


	/**
	 * Answers cache
	 * @type string[][]
	 */
	let answers;


	/**
	 * Returns all available answers (either from server or internal cache).
	 * @returns {string[][]}
	 */
	const load = function() {
		if (answers) {
			return $q.resolve(answers);
		}

		return $http({url: ANSWERS_URL})
			.then(response => (answers = response.data.map(answer => answer.toUpperCase().split(''))))

			// show off ;)
			.then((answers) => {
				const defered = $q.defer();
				$timeout(() => defered.resolve(answers), 1000);
				return defered.promise;
			});
	};


	/**
	 * Provides given count of random answers.
	 * @param {number} desired Desired amount of answers
	 * @returns {Promise.<String[]>}
	 */
	const random = function(desired) {
		return load()
			.then(answers => randomWithoutReps(answers, desired));
	};


	// interface
	return { random };


};


export default angular.module('services.answerRepository', [config])
	.factory('answerRepository', ['$http', '$q', '$timeout', 'ANSWERS_URL', AnswerRepository])
	.name;