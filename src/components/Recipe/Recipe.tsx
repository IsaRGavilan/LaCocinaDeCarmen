import { useEffect, useState } from 'react'; //Importa hooks usados de react
import { useParams, useHistory } from 'react-router-dom'; //Importa hooks usados de react-router-dom
import { getFirestore, doc, getDoc } from 'firebase/firestore'; //Importa funciones necesarias de firestore
import { IonContent, IonIcon, IonPage } from '@ionic/react'; //Importa componentes usados de Ionic
import { arrowBackOutline } from 'ionicons/icons'; //Importa el icono utilizado
import firebaseConfig from '../../firebaseConfig'; //Importa configuración de firebase definida en el proyecto
import './Recipe.css'; //Importa archivo de estilos

/*Definición de la interfaz RecipeProps para especificar
las propiedades esperadas de Recipe*/
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
    comensales: number;
  };
}

// Definición del componente Recipe como componente funcional de React que recibe las propiedades de RecipeProps
const Recipe: React.FC<RecipeProps> = ({ recipe }) => {

  const { id } = useParams<{ id: string }>(); //Obtiene parámetro 'id'
  const [recipeData, setRecipeData] = useState<any>(null); // Define un estado 'recipeData' y una función 'setRecipeData'
  const history = useHistory(); //Obtiene el historial de navegación

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // Obtiene la referencia al documento de la receta utilizando el 'id' y la configuración de Firebase
        const recipeRef = doc(getFirestore(firebaseConfig.app), 'recipes', id);
        const recipeDoc = await getDoc(recipeRef); // Obtiene el documento de la receta utilizando la referencia
        // Si la receta existe, actualiza el estado 'recipeData' con los datos de la receta
        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data(); //Obtiene los datos
          setRecipeData(recipeData); //Actualiza el estado recipeData con los datos
        } else { //Si no existe, comprobación por consola
          console.log("La receta no existe");
        }
      } catch (error) {
        console.log("Error al obtener los detalles de la receta:", error);
      }
    };
    fetchRecipeDetails(); // Ejecuta la función fetchRecipeDetails al montar el componente y cuando el 'id' cambie
  }, [id]);

  if (!recipeData) {
    return null; // Si no hay datos de la receta, retorna null para no renderizar nada
  }

  //Función para volver a la pantalla anterior
  const handleGoBack = () => {
    history.goBack();
  };
  
  return (
    <IonPage>
      <IonContent id='contentReceta'>
        <IonIcon icon={arrowBackOutline} className='flecha' onClick={handleGoBack}/> {/*Icono flecha para volver a la pantalla anterior*/}
        <h1 className='nombreReceta'>{recipeData.nombre}</h1>{/*Nombre receta*/}
        <img src={recipeData.imagen} className='imagenReceta'/>{/*Imagen receta*/}
        <h1 className='tituloReceta'>INGREDIENTES</h1>{/*Título ingredientes*/}
        <h2 className='ingredientes'>{/*Renderiza cada ingrediente de la lista*/}
          <ul>
            {recipeData.ingredientes.map((ingrediente: string, index: number) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </h2>
        <h1 className='tituloReceta'>PREPARACIÓN</h1>{/*Título preparación*/}
        <h2 className='preparacion'>{/*Renderiza cada paso de la preparación*/}
          {recipeData.preparacion.map((paso: string, index: number) => (
            <li key={index}>{paso}</li>
          ))}
        </h2>
        <h2 className='dificultad'>-Dificultad: {recipeData.dificultad}</h2>{/*Dificultad*/}
        <h2 className='tiempo'>-Tiempo de preparación: {recipeData.tiempo} minutos</h2>{/*Tiempo de preparación*/}
        <h2 className='comensales'>-Número de comensales: {recipeData.comensales} personas. Ajustar ingredientes según comensales.</h2>{/*Comensales*/}
      </IonContent>
    </IonPage>
  );
};

export default Recipe;