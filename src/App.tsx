import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ArchiveMain from "./pages/ArchiveMain.tsx";
import ArchivePostCreate from "./pages/ArchivePostCreate.tsx";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login.tsx";
import ArchivePost from "./pages/ArchivePost.tsx";
import Join from "./pages/Join.tsx";
import NotFound from "./pages/NotFound.tsx";
import ArchiveCreate from "./pages/ArchiveCreate.tsx";
import Main from "./pages/Main.tsx";
import Callback from "./pages/Callback.tsx";
import ArchiveNetwork from "./pages/ArchiveNetwork.tsx";

const queryClient = new QueryClient({});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<ArchiveCreate />} />
                    <Route path="/archive-network" element={<ArchiveNetwork />} />
                    <Route path="/callback/oauth" element={<Callback />} />
                    <Route path="/archive/:author" element={<ArchiveMain />} />
                    <Route path="/archive/:author/create" element={<ArchivePostCreate modifyMode={false} />} />
                    <Route path="/archive/:author/:sequence/modify" element={<ArchivePostCreate modifyMode={true} />} />
                    <Route path="/archive/:author/:sequence" element={<ArchivePost />} />
                    <Route path="/error/404" element={<NotFound />} />
                    <Route element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position='top-right'
                theme='light'
                closeOnClick
                hideProgressBar
            />
        </QueryClientProvider>
    );
}

export default App;