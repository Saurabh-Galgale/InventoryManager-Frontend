import { Box, Button, Divider, FormControlLabel, Stack, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Logo from "../../Assets/logo.svg";


let Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    let submit = async () => {
        if (formData.name == "" ||
            formData.email == "" ||
            formData.password == "") {
            alert("Missing credentials");
            return;
        }

        const body = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };
        axios.post(
            'https://inventorymanager-od9f.onrender.com/api/register',
            body
        ).then((x) => {
            navigate("/login");
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

    let handleBack = () => {
        navigate("/dash/")
    }

    return (
        <Box
            sx={{
                bgcolor: "primary.light",
                width: { sm: "55%", md: "50%", lg: "40%", xs: "85%" },
                height: "fit-content",
                margin: "auto auto",
                borderRadius: 3
            }}
        >
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} height='fit-content' margin={3}>
                <img src={Logo} alt='Inventory Manager' height={80} width={80} onClick={() => navigate("/")} />
                <Typography variant='h3' color="third.dark">Admin registration</Typography>
                <TextField
                    label='Name'
                    name='name'
                    fullWidth
                    size='large'
                    color='third'
                    variant='outlined'
                    onChange={(e) => handleFormDataChange(e)}
                    value={formData.name}
                />
                <TextField
                    label='email'
                    name='email'
                    color='third'
                    fullWidth
                    variant='outlined'
                    onChange={(e) => handleFormDataChange(e)}
                    value={formData.email}
                />
                <TextField
                    label='password'
                    name='password'
                    color='third'
                    fullWidth
                    variant='outlined'
                    onChange={(e) => handleFormDataChange(e)}
                    value={formData.password}
                />
                <Button color="secondary" variant='outlined' fullWidth onClick={submit}>
                    <Typography variant="h4">Register</Typography>
                </Button>
                <Button variant='text' component={Link} to='/login'>
                    <Typography variant="h5" color='third.dark' sx={{ textTransform: "none" }}>
                        Already have an account? Login
                    </Typography>
                </Button>
            </Stack>
        </Box>
    )
}

export default Register;