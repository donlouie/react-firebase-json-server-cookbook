import { useTheme } from '../hooks/useTheme';
import modeIcon from '../assets/mode-icon.svg';

//* styles
import './ThemeSelector.css';

import React from 'react';

const themeColors = [
	'rgb(46, 46, 46)',
	'rgb(70, 70, 70)',
	'rgb(100, 100, 100)',
];

const ThemeSelector = () => {
	const { changeColor, changeMode, mode } = useTheme();

	const toggleMode = () => {
		changeMode(mode === 'light' ? 'dark' : 'light');
	};
	console.log(mode);

	return (
		<div className="theme-selector">
			<div className="mode-toggle">
				<img
					onClick={toggleMode}
					src={modeIcon}
					alt="dark/light toggle icon"
					style={{
						filter: mode === 'dark' ? 'invert(1)' : 'invert(0)',
					}}
				/>
			</div>
			<div className="theme-buttons">
				{themeColors.map((color) => {
					return (
						<div
							key={color}
							onClick={() => changeColor(color)}
							style={{ background: color }}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ThemeSelector;
