import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {ConfigProvider} from "antd";
import {SingleGame} from "./pages/SingleGame.tsx";


function App() {
    return (
        <>
            <ConfigProvider
            theme={{
                // algorithm: theme.darkAlgorithm,
                "token": {
                    "colorPrimary": "#363636",
                    "colorInfo": "#363636"
                }
            }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/game/:gameId" element={<SingleGame/>}/>
                    </Routes>
                </BrowserRouter>
            </ConfigProvider>

        </>
    )
}

export default App
