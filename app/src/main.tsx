import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./GlobalStyles.ts";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { FilesProvider } from "./contexts/FilesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GlobalStyles />
        <AuthProvider>
            <FilesProvider>
                <BrowserRouter>
                    <Suspense fallback={<p>loading...</p>}>
                        <App />
                    </Suspense>
                </BrowserRouter>
            </FilesProvider>
        </AuthProvider>
        <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
                success: { duration: 3000 },
                error: { duration: 5000 },
                style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                },
            }}
        />
    </React.StrictMode>
);
