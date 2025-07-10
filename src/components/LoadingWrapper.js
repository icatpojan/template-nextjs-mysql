"use client";
import { useLoading } from "../contexts/LoadingContext";
import LoadingScreen from "./LoadingScreen";

export default function LoadingWrapper({ children }) {
    const { isLoading, isInitialized } = useLoading();

    // Only show loading screen if explicitly set to loading and not yet initialized
    // RouteGuard will handle its own loading state
    if (isLoading && !isInitialized) {
        return <LoadingScreen />;
    }

    return children;
}
