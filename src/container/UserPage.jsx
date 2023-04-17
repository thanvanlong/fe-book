import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  Dialog,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfoClient } from "../store/Module.action";
import { Link, useNavigate } from "react-router-dom";
import OrderContainerService from "../service/OrderContainer.service";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
function UserPage() {
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "no email",
    password: "",
    username: "username",
    address: "address",
    phone: "phonenumber",
    open: false,
    editable: false,
    rs: {},
  });

  const service = new OrderContainerService();
  const callAPI = useCallback(async () => {
    setOpen(true);
    await service.getMe().then((res) => {
      res.data.data.editable = false;
      setUser(res.data.data);
    });
    setOpen(false);
  }, []);

  useEffect(() => {
    callAPI();
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      console.log(id);
      console.log(user);
      setUser({ ...user, [id]: value });
    },
    [user]
  );
  const handleClick = async () => {
    setUser({ ...user, editable: !user.editable });
    if (user.editable) {
      setOpen(true);
      const dt = await service.updateUser(user);
      if (dt.data.errorCode != "200") {
        setDialog(true);
      } else {
        setUser(dt.data.data);
        dispatch(setInfoClient(dt.data.data));
        setOpen(false);
      }
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage: `url('https://phanexpress.com/WebLauPhan/order/bg-order.png')`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        fontFamily={"Roboto Slab"}
        fontWeight={900}
        color="white"
        fontSize={25}
        paddingBottom={10}
        paddingTop={10}
      >
        THÔNG TIN TÀI KHOẢN
      </Typography>
      <Card
        sx={{
          width: 1150,
          height: 350,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 3,
        }}
      >
        <Box
          className="info_user"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: 350, padding: 15, marginBottom: 55 }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontSize={20}
              fontWeight={900}
            >
              Họ tên
            </Typography>
            {user?.editable == true ? (
              <TextField
                fullWidth
                variant="standard"
                id="name"
                value={user.name}
                onChange={handleChange}
              />
            ) : (
              <Typography
                fontFamily={"Roboto Slab"}
                paddingTop={1}
                fontSize={18}
              >
                {user.name}
              </Typography>
            )}
          </div>
          <div style={{ width: 350, padding: 15, marginBottom: 55 }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontSize={20}
              fontWeight={900}
            >
              Email
            </Typography>
            <Typography fontFamily={"Roboto Slab"} paddingTop={1} fontSize={18}>
              {user.email}
            </Typography>
          </div>
          <div style={{ width: 350, padding: 15, marginBottom: 55 }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontSize={20}
              fontWeight={900}
            >
              Số điện thoại
            </Typography>
            {user.editable == true ? (
              <TextField
                fullWidth
                variant="standard"
                id="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
              />
            ) : (
              <Typography
                fontFamily={"Roboto Slab"}
                paddingTop={1}
                fontSize={18}
              >
                {user.phoneNumber}
              </Typography>
            )}
          </div>
          <div style={{ width: 350, padding: 15, marginBottom: 55 }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontSize={20}
              fontWeight={900}
            >
              Địa chỉ
            </Typography>
            {user.editable ? (
              <TextField
                fullWidth
                variant="standard"
                id="address"
                value={user.address}
                onChange={handleChange}
              />
            ) : (
              <Typography
                fontFamily={"Roboto Slab"}
                paddingTop={1}
                fontSize={18}
              >
                {user.address}
              </Typography>
            )}
          </div>
          <div style={{ width: 350, padding: 15, marginBottom: 55 }}>
            <Typography
              fontFamily={"Roboto Slab"}
              fontSize={20}
              fontWeight={900}
            >
              Mật khẩu
            </Typography>
            {user.editable ? (
              <TextField
                fullWidth
                variant="standard"
                id="password"
                type="password"
                onChange={handleChange}
              />
            ) : (
              <Typography
                fontFamily={"Roboto Slab"}
                paddingTop={1}
                fontSize={18}
              >
                *************
              </Typography>
            )}
          </div>
          <div style={{ width: 350, padding: 15 }}>
            <Button
              onClick={handleClick}
              sx={{
                width: 300,
                height: 50,
                border: 1,
                backgroundColor: "rgb(255,114,22)",
                borderColor: "white",
                borderRadius: 6,
                color: "white",
                marginTop: 1,
              }}
            >
              {!user.editable ? "Sửa thông tin" : "Lưu thông tin"}
            </Button>
          </div>
        </Box>
      </Card>
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
            {!(user.rs?.data?.err === 2001)
              ? "Cập nhật thành công. Xin cảm ơn!"
              : "Cập nhật thất bại. Vui lòng sửa đổi thông tin hợp lệ để tiếp tục!"}
          </Typography>
          <Typography textAlign={"center"}>
            {!(user.rs?.data?.err === 2001 || user.rs?.data?.err === 2007) ? (
              <CheckCircleOutlineIcon
                sx={{
                  color: "rgb(35,188,35)",
                  fontSize: 200,
                }}
              />
            ) : (
              <SentimentVeryDissatisfiedIcon
                sx={{
                  color: "red",
                  fontSize: 200,
                }}
              />
            )}
          </Typography>
        </Box>
      </Dialog>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default React.memo(UserPage);
