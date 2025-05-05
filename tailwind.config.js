/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#1976D2',
				secondary: '#5cbbf6',
				accent: '#9C27B0',
				positive: '#4caf50',
				negative: '#dc3545',
				info: '#2196f3',
				warning: '#fb8c00',
				success: '#4caf50',
				danger: '#dc3545',
				surface: '#15171e',
				body: '#002650',
				dark: '#15171e',
				separator: 'rgba(255, 255, 255, .15)',
				divider: 'rgba(255, 255, 255, 0.15)',
				dimmed: 'rgba(0,0,0,0.2)',
			},
			boxShadow: {
				strong: '0 4px 18px -2px #000000b3',
			},
			gridTemplateRows: {
				layout: 'minmax(min-content, auto) minmax(auto, 1fr) minmax(min-content, auto)',
				window: 'minmax(min-content, auto) minmax(auto, 1fr) minmax(min-content, auto)',
			},
			gridTemplateColumns: {
				layout: 'minmax(min-content, auto) minmax(auto, 1fr) minmax(min-content, auto)',
			},
			transitionProperty: {
				width: 'width',
				height: 'height',
				spacing: 'margin, padding',
			},
		},
	},
	plugins: [],
};
