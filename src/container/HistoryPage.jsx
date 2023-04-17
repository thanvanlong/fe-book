import React, { memo, useCallback, useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Card,
  Table,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Backdrop,
  TablePagination,
} from "@mui/material";
import { configPrice, configState } from "../config/order.config";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import OrderContainerService from "../service/OrderContainer.service";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
function HistoryPage() {
  const [sort, setSort] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const service = new OrderContainerService();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const callAPI = useCallback(async () => {
    setOpen(true);
    await service.getOrder().then((res) => {
      const dt = res.data.err
        ? []
        : res.data?.data.map((item, index) => {
            return {
              ...item,
              total: total(item.books, item.quanityList) * 1.03,
            };
          });
      setRows(dt);
    });
    setOpen(false);
  }, []);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    callAPI();
  }, []);

  const total = (productList, quanityList) => {
    let sum = 0;
    productList.map((item, index) => {
      sum += item?.price * quanityList[index];
    });

    return sum;
  };

  useEffect(() => {
    setData(rows.slice(rowsPerPage * page, rowsPerPage * (page + 1)));
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setData(rows.slice(rowsPerPage * newPage, rowsPerPage * (newPage + 1)));
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowPerPage);
    setData(rows.slice(newRowPerPage * page, newRowPerPage * (page + 1)));
    setPage(0);
  };
  const handleSort = (e) => {
    const name = e.currentTarget.id;
    const temp = !sort
      ? rows.sort((a, b) => {
          console.log(a[name] + b[name]);
          return (a[name] + "").localeCompare(b[name] + "");
        })
      : rows.sort((a, b) => (b[name] + "").localeCompare(a[name] + ""));
    console.log(temp);
    setData(temp);
    setSort(!sort);
  };

  const Food = ({ data }) => {
    return (
      <Box
        sx={{
          width: 250,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBlock: 1,
        }}
      >
        <img width={60} src={data.imgUrl} />
        <Box>
          <Typography
            fontFamily={"Roboto Slab"}
            paddingLeft={2}
            fontWeight={900}
          >
            {data?.name.slice(0, 15)}...
          </Typography>
          <Typography
            fontFamily={"Roboto Slab"}
            paddingTop={2}
            fontSize={13}
            textAlign={"right"}
            fontWeight={900}
          >
            {configPrice(data?.price)}
          </Typography>
        </Box>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url('https://phanexpress.com/WebLauPhan/order/bg-order.png')`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <Typography
        fontFamily={"Roboto Slab"}
        fontSize={25}
        color="white"
        fontWeight={900}
      >
        LỊCH SỬ ĐẶT HÀNG
      </Typography>
      <Card
        sx={{
          width: "80%",
          marginBottom: 8,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                    STT
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                    Sản phẩm
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display={"flex"}>
                    <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                      Số lượng
                    </Typography>
                    {/* <Button sx={{ maxWidth: 5 }} id='quanity' onClick={handleSort}
                                            startIcon={<CompareArrowsIcon sx={{ transform: 'rotate(90deg)' }} />}>
                                        </Button> */}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"}>
                    <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                      Họ tên
                    </Typography>
                    <Button
                      id="orderer"
                      onClick={handleSort}
                      startIcon={
                        <CompareArrowsIcon
                          sx={{ transform: "rotate(90deg)" }}
                        />
                      }
                    ></Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex">
                    <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                      Giờ đặt
                    </Typography>
                    <Button
                      id="createdAt"
                      onClick={handleSort}
                      startIcon={
                        <CompareArrowsIcon
                          sx={{ transform: "rotate(90deg)" }}
                        />
                      }
                    ></Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex">
                    <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                      Trạng thái
                    </Typography>
                    <Button
                      id="createdAt"
                      onClick={handleSort}
                      startIcon={
                        <CompareArrowsIcon
                          sx={{ transform: "rotate(90deg)" }}
                        />
                      }
                    ></Button>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"}>
                    <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                      Tổng tiền
                    </Typography>
                    <Button
                      id="total"
                      onClick={handleSort}
                      startIcon={
                        <CompareArrowsIcon
                          sx={{ transform: "rotate(90deg)" }}
                        />
                      }
                    ></Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ overflowY: "auto" }}>
              {data.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/detail-bill", {
                        state: {
                          id: item.id,
                        },
                      });
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ width: 350, paddingLeft: 0 }}>
                      {item?.books.map((it, index) => (
                        <Food data={it} key={it} />
                      ))}
                    </TableCell>
                    <TableCell id={item?.id}>
                      {item.quanityList.map((it, index) => (
                        <Typography
                          key={it}
                          fontFamily={"Roboto Slab"}
                          paddingBottom={5}
                          fontWeight={900}
                        >
                          {it}
                        </Typography>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                        {item.user.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                        {item.localDateTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                        {configState(item.status)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontFamily={"Roboto Slab"} fontWeight={900}>
                        {configPrice(item.total)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

export default memo(HistoryPage);
