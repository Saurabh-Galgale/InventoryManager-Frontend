import React, { useEffect, useState } from "react";
import LayoutWrapper from "../Components/LayoutWrapper";
import MenuList from "./MenuList";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const Product = () => {
  let productId = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  let Token = localStorage.getItem("token");

  let onLoadFn = () => {
    setLoading(true);
    axios
      .get(
        `https://inventorymanager-od9f.onrender.com/api/product/${productId.product}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((x) => {
        setLoading(false);
        setProduct(x.data);
      })
      .catch((x) => {
        setLoading(false);
        alert("Something went wrong! Load again");
      });
  };

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: "",
  });

  let submit = async () => {
    setLoading(true);
    if (
      formData.name == "" &&
      formData.category == "" &&
      formData.quantity == "" &&
      formData.price == "" &&
      formData.description == ""
    ) {
      setLoading(false);
      alert("No changes detected");
      return;
    }

    const body = {
      name: formData.name,
      category: formData.category,
      quantity: formData.quantity,
      price: formData.price,
      description: formData.description,
      image: formData.image,
    };
    axios
      .post(
        `https://inventorymanager-od9f.onrender.com/api/product/${productId.product}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((x) => {
        setLoading(false);
        alert("successfuly changed");
        navigate("/dash/");
      })
      .catch((x) => {
        setLoading(false);
        alert("Something went wrong! Try again");
      });
  };

  let handleFormDataChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    onLoadFn();
  }, []);

  return (
    <LayoutWrapper menuList={MenuList}>
      <Box
        sx={{
          bgcolor: "primary.light",
          width: { sm: "55%", md: "60%", lg: "45%", xs: "80%" },
          margin: "auto",
          borderRadius: 3,
          padding: 3,
        }}
      >
        <Typography variant="h5">
          These changes will reflect in your Inventory
        </Typography>
        <Typography variant="h3" color="third.dark" textAlign="center" my={2}>
          {product?.name}
        </Typography>

        <Grid container spacing={3}>
          {[
            { label: "Name", value: product?.name, field: "name" },
            { label: "Category", value: product?.category, field: "category" },
            { label: "Quantity", value: product?.quantity, field: "quantity" },
            { label: "Price", value: product?.price, field: "price" },
            {
              label: "Description",
              value: product?.description,
              field: "description",
            },
          ].map(({ label, value, field }) => (
            <>
              <Grid item xs={4}>
                <Typography variant="h6" color="third.dark">
                  {label}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label={value}
                  name={field}
                  color="third"
                  fullWidth
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  variant="outlined"
                  onChange={handleFormDataChange}
                  value={formData[field]}
                />
              </Grid>
            </>
          ))}

          <Grid item xs={12}>
            <LoadingButton
              variant="contained"
              loading={loading}
              fullWidth
              color="third"
              onClick={submit}
            >
              <Typography variant="h4">Save changes</Typography>
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Button variant="text" component={Link} to="/dash">
              <Typography
                variant="h5"
                color="third.main"
                sx={{ textTransform: "none" }}
              >
                Check out Inventory
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LayoutWrapper>
  );
};

export default Product;
