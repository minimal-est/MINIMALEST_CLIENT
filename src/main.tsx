import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "./components/styles/GlobalStyles.ts";
import BackgroundContainer from "./components/styles/BackgroundContainer.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <GlobalStyles />
        <BackgroundContainer>
            <App />
        </BackgroundContainer>
    </>
)
