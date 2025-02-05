import { Button } from "@/components/ui/button";
import {Link} from "react-router";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
            <h1 className="text-xl font-bold"><Link to="/">Meu Site</Link></h1>
            <Link to={`/product`}>
                <Button className="bg-black text-white px-4 py-2 rounded">Criar Produto</Button>
            </Link>
            <Link to={`/order`}>
                <Button className="bg-black text-white px-4 py-2 rounded">Criar Pedido</Button>
            </Link>
        </nav>
    );
}