import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LayoutWrapper from "./LayoutWrapper";
import MenuList from "../Pages/MenuList";
import { LoadingButton } from "@mui/lab";

let AddProduct = () => {
  const navigate = useNavigate();
  let Token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    price: "",
    quantity: "",
  });

  let submit = async () => {
    if (errors.price || errors.quantity) {
      setLoading(false);
      alert("Please correct the errors before submitting");
      return;
    }
    setLoading(true);
    if (
      formData.name == "" ||
      formData.category == "" ||
      formData.quantity == "" ||
      formData.price == "" ||
      formData.description == ""
    ) {
      setLoading(false);
      alert("Missing credentials");
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
      .post("https://inventorymanager-od9f.onrender.com/api/addproduct", body, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((x) => {
        setLoading(false);
        navigate("/dash/");
      })
      .catch((x) => {
        setLoading(false);
        alert("Something went wrong! Try again");
      });
  };

  const validateNumberField = (name, value) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      return `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } must be a valid number`;
    }
    return "";
  };

  let handleFormDataChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "quantity") {
      const error = validateNumberField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
      if (error) return; // Prevent invalid value from being set
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <LayoutWrapper menuList={MenuList}>
      <Box
        sx={{
          bgcolor: "primary.light",
          width: { sm: "55%", md: "50%", lg: "50%", xs: "85%" },
          height: "fit-content",
          margin: "auto auto",
          borderRadius: 3,
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          height="fit-content"
          margin={3}
        >
          <Typography variant="h5">Add product to your inventory</Typography>
          <Typography variant="h3" color="third.dark">
            Add in Inventory
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            InputLabelProps={{ style: { fontSize: 20 } }}
            size="large"
            color="third"
            variant="outlined"
            onChange={(e) => handleFormDataChange(e)}
            value={formData.name}
          />
          <TextField
            label="category"
            name="category"
            color="third"
            fullWidth
            InputLabelProps={{ style: { fontSize: 20 } }}
            variant="outlined"
            onChange={(e) => handleFormDataChange(e)}
            value={formData.email}
          />
          <TextField
            label="quantity"
            name="quantity"
            color="third"
            fullWidth
            InputLabelProps={{ style: { fontSize: 20 } }}
            variant="outlined"
            error={Boolean(errors.quantity)}
            helperText={errors.quantity}
            onChange={(e) => handleFormDataChange(e)}
            value={formData.password}
          />
          <TextField
            label="price per item"
            name="price"
            color="third"
            fullWidth
            InputLabelProps={{ style: { fontSize: 20 } }}
            variant="outlined"
            error={Boolean(errors.price)}
            helperText={errors.price}
            onChange={(e) => handleFormDataChange(e)}
            value={formData.orgName}
          />
          <TextField
            label="description"
            name="description"
            color="third"
            fullWidth
            InputLabelProps={{ style: { fontSize: 20 } }}
            variant="outlined"
            onChange={(e) => handleFormDataChange(e)}
            value={formData.goal}
          />
          <TextField
            label="image"
            name="image"
            color="third"
            fullWidth
            InputLabelProps={{ style: { fontSize: 20 } }}
            variant="outlined"
            onChange={(e) => handleFormDataChange(e)}
            value={formData.slogan}
          />
          <LoadingButton
            variant="contained"
            loading={loading}
            fullWidth
            color="third"
            onClick={submit}
          >
            <Typography variant="h4">Add to inventory</Typography>
          </LoadingButton>
          <Button variant="text" component={Link} to="/dash">
            <Typography
              variant="h5"
              color="third.dark"
              sx={{ textTransform: "none" }}
            >
              Check out Inventory
            </Typography>
          </Button>
        </Stack>
      </Box>
    </LayoutWrapper>
  );
};

export default AddProduct;
