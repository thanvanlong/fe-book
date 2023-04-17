import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box, CardMedia, Backdrop } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Bill from "../component/Bill";
import BillV2 from "../component/BillV2";
function DetailBill() {
  const location = useLocation();
  console.log(location);
  const data = location?.state;
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
        đơn hàng
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
            "https://cdn.lauphan.com/photo-storage/myFile-1636044693643.jpeg"
          }
          sx={{
            width: "1300px",
            borderRadius: 3,
          }}
        />
      </Box>
      <Box>
        <BillV2 data={data} />
      </Box>
    </Box>
  );
}

export default DetailBill;
