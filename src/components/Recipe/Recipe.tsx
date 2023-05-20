import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebaseConfig';
import { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import jsPDF from 'jspdf';

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

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const firestore = getFirestore(firebaseConfig.app);
        const recipeRef = doc(firestore, 'recipes', id);
        const recipeDoc = await getDoc(recipeRef);
        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data();
          setRecipeData(recipeData); // Agrega esta línea para establecer el estado
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
    return null; // Mostrar un spinner de carga mientras se carga la receta
  }

  const handleDownload = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = recipeData.imagen;
    // Genera el contenido del PDF utilizando los datos de la receta
    doc.setFontSize(18);
    doc.text(recipeData.nombre, 10, 20);
    doc.setFontSize(12);
    doc.text('INGREDIENTES:', 10, 90);
    doc.text(recipeData.ingredientes.join(', '), 10, 100);
    doc.text('PREPARACIÓN:', 10, 120);
    doc.text(recipeData.preparacion.join('\n'), 10, 130);
    doc.setFontSize(10);
    doc.text(`Dificultad: ${recipeData.dificultad}`, 10, 180);
    doc.text(`Tiempo de preparación: ${recipeData.tiempo} minutos`, 10, 190);
    doc.addImage(img, 'JPEG', 10, 30, 50, 50);
  
    // Descarga el archivo PDF
    doc.save(`${recipeData.nombre}.pdf`);
  };
  
  return (
<IonPage>
      <IonContent>
        <h1>{recipeData.nombre}</h1>
        <img src={recipeData.imagen}/>
        <h1>INGREDIENTES</h1>
        <h2>{recipeData.ingredientes}</h2>
        <h1>PREPARACIÓN</h1>
        <h2>{recipeData.preparacion}</h2>
        <h2>Dificultad: {recipeData.dificultad}</h2>
        <h2>Tiempo de preparación: {recipeData.tiempo} minutos</h2>
        <button onClick={handleDownload}>Descargar Receta</button>
      </IonContent>
    </IonPage>
  );
};

export default Recipe;