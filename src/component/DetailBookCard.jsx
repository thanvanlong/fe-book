import {
  Card,
  Box,
  CardMedia,
  Button,
  Typography,
  Rating,
  CardContent,
  IconButton,
  TextField,
  Divider,
  Backdrop,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { configPrice } from "../config/order.config";
import CircularProgress from "@mui/material/CircularProgress";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import OrderContainerService from "../service/OrderContainer.service";
import { useDispatch } from "react-redux";
import { setOrderedFood } from "../store/Module.action";
import { useNavigate } from "react-router-dom";
function DetailBookCard() {
  const param = useParams();
  const service = new OrderContainerService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [star, setStar] = useState(1);
  const [comment, setComment] = useState([]);
  const [open, setOpen] = useState(false);
  const rating = {
    book: {
      id: data?.id,
    },
    star: 1,
    comment: "",
  };

  const [rate, setRate] = useState(rating);

  const handleChange = (e, val) => {
    let { name, value } = e.target;

    if (val) {
      value = val;
      setStar(value);
    }
    setRate({ ...rate, [name]: value });

    console.log(name + " ----------- " + value);
  };

  const handleSubmit = async () => {
    await service.postRate(rate).then((res) => {
      setComment([...comment, res.data.data]);
    });
    setStar(1);
    setRate(rating);
  };

  const callAPI = useCallback(async () => {
    let id;
    setOpen(true);
    await service.getOneBook(param?.id).then((res) => {
      const newData = { ...res.data?.data, quanityOrdered: 0 };
      id = newData?.id;
      setRate({ ...rate, book: { id: newData?.id } });
      setData(newData);
    });

    await service.getCommentBook(id).then((dt) => {
      console.log(dt.data.data);
      setComment(dt.data.data);
    });

    setOpen(false);
  }, []);

  const handleOrder = () => {
    console.log(data);
    dispatch(setOrderedFood(data));
  };

  const handleBuy = () => {
    dispatch(setOrderedFood(data));
    navigate("/order");
  };

  const handleAdd = () => {
    if (data?.quanityOrdered >= data?.totalQuantity) {
      return;
    }
    setData({
      ...data,
      quanityOrdered: data?.quanityOrdered + 1,
      time: !data?.time ? new Date().toLocaleTimeString() : data?.time,
    });
    console.log(data);
  };
  const handleSub = () => {
    setData({
      ...data,
      quanityOrdered:
        data?.quanityOrdered - 1 > 0 ? data?.quanityOrdered - 1 : 0,
      time: !data?.time ? new Date().toLocaleTimeString() : data?.time,
    });
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
      }}
    >
      <Card
        style={{
          width: "85%",
          height: "70vh",
          background: "white",
          display: "flex",
          padding: 5,
        }}
      >
        <Box
          style={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            style={{ minHeight: 380, display: "flex", alignItems: "center" }}
          >
            <CardMedia
              sx={{ width: "90%", maxHeight: 380 }}
              component={"img"}
              image={data?.imgUrl}
            />
          </Box>
          <Box style={{ marginTop: 10, display: "flex" }}>
            <Button
              startIcon={<ShoppingCartOutlinedIcon />}
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
              onClick={handleOrder}
            >
              {" "}
              Thêm vào giỏ hàng
            </Button>
            <Button
              sx={{
                width: 180,
                height: 40,
                border: 2,
                color: "white",
                background: "rgb(255,114,22)",
                borderRadius: 3,
                fontSize: 12,
                marginLeft: 2,
              }}
              onClick={handleBuy}
            >
              {" "}
              Mua ngay
            </Button>
          </Box>
        </Box>

        <Box style={{ width: "65%", padding: 5 }} className="info-book">
          <Typography
            className="title-book"
            variant="span"
            fontWeight={"700"}
            fontSize="25px"
          >
            {" "}
            {data?.name}
          </Typography>

          <Box
            className="more-info"
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              paddingInline: 10,
            }}
          >
            <Box display={"flex"} flexDirection={"column"} marginTop={"10px"}>
              <Typography
                variant="span"
                fontSize={"15px"}
                fontFamily="Roboto"
                marginTop={2.5}
              >
                Nhà cung cấp:{" "}
                {
                  <span
                    style={{
                      color: "rgb(255,114,22)",
                      fontFamily: "Roboto",
                      fontWeight: "600",
                    }}
                  >
                    {data?.company}
                  </span>
                }
              </Typography>
              <Typography
                variant="span"
                fontSize={"15px"}
                fontFamily="Roboto"
                marginTop={2.5}
              >
                Tác giả:{" "}
                {
                  <span
                    style={{
                      color: "rgb(255,114,22)",
                      fontFamily: "Roboto",
                      fontWeight: "600",
                    }}
                  >
                    {data?.author}
                  </span>
                }
              </Typography>
              <Typography
                variant="span"
                fontSize={"15px"}
                fontFamily="Roboto"
                marginTop={2.5}
              >
                Còn lại:{" "}
                {
                  <span
                    style={{
                      color: "rgb(255,114,22)",
                      fontFamily: "Roboto",
                      fontWeight: "600",
                    }}
                  >
                    {data?.totalQuantity}
                  </span>
                }
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"} marginTop={"10px"}>
              <Typography
                variant="span"
                fontSize={"15px"}
                fontFamily="Roboto"
                marginTop={2.5}
              >
                Ngày xuất bản:{" "}
                {
                  <span
                    style={{
                      color: "rgb(255,114,22)",
                      fontFamily: "Roboto",
                      fontWeight: "600",
                    }}
                  >
                    {data?.publishedDate}
                  </span>
                }
              </Typography>
              <Typography
                variant="span"
                fontSize={"15px"}
                fontFamily="Roboto"
                marginTop={2.5}
              >
                Đã bán: {data?.buyCount}
              </Typography>
            </Box>
          </Box>
          <CardContent sx={{ paddingTop: 0, marginTop: 10 }}>
            <Typography color={"rgb(255,114,22)"} variant={"h4"}>
              {configPrice(data?.price ?? "0")}
            </Typography>
            <Box
              sx={{
                width: 200,
                height: 100,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography>Số lượng: </Typography>
              <IconButton onClick={handleSub}>
                <RemoveCircleOutline sx={{ color: "rgb(255,114,22)" }} />
              </IconButton>
              {data?.quanityOrdered}
              <IconButton onClick={handleAdd}>
                <AddCircleOutline sx={{ color: "rgb(255,114,22)" }} />
              </IconButton>
            </Box>
          </CardContent>
        </Box>
      </Card>

      <Card
        style={{
          width: "85%",
          background: "white",
          padding: 25,
          marginTop: 15,
        }}
      >
        <Box>
          <Typography fontWeight={700} fontSize={20}>
            Thông tin sản phẩm
          </Typography>
        </Box>
        <Box
          style={{
            width: "100%",
            display: "flex",
            marginTop: 15,
          }}
        >
          <Box className="key-info" style={{ width: "20%" }}>
            <Typography
              color={"rgb(119,119,119)"}
              marginTop={1.5}
              fontWeight={400}
            >
              Mã hàng:
            </Typography>
            <Typography
              color={"rgb(119,119,119)"}
              marginTop={1.5}
              fontWeight={400}
            >
              Tên nhà cung cấp:
            </Typography>
            <Typography
              color={"rgb(119,119,119)"}
              marginTop={1.5}
              fontWeight={400}
            >
              Năm XB:
            </Typography>
            <Typography
              color={"rgb(119,119,119)"}
              marginTop={1.5}
              fontWeight={400}
            >
              Số trang:
            </Typography>
            <Typography
              color={"rgb(119,119,119)"}
              marginTop={1.5}
              fontWeight={400}
            >
              Kích thước bao bì:
            </Typography>
            <Typography
              color={"rgb(119,119,119)"}
              marginTop={1.5}
              fontWeight={400}
            >
              Mô tả:
            </Typography>
          </Box>

          <Box className="key-content" style={{ width: "70%" }}>
            <Typography marginTop={1.5} fontWeight={400}>
              8934974183891
            </Typography>
            <Typography marginTop={1.5} fontWeight={400}>
              {data?.company}
            </Typography>
            <Typography marginTop={1.5} fontWeight={400}>
              {data?.publishedDate}
            </Typography>
            <Typography marginTop={1.5} fontWeight={400}>
              {data?.pageCount}
            </Typography>
            <Typography marginTop={1.5} fontWeight={400}>
              1000kg
            </Typography>

            <Typography>{data?.description}</Typography>
          </Box>
        </Box>
      </Card>
      <Card
        style={{
          width: "85%",
          background: "white",
          padding: 25,
          marginTop: 15,
        }}
      >
        <Box>
          <Typography fontWeight={700} fontSize={20}>
            Đánh giá sản phẩm
          </Typography>
        </Box>
        <Box
          style={{ disPlay: "flex", flexDirection: "column", width: "100%" }}
        >
          <Rating
            value={star}
            style={{ padding: 10 }}
            size="large"
            name="star"
            onChange={handleChange}
          ></Rating>
          <TextField
            variant="outlined"
            fullWidth
            name="comment"
            placeholder="Nhập nhận xét của bạn về sản phẩm"
            multiline
            rows={5}
            value={rate.comment}
            onChange={handleChange}
          ></TextField>
          <Button
            style={{
              position: "relative",
              top: 3,
              right: 0,
              color: "white",
              backgroundColor: "rgb(255,113,22)",
              marginTop: 10,
            }}
            variant={"contained"}
            disabled={rate.comment.length > 0 ? false : true}
            onClick={handleSubmit}
          >
            Đánh giá
          </Button>
        </Box>
        <Divider sx={{ marginTop: 2 }} />
        {comment.map((item, index) => (
          <Box style={{ display: "flex", width: "100%", paddingBlock: 30 }}>
            <Box sx={{ width: "25%" }}>
              <Typography>{item?.user?.name}</Typography>
              <Typography>{item?.localDate}</Typography>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Rating value={item?.star} readOnly size={"medium"}></Rating>
              <Typography>{item?.comment}</Typography>
            </Box>
          </Box>
        ))}
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default DetailBookCard;
