import { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { dev } from "@/environments/dev.ts";
import { Button } from "@/components/ui/button";

interface MultiSelectProps {
    values: string[];
    onValuesChange: (values: string[]) => void;
}

export function MultiSelect({ values, onValuesChange }: MultiSelectProps) {
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(dev.host + "product", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar os produtos");
            }

            const data = await response.json();

            // Supondo que `data` seja um array de produtos com um campo `id`, `name` e `stock
            const formattedOptions = data.map((product: { id: string, name: string, stock: string }) => ({
                value: product.id,
                label: `${product.name} - ${product.stock} unidades`
            }));

            setOptions(formattedOptions);
        } catch (error) {
            console.error("Erro ao carregar os produtos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // Reexecuta apenas se `fetchProducts` mudar

    return (
        <div className="space-y-4">

            {/* Botão para atualizar manualmente */}
            <Button className={`bg-green-600`} onClick={fetchProducts} disabled={loading}>
                {loading ? "Atualizando..." : "Atualizar produtos"}
            </Button>

            {/* Select com atualização ao abrir */}
            <Select
                isMulti
                options={options}
                value={values.map(value => options.find(opt => opt.value === value) || { value, label: value })}
                onChange={(selected) => onValuesChange(selected.map(s => s?.value ?? ""))}
                className="max-w-xs"
                placeholder={loading ? "Carregando..." : "Selecione os produtos..."}
                isLoading={loading}
                onMenuOpen={fetchProducts} // Atualiza ao abrir
            />
        </div>
    );
}
