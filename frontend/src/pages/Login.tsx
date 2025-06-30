import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/lovable/card";
import { Button } from "@/components/lovable/button";
import { Input } from "@/components/lovable/input";
import { Label } from "@/components/lovable/label";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Add authentication logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/imgs/f5e2075d-1858-4f73-a6fc-b4fe773e4fed.png" 
            alt="HAL Logo" 
            className="h-36 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Aircraft Management
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI System</span>
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="border-gray-200 bg-white shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-gray-900">Login</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0"
              >
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 Aircraft Management AI System. Ensuring aviation safety through intelligent technology.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
