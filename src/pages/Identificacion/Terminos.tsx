import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonIcon } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import './Terminos.css';
import { arrowBackOutline } from 'ionicons/icons';

const Terminos = () => {

    const history = useHistory();

    const handleGoBack = () => {
      history.goBack();
    };

  return (
    <IonPage className='terminos'>
      <IonHeader>
        <IonToolbar className='cabecera-terminos' onClick={handleGoBack}>
            <IonIcon icon={arrowBackOutline} id='icono'/>
          <IonTitle className='titulo-terminos'>La Cocina de Carmen</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
        <h1 className='h1-terminos'>Términos y Condiciones de Uso</h1>
        <p className='parrafo'>
        Bienvenido/a a nuestra aplicación de recetas. Antes de utilizar nuestra aplicación, te pedimos que leas detenidamente estos 
        Términos y Condiciones de Uso, ya que establecen los términos legales y las condiciones de uso de nuestra aplicación. 
        Al acceder y utilizar nuestra aplicación de recetas, aceptas cumplir con estos Términos y Condiciones de Uso. 
        Si no estás de acuerdo con alguno de los términos establecidos aquí, te solicitamos que no utilices la aplicación.
        </p>
        <p className='parrafo'>
        Uso Personal: Nuestra aplicación de recetas está diseñada para su uso personal y no comercial. No está permitido utilizar 
        la aplicación con fines de reventa, distribución o cualquier otro propósito comercial sin nuestro permiso previo por escrito.
        </p>
        <p className='parrafo'>
        Precisión de la Información: Nos esforzamos por proporcionar recetas precisas y actualizadas. Sin embargo, 
        no podemos garantizar la exactitud de la información en todo momento. Los usuarios son responsables de verificar 
        la precisión de las recetas y los ingredientes antes de utilizarlos.
        </p>
        <p className='parrafo'>
        Responsabilidad del Usuario: El uso de las recetas e información proporcionada en nuestra aplicación es responsabilidad 
        del usuario. No nos hacemos responsables de ninguna lesión, daño o enfermedad causados por el uso de las recetas o la 
        información proporcionada. Siempre se recomienda tomar precauciones y seguir las prácticas de seguridad alimentaria 
        adecuadas al preparar alimentos.
        </p>
        <p className='parrafo'>
        Propiedad Intelectual: Todos los derechos de propiedad intelectual relacionados con nuestra aplicación de recetas, 
        incluyendo derechos de autor y marcas comerciales, son propiedad de los respectivos propietarios. Los usuarios no 
        tienen permiso para copiar, reproducir o distribuir el contenido de la aplicación sin nuestro permiso previo por escrito.
        </p>
        <p className='parrafo'>
        Comentarios y Contribuciones de los Usuarios: Los usuarios pueden tener la opción de dejar comentarios, calificaciones 
        o contribuciones en la aplicación. Al hacerlo, los usuarios garantizan que tienen los derechos necesarios para compartir 
        dichos comentarios o contribuciones, y otorgan a nuestra aplicación una licencia no exclusiva para utilizar, modificar 
        y distribuir dichos contenidos.
        </p>
        <p className='parrafo'>
        Privacidad y Protección de Datos: Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. 
        La recopilación y el procesamiento de la información personal de los usuarios se realizará de acuerdo con nuestra 
        Política de Privacidad y las leyes aplicables sobre protección de datos.
        </p>
        <p className='parrafo'>
        Estos Términos y Condiciones de Uso constituyen el acuerdo completo entre tú y nosotros con respecto al uso de nuestra 
        aplicación de recetas. Si tienes alguna pregunta o inquietud sobre estos términos, por favor contáctanos.
        </p>
        <p className='parrafo'>
        Última actualización: [28/05/2023]
        </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Terminos;
