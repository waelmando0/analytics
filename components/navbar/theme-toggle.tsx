'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<button
			type='button'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			<Sun className='visible dark:invisible dark:h-0 dark:w-0  h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
			<Moon className='visible dark:visible dark:h-5 dark:w-5 h-0 w-0  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
		</button>
	);
}
