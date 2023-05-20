import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import '../../css/cssCategorias/CocinaTipica.css';
import { Link } from 'react-router-dom';
import andalucia from '../../assets/imagenesCocinaTipica/andalucia.png';
import aragon from '../../assets/imagenesCocinaTipica/aragon.png';
import asturias from '../../assets/imagenesCocinaTipica/asturias.png';
import baleares from '../../assets/imagenesCocinaTipica/baleares.png';
import canarias from '../../assets/imagenesCocinaTipica/canarias.jpg';
import cantabria from '../../assets/imagenesCocinaTipica/cantabria.png';
import castillaLeon from '../../assets/imagenesCocinaTipica/castillaLeon.png';
import castillaMancha from '../../assets/imagenesCocinaTipica/castillaMancha.png';
import catalunya from '../../assets/imagenesCocinaTipica/catalunya.png';
import extremadura from '../../assets/imagenesCocinaTipica/extremadura.png';
import galicia from '../../assets/imagenesCocinaTipica/galicia.png';
import madrid from '../../assets/imagenesCocinaTipica/madrid.png';
import murcia from '../../assets/imagenesCocinaTipica/murcia.png';
import navarra from '../../assets/imagenesCocinaTipica/navarra.png';
import paisVasco from '../../assets/imagenesCocinaTipica/paisVasco.png';
import rioja from '../../assets/imagenesCocinaTipica/rioja.png';
import valencia from '../../assets/imagenesCocinaTipica/valencia.png';

const CocinaTipica = () => {
  return (
        <IonPage id="main-content" className="main-page">
          <IonHeader className="custom-header">
            <IonToolbar className="custom-toolbar">
            <IonTitle className="main-title">Cocina Típica Española</IonTitle>
              <IonMenuButton slot="start" />
            </IonToolbar>
          </IonHeader>
          <IonContent className="custom-content">
          <h1 className='titulo-platos'>Elige tu región favorita...</h1>
          <table>
            <tbody>
            <tr>
              <td>
              <Link to='/andalucia' className='link'>
                <IonCard className='card'>
                <img alt="andalucia" src={andalucia} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Andalucía</IonCardTitle>
                </IonCardHeader>
                </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/aragon' className='link'>
              <IonCard className='card'>
                <img alt="aragon" src={aragon} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Aragón</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to='/asturias' className='link'>
              <IonCard className='card'>
                <img alt="asturias" src={asturias} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Asturias</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/baleares' className='link'>
              <IonCard className='card'>
                <img alt="baleares" src={baleares} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Islas baleares</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to='/canarias' className='link'>
              <IonCard className='card'>
                <img alt="canarias" src={canarias} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Islas Canarias</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/cantabria' className='link'>
              <IonCard className='card'>
                <img alt="cantabria" src={cantabria} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Cantabria</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
            <td>
              <Link to='/castillaLeon' className='link'>
              <IonCard className='card'>
                <img alt="castillaLeon" src={castillaLeon} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Castilla y León</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/castillaMancha' className='link'>
              <IonCard className='card'>
                <img alt="castillaMancha" src={castillaMancha} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Castilla-La Mancha</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
            <td>
              <Link to='/catalunya' className='link'>
              <IonCard className='card'>
                <img alt="catalunya" src={catalunya} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Castaluña</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/extremadura' className='link'>
              <IonCard className='card'>
                <img alt="extremadura" src={extremadura} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Extremadura</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
            <td>
              <Link to='/galicia' className='link'>
              <IonCard className='card'>
                <img alt="galicia" src={galicia} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Galicia</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/madrid' className='link'>
              <IonCard className='card'>
                <img alt="madrid" src={madrid} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Madrid</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
            <td>
              <Link to='/murcia' className='link'>
              <IonCard className='card'>
                <img alt="murcia" src={murcia} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Murcia</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/navarra' className='link'>
              <IonCard className='card'>
                <img alt="navarra" src={navarra} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Navarra</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
            <td>
              <Link to='/paisVasco' className='link'>
              <IonCard className='card'>
                <img alt="paisVasco" src={paisVasco} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>País Vasco</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
              <td>
              <Link to='/rioja' className='link'>
              <IonCard className='card'>
                <img alt="rioja" src={rioja} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Rioja</IonCardTitle>
                </IonCardHeader>
              </IonCard>
              </Link>
              </td>
            </tr>
            <tr>
              <td>
              <Link to='/valencia' className='link'>
              <IonCard className='card'>
                <img alt="valencia" src={valencia} className='image'/>
                <IonCardHeader>
                  <IonCardTitle className='title'>Valencia</IonCardTitle>
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

export default CocinaTipica;