import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getPlaylists: build.query<
			PLAYLIST.GetPlaylistsResponse,
			PLAYLIST.GetPlaylistsRequest
		>({
			query: (query) => ({
				url: '/me/playlists',
				method: 'GET',
				params: {
					limit: 10
				}
			}),
			providesTags: ['playlist']
		}),
		getPlaylistById: build.query<
			PLAYLIST.GetPlaylistByIdResponse,
			PLAYLIST.GetPlaylistByIdRequest
		>({
			query: (playlist_id) => ({
				url: `/playlists/${playlist_id}`,
				method: 'GET',
				params: {}
			}),
			providesTags: ['playlist']
		}),
		getRecentlyTracks: build.query<
			PLAYLIST.GetRecentlyTracksRes,
			PLAYLIST.GetRecentlyTracksReq
		>({
			query: () => ({
				url: '/me/player/recently-played',
				method: 'GET',
				params: {
					limit: 6
				}
			}),
			providesTags: ['playlist']
		}),
		getPopularTracks: build.query<
			PLAYLIST.GetPopularTracksRes,
			PLAYLIST.GetPopularTracksReq
		>({
			query: () => ({
				url: '/browse/featured-playlists',
				method: 'GET',
				params: {
					limit: 6
				}
			}),
			providesTags: ['playlist']
		}),
		getRecommendationTracks: build.query<
			PLAYLIST.GetRecommendationRes,
			PLAYLIST.GetRecommendationReq
		>({
			query: ({ seed_artists, seed_genres, seed_tracks }) => ({
				url: '/recommendations',
				method: 'GET',
				params: {
					seed_artists, // Sanatçı ID'si
					seed_genres, // Tür (örneğin, 'pop')
					seed_tracks, // Şarkı ID'si
					limit: 10 // Öneri sayısını buradan ayarlayabilirsin
				}
			}),
			providesTags: ['recommendations']
		}),
		getcategoryPlaylist: build.query<
			PLAYLIST.GetCategoryPlaylistRes,
			PLAYLIST.GetCategoryPlaylistReq
		>({
			query: (category_id) => ({
				url: `/browse/categories/${category_id}/playlists`,
				method: 'GET',
				params: {
					limit: 10
				}
			}),
			providesTags: ['categories']
		}),
		getTopArtists: build.query<
			PLAYLIST.GetTopArtistsResponse,
			PLAYLIST.GetTopArtistsRequest
		>({
			query: () => ({
				url: '/me/top/artists',
				method: 'GET',
				params: {
					limit: 6
				}
			}),
			providesTags: ['topArtists']
		}),
		getArtistById: build.query<
			PLAYLIST.GetArtistByIdRes,
			PLAYLIST.GetArtistByIdReq
		>({
			query: (artist_id) => ({
				url: `/artists/${artist_id}`,
				method: 'GET'
			}),
			providesTags: ['topArtists']
		}),
		getTopTracks: build.query<
			PLAYLIST.GetTopTracksResponse,
			PLAYLIST.GetTopTracksRequest
		>({
			query: () => ({
				url: '/me/top/tracks',
				method: 'GET',
				params: {
					limit: 6
				}
			}),
			providesTags: ['topTracks']
		}),
		getArtistTopTracks: build.query<
			PLAYLIST.GetArtistTopTracksRes,
			PLAYLIST.GetArtistTopTracksReq
		>({
			query: (artist_id) => ({
				url: `/artists/${artist_id}/top-tracks`,
				method: 'GET',
				params: {
					market: 'US' // Şarkıların hangi market için çekileceğini belirtir (Örn: US)
				}
			}),
			providesTags: ['artistTopTracks']
		})
	})
});

export const {
	useGetPlaylistsQuery,
	useGetPlaylistByIdQuery,
	useGetRecentlyTracksQuery,
	useGetPopularTracksQuery,
	useGetRecommendationTracksQuery,
	useGetTopArtistsQuery,
	useGetTopTracksQuery,
	useGetArtistByIdQuery,
	useGetArtistTopTracksQuery,
	useGetcategoryPlaylistQuery
} = api;
