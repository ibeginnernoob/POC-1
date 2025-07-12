import { useState, useEffect } from 'react';
import { Button } from '../lovable/button';
import { Input } from '../lovable/input';
import { Label } from '../lovable/label';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import useIsAuth from '@/hooks/useIsAuth';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/loader';

type ResBody = {
    msg: string;
    token?: string;
};

const LoginForm = () => {
    const navigation = useNavigate();
    const { isLoading: isLoadingIsAuth, isAuth } = useIsAuth();

    const [showPassword, setShowPassword] = useState(false);
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
        <form onSubmit={handleLogin} className="space-y-9">
            <div className="space-y-2">
                <Label
                    htmlFor="pbnumber"
                    className="text-base font-medium text-muted-foreground"
                >
                    PB Number
                </Label>
                <Input
                    id="pbNumber"
                    placeholder="Enter your PB number"
                    value={formData.pbNumber}
                    onChange={(e) =>
                        handleInputChange('pbNumber', e.target.value)
                    }
                    className="h-12 bg-background border-input rounded-lg px-4 text-lg text-foreground placeholder:text-muted-foreground"
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="password"
                    className="text-base font-medium text-muted-foreground"
                >
                    Password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                            handleInputChange('password', e.target.value)
                        }
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
