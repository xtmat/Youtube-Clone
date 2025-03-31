import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./SearchPage.css";
import VidCards from "../../components/VidCards/VidCards";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";


const KEY  = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

const SearchPage = () => {
  const [vids, setVids] = useState([]);
  // const [vidToPlay, setVidToPlay] = useState("");

  useEffect(() => {
    fetchInitialSearch();
  }, []);

  async function fetchInitialSearch() {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?q=interstellar&key=${KEY}&fields=items(id,snippet(title,description,thumbnails/medium))&part=snippet`
    );
    // console.log("API Response");
    // console.log(response.data);
    setVids(response.data.items);
  }

  function itemLoop() {
    for (let i = 0; i < vids.length; i++) {
      console.log("Video ID:   " + vids[i].id.videoId);
      console.log("Video Title:   " + vids[i].snippet.title);
      console.log(
        "Video Thumbnail:   " + vids[i].snippet.thumbnails.medium.url
      );
    }

    return itemLoop;
  }

  return (
    <section className="container">
      <SearchBar setVids={setVids} />
      <div className="home-video-grid">
        {itemLoop()}
        {vids.map((item) => (
          <VidCards
            key={item.id.videoId}
            id={item.id.videoId}
            title={item.snippet.title}
            img={item.snippet.thumbnails.medium.url}
          />
        ))}
      </div>
    </section>
  );
};
export default SearchPage;
