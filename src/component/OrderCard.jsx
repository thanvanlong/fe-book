import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setOrderedFood } from "../store/Module.action";
import { configPrice } from "../config/order.config";
import { useNavigate } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
function OrderCard(props) {
  let { data } = props;
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/detail/" + data?.id);
  };
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(
      setOrderedFood({
        ...data,
        quanityOrdered: data?.quanityOrdered + 1,
        time: !data?.time ? new Date().toLocaleTimeString() : data?.time,
      })
    );
  };
  const handleSub = () => {
    dispatch(
      setOrderedFood({
        ...data,
        quanityOrdered:
          data?.quanityOrdered - 1 > 0 ? data?.quanityOrdered - 1 : 0,
        time: !data?.time ? new Date().toLocaleTimeString() : data?.time,
      })
    );
  };
  return (
    <Card
      sx={{
        width: "100%",
        height: 90,
        display: "flex",
        justifyContent: "flex-start",
        borderRadius: 1,
        marginTop: 3,
        marginBottom: 1,
        padding: 1,
        boxShadow: "none",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <CardMedia
        sx={{ width: "68px", height: 68 }}
        component={"img"}
        image={
          "https://cdn0.fahasa.com/media/catalog/product/i/m/image_217703.jpg"
        }
        onClick={handleClick}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
          {data?.name}
        </Typography>
        <Typography
          variant="subtitle2"
          fontSize={10}
          color={"#727272"}
          fontFamily={"Roboto Slab"}
        >
          {data?.description}
        </Typography>
      </CardContent>
      <CardContent sx={{ paddingTop: 0, position: "absolute", right: 30 }}>
        <Typography color={"rgb(255,114,22)"}>
          {configPrice(data?.price)}
        </Typography>
        <Box
          sx={{
            width: 100,
            height: 50,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleSub}>
            {data?.quanityOrdered > 0 ? (
              <RemoveCircleOutline sx={{ color: "rgb(255,114,22)" }} />
            ) : (
              <></>
            )}
          </IconButton>
          {data?.quanityOrdered > 0 ? (
            <Typography>{data?.quanityOrdered}</Typography>
          ) : (
            <></>
          )}
          <IconButton onClick={handleAdd}>
            <AddCircleOutline sx={{ color: "rgb(255,114,22)" }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

// const Box = styled.div`
//     width: 100px;
//     height: 50px;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     padding-right: 20px;
// `
export default OrderCard;
