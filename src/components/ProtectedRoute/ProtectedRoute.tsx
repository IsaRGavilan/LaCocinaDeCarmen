import { Route, Redirect, RouteProps } from 'react-router-dom'; //Importa componentes de la librería react-router-dom
import React, { ComponentType } from 'react'; //Importación React y ComponentType para especificar el componente que se espera

/*Define un tipo ProtectedRouteProps que extiende de RouteProps para agregar 
la propiedad isAuthenticated y verificar que cuando el usuario acceda a una ruta
envuelta en esto esté autenticado*/
type ProtectedRouteProps = {
  component: ComponentType<any>;
  isAuthenticated: boolean;
} & RouteProps;

/*Declaración del componente con las propiedades de ProtectedRouteProps*/
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, isAuthenticated, ...rest }) => (
  //Renderiza Route con las propiedades restantes y una función de renderizado
  <Route
    {...rest}
    render={(props) =>
      //Verifica si el usuario está autenticado para renderizar el componente, si no lo está redirige a /inicioSesion
      isAuthenticated ? <Component {...props} /> : <Redirect to="/inicioSesion" />
    }
  />
);

export default ProtectedRoute; //Exportación del componente