import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  Divider,
  CardContent,
  Link,
  Box,
  Container,
} from "@mui/material";
import styled from "styled-components";
import { configPrice } from "../config/order.config";
function Bill(props) {
  const { data } = props;
  const { info, total } = data;
  const listFood = data?.orderFood;
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
              {data?.quanityOrdered}
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
          height: "700px",
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
              {info.name}
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
              {info.address}
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
              {info.province}
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
              {info.phoneNumber}
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
              {info.note}
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
          textAlign={"center"}
          textTransform={"uppercase"}
          fontFamily={"Roboto Slab"}
          paddingBottom={3}
          fontWeight={700}
          color={"rgb(255,114,22)"}
        >
          đặt hàng thành công
        </Typography>
        <Typography
          textAlign={"center"}
          fontFamily={"Roboto Slab"}
          paddingBottom={3}
          fontWeight={700}
        >
          StupidMonkey sẽ gọi liên hệ bạn sau ít phút để xác nhận đơn hàng
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
            listFood.map((item, index) => <BillCard data={item} key={index} />)
          ) : (
            <Card></Card>
          )}
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
            <Typography padding={0} fontFamily={"Roboto Slab"} fontWeight={900}>
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
            <Typography padding={0} fontFamily={"Roboto Slab"} fontWeight={900}>
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
            <Typography padding={0} fontFamily={"Roboto Slab"} fontWeight={900}>
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
            {configPrice(total * 1.03)}
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
      </Card>
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
export default Bill;
