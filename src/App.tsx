import './App.css'
import {Routes, Route} from "react-router";
import Home from "@/pages/home/home.tsx";
import Product from "@/pages/product/product.tsx";
import Order from "@/pages/order/order.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/product" element={<Product />}/>
                <Route path={"/order"} element={<Order />}/>
            </Routes>
        </>
    )
}

export default App
