import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                    <h1 className="display-1 text-danger">404</h1>
                    <h2 className="text-secondary">Page Not Found</h2>
                    <p className="text-muted">
                        Oops! The page you're requesting for doesn't exist or has been moved. If this issue persists, please contact support. <br /> Thank you
                    </p>
                    <a href="/dashboard" className="btn btn-primary">
                        Go Back to Home
                    </a>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
