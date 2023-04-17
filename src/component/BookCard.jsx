import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { configPrice } from "../config/order.config";
import { useNavigate } from "react-router-dom";

function BookCard(props) {
  const { data } = props;
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/detail/" + data?.id);
  };
  return (
    <Card
      style={{
        width: "190px",
        height: "260px",
        paddingInline: 3,
        paddingBlock: 10,
        paddingBottom: 5,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={data?.imgUrl}
      />
      <CardContent>
        <Box style={{ height: "40px" }}>
          <Typography fontFamily={"Roboto Slab"} fontWeight={700}>
            {data?.name.length > 15
              ? data?.name.substring(0, 15) + "..."
              : data?.name}
          </Typography>
        </Box>
        <Box style={{ height: "30px" }}>
          <Typography
            fontFamily={"Roboto Slab"}
            fontWeight={700}
            color={"rgb(119,119,119)"}
            style={{ color: "rgb(255,114,22)" }}
          >
            {configPrice(data?.price)}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography fontFamily={"Roboto Slab"} fontWeight={700} fontSize={10}>
            Đã bán {data?.buyCount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BookCard;
