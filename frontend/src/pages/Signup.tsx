
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/lovable/card";
import { Button } from "@/components/lovable/button";
import { Input } from "@/components/lovable/input";
import { Label } from "@/components/lovable/label";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt with:", formData);
    // Add registration logic here
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
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Signup Form */}
        <Card className="border-gray-200 bg-white shadow-xl">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl text-gray-900">Sign Up</CardTitle>
            <CardDescription className="text-gray-600">
              Create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0"
              >
                Create Account
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
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

export default Signup;
