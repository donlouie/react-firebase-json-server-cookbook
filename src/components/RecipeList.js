import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

//style
import './RecipeList.css';

function RecipeList({ recipes }) {
	const { mode } = useTheme();

	if (recipes.length === 0) {
		return <div className="error">No recipes to load...</div>;
	}

	return (
		<div className="recipe-list">
			{recipes.map((recipe) => (
				<div key={recipe.id} className={`card ${mode}`}>
					<h3>{recipe.title}</h3>
					<p>{recipe.cookingTime} to make.</p>
					<div>
						<h4>{recipe.method.substring(0, 100)}...</h4>
					</div>
					<Link to={`/recipes/${recipe.id}`}>Cook This</Link>
				</div>
			))}
		</div>
	);
}

export default RecipeList;
