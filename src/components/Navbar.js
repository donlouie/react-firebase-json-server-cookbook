import { Link } from 'react-router-dom';

//* styles
import './Navbar.css';

//* components
import SearchBar from './SearchBar';

function Navbar() {
	return (
		<div className="navbar">
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
