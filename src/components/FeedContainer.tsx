import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonPopover,
  IonIcon,
  IonLabel,
  IonText,
  IonAvatar,
  IonCol,
  IonRow,
  IonInput,
  IonAlert,
  IonModal,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonTitle,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, saveOutline, closeCircleOutline } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };

    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (!error) setPosts(data as Post[]);
    };

    fetchUser();
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent || !user || !username) return;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user avatar:', userError);
      return;
    }

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data, error } = await supabase
      .from('posts')
      .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
    }

    setPostContent('');
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <IonContent className="ion-padding bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto mt-6">
        {user ? (
          <>
            <div className="bg-gray-900 rounded-2xl p-4 shadow-md">
              <h2 className="text-xl font-bold mb-3">Create Post</h2>
              <IonInput
                className="bg-gray-800 p-3 rounded-lg text-white"
                value={postContent}
                onIonChange={e => setPostContent(e.detail.value!)}
                placeholder="What's on your mind?"
              />
              <div className="flex justify-end mt-4">
                <IonButton onClick={createPost} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                  Post
                </IonButton>
              </div>
            </div>

            {posts.map(post => (
              <div key={post.post_id} className="bg-gray-900 rounded-2xl p-4 mt-6 shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <IonAvatar>
                      <img src={post.avatar_url} alt="avatar" />
                    </IonAvatar>
                    <div>
                      <h3 className="text-lg font-semibold">{post.username}</h3>
                      <p className="text-sm text-gray-400">{new Date(post.post_created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <IonButton
                    fill="clear"
                    onClick={(e) =>
                      setPopoverState({
                        open: true,
                        event: e.nativeEvent,
                        postId: post.post_id,
                      })
                    }
                  >
                    <IonIcon icon={pencil} className="text-white" />
                  </IonButton>
                </div>

                <div className="mt-4 text-white text-lg">
                  <IonText>
                    <p>{post.post_content}</p>
                  </IonText>
                </div>

                <IonPopover
                  isOpen={popoverState.open && popoverState.postId === post.post_id}
                  event={popoverState.event}
                  onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                >
                  <div className="p-4 space-y-2">
                    <IonButton
                      fill="clear"
                      onClick={() => {
                        startEditingPost(post);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      <IonIcon icon={pencil} /> Edit
                    </IonButton>
                    <IonButton
                      fill="clear"
                      color="danger"
                      onClick={() => {
                        deletePost(post.post_id);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      <IonIcon icon={trash} /> Delete
                    </IonButton>
                  </div>
                </IonPopover>
              </div>
            ))}
          </>
        ) : (
          <IonLabel>Loading...</IonLabel>
        )}
      </div>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput
            className="bg-gray-200 rounded-md p-2"
            value={postContent}
            onIonChange={e => setPostContent(e.detail.value!)}
            placeholder="Edit your post..."
          />
        </IonContent>
        <IonFooter className="flex justify-between px-4 py-2">
          <IonButton onClick={savePost}>
            <IonIcon icon={saveOutline} className="mr-1" /> Save
          </IonButton>
          <IonButton color="medium" onClick={() => setIsModalOpen(false)}>
            <IonIcon icon={closeCircleOutline} className="mr-1" /> Cancel
          </IonButton>
        </IonFooter>
      </IonModal>

      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Success"
        message="Post updated successfully!"
        buttons={['OK']}
      />
    </IonContent>
  );
};

export default FeedContainer;
