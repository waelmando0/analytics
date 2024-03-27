import { analytics } from '@/utils/analytics';
import React from 'react';

const page = async () => {
	const pageView = await analytics.retrieve('pageview', '27/3/2024');

	return (
		<div>
			<pre>{JSON.stringify(pageView)}</pre>
		</div>
	);
};

export default page;
