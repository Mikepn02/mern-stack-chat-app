import { BrowserRouter , Navigate ,Routes , Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import Navbar from 'scenes/navbar';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { themeSettings } from './theme';
import { createTheme } from '@mui/material/styles';
import {CssBaseline,ThemeProvider} from '@mui/material';








function App() {

  const mode = useSelector((state) => state.mode);
  // that will help us to  grab the value we set in the state
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])

  console.log("mode",mode)


  return (
    <div className="App">
       <BrowserRouter>
       <ThemeProvider theme={theme} >
        <CssBaseline />
       <Routes>
          <Route path="/"  element={<LoginPage />}/>
          <Route path="/home"  element={<HomePage />}/>
          <Route path="/nav"  element={<Navbar />}/>
          <Route path="/profile/:userId"  element={<ProfilePage />}/>
        </Routes>
       </ThemeProvider>

       </BrowserRouter>
    </div>
  );
}

export default App;
