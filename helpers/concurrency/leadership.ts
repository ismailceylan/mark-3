const leaderCache: Record<string, boolean> = {}

/**
 * Checks if the current browser is the leader of a given lock.
 * 
 * It returns false if the current browser is not the leader of the given lock.
 * It returns true if the current browser is the leader of the given lock.
 * If the result of the lock is not available, it caches the result and returns false.
 * 
 * The result is cached for the duration of the page session.
 * 
 * @param of - The name of the lock to check.
 * @returns A promise that resolves with true if the current browser is the leader
 * of the given lock, false otherwise.
 */
export default async function leadership( of: string ): Promise<boolean>
{
	if( of in leaderCache && leaderCache[ of ])
	{
		return true;
	}

	return new Promise( resolve =>
	{
		navigator.locks.request( of, { ifAvailable: true }, lock =>
		{
			if( ! lock )
			{
				leaderCache[ of ] = false;
				resolve( false );
				return;
			}

			leaderCache[ of ] = true;
			resolve( true );

			return new Promise(() => {});
		});
	});
}
