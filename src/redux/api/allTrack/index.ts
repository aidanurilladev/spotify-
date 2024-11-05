import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getAllTrack: build.query<AllMusic.getAllTrackResponse,AllMusic.getAllTrackRequest>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['allTrack']
		})
	})
});

export const { useGetAllTrackQuery } = api;
