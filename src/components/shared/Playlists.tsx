'use client';
import scss from './Playlists.module.scss';
import { useRouter } from 'next/navigation';
import { useGetPlaylistsQuery, useGetTopArtistsQuery } from '@/redux/api/playlist';
import { useGetMeQuery } from '@/redux/api/me';

const Playlists = () => {
	const { data } = useGetPlaylistsQuery();
	const { data: session } = useGetMeQuery();
	const {data:artist} = useGetTopArtistsQuery()

	const router = useRouter();

	return (
		<div className={scss.Playlists}>
			<div className={scss.content}>
				{data?.items.map((item, index) => (
					<div
						className={scss.block}
						key={index}
						onClick={() => {
							router.push(`/playlist/${item.id}`);
						}}
					>
						<img src={item.images?.[1]?.url || 'default-image-url.jpg'} alt={item.name} />
						<div className={scss.text}>
							<h4>{item.name}</h4>
							<h5>
								{item.type} {session?.display_name || 'Unknown User'}
							</h5>
						</div>
					</div>
				))}
				{artist?.items.map((el,index)=>(
					<div
					className={scss.block}
					key={index}
					onClick={() => {
						router.push(`/artist/${el.id}`);
					}}
				>
					<img className={scss.artistImg} src={el.images?.[1]?.url || 'default-image-url.jpg'} alt={el.name} />
					<div className={scss.text}>
						<h4>{el.name}</h4>
						<h5>
							{el.name} - {session?.display_name || 'Unknown User'}
						</h5>
					</div>
				</div>

				))}
			</div>
		</div>
	);
};

export default Playlists;
