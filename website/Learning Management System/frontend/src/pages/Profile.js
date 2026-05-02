import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const Profile = () => {
    const [userData, setUserData] = useState({ username: '', email: '', bio: '', profile_picture: null });
    const [passwords, setPasswords] = useState({ old_password: '', new_password: '' });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        axiosInstance.get('accounts/profile/').then(res => {
            setUserData(res.data);
            if (res.data.profile_picture) setImagePreview(res.data.profile_picture);
        });
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('bio', userData.bio);
        if (userData.profile_picture instanceof File) {
            formData.append('profile_picture', userData.profile_picture);
        }

        try {
            await axiosInstance.patch('accounts/profile/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Profile updated!");
        } catch (err) { alert("Update failed!"); }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('accounts/change-password/', passwords);
            alert("Password changed!");
            setPasswords({ old_password: '', new_password: '' });
        } catch (err) { alert("Current password is wrong"); }
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Edit Profile</h3>
                <form onSubmit={handleProfileUpdate}>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label>Bio</label>
                        <textarea className="form-control" value={userData.bio || ''} onChange={e => setUserData({ ...userData, bio: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label>Profile Picture</label>
                        <input type="file" className="form-control" onChange={e => {
                            setUserData({ ...userData, profile_picture: e.target.files[0] });
                            setImagePreview(URL.createObjectURL(e.target.files[0]));
                        }} />
                        {imagePreview && <img src={imagePreview} alt="Preview" width="100" className="mt-2 rounded" />}
                    </div>
                    <button className="btn btn-primary">Save Changes</button>
                </form>
            </div>
            <div className="col-md-6 border-start">
                <h3>Change Password</h3>
                <form onSubmit={handleChangePassword}>
                    <input type="password" placeholder="Old Password" title="Old Password" class="form-control mb-2" value={passwords.old_password} onChange={e => setPasswords({ ...passwords, old_password: e.target.value })} />
                    <input type="password" placeholder="New Password" title="New Password" class="form-control mb-2" value={passwords.new_password} onChange={e => setPasswords({ ...passwords, new_password: e.target.value })} />
                    <button className="btn btn-danger">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;