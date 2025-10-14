import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Ecoponto {
    codigo: string;
    morada: string;
    codigo_interno: string;
    tipo_de_local: string;
    distrito: string;
    concelho: string;
    freguesia: string;
    total_contentores: number;
    latitude: number;
    longitude: number;
    capacidade_total: number;
    tipologia: string;
}

interface DataContextType {
    arrayEcopontos: Ecoponto[];
}

export const EcopontosContext = createContext<DataContextType>({
    arrayEcopontos: [],
});

export const EcopontosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [arrayEcopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [loadingState, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchEcopontos();
    }, []);

    async function fetchEcopontos() {
        setLoading(true);
        const { data, error } = await supabase
            .from('table_ecopontos')
            .select('*')
            .order('codigo', { ascending: true });

        if (!error && data) {
            setEcopontos(data);
            console.log('Ecopontos loaded!');
        }
        setLoading(false);
    }

    return (
        <EcopontosContext.Provider value={{ arrayEcopontos }}>{children}</EcopontosContext.Provider>
    );
};
