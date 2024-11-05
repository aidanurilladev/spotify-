namespace PLAYLIST {
	type GetPlaylistsResponse = IMePlaylists;
	type GetPlaylistsRequest = void;

	type GetPlaylistByIdResponse = IPlaylistItem;
	type GetPlaylistByIdRequest = string;

	type GetRecentlyTracksRes = IRecentlyTracks;
	type GetRecentlyTracksReq = void;

	type GetPopularTracksRes = IPopularTracks;
	type GetPopularTracksReq = void;

	type GetRecommendationRes = IRecommendations;
	type GetRecommendationReq = {
		seed_artists: string; // ID of the artist
		seed_genres: string; // Genre (e.g., 'pop')
		seed_tracks: string; // ID of the track
	};

	type GetTopArtistsResponse = IGetTopArtist;
	type GetTopArtistsRequest = void;

	type GetTopTracksResponse = IGetTopTracks;
	type GetTopTracksRequest = void;

	type GetArtistByIdRes = GetArtistByIdRes;
	type GetArtistByIdReq = string;

	type GetArtistTopTracksRes = GetArtistTopTracksRes;
	type GetArtistTopTracksReq = string;

	type GetCategoryPlaylistRes = GetCategoryPlaylist;
	type GetCategoryPlaylistReq = string;
}
