import {
  Card,
  Typography,
  TextField,
  Divider,
  Button,
  Link,
  Backdrop,
  Dialog,
} from "@mui/material";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import React, { memo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import OrderCard from "./OrderCard";
import SelectCard from "./SelectCard";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { configDataOrderPost, configPrice } from "../config/order.config.js";
import { date, time } from "../utils/fakeData";
import OrderContainerService from "../service/OrderContainer.service";
import { useNavigate } from "react-router-dom";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { setOrderedFood } from "../store/Module.action";
import jwtDecode from "jwt-decode";
function FormOrder(props) {
  const { district } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dd = useSelector((state) => state.foodReducer.infoClient);
  const service = new OrderContainerService(dispatch);
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    date: null,
    time: null,
    note: "",
  });
  const callAPI = useCallback(async () => {
    setOpen(true);
    await service.getMe().then((res) => {
      setInfo(res.data.data);
    });
    setOpen(false);
  }, []);
  useEffect(() => {
    callAPI();
  }, []);

  const dataOrder = useSelector((state) =>
    state?.foodReducer?.listFood.filter((item) => item.quanityOrdered > 0)
  );
  const data = dataOrder.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });
  const total = data.reduce((result, product) => {
    return result + product.price * product?.quanityOrdered;
  }, 0);
  const handleChange = (e) => {
    const name = e.target.id ? e.target.id : e.target.name;
    const value = e.target.value;
    console.log(value);
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dt = configDataOrderPost(dataOrder, info);
    if (!localStorage.getItem("USER_KEY")) {
      setDialog(true);
    } else if (info?.name && info.phoneNumber && info.address) {
      setOpen(true);
      const rs = await service.orderBook(dt);
      if (rs.data?.errorCode != "200") {
        setDialog(true);
      } else {
        navigate("/bill", {
          state: {
            orderFood: data,
            total: total,
            info: info,
          },
        });
        dispatch(setOrderedFood([]));
      }

      setOpen(false);
    } else if (!info.name || !info.phoneNumber || !info.address) {
      window.alert("Vui long nhap day dung thong tin!");
    }
  };
  const card = {
    width: "370px",
    height: "700px",
    paddingTop: "20px",
    borderRadius: "25px",
  };
  return (
    <Box width={375}>
      <form>
        <Card style={card}>
          <Typography
            textTransform={"uppercase"}
            fontFamily={"Roboto Slab"}
            fontWeight={900}
            textAlign={"center"}
            marginBottom={"50px"}
            variant={"h5"}
          >
            Thông tin đặt hàng
          </Typography>
          <Bos id="name">
            <div style={{ width: "100%" }}>
              <Typography
                fontFamily={"Roboto Slab"}
                fontWeight={900}
                fontSize={"16px"}
                marginBottom={"5px"}
              >
                Họ tên
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                id="name"
                value={info?.name}
                placeholder="Nhập họ tên"
                onChange={handleChange}
                sx={{ padding: "5px" }}
                required
              />
            </div>
          </Bos>
          <Bos id="address">
            <div style={{ width: "100%" }}>
              <Typography
                fontFamily={"Roboto Slab"}
                fontWeight={900}
                fontSize={"16px"}
                marginBottom={"5px"}
              >
                Địa chỉ nhận hàng
              </Typography>
              <TextField
                fullWidth
                id="address"
                value={info?.address}
                variant="standard"
                onChange={handleChange}
                placeholder="Nhập số địa chỉ"
                sx={{ padding: "5px" }}
                required={true}
              />
            </div>
          </Bos>
          <Bos id="phonenumber">
            <div style={{ width: "100%" }}>
              <Typography
                fontFamily={"Roboto Slab"}
                fontWeight={900}
                fontSize={"16px"}
                marginBottom={"5px"}
              >
                Số điện thoại
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                required
                id="phone"
                value={info?.phoneNumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                sx={{ padding: "5px" }}
              />
            </div>
          </Bos>
          <Bos id="note">
            <div style={{ width: "100%" }}>
              <Typography
                fontFamily={"Roboto Slab"}
                fontWeight={900}
                fontSize={"16px"}
                marginBottom={"5px"}
              >
                Ghi chú
              </Typography>
              <TextField
                fullWidth
                variant="standard"
                id="note"
                onChange={handleChange}
                placeholder="Nhập ghi chú"
                sx={{ padding: "5px" }}
              />
            </div>
          </Bos>
        </Card>
        <Card
          sx={{
            width: "370px",
            padding: "20px",
            borderRadius: "25px",
            marginRight: "40px",
            marginTop: "30px",
            display: data.length > 0 ? "" : "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxHeight: "390px",
              overflowY: "auto",
              overflowX: "hidden",
              marginBottom: 5,
            }}
          >
            {data.map((item, index) => (
              <OrderCard data={item} key={index} />
            ))}
          </Box>
          <Divider />
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 2,
              }}
            >
              <Typography
                padding={0}
                fontFamily={"Roboto Slab"}
                fontWeight={900}
              >
                Tổng hóa đơn
              </Typography>
              <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                {configPrice(total)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 2,
              }}
            >
              <Typography
                padding={0}
                fontFamily={"Roboto Slab"}
                fontWeight={900}
              >
                Giảm giá khuyến mại
              </Typography>
              <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                {configPrice(0)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 2,
              }}
            >
              <Typography
                padding={0}
                fontFamily={"Roboto Slab"}
                fontWeight={900}
              >
                VAT
              </Typography>
              <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                {configPrice(Math.round(total * 0.03))}
              </Typography>
            </Box>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={20}
              textAlign={"center"}
              textTransform={"uppercase"}
              paddingTop={2}
            >
              số tiền cần thanh toán
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={20}
              textAlign={"center"}
              textTransform={"uppercase"}
              paddingTop={1}
              color={"rgb(255,114,22)"}
            >
              {configPrice(Math.round(total * 1.03))}
            </Typography>
          </Box>
          <Typography
            padding={0}
            fontFamily={"Roboto Slab"}
            fontWeight={500}
            textAlign={"center"}
          >
            (Giá trên chưa bao gồm phí vận chuyển)
          </Typography>
          <Button
            onClick={handleSubmit}
            type={"submit"}
            sx={{
              width: "300px",
              height: "40px",
              background: "rgb(255,114,22)",
              color: "white",
              borderRadius: "30px",
              marginTop: 3,
              marginLeft: 2,
            }}
          >
            ĐẶT HÀNG
          </Button>
        </Card>
      </form>
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
        }}
      >
        <Box
          sx={{
            width: 500,

            backgroundColor: "white",
            padding: 5,
          }}
        >
          <Typography
            fontFamily={"Roboto Slab"}
            fontSize={20}
            textAlign={"center"}
            textTransform={"uppercase"}
            paddingBottom={5}
            paragraph
          >
            SỐ lượng sản phẩm không còn. Cảm phiền quý khách quay lại sau!
          </Typography>
          <Typography textAlign={"center"}>
            <SentimentVeryDissatisfiedIcon
              sx={{
                color: "red",
                fontSize: 200,
              }}
            />
          </Typography>
        </Box>
      </Dialog>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
const Bos = styled.div`
  width: 100%;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
export default memo(FormOrder);
