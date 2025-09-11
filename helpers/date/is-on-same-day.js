/**
 * Checks if two Date objects fall within the same day of the year.
 *
 * @param {Date} dateA The first date.
 * @param {Date} dateB The second date.
 * @returns {boolean} True if both dates fall within the same day of the year, otherwise false.
 */
export default function isOnSameDay( dateA, dateB )
{
	return dateA.getUTCDate() === dateB.getUTCDate() &&
	       dateA.getUTCMonth() === dateB.getUTCMonth() &&
	       dateA.getUTCFullYear() === dateB.getUTCFullYear();
}
