import React, { useState, useEffect } from 'react'; //Importa el hook useEffect y useState de React y React
//Importa componentes Ionic
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonList, IonItem, IonCheckbox, IonIcon, IonLabel, IonButton } from '@ionic/react';
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import { downloadOutline, trashOutline } from 'ionicons/icons'; //Importa iconos utilizados
import { getAuth } from 'firebase/auth'; //Importa función de autenticación de Firebase
import { doc, getDoc, setDoc, onSnapshot, arrayUnion, updateDoc } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import { PDFDocument, rgb } from 'pdf-lib';
import '../../css/cssGenerales/Lista.css'; //Importa archivo de estilos
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem'; //Importa funciones para descargar la lista en PDF
import { Capacitor, Plugins } from '@capacitor/core'; //Importa funciones para pasar la app a Android
const { Toast } = Plugins;


const Lista = () => {
  const [items, setItems] = useState<{ name: string, quantity: number, checked: boolean }[]>([]); //Almacena un array de elementos (productos) y actualiza su estado
  const [currentItem, setCurrentItem] = useState<string>(''); //Almacena el valor actual del input para añadir productos a la lista
  const auth = getAuth(firebaseConfig.app); //Obtiene la instancia de autenticación de Firebase
  const user = auth.currentUser; //Obtiene el usuario autenticado actualmente

  useEffect(() => {
    if (user) {
      const fetchItems = async () => {
        try {
          const userDoc = doc(firebaseConfig.firestore, 'users', user.uid); //Obtiene la referencia del documento del usuario actual
          const userSnapshot = await getDoc(userDoc); //Obtiene el documento del usuario

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data(); //Obtiene los datos del documento del usuario

            if (userData && Array.isArray(userData.lista)) {
              setItems(userData.lista); //Actualiza el estado de los elementos (productos) con los datos del usuario
            }
          } else {
            //Si el documento del usuario no existe, se crea uno vacío
            await setDoc(userDoc, { lista: [] });
            setItems([]);
          }
        } catch (error) {
          console.error('Error al obtener la lista de la compra:', error);
        }
      };
      fetchItems();

      //Escucha los cambios en la lista de la compra del usuario
      const unsubscribe = onSnapshot(doc(firebaseConfig.firestore, 'users', user.uid), (snapshot) => {
        const userData = snapshot.data();

        if (userData && Array.isArray(userData.lista)) {
          setItems(userData.lista); //Actualiza el estado de los elementos (productos) con los datos actualizados del usuario
        } else {
          setItems([]);
        }
      });
      return () => {
        unsubscribe(); //Se cancela la suscripción al salir del componente
      };
      }
      }, [user]); //Se ejecuta cuando cambia el usuario autenticado

  //Función para actualizar el valor actual del input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem(event.target.value);
  };

  //Función para añadir un item a la lista
  const handleAddItem = async () => {
    if (currentItem.trim() !== '') {
      const newItem = { name: currentItem, quantity: 1, checked: false }; //Crear el objeto del nuevo elemento
      const updatedItems = [...items, newItem]; //Agregar el nuevo elemento a la matriz
      setItems(updatedItems); //Actualiza el estado de los elementos (productos)
      setCurrentItem(''); //Restablece el valor del input
  
      if (user) {
        try {
            //Actualizar la lista en Firestore utilizando arrayUnion para agregar el nuevo elemento
            await updateDoc(doc(firebaseConfig.firestore, 'users', user.uid), {
            lista: arrayUnion(newItem),
          });
        } catch (error) {
          console.error('Error al actualizar la lista de la compra:', error);
        }
      }
    }
  };  

  //Función para borrar un ítem de la lista
  const handleDeleteItem = async (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index); //Filtra los elementos y elimina el elemento en el índice dado
  
    if (user) {
      try {
        const userDocRef = doc(firebaseConfig.firestore, 'users', user.uid); //Obtiene la referencia del documento del usuario actual
        await updateDoc(userDocRef, { lista: updatedItems }); //Actualiza la lista de la compra en Firestore con los elementos actualizados
        setItems(updatedItems); //Actualiza el estado de los elementos (productos)
      } catch (error) {
        console.error('Error al actualizar la lista de la compra:', error);
      }
    }
  };  

  //Función para incrementar la cantidad
  const handleIncreaseQuantity = async (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1; //Incrementa la cantidad del elemento en el índice dado
    setItems(updatedItems); //Actualiza el estado de los elementos (productos)
  
    if (user) {
      try {
        const userDocRef = doc(firebaseConfig.firestore, 'users', user.uid); //Obtiene la referencia del documento del usuario actual
        await updateDoc(userDocRef, { lista: updatedItems }); //Actualiza la lista de la compra en Firestore con los elementos actualizados
      } catch (error) {
        console.error('Error al actualizar la lista de la compra:', error);
      }
    }
  };
  
  //Función para decrementar la cantidad
  const handleDecreaseQuantity = async (index: number) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1; //Decrementa la cantidad del elemento en el índice dado
      setItems(updatedItems); //Actualiza el estado de los elementos (productos)
  
      if (user) {
        try {
          const userDocRef = doc(firebaseConfig.firestore, 'users', user.uid); //Obtiene la referencia del documento del usuario actual
          await updateDoc(userDocRef, { lista: updatedItems }); //Actualiza la lista de la compra en Firestore con los elementos actualizados
        } catch (error) {
          console.error('Error al actualizar la lista de la compra:', error);
        }
      }
    }
  };  

  //Función para controlar el cambmio de los checkbox
  const handleCheckboxChange = async (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked; //Cambia el valor de checked si el checkbox está marcado
    setItems(updatedItems); //Actualiza el estado de los items
  
    if (user) {
      try {
        const userDocRef = doc(firebaseConfig.firestore, 'users', user.uid); //Obtiene referencia del documento del usuario autenticado
        await updateDoc(userDocRef, { lista: updatedItems }); //Actualiza el documento
      } catch (error) {
        console.error('Error al actualizar la lista de la compra:', error);
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      //Crear un nuevo documento PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
  
      //Escribir los elementos de la lista en el PDF
      const yStart = page.getHeight() - 50; //Posición vertical inicial para escribir los elementos
      const fontSize = 12;
      const lineHeight = fontSize + 5;
  
      items.forEach((item, index) => {
        const y = yStart - index * lineHeight;
        page.drawText(`${item.name} - Cantidad: ${item.quantity}`, {
          x: 50,
          y,
          size: fontSize,
          color: rgb(0, 0, 0), //Color de texto en negro
        });
      });
  
      //Generar el contenido del PDF
      const pdfBytes = await pdfDoc.save();
  
      //Nombre del archivo PDF
      const fileName = 'lista_compra.pdf';
  
      if (Capacitor.isNative) {
        //Descargar en dispositivos móviles con Capacitor
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
  
        //Guardar el archivo en la carpeta de descargas del dispositivo
        const savedFile = await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: FilesystemDirectory.Documents,
        });
  
        //Mostrar una notificación o mensaje al usuario de que se descargó el archivo
        await Toast.show({
          text: 'Lista de la compra descargada correctamente',
          duration: 'short',
        });

      console.log('Archivo PDF descargado:', savedFile.uri);
      } else {
        //Descargar en la versión web
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
        //Crear un objeto URL para el blob
        const url = window.URL.createObjectURL(blob);
  
        //Crear un enlace temporal y hacer clic en él para descargar el archivo
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.target = '_blank';
        link.click();
  
        //Limpiar el objeto URL después de la descarga
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
    }
  };
  
  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header"> {/*Header del componente que incluye el menú desplegable*/}
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Lista de la compra act</IonTitle> {/*Título del componente*/}
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentLista"> {/*Contenido del componente*/}
        <h1 className='texto-lista'>¡Crea tu propia lista de la compra!</h1>
        <div className="input-container">
          {/*Input para que el usuario añada el producto que quiera*/}
          <input
            className='input-lista'
            type="text"
            placeholder="Añade un producto..."
            value={currentItem}
            onChange={handleInputChange}
          />
          {/*Botón que añade el producto escrito a la lista*/}
          <IonButton onClick={handleAddItem} className='botonLista'>Añadir</IonButton>
        </div>
        <IonList id='lista'>{/*Lista que muestra un mapa de los elementos añadidos*/}
          {items.map((item, index) => (
            <IonItem key={index} id='custom-item'>
              <IonCheckbox slot="start" value={item.name} checked={item.checked} onIonChange={() => handleCheckboxChange(index)}  aria-label={item.name} className="custom-checkbox" color={'secondary'} />
              <IonLabel id='custom-label'>{item.name}</IonLabel>
              <IonButton onClick={() => handleDecreaseQuantity(index)} className='botonCantidad'>-</IonButton> {/*Botón de disminuir cantidad */}
              <span>{item.quantity}</span> {/*Mostrar la cantidad*/}
              <IonButton onClick={() => handleIncreaseQuantity(index)} className='botonCantidad'>+</IonButton> {/*Botón de aumentar cantidad */}
              <IonIcon slot="end" icon={trashOutline} onClick={() => handleDeleteItem(index)} className='iconTrash' />
            </IonItem>
          ))}
        </IonList>
        {/*Botón para descargar la lista hecha por el usuario en PDF*/}
        <IonButton onClick={handleDownloadPDF} className='botonDescargarLista'>
          <IonIcon icon={downloadOutline} className='iconList'/>
          Descargar lista
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Lista;