import Navbar from "@/components/nav-bar.tsx";
import FormProduct from "@/components/form-product.tsx";

export default function Product() {
    return (
        <div>
            <Navbar />
            <h1>Criar Produto</h1>
            
            <FormProduct />
        </div>
    )
}