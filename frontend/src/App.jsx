import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import History from "./pages/History";
import InterviewPrep from "./pages/InterviewPrep";
import CoverLetter from "./pages/CoverLetter";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <div className="flex">

        <Sidebar />

        <div className="ml-64 w-full">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/analyzer"
              element={<Analyzer />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/interview"
              element={<InterviewPrep />}
            />

            <Route
              path="/cover-letter"
              element={<CoverLetter />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;