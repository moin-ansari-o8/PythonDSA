import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { NavigationRail } from "./components/NavigationRail";
import { Breadcrumb } from "./components/Breadcrumb";
import { NotesPage } from "./pages/NotesPage";
import { ProgressPage } from "./pages/ProgressPage";
import "./App.css";

function NotesRoute() {
  const params = useParams();
  const notePath = params["*"] || "overview";
  return <NotesPage notePath={`notes/${notePath}`} />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavigationRail />
        <main className="content">
          <Breadcrumb />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/notes/overview" replace />}
            />
            <Route path="/notes/*" element={<NotesRoute />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route
              path="/problems"
              element={<NotesPage notePath="problems/README" />}
            />
            <Route
              path="/solutions"
              element={<NotesPage notePath="solutions/README" />}
            />
            <Route
              path="/templates"
              element={
                <NotesPage notePath="templates/common-implementations" />
              }
            />
            <Route
              path="/cheatsheets"
              element={<NotesPage notePath="cheatsheets/patterns" />}
            />
            <Route
              path="*"
              element={<Navigate to="/notes/overview" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
