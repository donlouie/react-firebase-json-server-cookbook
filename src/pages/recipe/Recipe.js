import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { projectFirestore } from '../../firebase/config';

// style
import './Recipe.css';

function Recipe() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { mode } = useTheme();

	const [recipe, setRecipe] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsPending(true);

		projectFirestore
			.collection('recipes')
			.doc(id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					setIsPending(false);
					setRecipe(doc.data());
				} else {
					setIsPending(false);
					setError('Could not find that recipe');
				}
			});
	}, [id]);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				navigate('/', { replace: true });
			}, 2000);
		}
	}, [error, navigate]);

	return (
		<div className={`recipe ${mode}`}>
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
				</>
			)}
		</div>
	);
}

export default Recipe;
