import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import SignUp from "./pages/SignUp"

function App(){
  return <div className="pt-16">
          <Header/>
    <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/" element={<SignUp/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </div>
}

export default App