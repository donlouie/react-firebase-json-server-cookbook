import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

// style
import './Recipe.css';

function Recipe() {
	const { id } = useParams();
	const url = 'http://localhost:3000/recipes/' + id;
	const { data: recipe, isPending, error } = useFetch(url);
	const navigate = useNavigate();

	const handleDelete = () => {
		fetch('http://localhost:3000/recipes/' + recipe.id, {
			method: 'DELETE',
		}).then(() => {
			navigate('/');
		});
	};

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				navigate('/', { replace: true });
			}, 2000);
		}
	}, [error, navigate]);

	return (
		<div className="recipe">
			{isPending && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{recipe && (
				<>
					<h2 className="page-title">{recipe.title}</h2>
					<p>Takes {recipe.cookingTime} to cook.</p>
					<ul>
						{recipe.ingredients.map((ing) => (
							<li key={ing}>{ing}</li>
						))}
					</ul>
					<p className="method">{recipe.method}</p>
					<button onClick={handleDelete}>Delete Recipe</button>
				</>
			)}
		</div>
	);
}

export default Recipe;
