import Navbar from "@/components/nav-bar.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1>Hello World</h1>
            <h1>Home</h1>
            <Button>Click me</Button>
        </div>
    )
}