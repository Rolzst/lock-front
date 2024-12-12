import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'
import {AuthProvider} from './context/AuthContext'
import ServiceFormPage from './pages/ServiceFormPage.jsx';
import ProtectedRoute from './ProtectedRoute';
import Layout from "./layouts/navbar/Layout.jsx";
import {ServicioProvider} from "./context/ServicioContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";

function App() {
    return (
        <AuthProvider>
            <ServicioProvider>
                <BrowserRouter
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true
                    }}>
                    <Routes>
                        <Route path='/' element={<Layout> <HomePage/> </Layout>}/>
                        <Route path='/login' element={<Layout> <LoginPage/> </Layout>}/>
                        <Route path='/register' element={<Layout> <RegisterPage/> </Layout>}/>

                        {/*Selecion de rutas  protegidas */}
                        <Route element={<ProtectedRoute/>}>
                            <Route path='/new-service' element={<Layout> <ServiceFormPage/> </Layout>}/>
                            <Route path='/see-services' element={<Layout> <ServicesPage/> </Layout>}/>
                            <Route path='/logout' element={<Layout> <LoginPage/> </Layout>}/>/
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ServicioProvider>
        </AuthProvider>
    )
}

export default App
  