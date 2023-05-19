import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Register from "./Components/Auth/Register"
import Login from "./Components/Auth/Login"
import Authorization from "./Components/Auth/Authorization"
import LandingPage from './Pages/LandingPage';
import Dashboard from './Pages/Dashboard';
import Product from './Pages/Product';
import AddProduct from './Components/AddProduct';

const App = () => {
  // let dispatch = useDispatch();

  // const item = localStorage.getItem("token");

  // let token = JSON.parse(item)

  // dispatch(addToken(token));
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/dash/' element={<Authorization />}>
            <Route path='/dash/' element={<Dashboard />} />
            <Route path='/dash/addproduct' element={<AddProduct />} />
            <Route path='/dash/product' element={<Product />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}



export default App