'use client';
import React, { useCallback, useEffect, useState } from 'react';
import scss from './AllMusic.module.scss';
import {
	useGetPopularTracksQuery,
	useGetRecentlyTracksQuery,
	useGetRecommendationTracksQuery,
	useGetTopArtistsQuery,
	useGetTopTracksQuery
} from '@/redux/api/playlist';
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';
import { usePlayerStore } from '@/stores/usePlayerStore';
import FooterPage from '@/components/shared/FooterPage';

const AllMusic = () => {
	const { data: recentlyTracks } = useGetRecentlyTracksQuery();
	const { data: popularTracks } = useGetPopularTracksQuery();
	const { data: topArtists } = useGetTopArtistsQuery();
	const { data: topTracks } = useGetTopTracksQuery();

	const {
		isPlaying,
		currentTrack,
		togglePlay,
		setCurrentTrack,
		setTrackUris,
		setTrackIndex
	} = usePlayerStore();

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

	const handleSetTrackUris = useCallback(
		(tracks: { uri: string }[]) => {
			const uris = tracks.map((track) => track.uri);
			setTrackUris(uris);
		},
		[setTrackUris]
	);

	useEffect(() => {
		if (recentlyTracks?.items) {
			handleSetTrackUris(recentlyTracks.items.map((item) => item.track));
		}
	}, [recentlyTracks, handleSetTrackUris]);

	const [seedArtists, setSeedArtists] = useState(''); // ID'ler veya string olarak tanımlayabilirsin
	const [seedGenres, setSeedGenres] = useState(''); // Örneğin 'pop,rock'
	const [seedTracks, setSeedTracks] = useState(''); // ID'ler veya string olarak tanımlayabilirsin

	const { data, error, isLoading } = useGetRecommendationTracksQuery({
		seed_artists: 'artist_id_example',
		seed_genres: 'pop',
		seed_tracks: 'track_id_example'
	});

	useEffect(() => {
		if (data) {
			console.log('Recommendations data:', data);
		}
	}, [data]);
	console.log('🚀 ~ AllMusic ~ data:', data);
	return (
		<>
			<div className={scss.AllMusic}>
				<div className="container">
					<div className={scss.content}>
						<div>
							<h2>Recommended Tracks</h2>
							<ul>
								{data?.tracks.map((track) => (
									<li key={track.id}>
										<p>
											{track.name} by{' '}
											{track.artists.map((artist) => artist.name).join(', ')}
										</p>
										<a
											href={track.external_urls.spotify}
											target="_blank"
											rel="noopener noreferrer"
										>
											Listen on Spotify
										</a>
									</li>
								))}
							</ul>
						</div>
						<div className={scss.musicList}>
							<div className={scss.btn_music}>
								<button>All</button>
								<button>Music</button>
							</div>
						</div>
						<div className={scss.mucisListBottom}>
							<div className={scss.Recently}>
								<h1>Recently played</h1>
								<div className={scss.listTrackRecently}>
									{recentlyTracks?.items.map((item, index) => (
										<div key={index} className={scss.track}>
											<img
												src={item.track.album.images[0].url}
												alt={item.track.name}
												className={scss.trackImage}
											/>
											<div className={scss.trackInfo}>
												<p className={scss.trackName}>{item.track.name}</p>
												<p className={scss.trackArtist}>
													{item.track.artists
														.map((artist) => artist.name)
														.join(', ')}
												</p>
											</div>
											<div
												onClick={() => handlePlay(item.track?.uri!, index)}
												className={scss.playPauseIcons}
											>
												{currentTrack === item.track.uri && isPlaying ? (
													<BsPauseCircleFill className={scss.playPauseIcon} />
												) : (
													<BsFillPlayCircleFill
														className={scss.playPauseIcon}
													/>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
							<div className={scss.Popular}>
								<h1>Popular Radio</h1>
								<div className={scss.listTrackPopular}>
									{popularTracks?.playlists.items.map((el, idx) => (
										<div key={idx} className={scss.track}>
											<img src={el.images[0].url} alt={el.name} />
											<div className={scss.trackInfo}>
												<p>{el.name}</p>
											</div>
											<div
												onClick={() => handlePlay(el.uri!)}
												className={scss.playPauseIcons}
											>
												{currentTrack === el.uri && isPlaying ? (
													<BsPauseCircleFill className={scss.playPauseIcon} />
												) : (
													<BsFillPlayCircleFill
														className={scss.playPauseIcon}
													/>
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
													<BsFillPlayCircleFill
														className={scss.playPauseIcon}
													/>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						<FooterPage/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AllMusic;
