import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();

  const handleSubmit = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {})
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button className="sign-in" onClick={() => handleSubmit()}>
        Sign in with google
      </button>
    </div>
  );
};

export default SignIn;
