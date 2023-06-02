import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuButton, IonList, IonItem, IonCheckbox, IonIcon, IonLabel, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { downloadOutline, trashOutline } from 'ionicons/icons';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import '../../css/cssGenerales/Lista.css';
import firebaseConfig from '../../firebaseConfig';
import PDFDocument from 'pdf-lib/cjs/api/PDFDocument';
import { rgb } from 'pdf-lib';

const Lista = () => {
  const [items, setItems] = useState<{ name: string, quantity: number }[]>([]);
  const [currentItem, setCurrentItem] = useState<string>('');
  const auth = getAuth(firebaseConfig.app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchItems = async () => {
        try {
          const userDoc = doc(firebaseConfig.firestore, 'users', user.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            if (userData && Array.isArray(userData.lista)) {
              setItems(userData.lista);
            }
          } else {
            // Si el documento del usuario no existe, se crea uno vacío
            await setDoc(userDoc, { lista: [] });
            setItems([]);
          }
        } catch (error) {
          console.error('Error fetching shopping list:', error);
        }
      };

      fetchItems();

      // Escucha los cambios en la lista de la compra del usuario
      const unsubscribe = onSnapshot(doc(firebaseConfig.firestore, 'users', user.uid), (snapshot) => {
        const userData = snapshot.data();

        if (userData && Array.isArray(userData.lista)) {
          setItems(userData.lista);
        } else {
          setItems([]);
        }
      });

      return () => {
        // Se cancela la suscripción al salir del componente
        unsubscribe();
      };
    }
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem(event.target.value);
  };

  const handleAddItem = async () => {
    if (currentItem.trim() !== '') {
      const newItem = { name: currentItem, quantity: 1 }; // Crear el objeto del nuevo elemento
      const updatedItems = [...items, newItem]; // Agregar el nuevo elemento a la matriz
      setItems(updatedItems);
      setCurrentItem('');
  
      if (user) {
        try {
          // Actualizar la lista en Firestore utilizando arrayUnion para agregar el nuevo elemento
          await updateDoc(doc(firebaseConfig.firestore, 'users', user.uid), { lista: arrayUnion(newItem) });
        } catch (error) {
          console.error('Error updating shopping list:', error);
        }
      }
    }
  };  

  const handleDeleteItem = async (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
  
    if (user) {
      try {
        const userDocRef = doc(firebaseConfig.firestore, 'users', user.uid);
        await updateDoc(userDocRef, { lista: updatedItems });
        setItems(updatedItems);
      } catch (error) {
        console.error('Error updating shopping list:', error);
      }
    }
  };  

  const handleIncreaseQuantity = async (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    setItems(updatedItems);
  
    if (user) {
      try {
        const userDocRef = doc(firebaseConfig.firestore, 'users', user.uid);
        await updateDoc(userDocRef, { lista: updatedItems });
      } catch (error) {
        console.error('Error updating shopping list:', error);
      }
    }
  };  
  
  const handleDecreaseQuantity = async (index: number) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      setItems(updatedItems);
  
      if (user) {
        try {
          const userDocRef = doc(firebaseConfig.firestore, 'users', user.uid);
          await updateDoc(userDocRef, { lista: updatedItems });
        } catch (error) {
          console.error('Error updating shopping list:', error);
        }
      }
    }
  };   

  const handleDownloadPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      // Posición inicial del texto
      let y = height - 50;

      for (const item of items) {
        const formattedItem = `${item.name} - Cantidad: ${item.quantity}`;
        page.drawText(formattedItem, { x: 50, y, size: 12, color: rgb(0, 0, 0) });
        y -= 20;
      }

      const pdfBytes = await pdfDoc.save();

      // Crear un blob con los bytes del PDF
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Crear un objeto URL a partir del blob
      const url = URL.createObjectURL(blob);

      // Crear un elemento <a> y simular el clic para iniciar la descarga
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Mi lista de la compra.pdf';
      a.click();

      // Liberar el objeto URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <IonPage id="main-content" className="main-page">
      <IonHeader className="custom-header">
        <IonToolbar className="custom-toolbar">
          <IonTitle className="main-title">Lista de la compra</IonTitle>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent id="contentLista">
        <h1 className='texto-lista'>¡Crea tu propia lista de la compra!</h1>
        <div className="input-container">
          <input
            className='input-lista'
            type="text"
            placeholder="Añade un producto..."
            value={currentItem}
            onChange={handleInputChange}
          />
          <IonButton onClick={handleAddItem} className='botonLista'>Añadir</IonButton>
        </div>
        <IonList id='lista'>
          {items.map((item, index) => (
            <IonItem key={index} id='custom-item'>
              <IonCheckbox slot="start" value={item.name} checked={false} aria-label={item.name} className="custom-checkbox" color={'secondary'}/>
              <IonLabel id='custom-label'>{item.name}</IonLabel>
              <IonButton onClick={() => handleDecreaseQuantity(index)} className='botonCantidad'>-</IonButton> {/* Botón de disminuir cantidad */}
              <span>{item.quantity}</span> {/* Mostrar la cantidad */}
              <IonButton onClick={() => handleIncreaseQuantity(index)} className='botonCantidad'>+</IonButton> {/* Botón de aumentar cantidad */}
              <IonIcon slot="end" icon={trashOutline} onClick={() => handleDeleteItem(index)} className='iconTrash' />
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={handleDownloadPDF} className='botonDescargarLista'>
          <IonIcon icon={downloadOutline} className='iconList'/>
          Descargar lista
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Lista;