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
  const [items, setItems] = useState<string[]>([]);
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
      const updatedItems = [...items, currentItem];
      setItems(updatedItems);
      setCurrentItem('');

      if (user) {
        try {
          // Actualiza la lista en Firestore utilizando arrayUnion para agregar el nuevo elemento
          await updateDoc(doc(firebaseConfig.firestore, 'users', user.uid), { lista: arrayUnion(currentItem) });
        } catch (error) {
          console.error('Error updating shopping list:', error);
        }
      }
    }
  };

  const handleDeleteItem = async (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    if (user) {
      try {
        // Actualiza la lista en Firestore utilizando arrayRemove para eliminar el elemento
        await updateDoc(doc(firebaseConfig.firestore, 'users', user.uid), { lista: arrayRemove(items[index]) });
      } catch (error) {
        console.error('Error updating shopping list:', error);
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
        page.drawText(item, { x: 50, y, size: 12, color: rgb(0, 0, 0) });
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
      <IonContent className="custom-content">
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
              <IonCheckbox slot="start" value={item} checked={false} aria-label={item} id='checkbox'/>
              <IonLabel id='custom-label'>{item}</IonLabel>
              <IonIcon slot="end" icon={trashOutline} onClick={() =>handleDeleteItem(index)} className='iconTrash'/>
            </IonItem>
          ))}
        </IonList>
        <IonButton onClick={handleDownloadPDF} className='botonDescargarLista'>
          <IonIcon icon={downloadOutline} className='icon'/>
          Descargar lista
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Lista;