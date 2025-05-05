import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import  App from "./web_cam_app";

const publishable_key = import.meta.env.VITE_CLERK_PUBLIASHABLE_KEY;
if(!publishable_key) throw new Error("Missing Stripe Publishable Key");
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishable_key} afterSignOutUrl={"/"}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
