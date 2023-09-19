import { BrowserRouter,Routes,Route } from "react-router-dom";
import {
  LoginPage,
  SignUpPage,
  SearchPage,
  ShowPage,
  CreatePage,
  NotFound,
} from "@pages/index.js";
import styles from './App.scss';

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/:id" element={<ShowPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
