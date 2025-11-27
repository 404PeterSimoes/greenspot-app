import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabaseClient';
import { GeolocationContext } from './geolocationContext';

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
    const { position } = useContext(GeolocationContext)!;

    const [arrayEcopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [selectedEcoponto, setSelectedEcoponto] = useState<Ecoponto | null>(null);

    const [showModalEcoSelecionado, setModalEcoSelecionado] = useState<boolean>(false);
    const [callShowModalEcoSelecionado, setCallShowModalEcoSelecionado] = useState<boolean>(false);

    useEffect(() => {
        fetchEcopontos();
    }, []);

    useEffect(() => {
        updateEcopontosPosition();
    }, [position]);

    function formulaHaversine(lat1: number, lon1: number, lat2: number, lon2: number) {
        const R = 6371; // raio da Terra em km
        const toRad = (x: number) => (x * Math.PI) / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

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

    function updateEcopontosPosition() {
        if (position) {
            const arrayEcopontosOrdenados = arrayEcopontos.map((eco) => ({
                ...eco,
                distancia: formulaHaversine(
                    position.lat,
                    position.lng,
                    eco.Latitude,
                    eco.Longitude
                ),
            })); // .sort((a, b) => a.distancia - b.distancia);

            setEcopontos(arrayEcopontosOrdenados)
            console.log('Ecopontos updated!');
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
