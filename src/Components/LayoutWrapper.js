import * as React from "react"
import { Divider, Drawer, ListItemButton, Stack, styled, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from "react-router-dom"
import Logo from "../Assets/logo.svg"
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 250

const LayoutWrapper = (props) => {
	let navigate = useNavigate()
	let color = props.color
	let menuList = props.menuList
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const handleDrawerToggle = (e) => {
		setMobileOpen(!mobileOpen)
	}

	const handleLogout = () => {
		let userChoise = window.confirm("Do you really want to logout?")
		if (userChoise) {
			localStorage.clear("token");
			navigate("/")
		} else {
			return;
		}
	}

	const drawer = (
		<>
			<Stack alignItems='center' m={2}>
				<img src={Logo} alt='Inventory Manager' height={100} width={100} onClick={() => navigate("/")} />
				<Stack direction="row">
					<Typography variant='h5' color='third.dark' onClick={() => navigate("/")}>
						Inventory
					</Typography>
					<Typography variant='h5' color='third.main'>Manager</Typography>
				</Stack>
			</Stack>
			<Stack spacing={1} alignItems='flex-start' justifyContent='center' ml={4} mt={2}>
				{menuList.map((item, index) => {
					return (
						<Button
							key={index}
							component={NavLink}
							to={item.path}
							end={true}
							style={({ isActive }) => {
								return {
									color: isActive ? "#9db2b2" : "#F2F2F2"
								}
							}}
							startIcon={item.icon}
							size='large'
							variant='text'
						>
							{item.name}
						</Button>
					)
				})}

				<Button startIcon={<LogoutIcon />} onClick={handleLogout} sx={{marginLeft: 10}}>Logout</Button>
				<Typography variant='h6' sx={{ position: "absolute", bottom: "1rem" }} color='third.main'>
					Copyright © 2023 Inventory Manager, <br></br>Inc. All rights reserved.
				</Typography>
			</Stack>
		</>
	)

	return (
		<>
			<IconButton
				aria-label='open drawer'
				onClick={(e) => handleDrawerToggle(e)}
				sx={{ mr: 2, display: { md: "none", sm: "block" }, marginRight: "auto", position: "absolute", zIndex: 5 }}
			>
				<MenuIcon color='secondary' fontSize="large"/>
			</IconButton>

			<Box sx={{ display: "flex", bgcolor: "secondary.main", height: "100vh" }}>
				<Box component='nav' sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}>
					<Drawer
						anchor='left'
						variant='temporary'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true
						}}
						PaperProps={{
							sx: {
								backgroundColor: "secondary.main",
								color: "primary.main"
							}
						}}
						sx={{
							display: { xs: "block", sm: "block", md: "none" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
						}}
					>
						{drawer}
					</Drawer>

					<Drawer
						anchor='left'
						variant='permanent'
						PaperProps={{
							sx: {
								backgroundColor: "secondary.main",
								color: "primary.main"
							}
						}}
						sx={{
							display: { xs: "none", sm: "none", md: "block" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>
				<Box
					component='main'
					sx={{
						borderRadius: 5,
						width: "100%",
						height: "100vh",
						borderTopLeftRadius: 10,
						borderBottomLeftRadius: 10,
						overflowY: "auto",
						bgcolor: "white",
						margin: 0,
						padding: 0,
						overflowY: "auto"
					}}
				>
					{props.children}
				</Box>
			</Box>
		</>
	)
}

export default LayoutWrapper;