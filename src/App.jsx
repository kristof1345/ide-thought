import { BrowserRouter, Routes, Route } from "react-router-dom";
import { app, auth } from "./firebaseConfig";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import Editor from "./pages/Editor";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <SignIn />} />
        <Route path="/:id" element={<Editor user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
