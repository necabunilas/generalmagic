import { Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Home } from "heroicons-react";
import { Link } from "react-router-dom";
import Photos from "./Photos";

const Liked = () => {
  const [data, setData] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("liked")));
    setLikes(JSON.parse(localStorage.getItem("likes")));
  }, []);

  const updateData = (newData, newLikes) => {
    setData(newData)
    setLikes(newLikes)
  }

  return (
    <Stack margin={10}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        width="100%"
        mb={10}
      >
        <Typography variant="h4">Liked Images</Typography>
        <Link to="/" color="black">
          <Home size={42} />
        </Link>
      </Stack>
      <Photos data={data} likes={likes} home={false} updateData={updateData}/>
    </Stack>
  );
};

export default Liked;
