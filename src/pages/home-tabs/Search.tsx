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
  IonSearchbar
} from '@ionic/react';

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar placeholder="Search for a dish..." />
        <IonList>
          <IonItem>
            <IonLabel>Adobo</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Sinigang</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Lechon</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Kare-Kare</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Pancit</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Tinola</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Bulalo</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Dinuguan</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Search;
