// Importaciones necesarias de las diferentes librerías
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react'; // Importa componentes de Ionic
import { downloadOutline, heart, heartOutline } from 'ionicons/icons'; // Importa iconos utilizados
import firebaseConfig from '../../firebaseConfig'; // Importa la configuración de Firebase
import { getAuth } from 'firebase/auth'; // Importa la función para obtener la autenticación de Firebase
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Importa funciones para trabajar con Firestore
import jsPDF from 'jspdf'; // Importa la librería jsPDF para generar documentos PDF
import './RecipeCard.css'; // Importa archivo de estilos

/*Definición de la interfaz RecipeCardProps para especificar
las propiedades esperadas de la tarjeta*/
interface RecipeCardProps {
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
  handleFavoriteChange: (recipeId: number, isFavorite: boolean) => void; // Función para manejar el cambio de favorito de la receta entre componentes
  isFavorite: boolean; // Indica si la receta es favorita o no
}

//Componente para mostrar una tarjeta de receta con las propiedades de RecipeCardProps
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, handleFavoriteChange }) => {

  const [isFavorite, setIsFavorite] = useState(false); //Para indicar si la receta es favorita o no, por defecto no
  const auth = getAuth(firebaseConfig.app); //Obtiene autenticación firebase para asociar cada receta favorita a su usuario
  const user = auth.currentUser; //Para obtener el usuario autenticado

  //Efecto que se ejecuta al cargar el componente y cuando cambian el usuario o el ID de la receta
  useEffect(() => {
    if (user) {
      //Función para obtener las recetas favoritas del usuario autenticado
      const fetchFavoriteRecipes = async () => {
        try {
          const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            //Verifica si el ID de la receta está incluido en las recetas favoritas del usuario
            if (userData && Array.isArray(userData.favoriteRecipes)) {
              setIsFavorite(userData.favoriteRecipes.includes(recipe.id));
            }
          }
        } catch (error) {
          console.error('Error fetching favorite recipes:', error);
        }
      };
      //Llama a la función para obtener las recetas favoritas
      fetchFavoriteRecipes();
    }
  }, [user, recipe.id]);

  //Función para manejar el evento de hacer clic en "Favorito"
  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite); //Cambia el estado de "isFavorite"
    if (user) {
      try {
        const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          if (userData && Array.isArray(userData.favoriteRecipes)) {
            //Actualiza la lista de recetas favoritas del usuario
            const updatedFavoriteRecipes = isFavorite
              ? userData.favoriteRecipes.filter((recipeId) => recipeId !== recipe.id) //Si es favorita se elimina de la lista
              : [...userData.favoriteRecipes, recipe.id]; //Si no es favorita se agrega a la lista

            await updateDoc(userRef, { favoriteRecipes: updatedFavoriteRecipes }); //Actualiza el documento del usuario en Firestore
          }
        }
      } catch (error) {
        console.error('Error updating favorite recipes:', error);
      }
    }
    //Llama a la función handleFavoriteChange para cambiar de estado de favorito en otros componentes
    handleFavoriteChange(recipe.id, !isFavorite);
  };

  //Función para manejar la descarga del PDF de la receta
  const handleDownload = () => {
    const doc = new jsPDF(); //Crear instancia de jsPDF
    const img = new Image(); //Crear instancia de Image
    img.src = recipe.imagen; //Crear una imagen tomándola de la URL de la receta
  
    //Obtener ancho y alto de la página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    //Función para añadir color de fondo
    const addPageWithBackground = () => {
      doc.addPage();
      doc.setFillColor("#F2ECEB");
      doc.rect(0, 0, pageWidth, pageHeight, "F");
    };
  
    //Mostrar título, imagen y otros detalles en la primera página
    doc.setFillColor("#F2ECEB"); //Establecer color de fondo
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const title = recipe.nombre;
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
    doc.text(title, titleX, 20);
    doc.addImage(img, "JPEG", pageWidth / 2 - 40, 40, 80, 80);
  
    //Mostrar título de ingredientes
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("INGREDIENTES:", 10, 150);
  
    //Mostrar los ingredientes uno bajo otro con guiones
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let ingredientsY = 160;
    let ingredientsRemainingHeight = pageHeight - ingredientsY - 20; //Espacio restante en la página para los ingredientes
    let ingredientsIndex = 0;
    while (ingredientsIndex < recipe.ingredientes.length && ingredientsRemainingHeight > 10) {
      const ingrediente = recipe.ingredientes[ingredientsIndex];
      const lines = doc.splitTextToSize(`- ${ingrediente}`, pageWidth - 20);
      const lineHeight = doc.getTextDimensions(lines[0]).h;
      const linesHeight = lines.length * lineHeight;
      if (linesHeight <= ingredientsRemainingHeight) {
        doc.text(lines, 10, ingredientsY);
        ingredientsY += linesHeight;
        ingredientsRemainingHeight -= linesHeight;
        ingredientsIndex++;
      } else {
        break;
      }
    }
  
    //Si quedan más ingredientes por mostrar, agregar una nueva página y continuar
    if (ingredientsIndex < recipe.ingredientes.length) {
      addPageWithBackground();
      ingredientsY = 20;
      while (ingredientsIndex < recipe.ingredientes.length) {
        const ingrediente = recipe.ingredientes[ingredientsIndex];
        const lines = doc.splitTextToSize(`- ${ingrediente}`, pageWidth - 20);
        const lineHeight = doc.getTextDimensions(lines[0]).h;
        const linesHeight = lines.length * lineHeight;
        if (linesHeight <= pageHeight - 20) {
          doc.text(lines, 10, ingredientsY);
          ingredientsY += linesHeight;
          ingredientsIndex++;
        } else {
          break;
        }
      }
    }
  
    //Mostrar título de preparación
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("PREPARACIÓN:", 10, ingredientsY + 10);
  
    //Mostrar los pasos de preparación enumerados
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let preparationY = ingredientsY + 20;
    let stepIndex = 1;
    const lineHeight = 8;
    recipe.preparacion.forEach((paso) => {
      const textLines = doc.splitTextToSize(`${stepIndex}. ${paso}`, pageWidth - 20);
      const pageHeightLeft = pageHeight - preparationY;
      const textHeight = textLines.length * lineHeight;
      if (textHeight > pageHeightLeft) {
        addPageWithBackground();
        preparationY = 20;
      }
      doc.text(textLines, 10, preparationY);
      preparationY += textHeight;
      stepIndex++;
    });
  
    //Mostrar tiempo, dificultad, comensales
    const infoX = 10;
    const infoY = preparationY + 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`- Dificultad: ${recipe.dificultad}`, infoX, infoY);
    doc.text(`- Tiempo de preparación: ${recipe.tiempo} minutos`, infoX, infoY + 14); //Ajusta el espacio vertical según el tamaño de fuente
    doc.text(`- Comensales: ${recipe.comensales}`, infoX, infoY + 28); //Ajusta el espacio vertical según el tamaño de fuente
  
    //Descargar el archivo PDF
    doc.save(`${recipe.nombre}.pdf`);
  };  
  
  return (
    <div className='contenedor-tarjeta'>
      {/*Contenedor principal de la tarjeta*/}
    <IonCard className='tarjeta'>
      {/*Enlace a la página de detalles de la receta*/}
      <Link to={`/receta/${recipe.id}`} className='link'>
        <img alt="Imagen de receta" src={recipe.imagen} className='imagen-tarjeta'/>{/*Imagen de la receta*/}
      </Link>
      {/*Encabezado de la tarjeta*/}
      <IonCardHeader className='header-tarjeta'>
        {/*Título receta*/}
        <IonCardTitle className='titulo-tarjeta'>{recipe.nombre}</IonCardTitle>
      </IonCardHeader>
      {/*Contenido receta*/}
      <IonCardContent className='content-tarjeta'>
        {recipe.categoria} {/*Categoría receta*/}
        <div className="contenedor-botones">
          <IonButton className='botonFavoritos' onClick={handleFavoriteClick}>{/*Botón favoritos con icono corazón*/}
            <IonIcon icon={isFavorite ? heart : heartOutline} className={isFavorite ? 'icono-tarjeta-activo' : 'icono-tarjeta'} />
          </IonButton>
          <IonButton className='botonDescarga' onClick={handleDownload}>{/*Botón descarga con icono descarga*/}
            <IonIcon
              icon={downloadOutline}
              id='icon'
            />
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
    </div>
  );
};

export default RecipeCard;