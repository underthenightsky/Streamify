import {Route,Routes,Navigate} from "react-router";
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import OnboardingPage from "./pages/OnboardingPage.jsx"
import NotificationsPage from "./pages/NotificationsPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import {Toaster} from "react-hot-toast"
import useAuthUser from "./hooks/useAuthUser.js";
import PageLoader from "./components/PageLoader.jsx";
import useThemeStore from "./store/useThemeStore.js";
const App=()=>{

  const {isLoading , authUser}=useAuthUser();
  const isAuthenticated =Boolean(authUser);
  const isOnboarded=authUser?.isOnboarded;
  const{theme}=useThemeStore();
  if (isLoading) return <PageLoader/>;
      return( 
      <div className="" data-theme={theme}>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={
          !isAuthenticated?<LoginPage/>:<Navigate to ={
            isOnboarded? "/" :"/onboarding"
          }/>
          } />
        {/* if the user is signed up then move them to the onboarding page  */}
         <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route path="/onboarding" element={!isOnboarded?<OnboardingPage/>:<Navigate to= "/"/> } />
        <Route path="/notifications" element={<NotificationsPage/>} />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (
             <CallPage />             
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )}/>
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
             <ChatPage />             
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )} />
        </Routes>
        <Toaster />
      </div> 
  )   
}
export default App;

