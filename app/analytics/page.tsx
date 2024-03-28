import AnalyticsDashboard from '@/components/analytics-dashboard';
import { analytics } from '@/utils/analytics';
import React from 'react';

const page = async () => {
	// const pageView = await analytics.retrieveDays('pageview', 2);

	return (
		<section className='min-h-screen w-full flex items-center justify-center py-4 px-6'>
			<div className='relative w-full max-w-6xl mx-auto'>
				<AnalyticsDashboard />
			</div>
		</section>
	);
};

export default page;
