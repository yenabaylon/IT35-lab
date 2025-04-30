import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({
  message,
  isOpen,
  onClose,
}) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
          <IonPage>
        <IonContent className="ion-padding bg-black">
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-black">
            <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-xl border-x-8 border-blue-700">
              <div className="flex justify-center mb-6">
                <img
                  src="https://cdn-icons-gif.flaticon.com/14673/14673980.gif"
                  alt="Logo"
                  className="w-32 h-32"
                />
              </div>

              <h1 className="text-3xl font-bold text-center text-white mb-6">User Login</h1>

              <IonInput
                className="mb-4 text-white"
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />

              <IonInput
                className="mb-6 text-white"
                fill="outline"
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                expand="block"
                shape="round"
                fill="outline"
                className="mb-4 border border-blue-700 text-white font-semibold"
                onClick={doLogin}
              >
                Login
              </IonButton>

              <IonButton
                routerLink="/it35-lab/register"
                expand="block"
                fill="clear"
                shape="round"
                className="text-blue-400 underline font-medium"
              >
                Don't have an account? Register here
              </IonButton>
            </div>
          </div>

          <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Login successful! Redirecting..."
            duration={1500}
            position="top"
            color="primary"
          />
        </IonContent>
      </IonPage>

  );
};

export default Login;
