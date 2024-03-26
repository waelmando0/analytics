import { redis } from '@/lib/redis';

type AnalyticsArgs = {
	retention?: number;
};

type TrackOption = {
	persist?: boolean;
};

export class Analytics {
	private retention: number = 60 * 60 * 24 * 7;

	constructor(opts?: AnalyticsArgs) {
		if (opts?.retention) this.retention = opts.retention;
	}

	async track(nameSpace: string, event: object = {}, opts?: TrackOption) {
		let key = `analytics::${nameSpace}`;
		if (!opts?.persist) {
			key += `::${getDate()}`;
		}

		// DB call to persist this event
		await redis.hincrby(key, JSON.stringify(event), 1);
	}
}

export const analytics = new Analytics();
