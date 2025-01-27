import React from 'react';
import AuthForm from '../components/AuthForm';

const Login: React.FC = () => {
  const handleLogin = (data: { email: string; password: string }) => {
   
    
    /*
    async function loginUser(credentials) {
      try {
        const response = await fetch('your-mongodb-api-endpoint/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Handle successful login
          // e.g., store token, redirect user, etc.
        } else {
          // Handle login error
        }
      } catch (error) {
        // Handle network errors
      }
    }
    */
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-navy-900 mb-12">
        ZALOGUJ SIĘ
      </h1>
      
      <AuthForm
        onSubmit={handleLogin}
        buttonText="STWÓRZ KONTO"
      />
    </div>
  );
};

export default Login;