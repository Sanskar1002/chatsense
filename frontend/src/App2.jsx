import FeatureSection from "./components/featureSection"
import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import Testimonials from "./components/Testimonials"
import Workflow from "./components/Workflow"
import Footer from "./components/Footer"
import "./App2.css"
function App2() {
  return (
    <div className="bg-[#121212] text-white">
      <Navbar/>
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection/>
        <FeatureSection/>
        <Workflow/>
        <Testimonials/>
        <Footer/>
      </div>
    </div>
  )
}

export default App2
