import React from 'react';
import useAuth from './useAuth';

const UserProfile = () => {
    const user = useAuth();

    if (!user) {
        return <p>No user logged in.</p>;
    }

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;
