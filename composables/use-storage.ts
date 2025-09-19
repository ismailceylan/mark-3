/**
 * A hook for interacting with the storage.
 * 
 * @param key - The key to be used for the storage item.
 * @param storage - The storage object to be used. Defaults to localStorage.
 * @returns An object with methods for setting, getting, and removing the storage
 * item associated with the given key.
 */
export default function useStorage<T>( key: string, storage: Storage = localStorage )
{
	/**
	 * Set the value of the storage item associated with the given key.
	 * 
	 * @param value - The value to be stored.
	 */
	function set( value: T )
	{
		storage.setItem( key, JSON.stringify( value ));
	}

	/**
	 * Retrieve the value associated with the given key from the storage.
	 * If there is no such key, return the given default value.
	 * 
	 * @param defaultValue - The value to be returned if there is no such key.
	 * @returns The value associated with the given key if it exists, otherwise the given default value.
	 */
	function get( defaultValue?: T ): T
	{
		const item = storage.getItem( key );
		
		return item
			? JSON.parse( item ) as T
			: defaultValue;
	}

	/**
	 * Remove the item associated with the given key from the storage.
	 */
	function remove()
	{
		storage.removeItem( key );
	}

	return { set, get, remove }
}
