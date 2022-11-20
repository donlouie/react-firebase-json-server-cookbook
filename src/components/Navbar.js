import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

//* styles
import './Navbar.css';

//* components
import SearchBar from './SearchBar';

function Navbar() {
	const { color, changeColor } = useTheme();

	return (
		<div className="navbar" style={{ background: color }}>
			<nav>
				<Link to="/" className="brand">
					<h1>Cookbook</h1>
				</Link>
				<SearchBar />
				<Link to="/create">Create Recipe </Link>
			</nav>
		</div>
	);
}

export default Navbar;
