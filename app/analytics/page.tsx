import AnalyticsDashboard from '@/components/analytics-dashboard';
import { analytics } from '@/utils/analytics';
import React from 'react';

const page = async () => {
	// const pageView = await analytics.retrieveDays('pageview', 2);

	return (
		<div className='flex items-center justify-center mt-48'>
			<AnalyticsDashboard />
		</div>
	);
};

export default page;
