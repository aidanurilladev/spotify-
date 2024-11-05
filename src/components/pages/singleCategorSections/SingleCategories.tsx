'use client';
import { useGetSingleCategoriesQuery } from '@/redux/api/search';
import { useParams } from 'next/navigation';
import scss from './SingleCategories.module.scss';
// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';
import { useState } from 'react';
import { useGetcategoryPlaylistQuery } from '@/redux/api/playlist';
import { usePlayerStore } from '@/stores/usePlayerStore';
import FooterPage from '@/components/shared/FooterPage';

const SingleCategories = () => {
	const {
		currentTrack,
		togglePlay,
		setCurrentTrack,
		setTrackUris,
		setTrackIndex
	} = usePlayerStore();
	const params = useParams();
	const categoryId = String(params.categoriesId);

	const { data: categoryData } = useGetSingleCategoriesQuery(categoryId);

	const { data: categPlaylist } = useGetcategoryPlaylistQuery(categoryId);
	console.log('🚀 ~ SingleCategories ~ categPlaylist:', categPlaylist);

	const imageUrl = categoryData?.icons[0]?.url;

	const [bgColor, setBgColor] = useState('#ffffff');

	const handleColors = (colors: string[]) => {
		if (colors.length > 0) {
			setBgColor(colors[0]);
		}
	};

	const handlePlay = (trackUri: string, index?: number) => {
		if (trackUri === currentTrack) {
			togglePlay();
		} else {
			setCurrentTrack(trackUri);
			if (index !== undefined) {
				setTrackIndex(index);
			}
			setTrackUris([trackUri]);
			togglePlay();
		}
	};
	return (
		<div className={scss.categoryPage}>
			<div
				style={{
					background: `linear-gradient(
						to bottom,
						${bgColor},  
						rgba(255,255,255,0.05) 55%  , 
						rgba(255,255,255,0.05) 100%
					)`
				}}
				className={scss.content}
			>
				<div className={scss.btn_music}>
					<h1>{categoryData?.name}</h1>
					<ColorExtractor getColors={handleColors}></ColorExtractor>
				</div>
				<div className={scss.items}>
					<div className={scss.listTrackPopular}>
						{categPlaylist?.playlists.items.map((el, idx) => (
							<div key={idx} className={scss.track}>
								<img src={el.images[0].url} alt={el.name} />
								<div className={scss.trackInfo}>
									<p>{el.name}</p>
								</div>
								<div
									onClick={() => handlePlay(el.uri!)}
									className={scss.playPauseIcons}
								>
									{/* {currentTrack === el.uri && isPlaying ? (
													<BsPauseCircleFill className={scss.playPauseIcon} />
												) : (
													<BsFillPlayCircleFill
														className={scss.playPauseIcon}
													/>
												)} */}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCategories;
