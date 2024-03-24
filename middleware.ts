import { NextRequest, NextResponse } from 'next/server';
import { analytics } from './utils/analytics';

export default async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === '/') {
		// Track analytics event

		try {
			analytics.track('pageView', {
				page: '/',
				country: req.geo?.country,
			});
		} catch (error) {}
	}

	return NextResponse.next();
}

export const matcher = {
	matcher: ['/'],
};
