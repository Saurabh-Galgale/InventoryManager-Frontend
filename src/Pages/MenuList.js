import GridViewIcon from '@mui/icons-material/GridView';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const MenuList = [
    {
        name: "Dashboard",
        path: "/dash/",
        icon: <GridViewIcon />,
    },
    {
        name: "Add Product",
        path: "/dash/addproduct",
        icon: <AddShoppingCartIcon />,
    },
]

export default MenuList;