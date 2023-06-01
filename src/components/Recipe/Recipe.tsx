import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import { useEffect, useState } from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Recipe.css';

interface RecipeProps {
  recipe: {
    id: number;
    imagen: string;
    nombre: string;
    categoria: string;
    dificultad: string;
    ingredientes: string[];
    preparacion: string[];
    tiempo: number;
    tipo: string;
  };
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {

  const { id } = useParams<{ id: string }>();
  const [recipeData, setRecipeData] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipeRef = doc(firestore, 'recipes', id);
        const recipeDoc = await getDoc(recipeRef);
        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data();
          setRecipeData(recipeData);
        } else {
          console.log("La receta no existe");
        }
      } catch (error) {
        console.log("Error al obtener los detalles de la receta:", error);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (!recipeData) {
    return null;
  }

  //Función para volver a la pantalla anterior
  const handleGoBack = () => {
    history.goBack();
  };
  
  return (
<IonPage>
      <IonContent id='contentReceta'>
        <IonIcon icon={arrowBackOutline} className='flecha' onClick={handleGoBack}/>
        <h1 className='nombreReceta'>{recipeData.nombre}</h1>
        <img src={recipeData.imagen} className='imagenReceta'/>
        <h1 className='tituloReceta'>INGREDIENTES</h1>
        <h2 className='ingredientes'>
          <ul>
            {recipeData.ingredientes.map((ingrediente: string, index: number) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </h2>
        <h1 className='tituloReceta'>PREPARACIÓN</h1>
        <h2 className='preparacion'>
          {recipeData.preparacion.map((paso: string, index: number) => (
            <li key={index}>{paso}</li>
          ))}
        </h2>
        <h2 className='dificultad'>-Dificultad: {recipeData.dificultad}</h2>
        <h2 className='tiempo'>-Tiempo de preparación: {recipeData.tiempo} minutos</h2>
      </IonContent>
    </IonPage>
  );
};

export default Recipe;