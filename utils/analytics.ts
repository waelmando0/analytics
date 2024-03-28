import { redis } from '@/lib/redis';
import { getDate } from '@/utils';
import { parse } from 'date-fns';

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

	async retrieveDays(namespace: string, nDays: number) {
		type AnalyticsPromise = ReturnType<typeof analytics.retrieve>;
		const promises: AnalyticsPromise[] = [];

		for (let i = 0; i < nDays; i++) {
			const formatedDate = getDate(i);
			const promise = analytics.retrieve(namespace, formatedDate);
			promises.push(promise);
		}

		const fetched = await Promise.all(promises);

		const data = fetched.sort((a, b) => {
			if (
				parse(a.date, 'dd/MM/yyy', new Date()) >
				parse(a.date, 'dd/MM/yyy', new Date())
			) {
				return 1;
			} else {
				return -1;
			}
		});
		return data;
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
