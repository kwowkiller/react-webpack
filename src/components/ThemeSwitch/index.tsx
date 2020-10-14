import React from "react";
import styles from "./styles.module.scss";
import {Theme} from "@/context";

export function ThemeSwitch(props: {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}) {
  return (
    <div className={styles.themeSwitch}>
      <label>
        <input
          type="radio"
          name="theme"
          onChange={props.onThemeChange.bind(null, "light")}
          checked={props.theme === 'light'}
        />
        light
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          onChange={props.onThemeChange.bind(null, "dark")}
          checked={props.theme === 'dark'}
        />
        dark
      </label>
    </div>
  );
}
