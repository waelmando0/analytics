import { redis } from '@/lib/redis';

type AnalyticsArgs = {
	retention?: number;
};

export class Analytics {
	private retention: number = 60 * 60 * 24 * 7;

	constructor(opts?: AnalyticsArgs) {
		if (opts?.retention) this.retention = opts.retention;
	}

	async track(nameSpace: string, event: {}) {
		const key = `analytics::${nameSpace}`;

		// DB call to persist this event
		await redis.hincrby(key, JSON.stringify(event), 1);
	}
}

export const analytics = new Analytics();
