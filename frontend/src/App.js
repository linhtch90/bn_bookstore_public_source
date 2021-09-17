import "primereact/resources/themes/fluent-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import PrimeReact from "primereact/api";

import AppContainer from "./components/AppContainer";

PrimeReact.ripple = true;
PrimeReact.autoZIndex = true;

function App() {
  return (
    <div>
      <AppContainer />
    </div>
  );
}

export default App;
