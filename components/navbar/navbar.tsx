import React from 'react';
import { ThemeToggle } from '@/components/navbar/theme-toggle';

const Navbar = () => {
	return (
		<header className='max-w-7xl mx-auto py-4 px-6'>
			<div className='flex items-center justify-center'>
				<p>test</p>
				<div className=' flex-1 items-center justify-end md:flex space-x-4'>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};

export default Navbar;
