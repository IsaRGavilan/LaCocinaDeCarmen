import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { downloadOutline, heart } from 'ionicons/icons';
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


  const handleFavoriteClick = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    localStorage.setItem(`favorite_${recipe.id}`, JSON.stringify(newIsFavorite));
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
        <IonButton className={`botonFavoritos ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
          <IonIcon icon={heart} className='icono-tarjeta'/>
        </IonButton>
        <IonButton className='botonDescarga'>
          <IonIcon icon={downloadOutline} className='icono-tarjeta'/>
        </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
    </div>
  );
};

export default RecipeCard;