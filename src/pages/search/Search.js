import { useLocation } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';
import { projectFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';

//* components
import RecipeList from '../../components/RecipeList';

//* styles
import './Search.css';

function Search() {
	const queryString = useLocation().search;
	const queryParams = new URLSearchParams(queryString);
	const query = queryParams.get('q');
	// const url = 'http://localhost:3000/recipes?q=' + query;
	// const { error, isPending, data } = useFetch(url);

	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsPending(true);

		const unsub = projectFirestore.collection('recipes').onSnapshot(
			(snapshot) => {
				if (snapshot.empty) {
					setError('No recipes to load');
					setIsPending(false);
				} else {
					let results = [];
					snapshot.docs.forEach((doc) => {
						//* filter data according to query
						if (
							doc
								.data()
								.title.toLowerCase()
								.includes(query.toLowerCase())
						) {
							results.push({ id: doc.id, ...doc.data() });
						}
					});
					setData(results);
					setIsPending(false);
				}
			},
			(err) => {
				setError(err.message);
				setIsPending(false);
			}
		);

		return () => unsub();
	}, [query]);

	return (
		<div>
			<h2 className="page-title">Recipes including {query}</h2>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}
			{data && <RecipeList recipes={data} />}
		</div>
	);
}

export default Search;
