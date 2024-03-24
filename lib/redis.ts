import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: 'https://apn1-master-shiner-33831.upstash.io',
	token: process.env.REDIS_KEY!,
});
