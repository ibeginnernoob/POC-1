import { useState } from "react";
import { Button } from "../lovable/button";
import { Input } from "../lovable/input";
import { Label } from "../lovable/label";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    pbNumber: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-9">
      <div className="space-y-2">
        <Label htmlFor="pbnumber" className="text-base font-medium text-muted-foreground">PB Number</Label>
        <Input
          id="pbNumber"
          placeholder="Enter your PB number"
          value={formData.pbNumber}
          onChange={(e) => handleInputChange("pbNumber", e.target.value)}
          className="h-12 bg-background border-input rounded-lg px-4 text-lg text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-base font-medium text-muted-foreground">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="h-12  pr-14"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <Button
  type="submit"
  className="min-w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg mt-8 shadow"
>
  Sign In
</Button>

    </form>
  );
};

export default LoginForm;
