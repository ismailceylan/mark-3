/**
 * A hook for interacting with the storage with a lock mechanism.
 *
 * @param key - The key to be used for the storage item.
 * @param storage - The storage object to be used. Defaults to localStorage.
 */
export default function useStorage<T>(
	key: string,
	storage: Storage = localStorage
)
{
	/**
	 * Sets the value of the storage item with the given key.
	 *
	 * @param value - The value to be set.
	 */
	function set( value: T )
	{
		storage.setItem( key, JSON.stringify( value ));
	}

	/**
	 * Gets the value of the storage item with the given key.
	 *
	 * @param defaultValue - The default value to be returned if the storage item does not exist.
	 * @returns The value of the storage item if it exists, otherwise the default value.
	 */
	function get( defaultValue?: T ): T | undefined
	{
		const item = storage.getItem( key );

		return item
			? JSON.parse( item ) as T
			: defaultValue;
	}

	/**
	 * Removes the storage item.
	 */
	function remove()
	{
		storage.removeItem( key );
	}

	/**
	 * Watches for changes to the storage item with the given key.
	 *
	 * @param callback - The callback function to be called when the storage item changes.
	 * @param options - An object containing the options for the watcher.
	 * @param options.immediate - If true, the callback will be called immediately with the current value of the storage item.
	 */
	function watch( callback: ( value: T | undefined ) => void, { immediate = false } = {})
	{
		window.addEventListener( "storage", e =>
		{
			if( e.key === key && e.newValue !== e.oldValue )
			{
				callback(
					e.newValue
						? JSON.parse( e.newValue ) as T
						: undefined
				);
			}
		});

		if( immediate )
		{
			callback( get());
		}
	}

	return { set, get, remove, watch };
}
