import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff, Copy, Check, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import useLocalStorage from '@/hooks/useLocalStorage';
import { getSingleUser, updateUserPreferences, updateUserProfile } from '@/api/user/user.service';
import LoadingComponent from '@/components/loading-component/LoadingComponent';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fname: '',
    lname: '',
    email: '',
    bio: '',
    vo_api_key: '',
    status: true,
  });

  const { setAuthenticated } = useAuth();
  const { clearLocalStorageItem } = useLocalStorage();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const userId = localStorage.getItem('user-id') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const [formData, setFormData] = useState(profileData);
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [showNewApiKey, setShowNewApiKey] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    const isConfirmed = window.confirm('Are you sure you want to update your profile data?');

    if (!isConfirmed) return;

    await updateUserProfile({
      bio: formData.bio,
      fname: formData.fname,
      lname: formData.lname,
      navigate: navigate,
      setIsLoading: setIsLoading,
      userId: userId,
      setSavedMessage: setSavedMessage,
      setProfileData: setProfileData,
      isLoading: isLoading,
    });
    setProfileData((prev) => ({
      ...prev,
      fname: formData.fname,
      lname: formData.lname,
      bio: formData.bio,
      email: formData.email,
    }));
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');

    if (!isConfirmed) return;

    clearLocalStorageItem('user-id');
    setAuthenticated(false);
    setUser('');
    navigate('/login');
  };

  const handleUpdateApiKey = () => {
    if (newApiKey.trim()) {
      const isConfirmed = window.confirm('Are you sure you want to update API keys?');

      if (!isConfirmed) return;

      updateUserPreferences({
        navigate: navigate,
        newApiKey: newApiKey,
        setIsLoading: setIsLoading,
        setProfileData: setProfileData,
        setSavedMessage: setSavedMessage,
        setShowApiKeyForm: setShowApiKeyForm,
        setApiKey: setApiKey,
        userId: userId,
        vo_api_key: newApiKey,
        setNewApiKey: setNewApiKey,
      });
    }
  };

  const fetchUser = async () => {
    const userId = localStorage.getItem('user-id');
    if (!userId) return;

    try {
      setIsLoading(true);

      const data = await getSingleUser({
        userId: userId,
        setIsLoading: setIsLoading,
      });

      if (data) {
        setProfileData(data);
        setFormData(data);
        setApiKey(data.vo_api_key || '');
      } else {
        console.error('No user data returned');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingComponent />}

      {/* Header */}
      <header className="border-b bg-white/50 border-border">
        <div className="container flex items-center h-16 gap-4 px-4 mx-auto">
          <Link to="/chat">
            <Button variant="ghost" size="icon" className="hover:bg-muted text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        </div>
      </header>

      <div className="container max-w-4xl px-4 py-12 mx-auto">
        {/* Success Message */}
        {savedMessage && (
          <div className="p-4 mb-6 text-sm text-green-700 border border-green-200 rounded-lg bg-green-50">
            {savedMessage}
          </div>
        )}

        {/* Profile Section */}
        <div className="p-8 mb-12 border bg-white/50 border-border rounded-2xl">
          <div className="flex items-center gap-6 mb-8">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {profileData?.fname || ''} {profileData?.lname || ''}
              </h2>
              <p className="text-foreground/60">{profileData.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-foreground">First Name</label>
              <Input
                name="fname"
                value={formData.fname}
                onChange={handleProfileChange}
                className="bg-white border-border text-foreground"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-foreground">Last Name</label>
              <Input
                name="lname"
                value={formData.lname}
                onChange={handleProfileChange}
                className="bg-white border-border text-foreground"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-foreground">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                className="bg-white border-border text-foreground"
                placeholder="Enter your email"
                disabled={true}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-foreground">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                className="w-full p-3 bg-white border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50"
                rows={4}
                placeholder="Tell us about yourself"
              />
            </div>

            <Button onClick={handleSaveProfile} className="text-white border-0 gradient-red-purple">
              Save Changes
            </Button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="p-8 border bg-gradient-to-br from-background to-white/30 border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">API Keys</h2>
          </div>

          <p className="mb-8 text-foreground/70">
            Manage your API key securely. Keep them private and never share them publicly.
          </p>

          {/* V0_API_KEY */}
          <div className="p-6 mb-8 border bg-white/50 border-border/50 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-red-purple">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">V0_API_KEY</h3>
            </div>

            <p className="mb-4 text-sm text-foreground/60">
              Primary API keys for AIChat platform access and authentication.
            </p>

            <div className="space-y-4">
              {/* Current API Key Display */}
              <div>
                <label className="block mb-2 text-sm font-medium text-foreground/70">
                  Current Key
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    readOnly
                    className="flex-1 p-3 font-mono text-sm border rounded-lg bg-muted border-border text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="hover:bg-muted text-foreground"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyApiKey}
                    className="hover:bg-muted text-foreground"
                  >
                    {copiedApiKey ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Update API Key Form Toggle */}
              {!showApiKeyForm ? (
                <Button
                  onClick={() => setShowApiKeyForm(true)}
                  variant="outline"
                  className="w-full hover:bg-muted border-border text-foreground"
                >
                  Update API Key
                </Button>
              ) : (
                <div className="pt-4 space-y-4 border-t border-border">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-foreground/70">
                      New API Key
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type={showNewApiKey ? 'text' : 'password'}
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                        placeholder="Enter new API keys"
                        className="flex-1 p-3 bg-white border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowNewApiKey(!showNewApiKey)}
                        className="hover:bg-muted text-foreground"
                      >
                        {showNewApiKey ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleUpdateApiKey}
                      className="text-white border-0 gradient-red-purple"
                    >
                      Update Key
                    </Button>
                    <Button
                      onClick={() => {
                        setShowApiKeyForm(false);
                        setNewApiKey('');
                        setShowNewApiKey(false);
                      }}
                      variant="outline"
                      className="hover:bg-muted border-border text-foreground"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Info */}
          <div className="p-4 border rounded-lg bg-primary/10 border-primary/20">
            <p className="text-sm text-foreground/70">
              <strong>Security Tip:</strong> Regenerate your API key periodically and immediately if
              you suspect it has been compromised.
            </p>
          </div>
        </div>

        {/* Logout Section */}
        <div className="p-8 mt-12 border-2 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold">Logout</h2>
          <p className="mb-6 text-foreground/70">
            Logout from your account. This will clear your session and require you to log in again
            to access your profile and chat features.
          </p>
          <Button
            onClick={handleLogout}
            className="w-full text-white border-0 cursor-pointer gradient-red-purple"
          >
            Logout
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="p-8 mt-12 border-2 bg-destructive/5 border-destructive/30 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-destructive">Danger Zone</h2>
          <p className="mb-6 text-foreground/70">
            Irreversible actions that will permanently delete your data.
          </p>
          <Button
            variant="outline"
            className="w-full bg-transparent cursor-pointer hover:bg-destructive/10 border-destructive text-destructive"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
