'use client';
import { useParams } from 'next/navigation';
import scss from './Playlist.module.scss';
import { useGetPlaylistByIdQuery } from '@/redux/api/playlist';
import { FaRegClock } from 'react-icons/fa';
import { useGetMeQuery } from '@/redux/api/me';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useEffect, useState } from 'react';
// @ts-ignore
import { ColorExtractor } from 'react-color-extractor';
import FooterPage from '@/components/shared/FooterPage';

const Playlist = () => {
	
	const { playlistId } = useParams();
	const { data } = useGetPlaylistByIdQuery(String(playlistId));
	const { data: session } = useGetMeQuery();
	const {
		currentTrack,
		setCurrentTrack,
		trackIndex,
		setTrackIndex,
		trackUris,
		setTrackUris,
		togglePlay
	} = usePlayerStore();
	const totalDurationMinutes = data
		? Math.floor(
				data.tracks.items.reduce(
					(total, item) => total + item.track.duration_ms,
					0
				) / 60000
		  )
		: 0;

	const handlePlayTrack = (trackUri: string, index: number) => {
		if (trackUri === currentTrack) {
			togglePlay();
		} else {
			setCurrentTrack(trackUri);
			setTrackIndex(index);
			togglePlay();
		}
	};

	useEffect(() => {
		if (data?.tracks.items) {
			const trackMusics = data.tracks.items.map((el) => el.track.uri);
			setTrackUris(trackMusics);
		}
	}, [data, setTrackUris]);

	const imageUrl = data?.images[0].url;

	const [bgColor, setBgColor] = useState('#ffffff');

	const handleColors = (colors: string[]) => {
		if (colors.length > 0) {
			setBgColor(colors[0]);
		}
	};

	return (
		<div className={scss.Playlist}>
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
				<div className={scss.musicList}>
					<div className={scss.btn_music}>
						<ColorExtractor getColors={handleColors}>
							<img
								src={data?.images[0].url}
								alt=""
								className={scss.playlist_image}
							/>
						</ColorExtractor>
						<div className={scss.playlist_text}>
							<h5>Playlist</h5>
							<h1 className={scss.playlist_title}>{data?.name}</h1>

							<div className={scss.profile_details}>
								<img
									className={scss.profile}
									src={session?.images[1].url}
									alt="profile"
								/>

								<p className={scss.playlist_details}>
									{data?.owner.display_name} • {data?.tracks.total} songs,{' '}
									<span>{totalDurationMinutes} min</span>
								</p>
							</div>
						</div>
					</div>

					<div className={scss.track_header}>
						<div className={scss.left_block}>
							<span>#</span>
							<span>Title</span>
						</div>
						<div className={scss.right_block}>
							<span>Album</span>
							<span className={scss.date}>Date added</span>
							<span>
								{' '}
								<FaRegClock />
							</span>
						</div>
					</div>
					<hr
						style={{
							color: 'black'
						}}
					/>
					<ol className={scss.list_of_tracks}>
						{data?.tracks.items.map((item, index) => (
							<li
								onClick={() => handlePlayTrack(item.track.uri, index)}
								key={index}
								className={`${scss.track_item} ${
									item.track.uri === currentTrack ? scss.active : ''
								}`}
							>
								<span className={scss.track_index}>{index + 1}</span>
								<div className={scss.track_info}>
									<img
										src={item.track.album.images[0]?.url}
										alt={item.track.name}
										className={scss.track_image}
									/>
									<span className={scss.track_name}>{item.track.name}</span>
								</div>
								<span className={scss.track_album}>
									{item.track.album.name}
								</span>
								<span className={scss.track_date}>
									{new Date(item.added_at).toLocaleDateString()}
								</span>
								<span className={scss.track_duration}>
									{new Date(item.track.duration_ms).toISOString().substr(14, 5)}
								</span>
							</li>
						))}
					</ol>
				</div>
				<FooterPage />
			</div>
		</div>
	);
};

export default Playlist;
