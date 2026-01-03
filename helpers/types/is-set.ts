import { getTypeName } from ".";

/**
 * Checks if a given value is a Set.
 *
 * @param value - The value to be checked.
 * @returns true if the value is a Set, false otherwise.
 */
export default function isSet<T>( value: any ): value is Set<T>
{
	return getTypeName( value ) === "Set";
}
