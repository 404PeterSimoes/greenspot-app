import { useState, useEffect } from 'react';
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

const useEcopontos = () => {
    const [arrayEcopontos, setEcopontos] = useState<Ecoponto[]>([]);
    const [loadingState, setLoading] = useState<boolean>(true);

    // Função corre dentro de useEffect para não fazer loop e carregar desnecessáriamente
    useEffect(() => {
        fetchEcopontos();
    }, []);

    async function fetchEcopontos() {
        setLoading(true);
        const { data } = await supabase
            .from('table_ecopontos')
            .select('*')
            .order('codigo', { ascending: true });

        setEcopontos(data || []);

        setLoading(false);
    }

    return { arrayEcopontos, loadingState };
};

export default useEcopontos;
