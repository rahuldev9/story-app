import React, { useState } from 'react';
import LoadingBar from '../LoadingBar';  // Import LoadingBar

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleForgotPassword = async () => {
        setLoading(true); // Start loading

        const result = await fetch('http://localhost:4500/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });

        const response = await result.text(); // Use text() to capture plain responses
        setMessage(response);

        setLoading(false); // Stop loading after response
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Forgot Password</h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <button onClick={handleForgotPassword} style={{ marginBottom: '10px' }}>
                Send Reset Link
            </button>
            {loading && <LoadingBar />} {/* Show loading bar while processing */}
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
