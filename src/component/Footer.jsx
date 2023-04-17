import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { url as arrUrl } from "../utils/fakeData";
function Footer() {
  const url = useLocation();
  const pathname = url.pathname;
  const color = arrUrl.includes(pathname) ? "rgb(22,41,56)" : "rgb(255,114,22)";
  return (
    <Container style={{ backgroundColor: `${color}` }}>
      <Wrap>
        <h4>CÔNG TY CỔ PHẦN LONG</h4>
        <h5>
          Địa chỉ: Số 9 Đào Duy Anh, Phường Phương Mai, Quận Đống Đa, Thành phố
          Hà Nội
        </h5>
        <h5>Mã số thuế: 0108796725</h5>
        <h5>Ngày hoạt động: 20/07/2001</h5>
        <h5>Giấy phép kinh doanh: 0108796725</h5>
      </Wrap>
      <Information>
        <Link to={"/"}>
          <img src="https://lauphan.com/WebLauPhan/theme/icon-fb.svg" />
        </Link>
        <Link to={"/"}>
          <img src="https://lauphan.com/WebLauPhan/theme/icon-ins.svg" />
        </Link>
        <Link to={"/"}>
          <img src="https://lauphan.com/WebLauPhan/theme/icon-tiktok.svg" />
        </Link>
      </Information>
    </Container>
  );
}
const Container = styled.footer`
  width: 100%;
  height: 220px;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 15%;
  font-family: "Roboto Slab";
  font-weight: 900;
`;
const Wrap = styled.div`
  line-height: 20px;
  h4 {
    font-family: "Roboto Slab";
  }
`;
const Information = styled.div`
  height: 60%;
  width: 20%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  a {
    margin-left: 10px;
  }
`;
export default Footer;
