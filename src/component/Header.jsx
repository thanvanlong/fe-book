import {
  Box,
  Button,
  Dialog,
  Divider,
  Typography,
  Backdrop,
  CircularProgress,
  Badge,
  IconButton,
} from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { Login } from "@mui/icons-material";
import { url as arrUrl } from "../utils/fakeData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AvTimerOutlinedIcon from "@mui/icons-material/AvTimerOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useDispatch, useSelector } from "react-redux";
import { setInfoClient, setOrderedFood } from "../store/Module.action";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Header() {
  const url = useLocation();
  const [position, setPosition] = useState("relative");
  const [dialog, setDialog] = useState(false);
  const pathname = url.pathname;
  const color = arrUrl.includes(pathname) ? "rgb(22,41,56)" : "";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useSelector((state) => console.log(state));
  const dd = useSelector((state) => state.foodReducer.infoClient);
  const order = useSelector((state) => state.foodReducer.listFood);
  const ordered = order.filter((item) => item.quanityOrdered > 0);

  const handleCart = () => {
    navigate("/order");
  };

  const user = {
    username: dd.name,
    phone: dd.phone,
    address: dd.address,
  };
  const handleSignout = () => {
    localStorage.clear();
    dispatch(setOrderedFood({ clear: true }));
    dispatch(setInfoClient({}));
    setDialog(false);
    navigate("/login");
  };
  // const temp = localStorage.getItem('USER_KEY')
  // const tmp = useCallback(async () => {
  //   setOpen(true);
  //   await service.getUserById(temp)
  //     .then(res => {
  //       dispatch(setInfoClient(res.data));
  //       console.log(res.data);
  //       return setUser(res.data)
  //     })
  //   setOpen(false);
  // }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= 200) {
        setPosition("fixed");
      } else {
        setPosition("relative");
      }
    });
  }, []);
  return (
    <Container
      style={{
        background: `${color}`,
        position: `${position}`,
        top: 0,
      }}
    >
      <Wrap>
        <Link to="/">
          <img src="https://lauphan.com/WebLauPhan/theme/logo_phan.svg" />
        </Link>
      </Wrap>
      <Nav></Nav>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          right: -100,
        }}
      >
        <Box
          width={250}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {localStorage.getItem("USER_KEY") ? (
            <>
              <IconButton onClick={handleCart}>
                <Badge badgeContent={ordered?.length} color="primary">
                  <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              <Button
                startIcon={<MailOutlineIcon />}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  color: "white",
                }}
                onClick={() => {
                  setDialog(true);
                }}
              >
                Xin chao {user?.username ?? ""}
                {/* {user?.username.length <= 10
                  ? user?.username
                  : (user?.username + "").substring(0, 10) + "..."} */}
              </Button>
            </>
          ) : (
            <Button
              sx={{
                width: 160,
                height: 40,
                border: 1,
                borderColor: "white",
                borderRadius: 5,
              }}
              endIcon={
                <PersonOutlineRoundedIcon
                  sx={{ color: "white", fontSize: 15 }}
                />
              }
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/login"}
              >
                Đăng nhập
              </Link>
            </Button>
          )}
        </Box>
        <Dialog
          open={dialog}
          onClose={() => {
            setDialog(false);
          }}
          sx={{
            position: "absolute",
            top: -250,
            right: -1100,
          }}
        >
          <Box
            sx={{
              width: 320,
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography textAlign={"center"}>
              <PersonOutlineIcon sx={{ fontSize: 100 }} />
            </Typography>
            <Button
              startIcon={<SettingsOutlinedIcon />}
              onClick={() => {
                setDialog(false);
              }}
              sx={{
                width: 300,
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: 5,
                paddingBottom: 2,
                color: "rgb(22,41,56)",
              }}
            >
              <Link
                to={"/userinfo"}
                style={{
                  textDecoration: "none",
                  color: "rgb(22,41,56)",
                  fontWeight: 900,
                }}
              >
                Thông tin tài khoản
              </Link>
            </Button>
            <Divider />
            <Button
              startIcon={<AvTimerOutlinedIcon />}
              onClick={() => {
                setDialog(false);
              }}
              sx={{
                width: 300,
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: 5,
                paddingBottom: 2,
                color: "rgb(22,41,56)",
              }}
            >
              <Link
                to={"/history/bill"}
                style={{
                  textDecoration: "none",
                  color: "rgb(22,41,56)",
                  fontWeight: 900,
                }}
              >
                Lịch sử đặt hàng
              </Link>
            </Button>
            <Divider />
            <Button
              startIcon={<Login />}
              onClick={handleSignout}
              sx={{
                width: 300,
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: 5,
                paddingBottom: 2,
                color: "rgb(22,41,56)",
              }}
            >
              Đăng xuất
            </Button>
          </Box>
        </Dialog>
        <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 76px;
  background-image: url("../../img/header.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  aligin-items: center;
  z-index: 11;
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
`;
const Wrap = styled.div`
  width: 100px;
  height: inherit;
  img {
    width: 70%;
    object-fit: cover;
    object-position: center;
  }
  transform: translateX(-150px);
  a {
    text-decoration: none;
    color: white;
  }
`;
const Nav = styled.div`
  width: 50%;
  height: 76px;
  ul {
    width: 100%px;
    height: 76px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
    a {
      text-decoration: none;
      color: white;
      font-size: 20px;
    }
  }
`;
export default memo(Header);
