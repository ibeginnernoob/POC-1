import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
    return (
        <AuthLayout heading="SIGN IN">
            <LoginForm />
        </AuthLayout>
    );
};

export default LoginPage;
