import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import Trashcan from '../assets/trashcan.svg';
import { projectFirestore } from '../firebase/config';

//style
import './RecipeList.css';

function RecipeList({ recipes }) {
	const { mode } = useTheme();

	if (recipes.length === 0) {
		return <div className="error">No recipes to load...</div>;
	}

	const handleClick = (id) => {
		projectFirestore.collection('recipes').doc(id).delete();
	};

	return (
		<div className="recipe-list">
			{recipes.map((recipe) => (
				<div key={recipe.id} className={`card ${mode}`}>
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make.</p>
					<div>
						<h4>{recipe.description.substring(0, 100)}...</h4>
					</div>
					<Link to={`/recipes/${recipe.id}`}>Cook This</Link>
					<img
						className={`delete ${mode}`}
						src={Trashcan}
						onClick={() => handleClick(recipe.id)}
						alt=""
					/>
				</div>
			))}
		</div>
	);
}

export default RecipeList;
