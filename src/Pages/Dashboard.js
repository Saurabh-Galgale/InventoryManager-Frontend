import React, { useEffect, useState } from 'react'
import LayoutWrapper from '../Components/LayoutWrapper'
import MenuList from './MenuList'
import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Product from './Product';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../Redux/productSlice';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.third.main,
  ...theme.typography.body2,
  padding: 10,
  margin: 10,
  textAlign: 'center',
  color: theme.palette.secondary,
}));

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  let Token = localStorage.getItem("token");

  let onLoadFn = () => {
    setLoading(true);
    axios.get(
      'https://inventorymanager-od9f.onrender.com/api/products',
      {
        headers: {
          'Authorization': `Bearer ${Token}`
        }
      }
    ).then((x) => {
      setProducts(x.data);
      setLoading(false);
    })
      .catch((x) => {
        alert("Something went wrong! Load again");
        setLoading(false);
      });
  }

  let productHandler = (id) => {
    dispatch(addProduct(id));
    navigate('/dash/product');
  }

  useEffect(() => {
    onLoadFn();
  }, [])

  return (
    <LayoutWrapper menuList={MenuList}>
      {!loading ?
        (<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products && products.map((item) => {
            return (<Grid item xs={4} key={item._id}>
              <Item onClick={() => productHandler(item._id)}>
                <Typography variant="h4" color="secondary.dark">Name: {item.name}</Typography>
                <Typography variant="h4">Quantity: {item.quantity}</Typography>
                <Typography variant="h5">Price: {item.price}</Typography>
                <Typography variant="h5">Category: {item.category}</Typography>
                <Typography variant="h5">Description: {item.description}</Typography>
                <Typography variant="h5">Updated: {item.updatedAt}</Typography>
              </Item>
            </Grid>)
          })}
        </Grid>) : (<Stack width="100%" height="100%" alignItems="center" justifyContent="center">
          <CircularProgress color="third" size="6rem" />
        </Stack>)
      }
    </LayoutWrapper>
  )
}

export default Dashboard;