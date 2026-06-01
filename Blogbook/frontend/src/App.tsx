import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { useLogged } from './hooks/uselogged'
import { Auth } from './context/context'
import { Pagenotfound } from './pages/Pagenotfound'
function App() {
    const {loggedin,setLoggedin}=  useLogged();
    return (
        <Auth.Provider value={{loggedin:loggedin,setloggedin:setLoggedin}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/signin' element={<Signin/>}/>
                    <Route path='/blog/:id' element={<Blog/>}/>
                    <Route path='/blogs' element={<Blogs/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/publish' element={<Publish/>}/>
                    <Route path='/' element={<Home/>}/>
                    <Route path='*' element={<Pagenotfound/>}/>
                </Routes>
            </BrowserRouter>
        </Auth.Provider>
    )
}

export default App
