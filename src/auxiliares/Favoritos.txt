import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton } from '@ionic/react';
import '../../css/cssGenerales/Favoritos.css';

const Favoritos = () => {

  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Favoritos</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
            <h1>Estás en favoritos</h1>
          </IonContent>
        </IonPage>
  );
};

export default Favoritos;