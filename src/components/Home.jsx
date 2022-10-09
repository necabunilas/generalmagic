import React, { useEffect, useState } from "react";
import { Stack, TextField, Badge, InputAdornment } from "@mui/material";
import { Heart, Search } from "heroicons-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Photos from "./Photos";

const Home = () => {
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState([]);
  const [query, setQuery] = useState("");

  const API =
    "https://pixabay.com/api/?key=26032813-5eca57a90774446a771ac3a81&image_type=photo";

  const likeChecker = (url) => {

    if(liked.length === 0){
      return false;
    }

    const ind = liked.findIndex(
      (item) => item.src === url
    );

    if(ind === -1){
      return false;
    }

    return true;
  }

  const fetchPost = () => {
    axios.get(`${API}&q=${query}`).then((res) => {
      var filler = [];
      res.data.hits.map((item) => {
        filler.push({
          src: item.webformatURL,
          width: item.webformatWidth,
          height: item.webformatHeight,
          liked: likeChecker(item.webformatURL),
        });
        setData(filler);
        localStorage.setItem("photos", JSON.stringify(filler));
      });
    });
  };

  useEffect(() => {
    const started = JSON.parse(localStorage.getItem("started"));
    if (started === false) {
      fetchPost();
      localStorage.setItem("started", JSON.stringify(true));
    } else {
      setData(JSON.parse(localStorage.getItem("photos")));
      setLikes(JSON.parse(localStorage.getItem("likes")));
      setLiked(JSON.parse(localStorage.getItem("liked")));
    }
  }, []);

  const updateData = (newData, newLikes) => {
    setData(newData);
    setLikes(newLikes);
  };

  const search = (value) => {
    setQuery(value)
    fetchPost()
  }

  return (
    <Stack margin={10}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        mb={10}
      >
        <Stack />
        <Stack>
          <TextField
            color="success"
            sx={{ width: 500 }}
            value={query}
            onChange={e => search(e.target.value)}
            InputProps={{ 
              sx: { 
                height: 50, 
                borderRadius: 8 
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack justifyContent="flex-end">
          <Link to="/liked" color="black">
            <Badge badgeContent={likes} overlap="circular" color="error">
              <Heart size={42} />
            </Badge>
          </Link>
        </Stack>
      </Stack>
      <Photos data={data} likes={likes} home={true} updateData={updateData} />
    </Stack>
  );
};

export default Home;
