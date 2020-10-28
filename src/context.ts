import React from 'react';

export type Theme = 'light' | 'dark';

export interface Context {
  theme: Theme;
}

export const AppCtx = React.createContext<Context>(null);
