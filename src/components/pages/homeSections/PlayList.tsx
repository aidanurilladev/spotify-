'use client';
import { LuPanelRightClose } from 'react-icons/lu';
import scss from './PlayList.module.scss';
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import Playlists from '@/components/shared/Playlists';
import { useGetMeQuery } from '@/redux/api/me';
import Playlist from '../playlistSections/Playlist';
import PlaylistPage from '../PlaylistPage';

const PlayList = () => {
	const { data } = useGetMeQuery();

	return (
		<section className={scss.PlayList}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.media}>
						<div className={scss.my}>
							<LuPanelRightClose />
							<p>My mediateka</p>
							<FaPlus />
							<FaArrowRight />
						</div>
						{data ? (
							<>
								<Playlists />
							</>
						) : (
							<>
								<div className={scss.createPlaylist}>
									<h5>Создай свой первый плейлист</h5>
									<h6>Это совсем не сложно ! Мы поможем.</h6>
									<button>Создать плейлист</button>
								</div>
								<div className={scss.createPlaylist}>
									<h4>Подпишись на интересные подкасты</h4>
									<h5>Ты будешь узнавать о новых выпусках.</h5>
									<button>Обзор</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
export default PlayList;
