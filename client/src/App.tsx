import React from "react"
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Header from "./components/layout/Header"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import BlogPage from "./pages/Blog"
import CreatePost from "./pages/CreatePost"
import Profile from "./pages/Profile"

function AuthChecker() {
  const location = useLocation()
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = localStorage.getItem("token")
    const protectedPaths = ["/post", "/profile"]

    if (protectedPaths.includes(location.pathname) && !token) {
      navigate("/login")
    }
  }, [location.pathname, navigate])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <div className="pt-16">
        <Header />
        <AuthChecker />
        <Routes>
          <Route path="/login" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/post" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App