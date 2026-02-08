import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff, Copy, Check, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fname: 'John',
    lname: 'Doe',
    email: 'john@example.com',
    bio: 'AI enthusiast and developer',
    avatar: 'JD',
  });

  const [apiKey, setApiKey] = useState('v0_1a2b3c4d5e6f7g8h9i0j');
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

  const handleSaveProfile = () => {
    setProfileData(formData);
    setSavedMessage('Profile updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleUpdateApiKey = () => {
    if (newApiKey.trim()) {
      setApiKey(newApiKey);
      setNewApiKey('');
      setShowApiKeyForm(false);
      setSavedMessage('API Key updated successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-white/50 border-border border-b">
        <div className="flex items-center gap-4 mx-auto px-4 h-16 container">
          <Link to="/chat">
            <Button variant="ghost" size="icon" className="hover:bg-muted text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-bold text-foreground text-2xl">Profile Settings</h1>
        </div>
      </header>

      <div className="mx-auto px-4 py-12 max-w-4xl container">
        {/* Success Message */}
        {savedMessage && (
          <div className="bg-green-50 mb-6 p-4 border border-green-200 rounded-lg text-green-700 text-sm">
            {savedMessage}
          </div>
        )}

        {/* Profile Section */}
        <div className="bg-white/50 mb-12 p-8 border border-border rounded-2xl">
          <div className="flex items-center gap-6 mb-8">
            {/* <div className="flex justify-center items-center rounded-full w-20 h-20 font-bold text-white text-2xl gradient-red-purple">
              {profileData.avatar}
            </div> */}
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-foreground text-2xl">
                {profileData.fname} {profileData.lname}
              </h2>
              <p className="text-foreground/60">{profileData.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-foreground text-sm">First Name</label>
              <Input
                name="fullName"
                value={formData.fname}
                onChange={handleProfileChange}
                className="bg-white border-border text-foreground"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-foreground text-sm">Last Name</label>
              <Input
                name="fullName"
                value={formData.lname}
                onChange={handleProfileChange}
                className="bg-white border-border text-foreground"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-foreground text-sm">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleProfileChange}
                className="bg-white border-border text-foreground"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-foreground text-sm">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                className="bg-white p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-foreground placeholder:text-foreground/50"
                rows={4}
                placeholder="Tell us about yourself"
              />
            </div>

            <Button onClick={handleSaveProfile} className="border-0 text-white gradient-red-purple">
              Save Changes
            </Button>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="bg-gradient-to-br from-background to-white/30 p-8 border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="font-bold text-foreground text-2xl">API Keys</h2>
          </div>

          <p className="mb-8 text-foreground/70">
            Manage your API keys securely. Keep them private and never share them publicly.
          </p>

          {/* V0_API_KEY */}
          <div className="bg-white/50 mb-8 p-6 border border-border/50 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex justify-center items-center rounded-lg w-8 h-8 gradient-red-purple">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-foreground text-lg">V0_API_KEY</h3>
            </div>

            <p className="mb-4 text-foreground/60 text-sm">
              Primary API key for AIChat platform access and authentication.
            </p>

            <div className="space-y-4">
              {/* Current API Key Display */}
              <div>
                <label className="block mb-2 font-medium text-foreground/70 text-sm">
                  Current Key
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    readOnly
                    className="flex-1 bg-muted p-3 border border-border rounded-lg font-mono text-foreground text-sm"
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
                  className="hover:bg-muted border-border w-full text-foreground"
                >
                  Regenerate API Key
                </Button>
              ) : (
                <div className="space-y-4 pt-4 border-border border-t">
                  <div>
                    <label className="block mb-2 font-medium text-foreground/70 text-sm">
                      New API Key
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type={showNewApiKey ? 'text' : 'password'}
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                        placeholder="Enter new API key or leave blank to auto-generate"
                        className="flex-1 bg-white p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50"
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
                      className="border-0 text-white gradient-red-purple"
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
          <div className="bg-primary/10 p-4 border border-primary/20 rounded-lg">
            <p className="text-foreground/70 text-sm">
              <strong>Security Tip:</strong> Regenerate your API key periodically and immediately if
              you suspect it has been compromised.
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-destructive/5 mt-12 p-8 border-2 border-destructive/30 rounded-2xl">
          <h2 className="mb-4 font-bold text-destructive text-2xl">Danger Zone</h2>
          <p className="mb-6 text-foreground/70">
            Irreversible actions that will permanently delete your data.
          </p>
          <Button
            variant="outline"
            className="bg-transparent hover:bg-destructive/10 border-destructive text-destructive"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
