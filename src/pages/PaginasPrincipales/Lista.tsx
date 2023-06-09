import React, { useState, useEffect } from 'react'; //Importa el hook useEffect y useState de React y React
//Importa componentes Ionic
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonList, IonItem, IonCheckbox, IonIcon, IonLabel, IonButton } from '@ionic/react';
import firebaseConfig from '../../firebaseConfig'; //Importa la configuración de Firebase
import { downloadOutline, trashOutline } from 'ionicons/icons'; //Importa iconos utilizados
import { getAuth } from 'firebase/auth'; //Importa función de autenticación de Firebase
import { doc, getDoc, setDoc, onSnapshot, arrayUnion, updateDoc } from 'firebase/firestore'; //Importa funciones para manipular documentos de firestore
import PDFDocument from 'pdf-lib/cjs/api/PDFDocument'; //Importa función para crear y manipular documentos PDF
import { rgb } from 'pdf-lib';  //Función para crear un objeto de color en el formato RGB 
import '../../css/cssGenerales/Lista.css'; //Importa archivo de estilos

const Lista = () => {
  const [items, setItems] = useState<{ name: string, quantity: number }[]>([]); //Almacena un array de elementos (productos) y actualiza su estado
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
      const newItem = { name: currentItem, quantity: 1 }; //Crear el objeto del nuevo elemento
      const updatedItems = [...items, newItem]; //Agregar el nuevo elemento a la matriz
      setItems(updatedItems); //Actualiza el estado de los elementos (productos)
      setCurrentItem(''); //Restablece el valor del input
  
      if (user) {
        try {
          //Actualizar la lista en Firestore utilizando arrayUnion para agregar el nuevo elemento
          await updateDoc(doc(firebaseConfig.firestore, 'users', user.uid), { lista: arrayUnion(newItem) });
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
      updatedItems[index].quantity -= 1;  //Decrementa la cantidad del elemento en el índice dado
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

  //Función para descargar la lista en PDF
  const handleDownloadPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      let y = height - 50; //Posición inicial del texto en la página PDF

      for (const item of items) {
        const formattedItem = `${item.name} - Cantidad: ${item.quantity}`;
        page.drawText(formattedItem, { x: 50, y, size: 12, color: rgb(0, 0, 0) });
        y -= 20; //Actualiza la posición Y para el siguiente elemento
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' }); // Crear un blob con los bytes del PDF
      const url = URL.createObjectURL(blob); //Crea un objeto URL a partir del blob
      const a = document.createElement('a'); // Crear un elemento <a> y simular el clic para iniciar la descarga

      a.href = url; //Establece el atributo "href" con el URL
      a.download = 'Mi lista de la compra.pdf'; //Establece el atributo "download" con el nombre Mi lista de la compra
      a.click(); // Simula el clic en el enlace para iniciar la descarga del PDF

      URL.revokeObjectURL(url); //Libera el URL del objeto Blob
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header"> {/*Header del componente que incluye el menú desplegable*/}
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Lista de la compra</IonTitle> {/*Título del componente*/}
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
              <IonCheckbox slot="start" value={item.name} checked={false} aria-label={item.name} className="custom-checkbox" color={'secondary'}/>
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