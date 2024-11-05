import { create } from 'zustand';

interface PlayerState {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;

  trackUris: string[];
  setTrackUris: (uris: string[]) => void;

  trackIndex: number | null;
  setTrackIndex: (index: number | null) => void;

  currentTrack: string | null;
  setCurrentTrack: (trackUri: string) => void;

  isPlaying: boolean;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  accessToken: '',
  setAccessToken: (accessToken) => set({ accessToken }),

  trackUris: [],
  setTrackUris: (uris) => set({ trackUris: uris }),

  trackIndex: null,
  setTrackIndex: (index) => set({ trackIndex: index }),

  currentTrack: null,
  setCurrentTrack: (trackUri) => set({ currentTrack: trackUri }),

  isPlaying: false,
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
