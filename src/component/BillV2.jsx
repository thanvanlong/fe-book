import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Typography,
  CardMedia,
  Divider,
  CardContent,
  Link,
  Box,
  Container,
  Button,
  Backdrop,
} from "@mui/material";
import styled from "styled-components";
import { configPrice, configState } from "../config/order.config";
import OrderContainerService from "../service/OrderContainer.service";
import CircularProgress from "@mui/material/CircularProgress";
function BillV2(props) {
  const { data } = props;
  const { id, total } = data;
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const listFood = info?.books;
  const quanityList = info?.quanityList;
  const service = new OrderContainerService();
  const callAPI = useCallback(async () => {
    setOpen(true);
    await service.getOneOrderById(id).then((res) => {
      setInfo(res.data.data);
    });
    setOpen(false);
  }, []);

  useEffect(() => {
    callAPI();
  }, []);
  const handleCancel = async () => {
    const dt = await service.cancelBill(info?.id, -1).then((res) => {
      window.location.reload();
    });
  };
  const BillCard = (dt) => {
    const data = dt?.data;
    return (
      <Card
        sx={{
          height: 95,
          display: "flex",
          justifyContent: "flex-start",
          borderRadius: 1,
          marginTop: 3,
          marginBottom: 1,
          marginLeft: 3,
          padding: 1,
          boxShadow: "none",
        }}
      >
        <CardMedia
          sx={{ width: "68px", height: 68 }}
          component={"img"}
          image={data?.imgUrl}
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
        <CardContent sx={{ paddingTop: 0 }}>
          <Box
            sx={{
              width: 300,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginLeft: 15,
            }}
          >
            <Typography fontFamily={"Roboto Slab"} fontWeight={700}>
              {dt?.quanity}
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={700}
              color={"rgb(255,114,22)"}
            >
              {configPrice(data?.price)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };
  return (
    <Box
      sx={{
        padding: 6,
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Card
        sx={{
          width: "370px",
          height: "500px",
          borderRadius: "25px",
          paddingTop: "20px",
        }}
      >
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
              fontWeight={500}
              fontSize={"16px"}
              marginBottom={"10px"}
            >
              Họ tên
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={"16px"}
              marginBottom={"5px"}
            >
              {info?.name}
            </Typography>
          </div>
        </Bos>
        <Bos id="address">
          <div style={{ width: "100%" }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={500}
              fontSize={"16px"}
              marginBottom={"10px"}
            >
              Địa chỉ đặt hàng
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={"16px"}
              marginBottom={"5px"}
            >
              {info?.address}
            </Typography>
          </div>
        </Bos>
        <Bos id="province">
          <div style={{ width: "40%" }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={500}
              fontSize={"16px"}
              marginBottom={"10px"}
            >
              Thành phố
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={"16px"}
              marginBottom={"5px"}
            >
              Hà Nội
            </Typography>
          </div>
          <div style={{ width: "40%" }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={500}
              fontSize={"16px"}
              marginBottom={"10px"}
            >
              Quận
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={"16px"}
              marginBottom={"5px"}
            >
              {info?.province}
            </Typography>
          </div>
        </Bos>
        <Bos id="phonenumber">
          <div style={{ width: "100%" }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={500}
              fontSize={"16px"}
              marginBottom={"10px"}
            >
              Số điện thoại
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={"16px"}
              marginBottom={"5px"}
            >
              {info?.phoneNumber}
            </Typography>
          </div>
        </Bos>
        <Bos id="note">
          <div style={{ width: "100%" }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={500}
              fontSize={"16px"}
              marginBottom={"10px"}
            >
              Ghi chú
            </Typography>
            <Typography
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              fontSize={"16px"}
              marginBottom={"5px"}
            >
              {info?.note}
            </Typography>
          </div>
        </Bos>
      </Card>
      <Card
        sx={{
          width: 800,
          padding: 5,
          borderRadius: "25px",
        }}
      >
        <Typography
          textAlign={"start"}
          textTransform={"uppercase"}
          fontFamily={"Roboto Slab"}
          paddingBottom={3}
          fontWeight={700}
          color={"rgb(255,114,22)"}
        >
          Trạng thái đơn hàng: {configState(info?.status)}
        </Typography>
        <Typography
          textAlign={"center"}
          textTransform={"uppercase"}
          fontFamily={"Roboto Slab"}
          paddingBottom={3}
          fontWeight={700}
        >
          Xin cảm ơn
        </Typography>
        <Box
          sx={{
            width: 300,
            display: "flex",
            justifyContent: "space-around",
            position: "relative",
            left: 375,
          }}
        >
          <Typography
            textAlign={"center"}
            fontFamily={"Roboto Slab"}
            paddingBottom={3}
            fontWeight={700}
          >
            Số lượng
          </Typography>
          <Typography
            textAlign={"center"}
            fontFamily={"Roboto Slab"}
            paddingBottom={3}
            fontWeight={700}
          >
            Thành tiền
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            marginBottom: 5,
          }}
        >
          {listFood ? (
            listFood.map((item, index) => (
              <BillCard data={item} quanity={quanityList[index]} key={index} />
            ))
          ) : (
            <Card></Card>
          )}
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              width: 180,
              height: 40,
              border: 2,
              color: "rgb(255,114,22)",
              borderStyle: "solid",
              borderColor: "rgb(255,114,22)",
              borderRadius: 3,
              fontSize: 12,
            }}
            disabled={info?.status == 0 ? false : true}
            onClick={handleCancel}
          >
            {" "}
            Huỷ đơn hàng
          </Button>
        </Box>
      </Card>
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
export default BillV2;
