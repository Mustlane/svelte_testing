import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { updateStats } from '$lib/server/db/db';


async function init() {
	console.log(`updateStats() is being read`);
	await updateStats();
	console.log(`updateStats() has been executed`);
}

/** @type {import('@sveltejs/kit').ServerInit} */
setInterval(init, 1000 * 60 * 60)


const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = handleAuth;
