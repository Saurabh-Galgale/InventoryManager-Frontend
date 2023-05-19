import React, { useEffect, useState } from 'react'
import LayoutWrapper from '../Components/LayoutWrapper'
import MenuList from './MenuList'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Product = () => {
  let productId = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  let Token = localStorage.getItem("token");

  let onLoadFn = () => {
    axios.get(
      `https://inventorymanager-od9f.onrender.com/api/product/${productId.product}`,
      {
        headers: {
          'Authorization': `Bearer ${Token}`
        }
      }
    ).then((x) => {
      setProduct(x.data);
    })
      .catch((x) => {
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
    if (formData.name == "" ||
      formData.category == "" ||
      formData.quantity == "" ||
      formData.price == "" ||
      formData.description == "") {
      alert("Missing credentials")
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
      'https://inventorymanager-od9f.onrender.com/api/update',
      body,
      {
        headers: {
          'Authorization': `Bearer ${Token}`
        }
      }
    ).then((x) => {
      console.log(x);
    })
      .catch((x) => {
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
          width: { sm: "55%", md: "60%", lg: "40%", xs: "85%" },
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


              <TextField
                label={product && product.price}
                name='price'
                color='third'
                fullWidth
                variant='outlined'
                onChange={(e) => handleFormDataChange(e)}
                value={formData.orgName}
              />
              <TextField
                label={product && product.description}
                name='description'
                color='third'
                fullWidth
                variant='outlined'
                onChange={(e) => handleFormDataChange(e)}
                value={formData.goal}
              />
              <Button variant='contained' fullWidth color='secondary' onClick={submit}>
                Save changes
              </Button>
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