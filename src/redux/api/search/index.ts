import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		searchTracks: build.query<
			SEARCH.SearchTracksResponse,
			SEARCH.SearchTracksRequest
		>({
			query: (query) => ({
				url: '/search',
				method: 'GET',
				params: {
					q: query,
					type: 'track',
					limit: 4
				}
			}),
			providesTags: ['search']
		}),
		getCategories: build.query<
			SEARCH.getCategoriesRes,
			SEARCH.getCategoriesReq
		>({
			query: () => ({
				url: '/browse/categories',
				method: 'GET'
			}),
			providesTags: ['categories']
		}),
		getSingleCategories: build.query<
			SEARCH.GetSingleCategoriesRes,
			SEARCH.GetSingleCategoriesReq
		>({
			query: (categories_id) => ({
				url: `/browse/categories/${categories_id}`,
				method: 'GET',
			}),
			providesTags: ['categories']
		})
	})
});
export const {
	useSearchTracksQuery,
	useGetCategoriesQuery,
	useGetSingleCategoriesQuery
} = api;
