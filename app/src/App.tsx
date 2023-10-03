import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeRoute from "./routes/HomeRoute";
import Navigation from "./components/Navigation";
import ManageRoute from "./routes/ManageRoute";

export type File = {
    id: string;
    password: string;
    name?: string;
    url: string;
};

const App = () => {
    return (
        <>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Navigation />}>
                        <Route index element={<HomeRoute />} />
                        <Route path="manage" element={<ManageRoute />} />
                    </Route>
                </Routes>
            </div>
            <footer>
                <p>
                    ระบบแชร์ลิ้งค์เพื่อนำเสนองานหน้าชั้นเรียน จัดทำโดย
                    นศ.เจซีท่านนึง ชื่อเล่นขึ้นต้น พ.พาน
                </p>
                <p> &copy; 2023 | h4.web.app</p>
            </footer>
        </>
    );
};

export default App;
