"use client";
import React, { useEffect } from "react";
import scss from "./Footer.module.scss";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { FaVolumeHigh } from "react-icons/fa6";

const Footer = () => {
  const {
    accessToken,
    trackUris,
    trackIndex,
    setTrackIndex,
    setCurrentTrack,
    currentTrack,
    setAccessToken
  } = usePlayerStore();

  useEffect(() => {
    if (!accessToken) {
      const fetchAccessToken = async () => {
        const response = await fetch('/api/auth/get-access-token');
        const data = await response.json();
        setAccessToken(data);
      };
      fetchAccessToken();
    }
  }, [accessToken, setAccessToken]);

//   const trackUris = currentTrack ? [currentTrack] : []; 

  return (
    <div className={scss.Footer}>
      <div className={scss.content}>
        <footer className={scss.footer}>
          {window.location.href !== "/" && window.location.href !== "/profile" && (
            <>
              <SpotifyWebPlayer
                callback={(state) => {
                  if (state.isPlaying && state.track) {
                    setCurrentTrack(state.track.uri);
                  }
                  if (!state.isPlaying) {
                    setTrackIndex(null);
                  }
                  if (state.error) {
                    console.error("Spotify playback error:", state.error);
                  }
                }}
                token={accessToken}
                uris={trackUris}
                play={trackIndex !== null}
                offset={trackIndex || 0}
                styles={{
                  activeColor: "#fff",
                  bgColor: "#000",
                  color: "#fff",
                  loaderColor: "#fff",
                  sliderColor: "#1cb954",
                  trackArtistColor: "#ccc",
                  trackNameColor: "#fff",
                }}
              />
            
            </>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Footer;
