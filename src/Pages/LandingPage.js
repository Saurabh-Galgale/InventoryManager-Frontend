import React from "react";
import Logo from "../Assets/logo.svg";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const item = localStorage.getItem("token");
  return (
    <>
      <Stack alignItems="center" justifyContent="center" margin={2}>
        <img src={Logo} alt="Inventory Manager" height={200} width={200} />
        <Typography
          variant="h2"
          color="third.dark"
          sx={{
            typography: {
              xs: "h4",
              sm: "h4",
              md: "h4",
            },
          }}
        >
          Inventory Manager
        </Typography>
        <Divider
          style={{ width: "80%" }}
          sx={{ borderBottomWidth: 8, bgcolor: "third.dark", margin: 4 }}
        />
        <Box sx={{ width: "70%" }}>
          <Typography
            variant="h4"
            color="third.main"
            margin={5}
            textAlign="center"
            sx={{
              typography: {
                xs: "h6",
                sm: "h6",
                md: "h4",
              },
            }}
          >
            You just need to login and you can create and manage your
            organization's Inventory. You can check product stock list, you can
            add or remove products.
          </Typography>
          <Typography
            variant="h4"
            color="third.dark"
            margin={2}
            textAlign="center"
            sx={{
              typography: {
                xs: "h6",
                sm: "h6",
                md: "h4",
              },
            }}
          >
            Design and developed by SAURABH GALGALE
          </Typography>
        </Box>
        <Divider
          style={{ width: "80%" }}
          sx={{ borderBottomWidth: 8, bgcolor: "third.dark", margin: 4 }}
        />
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          spacing={10}
        >
          <Link to="/register">
            <Button
              color="secondary"
              variant="outlined"
              size="medium"
              sx={{ padding: "8px" }}
            >
              <Typography variant="h4">Register</Typography>
            </Button>
          </Link>
          {item && (
            <Link to="/dash/">
              <Button
                color="secondary"
                variant="outlined"
                size="medium"
                sx={{ padding: "8px" }}
              >
                <Typography variant="h4">Dashboard</Typography>
              </Button>
            </Link>
          )}
          <Link to="/login">
            <Button
              color="secondary"
              variant="outlined"
              size="medium"
              sx={{ padding: "8px" }}
            >
              <Typography variant="h4">Login</Typography>
            </Button>
          </Link>
        </Stack>

        <Alert severity="info" sx={{ width: "80%", mt: 3 }}>
          Please note: This website and backend are hosted on free platforms
          (e.g., Vercel), which may cause some API responses to feel slower than
          usual. This is a small project designed for demonstration purposes.
        </Alert>
      </Stack>
    </>
  );
};

export default LandingPage;
