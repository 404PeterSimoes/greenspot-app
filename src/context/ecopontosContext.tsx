import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Ecoponto {
    Codigo: string;
    Morada: string;
    Tipologia: string;
    Localizacao: string;
    Latitude: number;
    Longitude: number;
    Distrito: string;
    Concelho: string;
    Freguesia: string;
    Tipo_de_contentor: string;
    Tipo_de_instalacao: string;
    Data_de_instalacao: string;
    Tem_papel: boolean;
    Tem_plastico: boolean;
    Tem_vidro: boolean;
    Tem_oleao: boolean;
    Tem_pilhao: boolean;
}

interface DataContextType {
    arrayEcopontos: Ecoponto[];
    selectedEcoponto: Ecoponto | null;
    setSelectedEcoponto: (eco: Ecoponto | null) => void;
    showModalEcoSelecionado: boolean;
    setModalEcoSelecionado: (value: boolean) => void;
    callShowModalEcoSelecionado: boolean;
    setCallShowModalEcoSelecionado: (value: boolean) => void;
}

export const EcopontosContext = createContext<DataContextType>({
    arrayEcopontos: [],
    selectedEcoponto: null,
    setSelectedEcoponto: () => {},
    showModalEcoSelecionado: false,
    setModalEcoSelecionado: () => {},
    callShowModalEcoSelecionado: false,
    setCallShowModalEcoSelecionado: () => {},
});

export const EcopontosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [arrayEcopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [selectedEcoponto, setSelectedEcoponto] = useState<Ecoponto | null>(null);

    const [showModalEcoSelecionado, setModalEcoSelecionado] = useState<boolean>(false);
    const [callShowModalEcoSelecionado, setCallShowModalEcoSelecionado] = useState<boolean>(false);

    useEffect(() => {
        fetchEcopontos();
    }, []);

    async function fetchEcopontos() {
        const { data, error } = await supabase
            .from('table_ecopontos')
            .select('*')
            .order('Codigo', { ascending: true });

        if (!error && data) {
            setEcopontos(data);
            console.log('Ecopontos loaded!');
        }
    }

    return (
        <EcopontosContext.Provider
            value={{
                arrayEcopontos,
                selectedEcoponto,
                setSelectedEcoponto,
                showModalEcoSelecionado,
                setModalEcoSelecionado,
                callShowModalEcoSelecionado,
                setCallShowModalEcoSelecionado,
            }}
        >
            {children}
        </EcopontosContext.Provider>
    );
};
