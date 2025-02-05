"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { dev } from "@/environments/dev"

const formSchema = z.object({
    name: z.string().min(1, "Nome do produto é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    price: z.preprocess(
        (val) => (typeof val === "string" ? parseFloat(val) : val),
        z.number().min(1, "Preço inválido")
    ),
    stock: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number().min(1, "Estoque inválido")
    ),
});

export default function FormProduct() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            stock: 0
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch(dev.host + "product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);

            // Exibir toast de sucesso após criar
            toast.success("Produto criado com sucesso!");
            alert("Produto criado com sucesso!");

            // Limpar o formulário
            form.reset();

        } catch (error) {
            console.error("Erro ao enviar o formulário", error);
            alert("Erro ao enviar o formulário");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do Produto</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do Produto" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Input placeholder="Descrição" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                                <Input placeholder="Preço" step="0.01" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estoque</FormLabel>
                            <FormControl>
                                <Input placeholder="Estoque" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Criar Produto</Button>
            </form>
        </Form>
    )
}
