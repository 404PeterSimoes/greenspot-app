import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
    Distancia: number;
}

export interface ResiduosPretendidos {
    Papel: boolean;
    Plastico: boolean;
    Vidro: boolean;
    Oleao: boolean;
    Pilhao: boolean;
}

interface DataContextType {
    arrayEcopontos: Ecoponto[];
    setEcopontos: (value: Ecoponto[]) => void;
    selectedEcoponto: Ecoponto | null;
    setSelectedEcoponto: (value: Ecoponto | null) => void;
    showModalEcopontos: boolean;
    setModalEcopontos: (value: boolean) => void;
    showModalEcoSelecionado: boolean;
    setModalEcoSelecionado: (value: boolean) => void;
    callShowModalEcoSelecionado: boolean;
    setCallShowModalEcoSelecionado: (value: boolean) => void;
    residuosPretendidos: ResiduosPretendidos;
    setResiduosPretendidos: React.Dispatch<React.SetStateAction<ResiduosPretendidos>>;
    modalResiduosFirstTime: boolean;
    setModalResiduosFirstTime: (value: boolean) => void;
}

export const EcopontosContext = createContext<DataContextType>({
    arrayEcopontos: [],
    setEcopontos: () => {},
    selectedEcoponto: null,
    setSelectedEcoponto: () => {},
    showModalEcopontos: false,
    setModalEcopontos: () => {},
    showModalEcoSelecionado: false,
    setModalEcoSelecionado: () => {},
    callShowModalEcoSelecionado: false,
    setCallShowModalEcoSelecionado: () => {},
    residuosPretendidos: { Papel: true, Plastico: true, Vidro: true, Oleao: true, Pilhao: true },
    setResiduosPretendidos: () => {},
    modalResiduosFirstTime: true,
    setModalResiduosFirstTime: () => {},
});

export const EcopontosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [arrayEcopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [selectedEcoponto, setSelectedEcoponto] = useState<Ecoponto | null>(null);

    const [showModalEcopontos, setModalEcopontos] = useState<boolean>(false);
    const [showModalEcoSelecionado, setModalEcoSelecionado] = useState<boolean>(false);
    const [callShowModalEcoSelecionado, setCallShowModalEcoSelecionado] = useState<boolean>(false);

    const [residuosPretendidos, setResiduosPretendidos] = useState<ResiduosPretendidos>({
        Papel: true,
        Plastico: true,
        Vidro: true,
        Oleao: true,
        Pilhao: true,
    }); // um objeto

    const [modalResiduosFirstTime, setModalResiduosFirstTime] = useState(true);

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
                setEcopontos,
                selectedEcoponto,
                setSelectedEcoponto,
                showModalEcopontos,
                setModalEcopontos,
                showModalEcoSelecionado,
                setModalEcoSelecionado,
                callShowModalEcoSelecionado,
                setCallShowModalEcoSelecionado,
                residuosPretendidos,
                setResiduosPretendidos,
                modalResiduosFirstTime,
                setModalResiduosFirstTime,
            }}
        >
            {children}
        </EcopontosContext.Provider>
    );
};
