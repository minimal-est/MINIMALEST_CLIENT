import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "./components/styles/GlobalStyles.ts";
import {HelmetProvider} from "react-helmet-async";
import {StyleProvider} from "./contexts/StyleContext.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <HelmetProvider>
            <GlobalStyles />
                <StyleProvider>
                    <App />
                </StyleProvider>
        </HelmetProvider>
    </>
)
