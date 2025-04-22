import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, AppBar, Toolbar, Paper, BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import { Home, AccountCircle, Description } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Menu from './components/Menu'
import Logo from './components/Logo'
import HomePage from './pages/HomePage'
import MyPoliciesPage from './pages/MyPoliciesPage'
import MyProfilePage from './pages/MyProfilePage'
import AllServicesPage from './pages/AllServicesPage'
import UpdatePolicyPage from './pages/UpdatePolicyPage'
import UpdateNamePage from './pages/UpdateNamePage'
import UpdateEmailPage from './pages/UpdateEmailPage'
import UpdateMobilePage from './pages/UpdateMobilePage'
import UpdateAddressPage from './pages/UpdateAddressPage'
import UpdateNomineePage from './pages/UpdateNomineePage'
import UpdateBankPage from './pages/UpdateBankPage'
import UpdatePremiumFrequencyPage from './pages/UpdatePremiumFrequencyPage'
import DocumentDownloadPage from './pages/DocumentDownloadPage'
import InitiateClaimPage from './pages/InitiateClaimPage'
import customersData from './data/customers.json'
import LoginPage from './pages/LoginPage'
import PremiumPaymentPage from './pages/PremiumPaymentPage'
import ApplyPolicyLoanPage from './pages/ApplyPolicyLoanPage'
import BankDetailsConfirmationPage from './pages/BankDetailsConfirmationPage'
import SuccessPage from './pages/SuccessPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

function MainLayout() {
  const [navValue, setNavValue] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const path = location.pathname
    if (path === '/') setNavValue(0)
    else if (path === '/policies') setNavValue(1)
    else if (path === '/profile') setNavValue(2)
  }, [location])

  const handleNavigation = (newValue) => {
    setNavValue(newValue)
    if (newValue === 0) navigate('/')
    else if (newValue === 1) navigate('/policies')
    else if (newValue === 2) navigate('/profile')
  }

  const handleLogin = (mobile, dob) => {
    const found = customersData.find(
      c => c.mobile === mobile && c.dob === dob
    )
    if (found) {
      setUser(found)
    } else {
      alert('No customer found with provided details')
    }
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/'); 
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  const hideNavigation = location.pathname === '/all-services' || 
                        location.pathname.startsWith('/update-policy')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ display: hideNavigation ? 'none' : 'block' }}>
        <Toolbar>
          <Menu onLogout={handleLogout} />
          <Logo />
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage customer={user} />} />
          <Route path="/policies" element={<MyPoliciesPage customer={user} />} />
          <Route path="/profile" element={<MyProfilePage customer={user} />} />
          <Route path="/all-services" element={<AllServicesPage customer={user} />} />
          <Route path="/update-policy" element={<UpdatePolicyPage customer={user} />} />
          <Route path="/update-policy/name" element={<UpdateNamePage customer={user} />} />
          <Route path="/update-policy/email" element={<UpdateEmailPage customer={user} />} />
          <Route path="/update-policy/mobile" element={<UpdateMobilePage customer={user} />} />
          <Route path="/update-policy/address" element={<UpdateAddressPage customer={user} />} />
          <Route path="/update-policy/nominee" element={<UpdateNomineePage customer={user} />} />
          <Route path="/update-policy/bank" element={<UpdateBankPage customer={user} />} />
          <Route path="/update-policy/premium-frequency" element={<UpdatePremiumFrequencyPage customer={user} />} />
          <Route path="/download-policy" element={<DocumentDownloadPage title="Policy Document" customer={user} />} />
          <Route path="/documents" element={<DocumentDownloadPage title="Policy Document" customer={user} />} />
          <Route path="/claim" element={<InitiateClaimPage customer={user} />} />
          <Route path="/payment" element={<PremiumPaymentPage customer={user} />} />
          <Route path="/apply-policy-loan" element={<ApplyPolicyLoanPage customer={user} />} />
          <Route path="/bank-details" element={<BankDetailsConfirmationPage customer={user} />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Box>

      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          display: hideNavigation ? 'none' : 'block'
        }} 
        elevation={3}
      >
        <BottomNavigation value={navValue} onChange={(e, val) => handleNavigation(val)} showLabels>
          <BottomNavigationAction label="Home" icon={<Home />} showLabel />
          <BottomNavigationAction label="My Policies" icon={<Description />} showLabel />
          <BottomNavigationAction label="Profile" icon={<AccountCircle />} showLabel />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
