import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ArchiveMain from "./pages/ArchiveMain.tsx";
import ArchivePostCreate from "./pages/ArchivePostCreate.tsx";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Login.tsx";
import ArchivePost from "./pages/ArchivePost.tsx";
import Test from "./components/Test.tsx";

const queryClient = new QueryClient({});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<Test />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/:author" element={<ArchiveMain />} />
                    <Route path="/:author/create" element={<ArchivePostCreate />} />
                    <Route path="/:author/:sequence" element={<ArchivePost />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position='top-center'
                theme='light'
                closeOnClick
                hideProgressBar
            />
        </QueryClientProvider>
    );
}

export default App;