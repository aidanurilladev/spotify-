'use client';
import scss from './SearchTracks.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DebounceInput } from 'react-debounce-input';
import { useSearchTracksQuery } from '@/redux/api/search';
import Link from 'next/link';
import { LuSearch } from 'react-icons/lu';
import { MdOutlineRateReview } from 'react-icons/md';

const SearchTracks = () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [hasUserInput, setHasUserInput] = useState(false);
	const { data } = useSearchTracksQuery(String(searchQuery));

	useEffect(() => {
		if (hasUserInput) {
			if (searchQuery) {
				router.push(`/search/${searchQuery}`);
			} else {
				router.push('/search');
			}
		}
	}, [searchQuery, hasUserInput]);

	

	return (
		<div className={scss.LookForTracks}>
			<div className="container">
				<div className={scss.content}>
					{/* <Link href={'/search'}>
						<LuSearch />
					</Link> */}
					<DebounceInput
						placeholder="enter a search tracks..."
						minLength={2}
						debounceTimeout={300}
						onChange={(event) => {
							setSearchQuery(event.target.value);
							setHasUserInput(true);
						}}
						onFocus={() => router.push('/search')}
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchTracks;