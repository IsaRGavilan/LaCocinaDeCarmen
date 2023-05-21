import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { heart } from 'ionicons/icons';
import'./RecipeCard.css';


// Definir el tipo para la prop 'recipe'
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
    };
  }

// Componente para mostrar una tarjeta de receta
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Verificar el estado de favorito en el almacenamiento local
    const isRecipeFavorite = localStorage.getItem(`favorite_${recipe.id}`);
    setIsFavorite(Boolean(isRecipeFavorite));
  }, [recipe.id]);


const handleFavoriteClick = () => {
  const newIsFavorite = !isFavorite;
  setIsFavorite(newIsFavorite);
  localStorage.setItem(`favorite_${recipe.id}`, JSON.stringify(newIsFavorite));
};

  return (
    <IonCard>
      <Link to={`/receta/${recipe.id}`} className='link'>
        <img alt="Imagen de receta" src={recipe.imagen} />
      </Link>
      <IonCardHeader>
        <IonCardTitle>{recipe.nombre}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {recipe.categoria}
        <IonButton className={`botonFavoritos ${isFavorite ? '' : 'active'}`} onClick={handleFavoriteClick}>
          <IonIcon icon={heart} />
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default RecipeCard;