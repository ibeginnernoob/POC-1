import { useState } from "react";
import { Button } from "../lovable/button";
import { Input } from "../lovable/input";
import { Label } from "../lovable/label";
import { Eye, EyeOff } from "lucide-react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    pbNumber: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="pbNumber">PB Number</Label>
        <Input
          id="pbNumber"
          placeholder="Enter your PB number"
          value={formData.pbNumber}
          onChange={(e) => handleInputChange("pbNumber", e.target.value)}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="h-12 pr-14"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            className="h-12 pr-14"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <Button type="submit" className="min-w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg mt-8 shadow">
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
