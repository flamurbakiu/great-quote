import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import AuthPage from './pages/AuthPage';
import AuthContext from './store/auth-context';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>

          {!authCtx.isLoggedIn && (
            <Route path='/auth' exact>
              <AuthPage />
            </Route>
          )}

          <Route path='/profile' exact>
            {authCtx.isLoggedIn && <ProfilePage />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
          </Route>

          <Route path='/quotes' exact>
            {authCtx.isLoggedIn && <AllQuotes />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
          </Route>

          <Route path='/quotes/:quoteId'>
            {authCtx.isLoggedIn && <QuoteDetail />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
          </Route>

          <Route path='/new-quote'>
            {authCtx.isLoggedIn && <NewQuote />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
