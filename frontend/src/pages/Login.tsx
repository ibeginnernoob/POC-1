import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/lovable/card";
import { Button } from "@/components/lovable/button";
import { Input } from "@/components/lovable/input";
import { Label } from "@/components/lovable/label";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useIsAuth from "@/hooks/useIsAuth";
import axios from "axios";

type ResBody = {
  msg: string;
  token?: string;
};

const Login = () => {
  const navigation = useNavigate();
  const { isLoading, isAuth } = useIsAuth();

  const [pb_number, setPB] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  useEffect(() => {
    if (isAuth) {
      navigation("/");
    }
  }, [isAuth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { pb_number, password });

    try {
      setIsLoadingResult(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        {
          pb_number: pb_number,
          password: password,
        },
      );

      const resBody = res.data as ResBody;

      if (res.status !== 200) {
        throw new Error(resBody.msg);
      }

      if (res.status === 200) {
        localStorage.setItem("token", "Bearer " + resBody.token);
        console.log(resBody.msg);
      }

      navigation("/");
    } catch (e: any) {
      console.log(e);
      alert(e.message);
    } finally {
      setIsLoadingResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/imgs/f5e2075d-1858-4f73-a6fc-b4fe773e4fed.png"
            alt="HAL Logo"
            className="h-36 w-auto mx-auto -mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Aircraft Management
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              AI System
            </span>
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
                <Label htmlFor="pb_number" className="text-gray-700">
                  PB Number
                </Label>
                <Input
                  id="pb_number"
                  type="pb_number"
                  placeholder="Enter your PB Number"
                  value={pb_number}
                  onChange={(e) => setPB(e.target.value)}
                  required
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
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
        {/* <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        &copy; 2024 Aircraft Management AI System. Ensuring
                        aviation safety through intelligent technology.
                    </p>
                </div> */}
      </div>
    </div>
  );
};

export default Login;
