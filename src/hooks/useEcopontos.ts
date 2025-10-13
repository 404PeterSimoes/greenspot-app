import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const useEcopontos = () => {
    const [ecopontos, setEcopontos] = useState([]);

    useEffect(() => {
        getEcopontos();
    }, []);

    const getEcopontos = async () => {
        const data = await supabase.from('db_ecopontos').select('*')
        setEcopontos(data); 
    }

    return ecopontos;
};
