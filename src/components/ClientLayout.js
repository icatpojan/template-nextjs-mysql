"use client";
import { LoadingProvider } from "../contexts/LoadingContext";
import LoadingWrapper from "./LoadingWrapper";

export default function ClientLayout({ children }) {
    return (
        <LoadingProvider>
            <LoadingWrapper>{children}</LoadingWrapper>
        </LoadingProvider>
    );
}
