import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface User {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLoginSuccess = async (response: any) => {
    const { credential } = response; // รับ Google OAuth credential
    console.log('Credential:', credential);

    try {
      // ส่ง token ไปยัง Backend
      const userResponse = await axios.post('http://localhost:8080/project-soa/oauth2/callback', { token: credential });
      setUser(userResponse.data); // รับข้อมูลผู้ใช้จาก Backend
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="">
      <div>
        {user ? (
          <div>
            <h1>Welcome {user.name}</h1>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={(error) => console.log('Login Failed:', error)}
          />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
