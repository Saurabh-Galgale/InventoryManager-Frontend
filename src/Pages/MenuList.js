import GridViewIcon from "@mui/icons-material/GridView";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StoreIcon from "@mui/icons-material/Store";

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
  //   {
  //     name: "Inventory Details",
  //     path: "/dash/inventory",
  //     icon: <StoreIcon />,
  //   },
];

export default MenuList;
