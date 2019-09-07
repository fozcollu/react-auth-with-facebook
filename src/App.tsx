import React from "react";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import AppLayout from "./app/AppLayout";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthProvider from "./providers/auth/AuthProvider";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppLayout>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/product" component={Product} />
        </AppLayout>
      </AuthProvider>
    </Router>
  );
};

export default App;
