import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonIcon } from '@ionic/react';
import React from 'react';
import '../../../css/cssCategorias/cssPlatosPrincipales/Legumbres.css';
import { arrowUndoOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const Legumbres = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Legumbres y patatas</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
          <div className='contenedor-icono-titulo'>
          <Link to='/platosPrincipales' className='link'><IonIcon icon={arrowUndoOutline} className='back-icon' /></Link>
            <h1 className='titulo-platos'></h1>
          </div>
          </IonContent>
        </IonPage>
  );
};

export default Legumbres;