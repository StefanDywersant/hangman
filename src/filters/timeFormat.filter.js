/**
 * Left-pads number with zeroes.
 * @param {string|number} n Given number
 * @param {number} width Target width
 * @returns {string}
 */
const pad = (n, width) => {
	n += '';
	return n.length >= width
		? n
		: new Array(width - n.length + 1).join('0') + n;
};

/**
 * Formats time into human readable string: minutes:seconds.milliseconds
 * @param {string} input Time in milliseconds
 * @returns {string}
 */
const filter = function(input) {
	const milliseconds = input % 1000,
		seconds = Math.floor(input / 1000) % 60,
		minutes = Math.floor((input - milliseconds) / 60000);

	return `${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 4)}`;
};

export default angular.module('filters.timeFormat', [])
	.filter('timeFormat', () => filter)
	.name;