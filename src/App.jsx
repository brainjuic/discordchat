import React,{lazy,Suspense} from 'react';
import './App.scss'
import {auth} from './firebase/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Redirect, Route, Switch } from 'react-router';
import LayoutSidebar from './pages/Layout_Sidebar/Layout_Sidebar';
import Spinner from './components/Spinner/Spinner';
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorImageOverlay,ErrorImageContainer,ErrorImageText} from './pages/ErrorBoundaries/Errorboundaries.styles.jsx'
import ServerComponent from './pages/ServerComponent/ServerComponent.jsx'
import Homepage from './pages/Homepage/HomePage.jsx';
import { Button } from '@material-ui/core';
const Login=lazy(()=>import('./pages/Login/Login.jsx'));
const ServerPage=lazy(()=>import('./pages/ServerPage/ServerPage'));
const OnetoOneChat=lazy(()=>import('./pages/onetoonechat/OnetoOneChat'));
const ErrorFallback=({error,resetErrorBoundary})=>{
  return <>
    <ErrorImageOverlay>
      <ErrorImageContainer imageUrl='/discord.svg'/>
      <ErrorImageText>Page broked</ErrorImageText>
      <Button variant="outlined" style={{marginTop:"15px"}} onClick={resetErrorBoundary}>Try again</Button>
    </ErrorImageOverlay>
  </>
}

function App() {
const [user]=useAuthState(auth);
  return (
    <div className="App">
      <main>

        {!user && <Redirect to='/discord-clone'/>}
        <Switch>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Spinner/>}>
          <Route exact path='/discord-clone' render={()=>auth.currentUser?<Redirect to='/discord-clone/channels/@me'/>:<Login/>} />
          <Route path='/discord-clone/channels' component={ServerComponent}/>
            <Switch>
              <Route exact path='/discord-clone/channels/@me' render={()=><Homepage/>}/>
              <Route path='/discord-clone/channels/:serverId' render={(props)=><LayoutSidebar><ServerPage {...props}/></LayoutSidebar>}/>
              <Route path='/discord-clone/dms/:chatId' render={(props)=><LayoutSidebar><OnetoOneChat {...props}/></LayoutSidebar>}/>
            </Switch>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </main>
    </div>
  );
}

export default App;
