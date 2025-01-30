import { Component } from "react";
import Error500 from "./pages/Error500";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Error500 />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;