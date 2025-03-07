import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonAccordion,
  IonAccordionGroup
} from '@ionic/react';
import { star } from 'ionicons/icons';

const dishes = [
  { name: 'Adobo', description: 'A savory Filipino dish made with chicken or pork, marinated in vinegar, soy sauce, and garlic. Rich in protein and antioxidants.' },
  { name: 'Sinigang', description: 'A sour tamarind soup with pork or shrimp. Great for boosting the immune system with its vitamin C content.' },
  { name: 'Lechon', description: 'A roasted pig dish with crispy skin. High in protein but should be consumed in moderation due to its fat content.' },
  { name: 'Kare-Kare', description: 'A peanut-based stew with oxtail and vegetables. Good source of healthy fats and fiber.' },
  { name: 'Pancit', description: 'A noodle dish mixed with vegetables and meat, rich in carbohydrates for energy.' }
];

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonAccordionGroup>
            {dishes.map((dish, index) => (
              <IonAccordion key={index} value={dish.name}>
                <IonItem slot="header">
                  <IonIcon icon={star} color="warning" slot="start" />
                  <IonLabel>{dish.name}</IonLabel>
                </IonItem>
                <div slot="content" style={{ padding: '10px' }}>
                  {dish.description}
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Feed;