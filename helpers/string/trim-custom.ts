/**
 * Trims a string by removing characters from the start and/or end.
 *
 * @param str - The string to trim.
 * @param chars - The characters to trim.
 * @param options - Options to customize the trimming.
 * @returns The trimmed string.
 */
export default function trimCustom(
	str: string,
	chars: string,
	{ start = true, end = true }: { start?: boolean, end?: boolean } = {}
)
{
	if( ! str || ! chars )
	{
		return str;
	}

	const safeChars = chars.replace( /[.*+?^${}()|[\]\\]/g, "\\$&" );
	const startRegex = start? `^[${ safeChars }]+` : "";
	const endRegex = end? `[${ safeChars }]+$` : "";
	const separator = ( start && end )? "|" : "";
	const finalRegex = new RegExp( `${ startRegex }${ separator }${ endRegex }`, "g" );

	return str.replace( finalRegex, "" );
}
