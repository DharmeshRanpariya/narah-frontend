import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import FAQs from './pages/FAQs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminCategories from './pages/AdminCategories'
import AdminSliders from './pages/AdminSliders'
import AdminTheme from './pages/AdminTheme'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import { useTheme } from './store/theme'
import { useAuth } from './store/auth'
import './styles/index.css'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const { initialize: initializeAuth } = useAuth()
  const { initialize: initializeTheme } = useTheme()

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId')
    if (!sessionId) {
      localStorage.setItem('sessionId', crypto.randomUUID())
    }
    initializeTheme()
    initializeAuth()
  }, [initializeTheme, initializeAuth])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isAdminRoute && <Header />}
      <main className={`flex-grow ${!isAdminRoute ? 'pt-32' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <AdminProducts />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedAdminRoute>
                <AdminCategories />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/sliders"
            element={
              <ProtectedAdminRoute>
                <AdminSliders />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/theme"
            element={
              <ProtectedAdminRoute>
                <AdminTheme />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
