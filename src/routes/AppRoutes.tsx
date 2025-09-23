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
        <Route path="/ecopontos" render={() => <Ecopontos />} exact={true} />
        <Route path="/residuos" render={() => <Residuos />} exact={true} />
        <Route path="/chatbot" render={() => <Chatbot />} exact={true} />
        <Route path="/addecoponto" render={() => <AddEcoponto />} exact={true} />
    </>
);

export default AppRoutes;
