import NavBar from "./components/NavBar";
import { CssVarsProvider } from '@mui/joy/styles';

function App() {
  return (
    <CssVarsProvider>
      <NavBar />
    </CssVarsProvider>
  );
}

export default App;
