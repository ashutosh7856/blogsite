import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import BlogPage from "./pages/Blog"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"

function App(){
  return <div className="pt-16">
          <Header/>
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/login" element={<SignUp/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/blog" element={<BlogPage/>}/>
        <Route path="/post" element={<CreatePost/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </div>
}

export default App