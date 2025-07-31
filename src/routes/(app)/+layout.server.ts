import type { LayoutServerLoad } from './$types';
import { getStats } from '$lib/server/db/db';


export const load = (async (event) => {
    const user = event.locals.user;
    const session = event.locals.session;
    const stats = await getStats()

    
    return {
        user,
        session,
        stats
    };
}) satisfies LayoutServerLoad;
