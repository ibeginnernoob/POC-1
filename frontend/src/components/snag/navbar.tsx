import { User } from 'lucide-react';
import { Button } from '@/components/lovable/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/lovable/avatar';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ isAuth }: { isAuth: boolean }) {
    const navigation = useNavigate();

    return (
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto py-0">
                <div className="flex items-center justify-between px-5 md:px-10">
                    <div className="flex py-6 items-center space-x-2 md:space-x-4">
                        <img
                            src={'../../public/imgs/hal-logo.png'}
                            className="h-10 w-auto"
                            alt=""
                        />
                        <img
                            src={'../../public/imgs/iiit-logo.png'}
                            className="h-14"
                            alt=""
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        {isAuth && (
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="" alt="User" />
                                    <AvatarFallback className="bg-blue-100 text-blue-600">
                                        <User className="w-5 h-5" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                        {!isAuth && (
                            <div className="flex items-center space-x-3">
                                <Button
                                    className="button-signup text-xs text-blue-600 border border-solid border-blue-300 rounded-lg"
                                    variant="outline"
                                    onClick={() => {
                                        navigation('/login');
                                    }}
                                >
                                    Login
                                </Button>
                            </div>
                        )}
                        {!isAuth && (
                            <div className="flex items-center space-x-3">
                                <Button
                                    className="button-signup text-xs text-blue-600 border border-solid border-blue-300 rounded-lg"
                                    variant="outline"
                                    onClick={() => {
                                        navigation('/signup');
                                    }}
                                >
                                    Signup
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
