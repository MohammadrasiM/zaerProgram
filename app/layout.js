"use client";
import { Provider } from "react-redux";
import "./globals.css";
import Layout from "./LayoutTemplate";
import { store } from "../redux/reducers";
import { useEffect } from "react";
export default function RootLayout({ children, params }) {
  useEffect(() => {
    __findInitialDarkMode__();
  }, []);
  const __findInitialDarkMode__ = () => {
    const x = localStorage.getItem("theme-mode");
    let mode = "dark";
    if (x) mode = x;
    // else if (window.matchMedia) {
    //   //check browser support
    //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //     mode = "dark";
    //   } else {
    //     mode = "light";
    //   }
    // } else {
    //   mode = "light";
    // }
    const colorTheme = mode;
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(mode);
    localStorage.setItem("theme-mode", mode);
  };
  return (
    <html dir={"rtl"} lang={"fa"}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="keywords" content="zaer" />
        <title>zaer</title>
        <meta name="description" content="zaer" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="manifest" href="/assets/icons/app/site.webmanifest" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/app/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/app/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/app/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/app/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/app/apple-touch-icon-180x180.png" />

        <meta name="theme-color" content="#18181b" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="apple-mobile-web-app-title" content="zaer" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/app/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/app/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="194x194" href="/assets/icons/app/favicon-194x194.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/assets/icons/app/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/app/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/assets/icons/app/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/icons/app/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/icons/app/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/icons/app/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/app/apple-touch-icon-180x180.png" />

        <link rel="mask-icon" href="/assets/icons/app/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/assets/icons/app/favicon.ico" />
        {/* Android */}
        <meta name="theme-color" content="#18181b" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Apple */}
        <meta name="apple-mobile-web-app-title" content="Petzi store" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/app/apple-touch-icon.png" />
      </head>

      <body className="dark">
        <Provider store={store}>
          <Layout params={params}>{children} </Layout>{" "}
        </Provider>
      </body>
    </html>
  );
}
