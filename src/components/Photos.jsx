import React, { useState } from "react";
import { Dialog, Stack, IconButton } from "@mui/material";
import { Heart, HeartOutline, X, ArrowsExpand } from "heroicons-react";

const Photos = (props) => {
  const [open, setOpen] = useState(false);
  const [imgIndex, setImageIndex] = useState(0);

  const handleClickOpen = (index) => {
    setOpen(true);
    setImageIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLike = (index) => {
    if (props.data[index].liked === false) {
      localStorage.setItem("likes", JSON.stringify(props.likes + 1));
    } else {
      localStorage.setItem("likes", JSON.stringify(props.likes - 1));
    }

    if (props.home) {
      var temp = JSON.parse(localStorage.getItem("liked"));
      if (props.data[index].liked === false) {
        //add item to liked
        const newItem = {
          src: props.data[index].src,
          width: props.data[index].width,
          height: props.data[index].height,
          liked: true,
        };
        temp.push(newItem);
        localStorage.setItem("liked", JSON.stringify(temp));
      } else {
        const filtered = temp.filter(
          (item) => item.src !== props.data[index].src
        );
        localStorage.setItem("liked", JSON.stringify(filtered));
      }
      //update page data
      const updatedValue = [...props.data];
      updatedValue[index] = {
        src: props.data[index].src,
        width: props.data[index].width,
        height: props.data[index].height,
        liked: !props.data[index].liked,
      };
      localStorage.setItem("photos", JSON.stringify(updatedValue));
      props.updateData(
        updatedValue,
        props.data[index].liked === false ? props.likes + 1 : props.likes - 1
      );
    } else {
      setOpen(false);
      var localtemp = JSON.parse(localStorage.getItem("photos"));
      console.log(localtemp);
      console.log(props.data);
      //update local storage
      const ind = localtemp.findIndex(
        (item) => item.src == props.data[index].src
      );

      if (ind !== -1) {
        localtemp[ind] = {
          src: props.data[index].src,
          width: props.data[index].width,
          height: props.data[index].height,
          liked: !props.data[index].liked,
        };

        localStorage.setItem("photos", JSON.stringify(localtemp));
      }
      //remove from page
      const removed = props.data.filter(item => item.src !== props.data[index].src);
      localStorage.setItem("liked", JSON.stringify(removed));
      props.updateData(removed, props.likes - 1);
    }
  };

  const widthProvider = (index) => {
    const mod = index % 9;
    if(mod < 5){
      return 282
    }else{
      return 360
    }
  }

  return (
    <>
      <Stack display="flex" sx={{ flexFlow: "row wrap" }}>
        {props.data.map((photo, index) => {
          return (
            (props.home || photo.liked) && (
              <Stack
                style={{ height: 253, width: widthProvider(index) }}
                className="container"
                key={index}
              >
                <img
                  src={photo.src}
                  height={253}
                  width={widthProvider(index)}
                  key={index}
                  alt="test"
                  className="img"
                />
                <Stack className="overlay"></Stack>
                <Stack className="expand">
                  <ArrowsExpand
                    size={42}
                    strokeWidth="1px"
                    className="hove"
                    onClick={(e) => handleClickOpen(index)}
                  />
                </Stack>
                <Stack className="button">
                  {photo.liked ? (
                    <Heart
                      size={42}
                      className="hove"
                      fill="red"
                      onClick={(e) => handleLike(index)}
                    />
                  ) : (
                    <HeartOutline
                      size={42}
                      className="hove"
                      strokeWidth="1px"
                      onClick={(e) => handleLike(index)}
                    />
                  )}
                </Stack>
              </Stack>
            )
          );
        })}
      </Stack>
      <Dialog
        open={open}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        className="container"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack />
          <IconButton
            style={{ zIndex: 1 }}
            aria-label="close"
            onClick={handleClose}
          >
            <X />
          </IconButton>
        </Stack>
        <img
          style={{
            width: "auto",
            height: "100%",
            margin: "50px 100px 80px 100px",
          }}
          src={props.data[imgIndex] && props.data[imgIndex].src}
          alt="na"
        />
        <Stack className="overlaybig" />
        <Stack className="buttonbig">
          {props.data[imgIndex] && props.data[imgIndex].liked ? (
            <Heart
              size={42}
              className="hove"
              fill="red"
              onClick={(e) => handleLike(imgIndex)}
            />
          ) : (
            <HeartOutline
              size={42}
              className="hove"
              strokeWidth="1px"
              onClick={(e) => handleLike(imgIndex)}
            />
          )}
        </Stack>
      </Dialog>
    </>
  );
};

export default Photos;
