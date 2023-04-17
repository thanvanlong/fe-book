import React, { useState } from 'react'
import styled from 'styled-components'
import SelectCard from '../component/SelectCard'
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {
  Backdrop,
  Box,
  Button, Dialog, TextField,
  ToggleButton, ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { date, time, numberPp } from '../utils/fakeData'
import OrderContainerService from '../service/OrderContainer.service'
import { configDataBookingPost } from '../config/order.config'
import QRCode from 'react-qr-code'
function BookingTable() {
  const service = new OrderContainerService();
  const [store, setStore] = useState('lp');
  const [open, setOpen] = useState();
  const [dialog, setDialog] = useState(false);
  const [rs, setRs] = useState();
  const [info, setInfo] = useState({
    name: '',
    phone: '',
    date: null,
    time: null,
    note: '',
    store: store,
  });
  const handleChange = (e) => {
    const name = e.target.id ? e.target.id : e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
    setInfo({ ...info, [name]: value })
  }
  const handleToggle = (e, data) => {
    if (data !== null) {
      setStore(data);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    if (info.date && info.time && info.phone && info.name) {
      setOpen(true);
      data = configDataBookingPost(info);
      console.log(data);
      let rs;
      try {
        rs = await service.booking(data);
        console.log(rs);
        setRs(rs.data);
      } catch (e) {
        console.log(e);
      }
      console.log(rs);
      setOpen(false);
      setDialog(true);
    }
  }
  return (
    <Container>
      <Typography color={'white'} marginTop={'100px'} fontSize={'30px'} fontFamily={'Roboto Slab'}>ĐẶT BÀN</Typography>
      <form onSubmit={handleSubmit}>
        <Wrap>
          <Card >
            <Bos>
              <div style={{ width: '90%', }}>
                <Typography fontFamily={'Roboto Slab'} fontWeight={900}>Nhà hàng</Typography>
                <ToggleButtonGroup
                  value={store}
                  exclusive
                  id='store'
                  onChange={handleToggle}
                  style={{
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: 50,
                    padding: 0
                  }}
                >
                  <ToggleButton
                    value={'lp'}
                    id={'store'}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      backgroundColor: store === 'lp' ? 'rgb(232,74,27)' : 'rgb(183,183,183)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <img
                      width={'55%'}
                      src='https://phanexpress.com/WebLauPhan/order/phan-icon-selected.svg' />
                    <Typography
                      fontFamily={'Roboto Slab'}
                      fontWeight={900}
                      fontSize={15}
                      color={'white'}>
                      Phan
                    </Typography>
                  </ToggleButton>
                  <ToggleButton
                    value={'tong'}
                    id={'store'}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      backgroundColor: store === 'tong' ? 'rgb(249,181,28)' : 'rgb(183,183,183)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <img
                      width={'55%'}
                      src='https://phanexpress.com/WebLauPhan/order/tong-icon.svg' />
                    <Typography
                      fontFamily={'Roboto Slab'}
                      fontWeight={900}
                      fontSize={15}
                      color={'white'}>
                      Phan
                    </Typography>
                  </ToggleButton>
                  <ToggleButton
                    value={'ll'}
                    id={'store'}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 50,
                      backgroundColor: store === 'll' ? 'rgb(185,60,60)' : 'rgb(183,183,183)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column'
                    }}>
                    <img
                      width={'55%'}
                      src='https://phanexpress.com/WebLauPhan/order/logo-lau.svg' />
                    <Typography
                      fontFamily={'Roboto Slab'}
                      fontWeight={900}
                      fontSize={15}
                      color={'white'}>
                      Lau
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Bos>
          </Card>
          <Card>
            <Bos>
              <SelectCard
                dt={numberPp}
                label={"Số người"}
                name={'numberPp'}
                handleChange={handleChange}
              />
            </Bos>
            <Bos>
              <SelectCard
                handleChange={handleChange}
                label={'Ngày'}
                name={'date'}
                dt={date} />
              <SelectCard
                handleChange={handleChange}
                label={'Giờ'}
                name={'time'}
                dt={time} />
            </Bos>
            <Bos>
              <div style={{ width: '99%' }}>
                <Typography fontFamily={'Roboto Slab'} fontWeight={900} >Ghi chú</Typography>
                <TextField fullWidth variant="standard" id='note' onChange={handleChange} />
              </div>
            </Bos>
          </Card>
          <Card>
            <Bos>
              <div style={{ width: '90%' }}>
                <Typography fontFamily={'Roboto Slab'} fontWeight={900}>Tên người đặt</Typography>
                <TextField
                  fullWidth
                  fontFamily={'Roboto Slab'}
                  variant="standard"
                  placeholder='Nhập tên'
                  id='name'
                  required
                  onChange={handleChange} />
              </div>
            </Bos>
            <Bos>
              <div style={{ width: '90%' }}>
                <Typography fontFamily={'Roboto Slab'} fontWeight={900} >Số điện thoại</Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  id='phone'
                  required
                  onChange={handleChange}
                  placeholder='Nhập số điện thoại' />
              </div>
            </Bos>
            <Button
              sx={{
                width: '340px',
                height: '45px',
                background: 'rgb(236,60,23)',
                color: 'white',
                borderRadius: '30px',
                marginTop: '50px',
              }}
              type={'submit'}
              // onClick={handleSubmit}
            >
              Đặt bàn
            </Button>
          </Card>
        </Wrap>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: 100 }}
        open={open}
        onClick={() => setOpen(false)}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={dialog}
        onClose={() => {
          setDialog(false);
        }} >
        <Box sx={{
          width: 500,

          backgroundColor: 'white',
          padding: 5
        }}>
          <Typography
            fontFamily={'Roboto Slab'}
            fontSize={20}
            textAlign={'center'}
            textTransform={'uppercase'}
            paddingBottom={5}>
            {!rs?.status ? 'Bạn đã đặt bàn thành công' : 'Cơ sở tạm thời đã hết bàn rồi :(('}
          </Typography>
          <Typography textAlign={'center'}>
            {!rs?.status ?
              <CheckCircleOutlineIcon sx={{
                color: 'rgb(35,188,35)',
                fontSize: 200
              }} /> :
              <SentimentVeryDissatisfiedIcon sx={{
                color: 'red',
                fontSize: 200
              }} />
            }

          </Typography>
          {!rs?.status  ? <>
            <Typography
              fontFamily={'Roboto Slab'}
              fontSize={12}
              textAlign={'center'}
              textTransform={'uppercase'}>
              lưu mã qr dưới đây để lưu thông tin đặt bàn của bạn
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: 1
            }}>
              <QRCode value={'http://localhost:3000/table/book/' + rs?.id} />
            </Box></> : <Typography
              fontFamily={'Roboto Slab'}
              fontSize={15}
              paragraph
              textAlign={'center'}
              fontWeight={900}>
            Xin lỗi quý khách vì sơ suất của nhà hàng.
            Cảm phiền quý khách quay lại trong ít giờ nữa.
            Chân thành cảm ơn quý khách đã ủng hộ.
          </Typography>}
        </Box>
      </Dialog>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url("https://phanexpress.com/WebLauPhan/order/bg-order.png") no-repeat
`
const Card = styled.div`
  width: 350px;
`
const Bos = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`
const Wrap = styled.div`
  
  height: 400px;
  padding: 0 20px;
  display: flex;
  background: white;
  justify-content: space-around;
  border-radius: 10px;
  margin-top: 70px;
  box-shadow: 0 0 2.2px rgb(0 0 0 / 56%), 0 6.7px 5.3px rgb(0 0 0 / 34%), 
  0 12.5px 10px rgb(0 0 0 / 0%), 0 22.3px 17.9px rgb(0 0 0 / 0%), 
  0 41.8px 33.4px rgb(0 0 0 / 0%), 0 100px 80px rgb(0 0 0 / 0%);
`
export default BookingTable