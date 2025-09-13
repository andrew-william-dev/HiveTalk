import { BrowserRouter as Router } from "react-router-dom";
import { PageRoutes } from "./routes/routes";

function App() {
  return (
    <Router>
      <PageRoutes/>
    </Router>
  );
}

export default App;
