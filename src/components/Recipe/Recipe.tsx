import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import { useEffect } from 'react';
import { IonContent, IonPage } from '@ionic/react';

const Recipe = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipeRef = doc(firestore, 'recipes', id);
        const recipeDoc = await getDoc(recipeRef);
        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data();
          // Utilizar los datos de la receta completa
        } else {
          // La receta no existe
        }
      } catch (error) {
        console.log("Error al obtener los detalles de la receta:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  // Renderizar la vista de los detalles de la receta
  return (
    <IonPage>
        <IonContent>
            hola
        </IonContent>
    </IonPage>
  );
};

export default Recipe;