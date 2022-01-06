import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div>
			<p>Home Page</p>
			<ul>
				<li>
					<Link to="/login">Zaloguj się</Link>
				</li>
				<li>kubki</li>
				<li>świece</li>
				<li>
					<Link to="/admin">Panel admina</Link>
				</li>
			</ul>
		</div>
	);
};

export default HomePage;
