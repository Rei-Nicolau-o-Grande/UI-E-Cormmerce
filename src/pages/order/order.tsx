import Navbar from "@/components/nav-bar.tsx";
import FormOrder from "@/components/form-order.tsx";

export default function Order() {
    return (
        <div>
            <Navbar />
            <h1>Criar Pedido</h1>

            <FormOrder />
        </div>
    )
}