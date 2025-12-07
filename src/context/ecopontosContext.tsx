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
    Mostrar: boolean;
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

    showModalResiduos: boolean;
    setModalResiduos: (value: boolean) => void;

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

    showModalResiduos: false,
    setModalResiduos: () => {},

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

    const [showModalEcopontos, setModalEcopontos] = useState(false);
    const [showModalResiduos, setModalResiduos] = useState(false);
    const [showModalEcoSelecionado, setModalEcoSelecionado] = useState(false);

    const [callShowModalEcoSelecionado, setCallShowModalEcoSelecionado] = useState(false);

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
            const data1 = data.map((eco) => ({
                ...eco,
                Mostrar: true,
            }));

            setEcopontos(data1);
            console.log('Ecopontos loaded!');
        }
    }

    function updateEcopontosResiduos() {
        const novoArrayEcopontos = arrayEcopontos.map((eco) => ({
            ...eco,
            Mostrar: true,
        }));

        setEcopontos(novoArrayEcopontos);
    }

    useEffect(() => {
        // updateEcopontosResiduos()
        /*const newEcopontos = arrayEcopontos.filter((eco) => {
            return (
                (residuosPretendidos.Papel && eco.Tem_papel) ||
                (residuosPretendidos.Plastico && eco.Tem_plastico) ||
                (residuosPretendidos.Vidro && eco.Tem_vidro) ||
                (residuosPretendidos.Oleao && eco.Tem_oleao) ||
                (residuosPretendidos.Pilhao && eco.Tem_pilhao)
            );
        });
        
        setEcopontos(newEcopontos);*/
    }, [showModalResiduos]);

    return (
        <EcopontosContext.Provider
            value={{
                arrayEcopontos,
                setEcopontos,

                selectedEcoponto,
                setSelectedEcoponto,

                showModalEcopontos,
                setModalEcopontos,

                showModalResiduos,
                setModalResiduos,

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
