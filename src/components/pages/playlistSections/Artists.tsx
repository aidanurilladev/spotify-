'use client';
import { useParams } from 'next/navigation';
import scss from './Artists.module.scss';
import {
	useGetArtistByIdQuery,
	useGetArtistTopTracksQuery
} from '@/redux/api/playlist';
import { FaRegClock } from 'react-icons/fa';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useState } from 'react';
// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';

const Artists = () => {
	const { artistId } = useParams();
	const { data: artistData } = useGetArtistByIdQuery(String(artistId));
	const { data: tracks } = useGetArtistTopTracksQuery(String(artistId));
	console.log('🚀 ~ Artists ~ topTracksData:', tracks);

	const {
		currentTrack,
		setCurrentTrack,
		trackIndex,
		setTrackIndex,
		togglePlay
	} = usePlayerStore();

	const handlePlayTrack = (trackUri: string, index: number) => {
		if (trackUri === currentTrack) {
			togglePlay();
		} else {
			setCurrentTrack(trackUri);
			setTrackIndex(index);
			togglePlay();
		}
	};

	const imageUrl = artistData?.images[0]?.url;
	const [bgColor, setBgColor] = useState('#ffffff');

	const handleColors = (colors: string[]) => {
		if (colors.length > 0) {
			setBgColor(colors[0]);
		}
	};

	return (
		<div className={scss.Artists}>
			<div
				style={{
					background: `linear-gradient(
						to bottom,
						${bgColor},  
						rgba(255,255,255,0.05) 55%, 
						rgba(255,255,255,0.05) 100%)`
				}}
				className={scss.content}
			>
				<div className={scss.artistHeader}>
					<div className={scss.artistImage}>
						<ColorExtractor getColors={handleColors}>
							<img
								src={imageUrl}
								alt={artistData?.name}
								className={scss.artistImage}
							/>
						</ColorExtractor>
					</div>
					<div className={scss.artistInfo}>
						<h1>{artistData?.name}</h1>
						<p>{artistData?.followers.total} Followers</p>
						<p>Genres: {artistData?.genres.join(', ')}</p>
					</div>
				</div>

				<div className={scss.trackList}>
					<h2>Top Tracks</h2>
					<div className={scss.track_header}>
						<div className={scss.left_block}>
							<span>#</span>
							<span>Title</span>
						</div>
						<div className={scss.right_block}>
							<span>
								{' '}
								<FaRegClock />
							</span>
						</div>
					</div>

					<hr style={{ color: 'black' }} />

					<ol className={scss.list_of_tracks}>
						{tracks?.tracks.map((track, index) => (
							<li
								onClick={() => handlePlayTrack(track.uri, index)}
								key={index}
								className={`${scss.track_item} ${
									track.uri === currentTrack ? scss.active : ''
								}`}
							>
								<span className={scss.track_index}>{index + 1}</span>
								<div className={scss.track_info}>
									<img
										src={track.album.images[0]?.url}
										alt={track.name}
										className={scss.track_image}
									/>
									<span className={scss.track_name}>{track.name}</span>
								</div>
								<span className={scss.track_duration}>
									{new Date(track.duration_ms).toISOString().substr(14, 5)}
								</span>
							</li>
						))}
					</ol>
					
				</div>
			</div>
		</div>
	);
};

export default Artists;
