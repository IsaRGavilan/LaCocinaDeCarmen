//Importa componentes Ionic
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import { Link } from 'react-router-dom'; //Link para crear enlaces a otras rutas dentro de la app
//Importa componentes para trabajar con ellos
import CocinaTipica from '../../assets/imagenesCategorias/CocinaTipica.jpg';
import entrantes from '../../assets/imagenesCategorias/entrantes.jpg';
import postres from '../../assets/imagenesCategorias/postres.jpg';
import caldos from '../../assets/imagenesCategorias/caldos.jpg';
import platoprincincipal from '../../assets/imagenesCategorias/platoprincipal.jpg';
import '../../css/cssGenerales/Inicio.css'; //Importa archivo de estilos

const Inicio = () => {
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">{/*Header del componente que incluye el menú desplegable*/}
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Inicio</IonTitle>{/*Título del componente*/}
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentGeneral">
        <h1 className='titulo-inicio'>Categorías</h1>
        <table>
          <tbody>
            <tr>
              <td>
              {/*Card que redirige al componente PlatosPrincipales*/}
              <Link to='/platosPrincipales' className='link'>
                <IonCard className='card'>
                <img alt="Platos principales" src={platoprincincipal} className='imagen'/>
                <IonCardHeader className='header-title'>
                  <IonCardTitle className='titulo-card'>Platos principales</IonCardTitle>
                </IonCardHeader>
                </IonCard>
              </Link>
              </td>
              <td>
              {/*Card que redirige al componente Entrantes*/}
              <Link to='/entrantes' className='link'>
              <IonCard className='card'>
                <img alt="Entrantes y ensaladas" src={entrantes} className='imagen'/>
                <IonCardHeader className='header-title'>
                  <IonCardTitle className='titulo-card'>Entrantes y ensaladas</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td>
              {/*Card que redirige al componente Caldos*/}
              <Link to='/caldos' className='link'>
              <IonCard className='card'>
                <img alt="Caldos y salsas" src={caldos} className='imagen'/>
                <IonCardHeader className='header-title'>
                  <IonCardTitle id='custom-title'>Caldos y salsas</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              {/*Card que redirige al componente Postres*/}
              <Link to='/postres' className='link'>
              <IonCard className='card'>
                <img alt="Postres" src={postres} className='imagen'/>
                <IonCardHeader className='header-title'>
                  <IonCardTitle id='custom-title'>Postres</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>
              {/*Card que redirige al componente CocinaTipica*/}
              <Link to='/cocinaTipica' className='link'>
              <IonCard className='ultimaCarta'>
                <img alt="Cocina tipica española" src={CocinaTipica} className='imagen'/>
                <IonCardHeader>
                  <IonCardTitle>Cocina típica española</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;