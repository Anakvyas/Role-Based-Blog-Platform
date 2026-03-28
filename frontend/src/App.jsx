import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/loginpage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectRoute from "./utils/ProtectRoute";


const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/signup" element={<SignupPage/>}></Route>
          <Route path="/" element={
                <ProtectRoute>
                  <DashboardPage/>
                </ProtectRoute>
              }
            ></Route> 
          <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
