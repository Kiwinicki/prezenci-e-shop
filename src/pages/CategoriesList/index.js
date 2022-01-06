import CATEGORIES from '../../CONSTANTS/CATEGORIES';

const CategoriesList = () => {
	return (
		<>
			<p>categories list</p>
			<ul>
				{CATEGORIES.map((cat) => (
					<li key={cat.key}>{cat.name}</li>
				))}
			</ul>
		</>
	);
};

export default CategoriesList;
