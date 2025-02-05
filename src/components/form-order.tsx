"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {MultiSelect} from "@/components/ui/multi-select"
import {dev} from "@/environments/dev.ts";

const formSchema = z.object({
    productsId: z.array(z.string()).nonempty("Selecione ao menos um produto"),
});

export default function FormOrder() {

    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productsId: []
        },
    })

    async function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
            console.log(values);
            const response = await fetch(dev.host + "order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const data = await response.json();

            form.reset();

            console.log(data);
            alert("Order created successfully!");

        } catch (error) {
            console.error("Form submission error", error);
            alert("Error creating order");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="productsId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Selecione os Produtos</FormLabel>
                            <FormControl>
                                <MultiSelect values={field.value} onValuesChange={field.onChange} />
                            </FormControl>
                            <FormDescription>Escolha os seu produtos</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Criar Pedido</Button>
            </form>
        </Form>
    )
}