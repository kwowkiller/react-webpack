import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Home} from '@/views/Home';
import {ThemeSwitch} from '@/components/ThemeSwitch';
import {AppCtx, Context, Theme} from '@/context';

/**
 * Loading闪屏
 * @constructor
 */
function Loading() {
  return <div className="loading">loading</div>;
}

const About = lazy(async () => {
  const component = await import('@/views/About');
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
  return component;
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
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route
              path="/about"
              render={() => {
                return <About/>;
              }}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AppCtx.Provider>
  );
};

document.documentElement.setAttribute(
    'data-theme',
    localStorage.getItem('theme') || 'dark',
);
ReactDOM.render(<App/>, document.getElementById('root'));
