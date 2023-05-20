import { Box, Button, Divider, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.svg";
import LoadingButton from '@mui/lab/LoadingButton';

let Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    let submit = async () => {
        setLoading(true);
        if (formData.email == "" ||
            formData.password == "") {
            alert("Missing credentials")
            setLoading(false);
            return;
        }

        const body = {
            email: formData.email,
            password: formData.password,
        };
        axios.post(
            'https://inventorymanager-od9f.onrender.com/api/login',
            body
        ).then((x) => {
            setLoading(false);
            localStorage.setItem("token", x.data.data.token)
            navigate("/dash/");
        })
            .catch((x) => {
                setLoading(false);
                alert("Something went wrong! Try again");
            });
    }

    const guestFn = (e) => {
        if (e.target.checked) {
            setFormData((form) => {
                return {
                    ...form,
                    ["email"]: "guestadmin@gmail.com",
                    ["password"]: "12345678"
                }
            })
        } else {
            setFormData((form) => {
                return {
                    ...form,
                    ["email"]: "",
                    ["password"]: ""
                }
            })
        }
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
                    label='email'
                    name='email'
                    color='third'
                    fullWidth
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    variant='outlined'
                    onChange={(e) => handleFormDataChange(e)}
                    value={formData.email}
                />
                <TextField
                    label='password'
                    name='password'
                    color='third'
                    fullWidth
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    variant='outlined'
                    onChange={(e) => handleFormDataChange(e)}
                    value={formData.password}
                />
                <FormControlLabel
                    value='start'
                    control={<Switch color='third' />}
                    label='Guest login'
                    labelPlacement='start'
                    onChange={(e) => guestFn(e)}
                />
                <LoadingButton variant='outlined' loading={loading} fullWidth color='secondary' onClick={submit}>
                    <Typography variant="h4">Login</Typography>
                </LoadingButton>
                <Button variant='text' component={Link} to='/register'>
                    <Typography variant="h5" color='third.dark' sx={{ textTransform: "none" }}>
                        Don't have an account? Register
                    </Typography>
                </Button>
            </Stack>
        </Box>
    )
}

export default Login;