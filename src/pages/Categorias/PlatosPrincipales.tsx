import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import React from 'react';
import '../../css/cssCategorias/PlatosPrincipales.css';
import { Link } from 'react-router-dom';
import pescados from '../../assets/imagenesPlatosPrincipales/pescados.jpg';
import pure from '../../assets/imagenesPlatosPrincipales/pure.jpg';
import legumbres from '../../assets/imagenesPlatosPrincipales/legumbres.jpg';
import pasta from '../../assets/imagenesPlatosPrincipales/pasta.jpg';
import sopas from '../../assets/imagenesPlatosPrincipales/sopas.jpg';
import verduras from '../../assets/imagenesPlatosPrincipales/verduras.jpg';
import carnes from '../../assets/imagenesPlatosPrincipales/carnes.jpg';

const PlatosPrincipales = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className='main-title'>Platos principales</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent id="contentGeneral">
            <h1 className='titulo-platos'>Elige tu sección favorita...</h1>
          <table>
            <tbody>
            <tr>
              <td>
              <Link to='/carnes' className='link'>
                <IonCard className='card'>
                <img alt="Carnes" src={carnes} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Carnes</IonCardTitle>
                </IonCardHeader>
                </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/pescados' className='link'>
              <IonCard className='card'>
                <img alt="Pescados" src={pescados} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Pescados</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to='/legumbres' className='link'>
              <IonCard className='card'>
                <img alt="Legumbres y patatas" src={legumbres} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Legumbres y patatas</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/pastas' className='link'>
              <IonCard className='card'>
                <img alt="Pastas y arroces" src={pasta} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Pastas y arroces</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to='/pures' className='link'>
              <IonCard className='card'>
                <img alt="Pures y potajes" src={pure} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Purés y potajes</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/sopas' className='link'>
              <IonCard className='card'>
                <img alt="Sopas y cremas" src={sopas} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Sopas y cremas</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
            <td>
              <Link to='/verduras' className='link'>
              <IonCard className='card'>
                <img alt="Verduras" src={verduras} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Verduras</IonCardTitle>
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

export default PlatosPrincipales;