/**
 * Checks if two Date objects fall within the same year.
 *
 * @param {Date} dateA The first date.
 * @param {Date} dateB The second date.
 * @returns {boolean} True if both dates fall within the same year, otherwise false.
 */
export default function isOnSameYear( dateA, dateB )
{
	return dateA.getFullYear() === dateB.getFullYear();
}
