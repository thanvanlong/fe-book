import { Grid, Box, Pagination, Backdrop } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import BookCard from "../component/BookCard";
import axios from "axios";
import OrderContainerService from "../service/OrderContainer.service";
import { useDispatch, useSelector } from "react-redux";
import { initOrderedFood as initOrder } from "../store/Module.action";
import { initOrderedFood } from "../config/order.config";
import { async } from "@firebase/util";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function MenuBook() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const service = new OrderContainerService();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const tmp = useSelector((state) => state?.foodReducer?.listFood);
  const callAPI = useCallback(async () => {
    setOpen(true);
    await service.getAllProduct(page).then((res) => {
      console.log(res);
      setData(res.data.data);
      if (!tmp) {
        dispatch(initOrder(initOrderedFood(res.data.data)));
      }
    });
    setOpen(false);
  }, []);

  const handleChange = async (e, value) => {
    setPage(value);
    await service.getAllProduct(value).then((res) => {
      console.log("handle value");
      res.data.data.map((item) => {
        data.push(item);
      });
      dispatch(initOrder(initOrderedFood(data)));
      console.log(res.data.data);
      setData(res.data.data);
      window.scrollTo(0, 0);
      // if (!tmp) {

      // }
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("USER_KEY")) {
      navigate("/login");
    }
    callAPI();
  }, []);
  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingInline: 100,
        paddingTop: 30,
        paddingBottom: 20,
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2} sx={{ minHeight: 350 }}>
        {data.map((item, index) => (
          <Grid item>
            <BookCard data={item} />
          </Grid>
        ))}
      </Grid>
      <Pagination onChange={handleChange} count={5} sx={{ marginTop: 5 }} />
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default MenuBook;
