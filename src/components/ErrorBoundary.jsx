import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl text-error">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 my-4">
                We're sorry for the inconvenience. Please try refreshing the
                page.
              </p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = "/")}
                >
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
