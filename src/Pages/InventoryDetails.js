import React, { useEffect, useState } from "react";
import LayoutWrapper from "../Components/LayoutWrapper";
import MenuList from "./MenuList";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import {
  ADDPRODUCT,
  OUTOFSTOCK,
  STOREVALUE,
  TOTALCATEGORY,
  TOTALPRODUCTS,
} from "../Redux/productSlice";

const Item1 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  ...theme.typography.body2,
  padding: 10,
  margin: 10,
  textAlign: "center",
  color: theme.palette.secondary,
}));

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let Token = localStorage.getItem("token");

  const totalProducts = useSelector((state) => state.product.totalProducts);
  const totalValue = useSelector((state) => state.product.totalStoreValue);
  const outOfStock = useSelector((state) => state.product.outOfStock);
  const category = useSelector((state) => state.product.category);

  let onLoadFn = () => {
    setLoading(true);
    axios
      .get("https://inventorymanager-od9f.onrender.com/api/products", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((x) => {
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
  };

  useEffect(() => {
    onLoadFn();
  }, []);

  return (
    <LayoutWrapper menuList={MenuList}>
      {!loading ? (
        <Box>
          <Item1>
            <Typography variant="h5">
              Total products: {totalProducts}
            </Typography>
            <Typography variant="h5">
              Total Inventory price: {totalValue}
            </Typography>
            <Typography variant="h5">Out of stock: {outOfStock}</Typography>
            <Typography variant="h5" color="third.dark">
              category: {category.length}
            </Typography>
            {category &&
              category.map((cate, index) => {
                return (
                  <Typography variant="h5" color="third.dark" key={index}>
                    {cate}
                  </Typography>
                );
              })}
          </Item1>
        </Box>
      ) : (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="third" size="6rem" />
        </Stack>
      )}
    </LayoutWrapper>
  );
};

export default Dashboard;
