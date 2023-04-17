import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderContainerService from "../service/OrderContainer.service";
import CircularProgress from "@mui/material/CircularProgress";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useId } from "react";
import { configPhoneNumber } from "../config/order.config";
function Signup() {
  const id = useId();
  const [user, setUser] = useState({
    email: "",
    password: "",
    address: "",
    phone: "",
    open: false,
    id: Math.floor(Math.random() * 888888) + 100000,
    rs: {},
  });

  const navigate = useNavigate();
  const [dialog, setDialog] = useState(false);
  const [otp, setOtp] = useState();
  const [isSign, setIsSign] = useState(false);
  const service = new OrderContainerService();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    setUser({ ...user, phone: configPhoneNumber(user.phone) });
    const temp = configPhoneNumber(user.phone);
    setUser({ ...user, open: true, id: user.phone });
    e.preventDefault();
    const rs = await service.signup(user);
    if (rs.data.errorCode != "200") {
      setDialog(true);
      setUser({ ...user, open: false, rs: rs.data });
    } else {
      navigate("/login");
      setUser({
        ...user,
        open: false,
      });
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('https://phanexpress.com/WebLauPhan/order/bg-order.png')`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: !isSign ? "" : "none" }}>
        <Card
          sx={{
            width: 400,
            padding: 5,
          }}
        >
          <Typography
            fontSize={20}
            fontFamily={"Roboto Slab"}
            fontWeight={900}
            paddingBottom={3}
          >
            SIGNUP
          </Typography>
          <Typography
            fontSize={15}
            fontFamily={"Roboto Slab"}
            paddingBottom={1}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            name="email"
            id="email"
            value={user.email}
            required
            type={"email"}
            onChange={handleChange}
            size="small"
            sx={{
              marginBottom: 2,
            }}
          />
          <Typography
            fontSize={15}
            fontFamily={"Roboto Slab"}
            paddingBottom={1}
          >
            Username
          </Typography>
          <TextField
            fullWidth
            name="name"
            id="name"
            required
            onChange={handleChange}
            size="small"
            value={user.name}
            sx={{
              marginBottom: 2,
            }}
          />
          <Typography
            fontSize={15}
            fontFamily={"Roboto Slab"}
            paddingBottom={1}
          >
            Address
          </Typography>
          <TextField
            fullWidth
            name="address"
            id="address"
            value={user.address}
            required
            onChange={handleChange}
            size="small"
            sx={{
              marginBottom: 2,
            }}
          />
          <Typography
            fontSize={15}
            fontFamily={"Roboto Slab"}
            paddingBottom={1}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            name="password"
            id="password"
            value={user.password}
            required
            type={"password"}
            onChange={handleChange}
            size="small"
            sx={{
              marginBottom: 1,
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              sx={{
                width: 200,
                height: 50,
                border: 1,
                backgroundColor: "rgb(22,41,56)",
                borderColor: "white",
                borderRadius: 6,
                color: "white",
                marginTop: 3,
              }}
            >
              Đăng kí
            </Button>
          </Box>
          <Typography
            fontSize={15}
            fontFamily={"Roboto Slab"}
            textAlign={"center"}
            paddingTop={5}
            paddingBottom={1}
          >
            Bạn đã có tài khoản? Đăng nhập
            <Link to={"/login"}> tại đây</Link>
          </Typography>
        </Card>
      </form>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={user.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
            {user.rs?.data}
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
      <div id="sign-in-button"></div>
    </Box>
  );
}

export default Signup;
