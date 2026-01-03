import { getTypeName } from ".";

/**
 * Checks if a given value is a Map.
 *
 * @param value - The value to be checked.
 * @returns true if the value is a Map, false otherwise.
 */
export default function isMap<K, V>( value: any ): value is Map<K, V>
{
	return getTypeName( value ) === "Map";
}
