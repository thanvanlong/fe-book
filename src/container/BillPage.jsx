import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box, CardMedia, Backdrop } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Bill from "../component/Bill";
function BillPage() {
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
            "https://cdn0.fahasa.com/media/wysiwyg/Thang-11-2022/ZALOPAY-ONT12_1920x400.jpg"
          }
          sx={{
            width: "1300px",
            borderRadius: 3,
          }}
        />
      </Box>
      <Box>
        <Bill data={data} />
      </Box>

      {/* <Backdrop
                sx={{ color: '#fff', zIndex: 100 }}
                open={this.state.backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}
    </Box>
  );
}

export default BillPage;
