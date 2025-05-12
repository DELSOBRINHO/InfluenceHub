import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthForm: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignIn ? 'Entre na sua conta' : 'Crie sua conta'}
          </h2>
        </div>
        
        {isSignIn ? <SignIn /> : <SignUp />}
        
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isSignIn ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
