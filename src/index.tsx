import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "@/views/Home";

function Loading() {
  return <div className='loading'>loading</div>;
}

const About = lazy(async () => {
  const component = await import("@/views/About");
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
  return component;
});

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/about"
            render={() => {
              return <About />;
            }}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
