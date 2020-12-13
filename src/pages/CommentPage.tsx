import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonBackButton,
  IonButton,
  IonInput,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonText,
  IonRow,
  IonCol,
  IonCardContent,
  IonTextarea
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import { firestore } from "../firebase";
import { commentlist, postlist, topostlist } from "../model";
import { useAuth, UserContext } from "../auth";
import { pencil, send, trash } from "ionicons/icons";
import "../theme/comment.css";

interface RouteParams {
  id: string;
  postid : string;
}



const CommentPage: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { id, postid } = match.params;
  const [entry, setEntry] = useState<postlist>();
  const [comments, setComments] = useState<commentlist[]>([]);
  const [comment, setComment] = useState("");
  const history = useHistory();
  const { userId } = useAuth();
  const {username} = useContext(UserContext);
  const [title, setTitle] = useState(entry?.title);
  const [description, setDescription] = useState(entry?.description);
  const [edit, setEdit] =  useState(false);
  const [isposter, setPoster] = useState(false);
  

 

  function handleComment() {
    firestore.collection('departments').doc(id).collection('posts').doc(postid).collection('comments')
      .add({
        comment,
        username
      })
  }

  function handleDeletePost(postId:string) {
    firestore.collection('departments').doc(id).collection('posts').doc(postid)
      .delete();
      history.goBack();
    }

  async function handleEditPost() {
    console.log("this is error")
    const EditRef =  firestore.collection('departments').doc(id).collection('posts').doc(postid);
    if (title !== undefined)
    await EditRef
      .update({
        title
      });
      if (description !== undefined)
    await EditRef
      .update({
        description
      });
        setEdit(false)
     } 

  function handleDelete(commentId:string) {
    firestore.collection('departments').doc(id).collection('posts').doc(postid).collection('comments').doc(commentId)
      .delete();
    }
    function checkCommenter(userComment, commentId){
      if(userComment === username)
      return (
      <div className="ion-text-end">
      <IonButton fill="clear" slot="end" color="danger" onClick={()=>handleDelete(commentId)}>
      <IonIcon icon={trash} />
      </IonButton>
      </div>)
    }
/*   useEffect(() => {
  const entryRef = firestore.collection("departments").doc(id).collection('posts').doc(postid).collection('comments');
    entryRef.onSnapshot(({docs}) => {setEntry(docs.map(topostlist));
    });
  }, [userId, id]); */

  useEffect(() => {
    const post = firestore.collection('departments').doc(id).collection('posts').doc(postid);
    post.onSnapshot((doc) => {
      setEntry(topostlist(doc));
    });
    post.collection('comments').onSnapshot(({docs}) => {setComments(docs.map(topostlist));
    });
  }, [postid, id]);
  
  useEffect(()=>{
    if (entry?.username === username){
      setPoster(true);
    }
  },[entry])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle> BeSolve</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard color="tertiary">
          <IonCardHeader className="topic">  
          {!edit && `Topic: ${entry?.title}` }
           {edit && <IonInput 
            type="text" 
            placeholder = {`Topic: ${entry?.title}`}
            value={title} 
            onIonChange={(e) => setTitle(e.detail.value)}
            />}
          </IonCardHeader>
          <IonCardHeader id="des" className="description">
          {!edit && `Description: ${entry?.description}` }
          {edit && <IonInput 
            type="text" 
            placeholder={`Description: ${entry?.description}`} 
            value={description} 
            onIonChange={(e) => setDescription(e.detail.value)}
            />}
          </IonCardHeader>
          <br/>
            <IonRow>
              <IonCol>
                {isposter && <div className="ion-text-start">
                <IonButton fill="clear" slot="end" color="danger" onClick={() => setEdit(!edit)}>
                <IonIcon icon={pencil} />
                </IonButton>
                </div>}
              </IonCol>
              <IonCol>
                {isposter && <div className="ion-text-end">
                {!edit && <IonButton fill="clear" slot="end" color="danger" onClick={()=>handleDeletePost(entry.id)}>
                <IonIcon icon={trash} />
                </IonButton>}

               {edit && <IonButton fill="clear" slot="end" color="light" onClick={handleEditPost} >
               Save
                </IonButton>}
                </div>}
              </IonCol>
            </IonRow>
        </IonCard>
      <div className="body">
      <IonText className="comm"><b>Comments</b></IonText>
      { comments.map((entry) =>    
          <div className="com" key={entry.id}>
          <IonCardContent>
            <h3><b>{entry.username}</b></h3>
            <h2>{entry.comment} </h2>
             {checkCommenter(entry.username,entry.id)}             
          </IonCardContent>              
          </div>   
         )}
        
         <IonToolbar>
          <IonRow>
              <IonTextarea value={comment} onIonChange={(e)=>{setComment(e.detail.value)}} placeholder="Add Comment"/>
              <div className="ion-text-end">
              <IonButtons slot="end" onClick={handleComment}>
                <IonIcon slot="icon-only" icon={send} />
              </IonButtons>
              </div>
          </IonRow>
        </IonToolbar>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CommentPage;
