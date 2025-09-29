import { Redirect, Route } from 'react-router-dom';

import Mapa from '../components/Mapa';
import Ecopontos from '../components/Modal/Ecopontos';
import Residuos from '../components/Modal/Residuos';
import Chatbot from '../components/Modal/Chatbot';
import AddEcoponto from '../components/Modal/AddEcoponto';

const AppRoutes = () => (
    <>
        <Redirect exact path="/" to="/mapa" />

        <Route path="/mapa" component={Mapa} exact/>
        <Route path="/ecopontos" component={Ecopontos} exact/>
        <Route path="/residuos" component={Residuos} exact/>
        <Route path="/chatbot" component={Chatbot} exact/>
        <Route path="/addecoponto" component={AddEcoponto} exact/>
    </>
);

export default AppRoutes;