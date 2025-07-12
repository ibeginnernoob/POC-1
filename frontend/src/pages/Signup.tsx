import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignUpForm';

const SignupPage = () => {
    return (
        <AuthLayout heading="Sign Up">
            <SignupForm />
        </AuthLayout>
    );
};

export default SignupPage;
