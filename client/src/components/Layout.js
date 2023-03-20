import Nav from "./Nav"
import Footer from "./Footer"

const Layout = ({ children }) => {

  return (
    <div>
      <Nav />

      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout