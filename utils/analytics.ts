import { redis } from '@/lib/redis';
import { getDate } from '@/utils';

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
		if (!opts?.persist) await redis.expire(key, this.retention);
	}

	async retrieve(namespace: string, date: string) {
		const res = await redis.hgetall<Record<string, string>>(
			`analytics::${namespace}::${date}`
		);

		return {
			date,
			events: Object.entries(res ?? []).map(([key, value]) => ({
				[key]: Number(value),
			})),
		};
	}
}

export const analytics = new Analytics();
