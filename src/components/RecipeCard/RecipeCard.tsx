import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { downloadOutline, heart, heartOutline } from 'ionicons/icons';
import'./RecipeCard.css';
import firebaseConfig from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import jsPDF from 'jspdf';

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
  handleFavoriteChange: (recipeId: number, isFavorite: boolean) => void;
  isFavorite: boolean;
}

// Componente para mostrar una tarjeta de receta
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, handleFavoriteChange }) => {

  const [isFavorite, setIsFavorite] = useState(false);
  const auth = getAuth(firebaseConfig.app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchFavoriteRecipes = async () => {
        try {
          const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();

            if (userData && Array.isArray(userData.favoriteRecipes)) {
              setIsFavorite(userData.favoriteRecipes.includes(recipe.id));
            }
          }
        } catch (error) {
          console.error('Error fetching favorite recipes:', error);
        }
      };

      fetchFavoriteRecipes();
    }
  }, [user, recipe.id]);

  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite);

    if (user) {
      try {
        const userRef = doc(firebaseConfig.firestore, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();

          if (userData && Array.isArray(userData.favoriteRecipes)) {
            const updatedFavoriteRecipes = isFavorite
              ? userData.favoriteRecipes.filter((recipeId) => recipeId !== recipe.id)
              : [...userData.favoriteRecipes, recipe.id];

            await updateDoc(userRef, { favoriteRecipes: updatedFavoriteRecipes });
          }
        }
      } catch (error) {
        console.error('Error updating favorite recipes:', error);
      }
    }
    handleFavoriteChange(recipe.id, !isFavorite);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
  
    const img = new Image();
    img.src = recipe.imagen;
  
    // Añadir color de fondo en cada página
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    // Función para añadir color de fondo en una página
    const addPageWithBackground = () => {
      doc.addPage();
      doc.setFillColor("#F2ECEB");
      doc.rect(0, 0, pageWidth, pageHeight, "F");
    };
  
    // Mostrar título, imagen y otros detalles en la primera página
    doc.setFillColor("#F2ECEB"); // Establecer color de fondo
    doc.rect(0, 0, pageWidth, pageHeight, "F"); // Dibujar rectángulo de fondo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    const title = recipe.nombre;
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2; // Ajuste aquí
    doc.text(title, titleX, 20);
    doc.addImage(img, "JPEG", pageWidth / 2 - 40, 40, 80, 80);
  
    // Mostrar título de ingredientes
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("INGREDIENTES:", 10, 150);
  
    // Mostrar los ingredientes uno bajo otro con guiones
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let ingredientsY = 160;
    let ingredientsRemainingHeight = pageHeight - ingredientsY - 20; // Espacio restante en la página para los ingredientes
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
  
    // Si quedan más ingredientes por mostrar, agregar una nueva página y continuar
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
  
    // Mostrar título de preparación
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("PREPARACIÓN:", 10, ingredientsY + 10);
  
    // Mostrar los pasos de preparación enumerados
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let preparationY = ingredientsY + 20;
    let stepIndex = 1;
    const lineHeight = 8; // Ajusta este valor según tus necesidades
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
  
    // Mostrar tiempo, dificultad, comensales
    const infoX = 10;
    const infoY = preparationY + 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14); // Ajusta el tamaño de fuente según tus necesidades
    doc.text(`- Dificultad: ${recipe.dificultad}`, infoX, infoY);
    doc.text(`- Tiempo de preparación: ${recipe.tiempo} minutos`, infoX, infoY + 14); // Ajusta el espacio vertical según el tamaño de fuente
    doc.text(`- Comensales: ${recipe.comensales}`, infoX, infoY + 28); // Ajusta el espacio vertical según el tamaño de fuente
  
    // Descargar el archivo PDF
    doc.save(`${recipe.nombre}.pdf`);
  };  
  
  return (
    <div className='contenedor-tarjeta'>
    <IonCard className='tarjeta'>
      <Link to={`/receta/${recipe.id}`} className='link'>
        <img alt="Imagen de receta" src={recipe.imagen} className='imagen-tarjeta'/>
      </Link>
      <IonCardHeader className='header-tarjeta'>
        <IonCardTitle className='titulo-tarjeta'>{recipe.nombre}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className='content-tarjeta'>
        {recipe.categoria}
        <div className="contenedor-botones">
          <IonButton className='botonFavoritos' onClick={handleFavoriteClick}>
            <IonIcon icon={isFavorite ? heart : heartOutline} className={isFavorite ? 'icono-tarjeta-activo' : 'icono-tarjeta'} />
          </IonButton>
          <IonButton className='botonDescarga' onClick={handleDownload}>
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