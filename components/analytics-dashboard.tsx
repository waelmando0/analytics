'use client';
import { Card } from '@tremor/react';
import React from 'react';

const AnalyticsDashboard = () => {
	return (
		<div className='flex flex-col gap-6'>
			<div className='grid grid-cols-1 sm:grid-cols-2 w-full mx-auto'>
				<Card className='w-full max-w-xs mx-auto'>
					<p className='text-tremor-default text-dark-tremor-content'>
						Avg. Visitors
					</p>
				</Card>
			</div>
		</div>
	);
};

export default AnalyticsDashboard;
