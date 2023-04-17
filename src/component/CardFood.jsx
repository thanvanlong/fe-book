import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
function CardFood() {
  return (
    <Container>
      <Box>
        <div>
          Set
          <span> 129K</span>
        </div>
        <p>Thêm thật hiều món hấp dẫn</p>
        <h6>24 món</h6>
      </Box>
      <Box2>
        <img src='https://cdn.lauphan.com/photo-storage/myFile-1617847257643.jpeg' />
        <button>
          <Link to={"/menu"} >Xem thực đơn</Link>
        </button>
      </Box2>
    </Container>
  )
}
const Container = styled.div`
  width: 370px;
  height: 670px;
`
const Box = styled.div`
  position: relative;
  line-height: 50px;
  margin-left: 25px;
  div{
    font-family: 'Sansita Swashed';
    font-size: 35pt;
  }
  span{
    font-size: 50pt;
    font-weight: 800;
    font-family: 'Sansita Swashed';
    color: #ff6a00;
  }
  p{
    font-size: 14pt;
  }
  h6{
    font-size: 13pt;
    color: #ff6a00;
  }
  &::after{
    width: 8px;
    height: 100%;
    background: #DF5800;
    content: "";
    position: absolute;
    top: 0;
    left: -15px;
  }
`
const Box2 = styled.div`
  width: 305px;
  height: 438px;
  margin-left: 10px;
  margin-top: 50px;
  position: relative;
  img{
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  a{
    text-decoration: none;
    color: white;
    font-size: 17px;
    font-weight: 800;
  }
  button{
    border: none;
    background: black;
    width: 210px;
    height: 45px;
    border-radius: 5px;
    position: absolute;
    bottom: 30px;
    left: 42px;  
  }
`
export default CardFood