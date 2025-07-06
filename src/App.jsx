import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <>
        <AppRoutes />
        <Footer />
      </>
    </AuthProvider>
  );
}

export default App;