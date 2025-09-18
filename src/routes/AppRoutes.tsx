import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Mapa from '../pages/Mapa';
import Ecopontos from '../pages/Ecopontos';
import Residuos from '../pages/Residuos';
import Chatbot from '../pages/Chatbot';
import AddEcoponto from '../pages/AddEcoponto';

const AppRoutes = () => (
    <>
        <Redirect exact path="/" to="/mapa" />

        <Route path="/mapa" render={() => <Mapa />} exact={true} />
        <Route path="/ecopontos" component={Ecopontos} />
        <Route path="/residuos" component={Residuos} />
        <Route path="/chatbot" component={Chatbot} />
        <Route path="/addecoponto" component={AddEcoponto} />
    </>
);

export default AppRoutes;
