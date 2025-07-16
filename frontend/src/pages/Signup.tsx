import { useState, useEffect } from 'react';
import { Button } from '../components/lovable/button';
import { Input } from '../components/lovable/input';
import { Label } from '../components/lovable/label';
import { Eye, EyeOff } from 'lucide-react';
import Loader from '@/components/ui/loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useIsAuth from '@/hooks/useIsAuth';

type ResBody = {
    msg: string;
    token?: string;
};

const SignupPage = () => {
    const navigation = useNavigate();
    const { isLoading: isLoadingIsAuth, isAuth } = useIsAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        pbNumber: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuth) {
            navigation('/');
        }
    }, [isAuth]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Signup attempt with:', formData);
        try {
            setIsLoading(true);

            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
                {
                    pb_number: formData.pbNumber,
                    // name: formData.firstName + ' ' + formData.lastName,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }
            );

            const resBody = res.data as ResBody;

            if (res.status !== 200) {
                throw new Error(resBody.msg);
            }

            if (res.status === 200) {
                localStorage.setItem('token', 'Bearer ' + resBody.token);
                console.log(resBody.msg);
            }

            navigation('/');
        } catch (e: any) {
            console.log(e);
            alert(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    // if (isLoading || isLoadingIsAuth) {
    //     return (
    //         <div className="h-screen w-screen bg-white">
    //             <Loader />
    //         </div>
    //     );
    // }

    return (
        <div className="flex flex-row w-screen overflow-y-auto">
            <div className="hidden flex-col flex-1 md:flex">
                <img
                    src={'../../../public/imgs/hma.jpeg'}
                    alt="Technology background"
                    className="flex-1"
                />
                <img
                    src={'../../../public/imgs/iiit.jpeg'}
                    alt="Technology background"
                    className="flex-1"
                />
            </div>

            <div className="flex-1">
                <div className="flex-1 flex flex-col gap-10 mt-10">
                    {/* logo */}
                    <div className="px-10">
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={'../../../public/imgs/hal-logo.png'}
                                alt="HAL Logo"
                                className="h-12 sm:h-16 w-auto"
                            />
                            <img
                                src={'../../../public/imgs/iiit-logo.png'}
                                alt="IIIT DWD Logo"
                                className="h-16 sm:h-20 w-auto"
                            />
                        </div>
                        <p className="font-bold">
                            {'CENTER OF EXCELLENCE FOR AI'}
                        </p>
                    </div>

                    {/* form */}
                    <div className="mx-10 mt-6 mb-10 border-[0.5px] border-solid border-gray-400 p-6 rounded-md flex flex-col gap-6 md:gap-8">
                        <div className="">
                            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                                Sign Up
                            </h1>
                        </div>
                        <div className="flex-col items-center justify-center">
                            <form onSubmit={handleSignup} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="pbNumber">PB Number</Label>
                                    <Input
                                        id="pbNumber"
                                        placeholder="Enter your PB number"
                                        value={formData.pbNumber}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'pbNumber',
                                                e.target.value
                                            )
                                        }
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'name',
                                                e.target.value
                                            )
                                        }
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
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'password',
                                                    e.target.value
                                                )
                                            }
                                            className="h-12 pr-14"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    'confirmPassword',
                                                    e.target.value
                                                )
                                            }
                                            className="h-12 pr-14"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                {/* Login redirect */}
                                <div className="text-center mt-4">
                                    <p className="text-sm text-muted-foreground md:text-base">
                                        Already have an account?{' '}
                                        <a
                                            href="/login"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Log In
                                        </a>
                                    </p>
                                </div>
                                <Button
                                    type="submit"
                                    className="min-w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-lg mt-8 shadow"
                                >
                                    Sign Up
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
