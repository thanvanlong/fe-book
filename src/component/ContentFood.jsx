import {  Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
function ContentFood(props) {
    const {img, backgroundColor} = props;
    return (
        <Card sx={{
            width: 550,
            height: 470,
            backgroundColor: backgroundColor,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: '20px',
        }}>
            <CardMedia
                component={"img"}
                sx={{ width: '120px' }}
                image={img} />

            <CardContent>
                <Typography
                    paragraph
                    fontWeight={700}
                    color={"white"}
                    textAlign={"center"}
                    marginTop={"-50px"}
                    fontFamily={'Roboto Slab'}>
                    Nhà hàng Lẩu Phan tự hào là thương hiệu buffet bò Úc đi đầu cũng như lớn mạnh nhất Hà Nội.
                    Thực khách nhất định sẽ ấn tượng với menu lẩu gồm 3 vị đặc trưng:
                    Lẩu Kim chi cay tê nức mũi, lẩu Thái đậm đà xuýt xoa và Lẩu sấu chua chua.
                    Đặc biệt chính là nhà hàng có 3 set buffet 129k, 179k, 219k vô cùng hấp dẫn,
                    đảm bảo từ chất lượng đến vệ sinh thực phẩm.
                </Typography>
            </CardContent>
            <Action>
                <button>
                    <Link to={"/"}>Đặt bàn</Link>
                    <img src='https://lauphan.com/WebLauPhan/thuonghieu/restaurant-icon.png' />
                </button>
                <button>
                    <Link to={"/menu"}>Xem thực đơn</Link>
                </button>
            </Action>
        </Card>
    )
}

const Action = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button{
        width: 135px;
        height: 33px;
        background: white;
        border: none;
        border-radius: 25px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 20px;
        margin-right: 10px;
        box-shadow: 0 0 2.2px rgb(0 0 0 / 22%), 
        0 6.7px 5.3px rgb(0 0 0 / 15%), 
        0 12.5px 10px rgb(0 0 0 / 0%), 
        0 22.3px 17.9px rgb(0 0 0 / 0%), 
        0 41.8px 33.4px rgb(0 0 0 / 0%), 
        0 100px 80px rgb(0 0 0 / 0%);
        a{
            text-decoration: none;
            color: rgb(241,149,27);
            font-size: 14px;
            font-weight: 900;
        }
    }
`
export default ContentFood