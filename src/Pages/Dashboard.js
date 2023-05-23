import React, { useEffect, useState } from 'react'
import LayoutWrapper from '../Components/LayoutWrapper'
import MenuList from './MenuList'
import { Button, Grid, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ADDPRODUCT, OUTOFSTOCK, STOREVALUE, TOTALCATEGORY, TOTALPRODUCTS } from '../Redux/productSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.third.main,
  ...theme.typography.body2,
  padding: 10,
  margin: 10,
  textAlign: 'center',
  color: theme.palette.secondary,
}));

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  ...theme.typography.body2,
  padding: 10,
  margin: 10,
  textAlign: 'center',
  color: theme.palette.secondary,
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  let Token = localStorage.getItem("token");

  const totalProducts = useSelector((state) => state.product.totalProducts);
  const totalValue = useSelector((state) => state.product.totalStoreValue);
  const outOfStock = useSelector((state) => state.product.outOfStock);
  const category = useSelector((state) => state.product.category);

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
      dispatch(TOTALPRODUCTS(x.data));
      dispatch(STOREVALUE(x.data));
      dispatch(OUTOFSTOCK(x.data));
      dispatch(TOTALCATEGORY(x.data));
    })
      .catch((x) => {
        alert("Something went wrong! Load again");
        setLoading(false);
      });
  }

  let productHandler = (id) => {
    dispatch(ADDPRODUCT(id));
    navigate('/dash/product');
  }

  const handleLogout = () => {
    let userChoise = window.confirm("Do you really want to logout?")
    if (userChoise) {
      localStorage.clear("token");
      navigate("/")
    } else {
      return;
    }
  }

  useEffect(() => {
    onLoadFn();
  }, [])

  return (
    <LayoutWrapper menuList={MenuList}>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" sx={{ display: "flex", alignItems: "flex-end" }}>
          <Toolbar>

            <Button color='third'
              variant='contained'
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ marginRight: 3 }}
            >Logout
            </Button>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Product..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>

      {!loading ?
        (<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={6} xs={12} lg={4}>
            <Item1>
              <Typography variant='h5'>Total products: {totalProducts}</Typography>
              <Typography variant='h5'>Total Inventory price: {totalValue}</Typography>
              <Typography variant='h5'>Out of stock: {outOfStock}</Typography>
              <Typography variant='h5' color="third.dark">category: {category.length}</Typography>
              {category && category.map((cate, index) => {
                return <Typography variant='h5' color="third.dark" key={index}>{cate}</Typography>
              })}
            </Item1>
          </Grid>
          {products && products.filter((item) => {
            return search.toString().toLowerCase() === "" ? item
              : item.name.toString().toLowerCase().includes(search);
          }).map((item) => {
            return (<Grid item sm={6} xs={12} lg={4} key={item._id}>
              <Item onClick={() => productHandler(item._id)}>
                <Typography variant="h4" color="secondary.dark">Name: {item.name}</Typography>
                <Typography variant="h4">Quantity: {item.quantity}</Typography>
                <Typography variant="h5">Price: {item.price}</Typography>
                <Typography variant="h5">Total price: {item.price * item.quantity}</Typography>
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