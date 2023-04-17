import React from 'react'
import { Card, Typography, CardMedia, CardContent, Link, Box, Container } from '@mui/material'
import {configPrice} from '../config/order.config'
const BillCard = ({ dt }) => {
    const data = dt?.data;
    return (
        <Card sx={{
            height: 95,
            display: 'flex',
            justifyContent: 'flex-start',
            borderRadius: 1,
            marginTop: 3,
            marginBottom: 1,
            marginLeft: 3,
            padding: 1,
            boxShadow: 'none'
        }}>
            <CardMedia
                sx={{ width: '68px', height: 68 }}
                component={'img'}
                image={data?.image}
            />
            <CardContent sx={{ paddingTop: 0 }}>
                <Typography fontFamily={'Roboto Slab'} fontWeight={900}>
                    {data?.name}
                </Typography>
                <Typography
                    variant='subtitle2'
                    fontSize={10}
                    color={'#727272'}
                    fontFamily={'Roboto Slab'}
                >{data?.description}</Typography>
            </CardContent>
            <CardContent sx={{ paddingTop: 0 }}>
                <Box sx={{
                    width: 300,
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginLeft: 15
                }}>
                    <Typography fontFamily={'Roboto Slab'} fontWeight={700}>
                        {data?.quanityOrdered}
                    </Typography>
                    <Typography fontFamily={'Roboto Slab'} fontWeight={700} color={'rgb(255,114,22)'}>
                        {configPrice(data?.price)}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default BillCard