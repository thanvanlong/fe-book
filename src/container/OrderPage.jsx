import React, { useCallback, useState, useEffect, useRef } from "react";
import MenuCard from "../component/MenuCard";
import FormOder from "../component/FormOrder";
import { Typography, Box, CardMedia, Backdrop } from "@mui/material";
import { initOrderedFood } from "../config/order.config";
import { initOrderedFood as initOrder } from "../store/Module.action";
import OrderContainerService from "../service/OrderContainer.service";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useDispatch } from "react-redux";
function Order() {
  const service = new OrderContainerService();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [district, setDistrict] = useState([]);
  const handleSubmit = (data) => {
    console.log(data);
    this.setState({
      backdrop: data,
    });
  };

  return (
    <Box
      sx={{
        backgroundImage: `url('https://phanexpress.com/WebLauPhan/order/bg-order.png')`,
        backgroundRepeat: "no-repeat",
        paddingTop: 10,
      }}
    >
      <Typography
        variant="h5"
        color={"white"}
        textTransform={"uppercase"}
        fontFamily={"Roboto Slab"}
        fontWeight={900}
        textAlign={"center"}
      >
        đặt hàng
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 3,
        }}
      >
        <CardMedia
          component={"img"}
          image={
            "https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2022/ZALOPAY-ONT12_1920x400.jpg"
          }
          sx={{
            width: "1250px",
            borderRadius: 3,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <FormOder district={district} handleSubmit={handleSubmit} />
        <MenuCard category={category} />
      </Box>
    </Box>
  );
}

export default Order;
