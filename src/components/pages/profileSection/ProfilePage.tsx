'use client';
import { useState } from 'react';
import scss from './ProfilePage.module.scss';
import { useGetMeQuery } from '@/redux/api/me';

// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';
import {
	useGetTopArtistsQuery,
	useGetTopTracksQuery
} from '@/redux/api/playlist';
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';
import { usePlayerStore } from '@/stores/usePlayerStore';
import FooterPage from '@/components/shared/FooterPage';
// import PopularArtists from "./playlistSections/PopularArtists";
// import SeveralAlbums from "./albums/SeveralAlbums";

const ProfilePage = () => {
	const { data: session } = useGetMeQuery();
	const imageUrl = session?.images[0].url || '/default_playlist_cover.jpg';
	const [bgColor, setBgColor] = useState('#fff');
	const { data: topTracks } = useGetTopTracksQuery();
	const { data: topArtists } = useGetTopArtistsQuery();

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
	const {
		isPlaying,
		currentTrack,
		togglePlay,
		setCurrentTrack,
		setTrackUris,
		setTrackIndex
	} = usePlayerStore();
	return (
		<section
			style={{
				background: `linear-gradient(
                    to bottom,
                    ${bgColor},  
                    rgba(255,255,255,0.05) 55%  , 
                    rgba(255,255,255,0.05) 100%   

                  )`
			}}
			className={scss.PlaylistItems}
		>
			<div className={scss.playlistHeader}>
				<ColorExtractor getColors={handleColors}>
					<img
						className={scss.playlistImage}
						src={imageUrl}
						alt={session?.display_name || 'Playlist cover'}
						width={150}
						height={150}
					/>
				</ColorExtractor>
				<div className={scss.playlistInfo}>
					<p style={{ textAlign: 'center' }}>Profile</p>
					<h1>{session?.display_name}</h1>
				</div>
			</div>

			<div className={scss.list}>
				<div className={scss.TopTracks}>
					<h1>Your favorite tracks</h1>

					<div className={scss.listTracks}>
						{topTracks?.items.map((el, idx) => (
							<div key={idx} className={scss.track}>
								<img src={el.album.images[0].url} alt={el.name} />
								<p>{el.name}</p>
								<div
									onClick={() => handlePlay(el.uri!, idx)}
									className={scss.playPauseIcons}
								>
									{currentTrack === el.uri && isPlaying ? (
										<BsPauseCircleFill className={scss.playPauseIcon} />
									) : (
										<BsFillPlayCircleFill className={scss.playPauseIcon} />
									)}
								</div>
							</div>
						))}
					</div>
				</div>
				<div className={scss.Artists}>
					<h1>Your favorite artists</h1>
					<div className={scss.listArtists}>
						{topArtists?.items.map((el, idx) => (
							<div key={idx} className={scss.track}>
								<img src={el.images[0].url} alt={el.name} />
								<div className={scss.trackInfo}>
									<p>{el.name}</p>
								</div>
							</div>
						))}
					</div>
				</div>
				<FooterPage />
			</div>
		</section>
	);
};

export default ProfilePage;
