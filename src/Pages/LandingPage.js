import React from 'react'
import Logo from '../Assets/logo.svg'
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            <Stack alignItems="center" justifyContent="center" margin={2}>
                <img src={Logo} alt='Inventory Manager' height={200} width={200} />
                <Typography variant='h2' color="third.dark">Inventory Manager</Typography>
                <Divider style={{ width: '80%' }} sx={{ borderBottomWidth: 8, bgcolor: "third.dark", margin: 4 }} />
                <Box sx={{ width: "70%" }}>
                    <Typography variant='h4' color="third.main" margin={5} textAlign="center">You just need to login and you can create and
                        manage your organization's Inventory. You can check product stock list,
                        you can add or remove products.</Typography>
                    <Typography variant='h4' color="third.dark" margin={2} textAlign="center">Design and developed by SAURABH GALGALE</Typography>
                </Box>
                <Divider style={{ width: '80%' }} sx={{ borderBottomWidth: 8, bgcolor: "third.dark", margin: 4 }} />
                <Stack direction="row" spacing={10}>
                    <Link to="/register">
                        <Button color="secondary" variant='outlined' size='large' sx={{ padding: "20px" }}>
                            <Typography variant='h4'>Register</Typography>
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button color="secondary" variant='outlined' size='large' sx={{ padding: "20px" }}>
                            <Typography variant='h4'>Login</Typography>
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </>
    )
}

export default LandingPage;