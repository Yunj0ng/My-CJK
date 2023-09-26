import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  SearchPage,
  ShowPage,
  CreatePage,
  NotFound,
} from "@pages/index.js";
import styles from "./App.scss";
import { AuthProvider } from "@context/AuthContext";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/:id" element={<ShowPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
