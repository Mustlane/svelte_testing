import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { updateStats } from './lib/server/db/db'

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

/** @type {import('@sveltejs/kit').ServerInit} */
export async function init() {
	await updateStats()
}


export const handle: Handle = handleAuth;

