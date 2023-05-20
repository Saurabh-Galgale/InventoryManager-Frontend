import { Box, Button, Divider, FormControlLabel, Stack, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LayoutWrapper from "./LayoutWrapper";
import MenuList from "../Pages/MenuList";


let AddProduct = () => {
    const navigate = useNavigate();
    let Token = localStorage.getItem("token");
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
            'https://inventorymanager-od9f.onrender.com/api/addproduct',
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


    return (
        <LayoutWrapper menuList={MenuList}>
            <Box
                sx={{
                    bgcolor: "primary.light",
                    width: { sm: "55%", md: "50%", lg: "50%", xs: "85%" },
                    height: "fit-content",
                    margin: "auto auto",
                    borderRadius: 3
                }}
            >
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} height='fit-content' margin={3}>
                    <Typography variant='h5'>Add product to your inventory</Typography>
                    <Typography variant='h3' color="third.dark">Add in Inventory</Typography>
                    <TextField
                        label='Name'
                        name='name'
                        fullWidth
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        size='large'
                        color='third'
                        variant='outlined'
                        onChange={(e) => handleFormDataChange(e)}
                        value={formData.name}
                    />
                    <TextField
                        label='category'
                        name='category'
                        color='third'
                        fullWidth
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        variant='outlined'
                        onChange={(e) => handleFormDataChange(e)}
                        value={formData.email}
                    />
                    <TextField
                        label='quantity'
                        name='quantity'
                        color='third'
                        fullWidth
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        variant='outlined'
                        onChange={(e) => handleFormDataChange(e)}
                        value={formData.password}
                    />
                    <TextField
                        label='price'
                        name='price'
                        color='third'
                        fullWidth
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        variant='outlined'
                        onChange={(e) => handleFormDataChange(e)}
                        value={formData.orgName}
                    />
                    <TextField
                        label='description'
                        name='description'
                        color='third'
                        fullWidth
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        variant='outlined'
                        onChange={(e) => handleFormDataChange(e)}
                        value={formData.goal}
                    />
                    <TextField
                        label='image'
                        name='image'
                        color='third'
                        fullWidth
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        variant='outlined'
                        onChange={(e) => handleFormDataChange(e)}
                        value={formData.slogan}
                    />
                    <Button variant='outlined' fullWidth color='secondary' onClick={submit}>
                        <Typography variant="h4">Add to inventory</Typography>
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

export default AddProduct;