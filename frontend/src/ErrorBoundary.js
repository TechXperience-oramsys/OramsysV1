import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to display fallback UI on error
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught by ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong. Please try reloading the page.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
