"use client";

import React, { useEffect, useRef } from "react";

export default function DocsPage() {
    const swaggerContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Swagger UI from CDN
        const script = document.createElement("script");
        script.src = "https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js";
        script.async = true;
        script.onload = () => {
            if (window.SwaggerUIBundle && swaggerContainerRef.current) {
                window.SwaggerUIBundle({
                    url: "/api/docs",
                    dom_id: "#swagger-ui",
                    presets: [
                        window.SwaggerUIBundle.presets.apis,
                        window.SwaggerUIBundle.presets.standalone,
                    ],
                    layout: "BaseLayout",
                });
            }
        };
        document.head.appendChild(script);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css";
        document.head.appendChild(link);

        return () => {
            // Cleanup
            document.head.removeChild(script);
            document.head.removeChild(link);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">NextUp API Documentation</h1>
                <div id="swagger-ui" ref={swaggerContainerRef}></div>
            </div>
        </div>
    );
}

// Extend Window interface for SwaggerUIBundle
declare global {
    interface Window {
        SwaggerUIBundle: {
            (config: {
                url: string;
                dom_id: string;
                presets: unknown[];
                layout: string;
            }): void;
            presets: {
                apis: unknown;
                standalone: unknown;
            };
        };
    }
}

