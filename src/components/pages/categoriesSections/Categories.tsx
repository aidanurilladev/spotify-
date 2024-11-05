'use client';
import { useEffect, useRef, useState } from 'react';
import scss from './Categories.module.scss';
import { useGetCategoriesQuery } from '@/redux/api/search';
import { useRouter } from 'next/navigation';
import FooterPage from '@/components/shared/FooterPage';

const Categories = () => {
	const router = useRouter();
	const [genreQuery, setGenreQuery] = useState('');
	const { data } = useGetCategoriesQuery();

	useEffect(() => {
		if (genreQuery) {
			router.push(`/genre/${genreQuery}`);
		} else {
			router.push(`/search`);
		}
	}, [genreQuery]);

	const colors = useRef([
		'#8884d8',
		'#82ca9d',
		'#ffc658',
		'#ff7f0e',
		'#ff5d8f',
		'#888888',
		'#82ca9d'
	]);

	return (
		<div className={scss.Categories}>
			<div className="container">
				<div className={scss.content}>
					<h1>Categories</h1>
					<div className={scss.categoriesList}>
						{data?.categories.items.map((category, idx) => (
							<div
								key={idx}
								className={scss.categoryItem}
								onClick={() => {
									setGenreQuery(category.id);
								}}
							>
								<img
									src={category.icons[0].url}
									alt={category.name}
									className={scss.categoryImage}
								/>
								<p className={scss.categoryName}>{category.name}</p>
							</div>
						))}
					</div>
					<hr />
					<FooterPage />
				</div>
			</div>
		</div>
	);
};

export default Categories;
