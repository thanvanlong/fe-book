import { CardHeader, Card, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import { useSelector } from "react-redux";
import OrderContainerService from "../service/OrderContainer.service";
import { useNavigate } from "react-router-dom";
function MenuCard({ category }) {
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();
  const dataOrder = useSelector((state) =>
    state.foodReducer.listFood.filter((item) => item.quanityOrdered > 0)
  );

  useEffect(() => {
    setNoData(dataOrder.length > 0 ? false : true);
  }, [dataOrder]);

  return (
    <Card
      sx={{
        width: 850,
        borderRadius: 4,
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      <Typography
        textTransform={"uppercase"}
        fontFamily={"Roboto Slab"}
        fontWeight={900}
        textAlign={"center"}
        marginBottom={"30px"}
        variant={"h5"}
      >
        Danh sách sản phẩm
      </Typography>
      <Box>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {dataOrder.map((it, index) => {
            return <OrderCard data={it} key={index} />;
          })}
        </div>
        <Box
          sx={{
            width: "100%",
            height: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography
              textTransform={"uppercase"}
              fontFamily={"Roboto Slab"}
              fontWeight={900}
              textAlign={"center"}
            >
              Go to Shop
            </Typography>
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default MenuCard;
