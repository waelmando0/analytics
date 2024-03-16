import { NextRequest } from 'next/server';

export default async function middleware(req: NextRequest) {
	if (req.nextUrl.pathname === '/') {
		// Track anayltics event
		try {
		} catch (error) {}
	}
}

export const matcher = {
	matcher: ['/'],
};
