import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const useEcopontos = () => {
    const [ecopontos, setEcopontos] = useState<any[]>([]);

    useEffect(() => {
        getEcopontos();
    }, []);

    async function getEcopontos() {
        const { data } = await supabase.from('table_ecopontos').select();

        setEcopontos(data || []);
    }

    return ecopontos;
    
};

export default useEcopontos;
