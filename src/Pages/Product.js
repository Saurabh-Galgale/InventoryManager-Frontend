import React, { useEffect, useState } from 'react'
import LayoutWrapper from '../Components/LayoutWrapper'
import MenuList from './MenuList'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

const Product = () => {
  let productId = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  let Token = localStorage.getItem("token");

  let onLoadFn = () => {
    setLoading(true);
    axios.get(
      `https://inventorymanager-od9f.onrender.com/api/product/${productId.product}`,
      {
        headers: {
          'Authorization': `Bearer ${Token}`
        }
      }
    ).then((x) => {
      setLoading(false);
      setProduct(x.data);
    })
      .catch((x) => {
        setLoading(false);
        alert("Something went wrong! Load again");
      });
  }

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: ""
  })

  let submit = async () => {
    setLoading(true);
    if (formData.name == "" &&
      formData.category == "" &&
      formData.quantity == "" &&
      formData.price == "" &&
      formData.description == "") {
      setLoading(false);
      alert("No changes detected")
      return;
    }

    const body = {
      name: formData.name,
      category: formData.category,
      quantity: formData.quantity,
      price: formData.price,
      description: formData.description,
      image: formData.image
    };
    axios.post(
      `https://inventorymanager-od9f.onrender.com/api/product/${productId.product}`,
      body,
      {
        headers: {
          'Authorization': `Bearer ${Token}`
        }
      }
    ).then((x) => {
      setLoading(false);
      alert("successfuly changed");
      navigate("/dash/")
    })
      .catch((x) => {
        setLoading(false);
        alert("Something went wrong! Try again");
      });
  }

  let handleFormDataChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    onLoadFn();
  }, [])

  return (
    <LayoutWrapper menuList={MenuList}>
      <Box
        sx={{
          bgcolor: "primary.light",
          width: { sm: "55%", md: "60%", lg: "45%", xs: "80%" },
          height: "fit-content",
          margin: "auto auto",
          borderRadius: 3
        }}
      >
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} height='fit-content' margin={3}>
          <Typography variant='h5'>These changes will reflect in your Inventory</Typography>
          <Typography variant='h3' color="third.dark">{product && product.name}</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant='h6' color="third.dark">Name</Typography>
            <TextField
              label={product && product.name}
              name='name'
              fullWidth
              InputLabelProps={{ style: { fontSize: 20 } }}
              size='large'
              color='third'
              variant='outlined'
              onChange={(e) => handleFormDataChange(e)}
              value={formData.name}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant='h6' color="third.dark">Category</Typography>
            <TextField
              label={product && product.category}
              name='category'
              color='third'
              fullWidth
              InputLabelProps={{ style: { fontSize: 20 } }}
              variant='outlined'
              onChange={(e) => handleFormDataChange(e)}
              value={formData.email}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant='h6' color="third.dark">Quantity</Typography>
            <TextField
              label={product && product.quantity}
              name='quantity'
              color='third'
              fullWidth
              InputLabelProps={{ style: { fontSize: 20 } }}
              variant='outlined'
              onChange={(e) => handleFormDataChange(e)}
              value={formData.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant='h6' color="third.dark">Price</Typography>
            <TextField
              label={product && product.price}
              name='price'
              color='third'
              fullWidth
              InputLabelProps={{ style: { fontSize: 20 } }}
              variant='outlined'
              onChange={(e) => handleFormDataChange(e)}
              value={formData.orgName}
            /></Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant='h6' color="third.dark">Description</Typography>
            <TextField
              label={product && product.description}
              name='description'
              color='third'
              fullWidth
              InputLabelProps={{ style: { fontSize: 20 } }}
              variant='outlined'
              onChange={(e) => handleFormDataChange(e)}
              value={formData.goal}
            /></Stack>

          <LoadingButton variant='outlined' loading={loading} fullWidth color='secondary' onClick={submit}>
            <Typography variant='h4'>Save changes</Typography>
          </LoadingButton>
          <Button variant='text' component={Link} to='/dash'>
            <Typography variant="h5" color='third.dark' sx={{ textTransform: "none" }}>
              Check out Inventory
            </Typography>
          </Button>
        </Stack>
      </Box>
    </LayoutWrapper>
  )
}

export default Product;