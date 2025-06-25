import React, { useState, useEffect } from 'react';
import { Link, Link2, BarChart3, Eye, Copy, Trash2, Edit3, Plus, Calendar, TrendingUp, Globe, Shield, User, LogOut, Menu, X, ExternalLink, MousePointer } from 'lucide-react';

const LinkCraft = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({
    originalUrl: '',
    customSlug: '',
    title: ''
  });
  const [editingLink, setEditingLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Check for existing token on component mount
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      return;
    }
  }, []);

  // Fetch links when authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      fetchLinks();
    }
  }, [isAuthenticated, currentUser]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setCurrentUser(result.data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/links`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setLinks(result.data.links);
      } else {
        console.error('Failed to fetch links:', result.message);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  const handleLogin = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.data.token);
        setCurrentUser(result.data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: result.message };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const handleSignup = async (email, password, name) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.data.token);
        setCurrentUser(result.data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: result.message };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setActiveTab('dashboard');
    setShowCreateModal(false);
    setShowMobileMenu(false);
    setLinks([]);
  };

  const createLink = async () => {
    if (!formData.originalUrl) {
      alert('Original URL is required.');
      return;
    }

    try {
      const url = editingLink ? `${API_BASE_URL}/links/${editingLink._id}` : `${API_BASE_URL}/links`;
      const method = editingLink ? 'PUT' : 'POST';

      console.log('Sending data:', formData);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to create a link.');
        handleLogout();
        return;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Response:', result);

      if (result.success) {
        if (editingLink) {
          setLinks(links.map(link =>
            link._id === editingLink._id ? result.data.link : link
          ));
          setEditingLink(null);
        } else {
          setLinks([result.data.link, ...links]);
        }
        setFormData({ originalUrl: '', customSlug: '', title: '' });
        setShowCreateModal(false);
      } else {
        alert(result.message || 'Failed to save link. Please check the input.');
      }
    } catch (error) {
      console.error('Error creating/updating link:', error);
      alert('Failed to save link due to a server error. Please try again later.');
    }
  };


  const deleteLink = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/links/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();

      if (result.success) {
        setLinks(links.filter(link => link._id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Failed to delete link. Please try again.');
    }
  };

  const simulateClick = async (id) => {
    const link = links.find(l => l._id === id);
    if (link) {
      window.open(link.originalUrl, '_blank');

      // Update locally for immediate feedback
      setLinks(links.map(l =>
        l._id === id
          ? { ...l, clicks: l.clicks + 1, lastClicked: new Date() }
          : l
      ));

      // Sync with backend
      try {
        const token = localStorage.getItem('token');
        await fetch(`${API_BASE_URL}/links/${id}/click`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ipAddress: 'client-ip', userAgent: navigator.userAgent }) // Add relevant click data
        });
      } catch (error) {
        console.error('Failed to sync click:', error);
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatTimeAgo = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const totalLinks = links.length;

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} onSignup={handleSignup} isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Link2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LinkCraft
                </span>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'dashboard'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-2 rounded-lg transition-all ${activeTab === 'analytics'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                Analytics
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Link</span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:inline text-gray-300">{currentUser?.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-2 space-y-2">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300'
                }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('analytics');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'analytics' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300'
                }`}
            >
              Analytics
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Links</p>
                    <p className="text-3xl font-bold text-white">{totalLinks}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Link className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Clicks</p>
                    <p className="text-3xl font-bold text-white">{totalClicks}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <MousePointer className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Clicks</p>
                    <p className="text-3xl font-bold text-white">
                      {totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Links List */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Your Links</h2>
                  <span className="text-gray-400 text-sm">{links.length} links</span>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                {links.map((link) => (
                  <div key={link._id} className="p-6 hover:bg-white/5 transition-colors">
                    <div className="flex items-start justify-between space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Link2 className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-white font-medium truncate">{link.title || 'Untitled Link'}</h3>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(link.shortUrl)}
                              className="text-purple-400 hover:text-purple-300 font-mono text-sm bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20 hover:border-purple-500/40 transition-colors flex items-center space-x-1"
                            >
                              <span>{link.shortUrl}</span>
                              <Copy className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => simulateClick(link._id)}
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="truncate max-w-xs">{link.originalUrl}</span>
                            <span>â€¢</span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{link.clicks} clicks</span>
                            </span>
                            <span>â€¢</span>
                            <span>{formatDate(link.createdAt)}</span>
                          </div>

                          <div className="text-xs text-gray-500">
                            Last clicked: {formatTimeAgo(link.lastClicked)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => {
                            setEditingLink(link);
                            setFormData({
                              originalUrl: link.originalUrl,
                              customSlug: link.customSlug || '',
                              title: link.title || ''
                            });
                            setShowCreateModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLink(link._id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {links.length === 0 && (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Link2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-white font-medium mb-2">No links yet</h3>
                    <p className="text-gray-400 mb-6">Create your first shortened link to get started</p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                    >
                      Create Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-6">Analytics Overview</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Top Performing Links</h3>
                  {links
                    .sort((a, b) => b.clicks - a.clicks)
                    .slice(0, 5)
                    .map((link, index) => (
                      <div key={link._id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-purple-400 font-bold">#{index + 1}</span>
                          <div>
                            <p className="text-white font-medium truncate max-w-xs">{link.title || 'Untitled Link'}</p>
                            <p className="text-gray-400 text-sm font-mono">{link.shortUrl}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{link.clicks}</p>
                          <p className="text-gray-400 text-sm">clicks</p>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-medium">Recent Activity</h3>
                  {links
                    .filter(link => link.lastClicked)
                    .sort((a, b) => new Date(b.lastClicked) - new Date(a.lastClicked))
                    .slice(0, 5)
                    .map((link) => (
                      <div key={link._id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-medium truncate max-w-xs">{link.title || 'Untitled Link'}</p>
                          <p className="text-gray-400 text-sm">Last clicked {formatTimeAgo(link.lastClicked)}</p>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create/Edit Link Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingLink ? 'Edit Link' : 'Create New Link'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingLink(null);
                  setFormData({ originalUrl: '', customSlug: '', title: '' });
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Original URL *
                </label>
                <input
                  type="url"
                  value={formData.originalUrl}
                  onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
                  placeholder="https://example.com/very-long-url"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Link title (optional)"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Slug (optional)
                </label>
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-2">this.ux/</span>
                  <input
                    type="text"
                    value={formData.customSlug}
                    onChange={(e) => setFormData({ ...formData, customSlug: e.target.value })}
                    placeholder="custom-slug"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingLink(null);
                    setFormData({ originalUrl: '', customSlug: '', title: '' });
                  }}
                  className="flex-1 px-4 py-3 text-gray-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createLink}
                  disabled={!formData.originalUrl}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingLink ? 'Update' : 'Create'} Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AuthScreen = ({ onLogin, onSignup, isLoading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const result = await onLogin(formData.email, formData.password);
        if (!result.success) {
          setError(result.error);
        }
      } else {
        if (!formData.name.trim()) {
          setError('Name is required');
          return;
        }
        const result = await onSignup(formData.email, formData.password, formData.name);
        if (!result.success) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
      name: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            LinkCraft
          </h1>
          <p className="text-gray-400">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={toggleMode}
              className="ml-1 text-purple-400 hover:text-purple-300 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkCraft;