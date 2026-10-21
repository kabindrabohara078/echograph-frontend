import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Lock,
  Sun,
  Moon,
  Database,
  Key,
  LogOut,
  Check,
  Copy,
  Eye,
  EyeOff,
  Sliders,
  Shield,
  Activity,
  Server
} from "lucide-react";
import { API_URL } from "../config/api";

export default function UserSettingsModal({
  isOpen,
  onClose,
  dark,
  setDark,
  token,
  userEmail,
  userName,
  updateAuth,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' | 'security' | 'theme' | 'preferences'

  // Profile Form
  const [nameInput, setNameInput] = useState(userName || "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  // Password Form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  // Preferences (Stored locally)
  const [defaultCategory, setDefaultCategory] = useState(
    () => localStorage.getItem("echograph_pref_type") || "preference"
  );
  const [defaultNodeLife, setDefaultNodeLife] = useState(
    () => localStorage.getItem("echograph_pref_nodelife") || "91"
  );
  const [tokenCopied, setTokenCopied] = useState(false);
  const [showToken, setShowToken] = useState(false);

  // Sync state when modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setNameInput(userName || (userEmail ? userEmail.split("@")[0] : ""));
      setProfileMsg({ type: "", text: "" });
      setPasswordMsg({ type: "", text: "" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [isOpen, userName, userEmail]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Save Profile Name
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setProfileMsg({ type: "error", text: "Display name cannot be empty." });
      return;
    }

    setProfileSaving(true);
    setProfileMsg({ type: "", text: "" });

    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: nameInput.trim() })
      });

      const data = await res.json();
      if (res.ok) {
        setProfileMsg({ type: "success", text: "Profile name updated successfully!" });
        if (updateAuth) {
          updateAuth(token, userEmail, data.name);
        } else {
          localStorage.setItem("user_name", data.name);
        }
      } else {
        setProfileMsg({ type: "error", text: data.detail || "Failed to update profile." });
      }
    } catch (err) {
      console.error(err);
      setProfileMsg({ type: "error", text: "Network occured." });
    } finally {
      setProfileSaving(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg({ type: "error", text: "Please fill in all password fields." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    setPasswordSaving(true);
    setPasswordMsg({ type: "", text: "" });

    try {
      const res = await fetch(`${API_URL}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        setPasswordMsg({ type: "success", text: "Password changed successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({ type: "error", text: data.detail || "Failed to update password." });
      }
    } catch (err) {
      console.error(err);
      setPasswordMsg({ type: "error", text: "Network error occured." });
    } finally {
      setPasswordSaving(false);
    }
  };

  // Save Preferences
  const handleSavePreference = (key, val) => {
    if (key === "type") {
      setDefaultCategory(val);
      localStorage.setItem("echograph_pref_type", val);
    } else if (key === "nodelife") {
      setDefaultNodeLife(val);
      localStorage.setItem("echograph_pref_nodelife", val);
    }
  };

  const handleCopyToken = () => {
    if (!token) return;
    navigator.clipboard.writeText(token);
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  const displayName = userName || (userEmail ? userEmail.split("@")[0] : "User");
  const firstInitial = displayName ? displayName[0].toUpperCase() : "U";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Modal Container - Fixed size across all tabs */}
      <div
        className={`relative w-[94vw] sm:w-[620px] h-[580px] max-h-[90vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col transition-colors duration-200 ${
          dark
            ? "bg-[#141414] border-slate-800 text-slate-100"
            : "bg-[var(--bg-modal)] border-[var(--border-color)] text-[var(--text-primary)]"
        }`}
      >
        {/* Header Strip (Fixed height) */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${
            dark ? "bg-slate-900/50 border-slate-800" : "bg-[var(--bg-tertiary)] border-[var(--border-color)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-bold leading-tight truncate">{displayName}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors shrink-0 ${
              dark
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-500 hover:text-black hover:bg-[var(--bg-tertiary)]"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Fixed height) */}
        <div
          className={`flex border-b px-6 gap-2 text-xs font-semibold overflow-x-auto shrink-0 ${
            dark ? "border-slate-800 bg-slate-950/30" : "border-[var(--border-color)] bg-[var(--bg-primary)]"
          }`}
        >
          {[
            { id: "profile", label: "Profile"},
            { id: "theme", label: "Appearance"},
            { id: "security", label: "Security"}
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? dark
                    ? "border-blue-500 text-blue-400"
                    : "border-blue-600 text-blue-600"
                  : dark
                  ? "border-transparent text-slate-400 hover:text-slate-200"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body (Scrollable with fixed dimensions) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 min-h-0 text-sm">
          {/* 1. PROFILE TAB */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Personal Details</h3>
                <p className={`text-xs mb-4 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  Update your identity across your personal memory nodes and agent sessions.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5">Display Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. alex"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    dark
                      ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5">Email Address</label>
                <div
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm flex items-center justify-between ${
                    dark
                      ? "bg-slate-900/50 border-slate-800 text-slate-400"
                      : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-secondary)]"
                  }`}
                >
                  <span>{userEmail || "No email assigned"}</span>
                </div>
              </div>

              {profileMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    profileMsg.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {profileMsg.text}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {profileSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}

          {/* 2. THEME & APPEARANCE TAB */}
          {activeTab === "theme" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Color Theme & Mode</h3>
                <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  Choose how EchoGraph looks on your screen. The setting applies instantly across all tools and playground.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Dark Mode Card */}
                <button
                  type="button"
                  onClick={() => setDark(true)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                    dark
                      ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500"
                      : "border-[var(--border-color)] hover:border-[var(--border-hover)] bg-[var(--bg-card)]"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs flex items-center gap-1.5">
                      Dark Cyber Mode
                    </div>
                    <p className={`text-[11px] mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                      Optimized for low-light coding, high-contrast embeddings, and deep slate hues.
                    </p>
                  </div>
                </button>

                {/* Light Mode Card */}
                <button
                  type="button"
                  onClick={() => setDark(false)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                    !dark
                      ? "border-blue-600 bg-blue-500/10 ring-1 ring-blue-600"
                      : "border-slate-800 hover:border-slate-700 bg-slate-900/50"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs flex items-center gap-1.5">
                      Crisp Light Mode
                    </div>
                    <p className={`text-[11px] mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                      Comfortable matte neutral backgrounds for daytime reading and presentations.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* 3. SECURITY TAB */}
          {activeTab === "security" && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Change Account Password</h3>
                <p className={`text-xs mb-3 ${dark ? "text-slate-400" : "text-slate-500"}`}>
                  Update your authentication credentials for your EchoGraph vault.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Current Password</label>
                <input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                    dark
                      ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500"
                      : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-blue-600"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">New Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                      dark
                        ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500"
                        : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-blue-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">Confirm New Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                      dark
                        ? "bg-slate-900 border-slate-700 text-white focus:border-blue-500"
                        : "bg-[var(--bg-tertiary)] border-[var(--border-color)] text-[var(--text-primary)] focus:border-blue-600"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className={`text-xs flex items-center gap-1.5 cursor-pointer ${
                    dark ? "text-slate-400 hover:text-slate-200" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showPasswords ? "Hide Passwords" : "Show Passwords"}
                </button>
              </div>

              {passwordMsg.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    passwordMsg.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {passwordMsg.text}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {passwordSaving ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer with Integrated Logout (Fixed height) */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-t shrink-0 ${
            dark ? "bg-slate-950/60 border-slate-800" : "bg-[var(--bg-tertiary)] border-[var(--border-color)]"
          }`}
        >
          <button
            onClick={() => {
              onClose();
              if (onLogout) onLogout();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-500/30 transition-all cursor-pointer shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              dark
                ? "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
                : "border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
