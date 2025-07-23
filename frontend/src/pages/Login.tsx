import { useState, useEffect } from 'react';
import { User, Lock } from 'lucide-react';
import axios from 'axios';
import useIsAuth from '@/hooks/useIsAuth';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/loader';

type ResBody = {
    msg: string;
    token?: string;
};

const LoginPage = () => {
    const navigation = useNavigate();
    const { isLoading: isLoadingIsAuth, isAuth } = useIsAuth();

    // const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        pbNumber: '',
        password: '',
    });
    const [isLoading, setIsLoadingResult] = useState(false);

    useEffect(() => {
        if (isAuth) {
            navigation('/');
        }
    }, [isAuth, isLoadingIsAuth]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.pbNumber || !formData.password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setIsLoadingResult(true);
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
                {
                    pb_number: formData?.pbNumber || '',
                    password: formData.password || '',
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
            setIsLoadingResult(true);
        }
    };

    if (isLoadingIsAuth || isLoading) {
        return (
            <div className="h-screen w-screen bg-white">
                <Loader />
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-[url(../../public/imgs/auth-bg.png)] bg-cover bg-center bg-no-repeat flex flex-col bg-white overflow-y-hidden">
            <div className="w-full flex flex-row items-start justify-between py-6 px-28">
                <img
                    src="../../public/imgs/hal-big-logo.svg.png"
                    alt="HAL"
                    className="h-20"
                />
                <h1 className="text-4xl text-white font-roboto font-bold mr-6">
                    Center of Excellence for AI
                </h1>
                <img
                    src="../../public/imgs/iiit-logo-white.png"
                    alt="HAL"
                    className="h-28"
                />
            </div>
            <div className="flex-1 flex flex-row justify-between items-center gap-20 pl-20 pr-28 pb-10">
                <div className="flex-1 h-full bg-[url(../../public/imgs/auth-left.png)] bg-cover bg-center bg-no-repeat bg-green-200 rounded-3xl" />
                <div className="flex-1">
                    <div className="h-full flex flex-col rounded-xl">
                        <h2 className="text-5xl text-white font-bold font-polysans mb-20">
                            Welcome Back!
                        </h2>
                        <div className="w-full flex flex-col gap-10">
                            <div className="relative w-full">
                                <div className="z-10 absolute left-0 -top-2 -bottom-2 bg-white px-6 rounded-full flex items-center justify-center">
                                    <User color="black" size={36} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="PB Number"
                                    className="flex-1 w-full pl-24 pr-6 py-5 bg-[#476569]/70 text-white caret-white font-roboto font-medium text-xl rounded-full focus:outline-none backdrop-blur-lg"
                                    onChange={(e) =>
                                        handleInputChange(
                                            'pbNumber',
                                            e.target.value
                                        )
                                    }
                                    value={formData.pbNumber}
                                />
                            </div>
                            <div className="relative w-full">
                                <div className="z-10 absolute right-0 -top-2 -bottom-2 bg-white px-6 rounded-full flex items-center justify-center">
                                    <Lock color="black" size={36} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="flex-1 w-full pl-6 pr-24 py-5 bg-[#476569]/70 text-white caret-white font-roboto font-medium text-xl rounded-full focus:outline-none backdrop-blur-lg"
                                    onChange={(e) =>
                                        handleInputChange(
                                            'password',
                                            e.target.value
                                        )
                                    }
                                    value={formData.password}
                                />
                            </div>
                        </div>
                        <button
                            className="mt-32 mx-4 bg-white text-black text-2xl font-polysans font-bold py-4 rounded-full hover:bg-gray-300 transition-colors duration-300"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
