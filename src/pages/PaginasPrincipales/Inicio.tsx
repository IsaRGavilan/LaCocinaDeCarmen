import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonSplitPane, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import React from 'react';
import '../../css/cssGenerales/Inicio.css';
import CocinaTipica from '../../assets/imagenesCategorias/CocinaTipica.jpg';
import entrantes from '../../assets/imagenesCategorias/entrantes.jpg';
import postres from '../../assets/imagenesCategorias/postres.jpg';
import platosprincipales from '../../assets/imagenesCategorias/platosprincipales.jpg'
import caldos from '../../assets/imagenesCategorias/caldos.jpg';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Inicio</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="custom-content">
        <h1 className='titulo-inicio'>Categorías</h1>
        <table>
          <tbody>
            <tr>
              <td>
              <Link to='/platosPrincipales' className='link'>
                <IonCard className='card'>
                <img alt="Platos principales" src={platosprincipales} />
                <IonCardHeader>
                  <IonCardTitle className='titulo-card'>Platos principales</IonCardTitle>
                </IonCardHeader>
                </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/entrantes' className='link'>
              <IonCard className='card'>
                <img alt="Entrantes y ensaladas" src={entrantes} />
                <IonCardHeader>
                  <IonCardTitle className='titulo-card'>Entrantes y ensaladas</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to='/caldos' className='link'>
              <IonCard className='card'>
                <img alt="Caldos y salsas" src={caldos} />
                <IonCardHeader>
                  <IonCardTitle>Caldos y salsas</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/postres' className='link'>
              <IonCard className='card'>
                <img alt="Postres" src={postres}/>
                <IonCardHeader>
                  <IonCardTitle>Postres</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>
              <Link to='/cocinaTipica' className='link'>
              <IonCard className='ultimaCarta'>
                <img alt="Cocina tipica española" src={CocinaTipica}/>
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