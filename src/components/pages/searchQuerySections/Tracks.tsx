'use client';
import { useParams } from 'next/navigation';
import scss from './Tracks.module.scss';
import { useSearchTracksQuery } from '@/redux/api/search';
import { useEffect } from 'react';
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs';
import { usePlayerStore } from '@/stores/usePlayerStore';
import Menu from '@/components/ui/menu/Menu';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useGetTopArtistsQuery } from '@/redux/api/playlist';

const Tracks = () => {
	const { searchQuery } = useParams();
	const decodedQuery = decodeURIComponent(String(searchQuery));
	const { data, isLoading } = useSearchTracksQuery(decodedQuery);
	const { data: topArtists } = useGetTopArtistsQuery();

	const {
		isPlaying,
		currentTrack,
		setCurrentTrack,
		togglePlay,
		trackIndex,
		setTrackIndex,
		setTrackUris
	} = usePlayerStore();

	useEffect(() => {
		if (data?.tracks.items) {
			const trackUris = data.tracks.items.map((el) => el.uri);
			setTrackUris(trackUris);
		}
	}, [data, setTrackUris]);

	const handlePlay = (index: number) => {
		if (data) {
			const trackUri = data.tracks.items[index].uri;
			if (trackUri === currentTrack) {
				togglePlay();
			} else {
				setCurrentTrack(trackUri);
				setTrackIndex(index);
			}
		}
	};

	const mainTrack = data?.tracks.items[0];

	return (
		<section className={scss.Tracks}>
			<div className="container">
				<div className={scss.content}>
					<Menu />
					<div className={scss.tracks}>
						{isLoading ? (
							<h1>loading...</h1>
						) : (
							<div className={scss.listSearchTracks}>
								<div className={scss.top}>
									<div className={scss.trackTopResult}>
										<h1>Лучший результат</h1>
										<div className={scss.track1}>
											<img src={mainTrack?.album.images[0].url} alt="" />
											<div className={scss.text}>
												<h1>{mainTrack?.name}</h1>
												<h5>{mainTrack?.artists[0].name}</h5>
											</div>
											<div
												onClick={() => handlePlay(0)} // Index 0 olarak değiştirdik
												className={scss.playPauseIcons}
											>
												{currentTrack === mainTrack?.uri && isPlaying ? (
													<BsPauseCircleFill className={scss.playPauseIcon} />
												) : (
													<BsFillPlayCircleFill
														className={scss.playPauseIcon}
													/>
												)}
											</div>
										</div>
									</div>

									<div className={scss.listOtherTracks}>
										<h1>Songs</h1>
										{data?.tracks.items.map((el, index) => (
											<div
												className={scss.listMusic}
												key={index}
												onClick={() => handlePlay(index)}
											>
												<div className={scss.tracksInfo}>
													<img src={el.album.images[1].url} alt="" />
													<div
														className={scss.playPauseIcon}
														onClick={() => handlePlay(index)}
													>
														{currentTrack === el.uri && isPlaying ? (
															<BsPauseCircleFill
																className={scss.playPauseIcon}
															/>
														) : (
															<BsFillPlayCircleFill
																className={scss.playPauseIcon}
															/>
														)}
													</div>
													<div className={scss.text}>
														<h5
															className={`${scss.text_name} ${
																el.uri === currentTrack ? scss.active : ''
															}`}
														>
															{el.name}
														</h5>
														<h6>{el.artists[0].name}</h6>
													</div>
												</div>
												<div className={scss.tracks_minute}>
													<span className={scss.tracksDuration}>
														{new Date(el.duration_ms)
															.toISOString()
															.substr(14, 5)}
													</span>

													<div className={scss.options}>
														<span>
															<HiOutlineDotsHorizontal />
														</span>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
								<h1>Artists</h1>
								<div className={scss.artist}>
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
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tracks;
