import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.min.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from '@/views/Home';
import {ThemeSwitch} from '@/components/ThemeSwitch';
import {AppCtx, Context, Theme} from '@/context';

/**
 * Loading闪屏
 * @constructor
 */
function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'white',
        zIndex: 999,
        width: '100%',
        height: '100%',
      }}
    >
      loading
    </div>
  );
}

const About = lazy(async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 100000);
  });
  return import('@/views/About');
});

const App = () => {
  const [state, setState] = React.useState<Context>({
    theme: (localStorage.getItem('theme') as Theme) || 'dark',
  });
  return (
    <AppCtx.Provider value={state}>
      <BrowserRouter>
        <ThemeSwitch
          theme={state.theme}
          onThemeChange={(theme) => {
            setState(() => {
              localStorage.setItem('theme', theme);
              document.documentElement.setAttribute('data-theme', theme);
              return {theme: theme};
            });
          }}
        />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AppCtx.Provider>
  );
};

document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');
ReactDOM.render(<App />, document.getElementById('root'));
