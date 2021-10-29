import { GoogleAuthProvider,getAuth,signInWithPopup,onAuthStateChanged,signOut} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../../../Firebase/firebase.init";


initializeAuthentication()

const useFirebase = () =>{
     const [user,setUser] = useState({})
     const [error,setError] = useState('')
     const [isLoading,setIsLoading] = useState(true)
     const googleProvider = new GoogleAuthProvider();
     const auth = getAuth();

     const signInUsingGoogle = () =>{
          // setIsLoading(true)
          signInWithPopup(auth,googleProvider)
               .then(result =>{
                    const user = result.user
                    console.log(user)
                    setUser(user)
               })
               // .then(err =>{
               //      const errorMessage = err.message;
               //      setError(errorMessage)
               // })
               .finally(() =>setIsLoading(false))
          
     }

     useEffect(() => {
          onAuthStateChanged(auth, user => {
            if (user) {
              setUser(user);
            } else {
              setUser({});
            }
            setIsLoading(false);
          });
        }, []);

      
        // google sign out
        const userSignOut = () => {
          signOut(auth)
            .then(() => {
              setUser({});
            })
            .finally(() => setIsLoading(false));
        };


     return {
          user,
          error,
          signInUsingGoogle,
          userSignOut,
          isLoading,
          setIsLoading,
         
     }
}

export default useFirebase