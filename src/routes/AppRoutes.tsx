import { Redirect, Route } from 'react-router-dom';

import Mapa from '../pages/Mapa';
import Ecopontos from '../pages/Ecopontos';
import Residuos from '../pages/Residuos';
import Chatbot from '../pages/Chatbot';
import AddEcoponto from '../pages/AddEcoponto';

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
