import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "./components/styles/GlobalStyles.ts";
import BackgroundContainer from "./components/styles/BackgroundContainer.tsx";
import {HelmetProvider} from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
    <>
        <HelmetProvider>
            <GlobalStyles />
            <BackgroundContainer>
                <App />
            </BackgroundContainer>
        </HelmetProvider>
    </>
)
