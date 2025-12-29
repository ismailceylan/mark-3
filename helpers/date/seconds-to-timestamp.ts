/**
 * Converts a total number of seconds into a human-readable timestamp string.
 * 
 * @param totalSeconds - The total number of seconds to convert.
 * @param showHours - If true, the timestamp will always show hours, even if the hours are zero.
 * If false, the timestamp will only show minutes and seconds if the hours are zero.
 * @returns A human-readable timestamp string in the format "HH:MM:SS" or "MM:SS".
 */
export default function secondsToTimestamp( totalSeconds: number, showHours: boolean = true ): string
{
	if( isNaN( totalSeconds ) || totalSeconds < 0 )
	{
		return showHours
			? "00:00:00"
			: "00:00";
	}

	const hours = Math.floor( totalSeconds / 3600 );
	const minutes = Math.floor(( totalSeconds % 3600 ) / 60 );
	const seconds = totalSeconds % 60;
	const pad = ( n: number ) => String( n ).padStart( 2, "0" );

	if( ! showHours )
	{
		return `${ pad( hours * 60 + minutes )}:${ pad( seconds )}`;
	}

	return `${ pad( hours )}:${ pad( minutes )}:${ pad( seconds )}`;
}
