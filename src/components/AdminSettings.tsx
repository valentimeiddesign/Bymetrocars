import React, { useState, useEffect } from 'react';
import { Settings, Code, Globe, Mail, Users, Activity, Save, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Integration {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  value: string;
  type: 'script' | 'id' | 'pixel' | 'meta';
  category: 'Analytics' | 'Advertising' | 'Chat' | 'Other';
}

const initialIntegrations: Integration[] = [
  {
    id: 'ava-credit',
    name: 'AVA Credit Financing',
    description: 'Widget ID (e.g. c521f0267d40)',
    enabled: true,
    value: 'c521f0267d40',
    type: 'id',
    category: 'Other'
  },
  {
    id: 'form-url-tracker',
    name: 'Form URL Tracker',
    description: 'Auto-fill #current-page input with current URL',
    enabled: true,
    value: 'true',
    type: 'script',
    category: 'Other'
  },
  {
    id: 'gtm',
    name: 'Google Tag Manager',
    description: 'Container ID (GTM-XXXXXXX)',
    enabled: true,
    value: 'GTM-PSBL32L5',
    type: 'id',
    category: 'Analytics'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'HubSpot Portal ID',
    enabled: true,
    value: '44569445',
    type: 'id',
    category: 'Other'
  },
  {
    id: 'it-rating',
    name: 'IT Rating',
    description: 'IT Rating ID (Comma separated if multiple)',
    enabled: true,
    value: 'it-rat-cdeb52717835198b5e8727a49e1059e4, it-rat-2a39522147659e181415715889f1b43d',
    type: 'meta',
    category: 'Other'
  },
  {
    id: 'nocodelytics',
    name: 'Nocodelytics',
    description: 'Enable Nocodelytics Tracking',
    enabled: true,
    value: 'true',
    type: 'script', // Special handling in AnalyticsScripts
    category: 'Analytics'
  },
  {
    id: 'meta-pixel-capital',
    name: 'Meta Pixel (Capital Auto Sales)',
    description: 'Pixel ID',
    enabled: true,
    value: '989069795731420',
    type: 'pixel',
    category: 'Advertising'
  },
  {
    id: 'meta-pixel-commercial',
    name: 'Meta Pixel (Capital A Sales)',
    description: 'Pixel ID',
    enabled: true,
    value: '1247291926043434',
    type: 'pixel',
    category: 'Advertising'
  },
  {
    id: 'meta-pixel-generic',
    name: 'Meta Pixel (Main)',
    description: 'Pixel ID',
    enabled: true,
    value: '1537490300473033',
    type: 'pixel',
    category: 'Advertising'
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Google Ads ID (AW-XXXXXXXXXX)',
    enabled: true,
    value: 'AW-16542483188',
    type: 'id',
    category: 'Advertising'
  },
  {
    id: 'tiktok-pixel',
    name: 'TikTok Pixel',
    description: 'TikTok Pixel ID',
    enabled: true,
    value: 'CQGGIVRC77U9MQRMRJTG',
    type: 'pixel',
    category: 'Advertising'
  }
];

interface SiteSettings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  openingHours: string;
}

interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
}

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'site' | 'seo'>('integrations');
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [showValues, setShowValues] = useState<{ [key: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    companyName: 'Buy Metro Pre-Owned',
    email: 'info@buymetropreowned.ca',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Toronto, ON M5H 2N2',
    facebookUrl: 'https://facebook.com/buymetropreowned',
    instagramUrl: 'https://instagram.com/buymetropreowned',
    twitterUrl: 'https://twitter.com/buymetropreowned',
    linkedinUrl: 'https://linkedin.com/company/buymetropreowned',
    openingHours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 5:00 PM, Sun: Closed'
  });

  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    metaTitle: 'Buy Metro Pre-Owned - Quality Used Cars',
    metaDescription: 'Find quality pre-owned vehicles at Buy Metro Pre-Owned. Great selection, competitive prices, and excellent financing options.',
    metaKeywords: 'used cars, pre-owned vehicles, car dealership, auto sales',
    ogImage: 'https://images.unsplash.com/photo-1605152277138-359efd4a6862?w=1200'
  });

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-baa3db23/settings`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data) {
            if (data.integrations) {
              // Merge with initial integrations to ensure new fields are present
              setIntegrations(prev => {
                const newIntegrations = [...prev];
                data.integrations.forEach((savedInt: Integration) => {
                  const index = newIntegrations.findIndex(i => i.id === savedInt.id);
                  if (index !== -1) {
                    newIntegrations[index] = { ...newIntegrations[index], ...savedInt };
                  } else {
                    // Optional: decide if you want to keep integrations removed from code
                    // For now, we only keep what's in code or updated
                  }
                });
                return newIntegrations;
              });
            }
            if (data.siteSettings) setSiteSettings(data.siteSettings);
            if (data.seoSettings) setSeoSettings(data.seoSettings);
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    
    fetchSettings();
  }, []);

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(int => 
      int.id === id ? { ...int, enabled: !int.enabled } : int
    ));
  };

  const updateIntegrationValue = (id: string, value: string) => {
    setIntegrations(integrations.map(int => 
      int.id === id ? { ...int, value } : int
    ));
  };

  const toggleShowValue = (id: string) => {
    setShowValues({ ...showValues, [id]: !showValues[id] });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-baa3db23/settings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          integrations,
          siteSettings,
          seoSettings
        })
      });

      if (response.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Error saving settings");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Analytics': return 'bg-blue-100 text-blue-700';
      case 'Advertising': return 'bg-purple-100 text-purple-700';
      case 'Chat': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {} as { [key: string]: Integration[] });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[rgb(5,15,35)]">Settings</h1>
              <p className="text-sm text-gray-500 mt-1">Manage integrations and site configuration</p>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isSaved
                  ? 'bg-green-500 text-white'
                  : 'bg-[rgb(139,130,246)] text-white hover:bg-[rgb(120,110,230)]'
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-5 h-5" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex gap-4 border-t border-gray-100">
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'integrations'
                ? 'border-[rgb(139,130,246)] text-[rgb(139,130,246)]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Integrations
            </div>
          </button>
          <button
            onClick={() => setActiveTab('site')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'site'
                ? 'border-[rgb(139,130,246)] text-[rgb(139,130,246)]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Site Settings
            </div>
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'seo'
                ? 'border-[rgb(139,130,246)] text-[rgb(139,130,246)]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              SEO Settings
            </div>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Code className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Integration Instructions</h3>
                  <p className="text-sm text-blue-700">
                    Enable and configure your tracking codes and integrations below. These will be automatically added to your site.
                  </p>
                </div>
              </div>
            </div>

            {/* Integrations by Category */}
            {Object.entries(groupedIntegrations).map(([category, items]) => (
              <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)}`}>
                      {category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {items.filter(i => i.enabled).length} of {items.length} active
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((integration) => (
                    <div key={integration.id} className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-[rgb(5,15,35)]">{integration.name}</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={integration.enabled}
                                onChange={() => toggleIntegration(integration.id)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(139,130,246)]"></div>
                            </label>
                          </div>
                          <p className="text-sm text-gray-500">{integration.description}</p>
                        </div>
                      </div>

                      {integration.enabled && (
                        <div className="space-y-3">
                          {integration.type === 'script' ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Embed Code
                              </label>
                              <textarea
                                value={integration.value}
                                onChange={(e) => updateIntegrationValue(integration.id, e.target.value)}
                                placeholder="Paste your embed code here..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] font-mono text-sm"
                                rows={4}
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {integration.type === 'pixel' ? 'Pixel ID' : 'ID / Code'}
                              </label>
                              <div className="relative">
                                <input
                                  type={showValues[integration.id] ? 'text' : 'password'}
                                  value={integration.value}
                                  onChange={(e) => updateIntegrationValue(integration.id, e.target.value)}
                                  placeholder={`Enter ${integration.name} ID...`}
                                  className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)] font-mono text-sm"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                  <button
                                    onClick={() => toggleShowValue(integration.id)}
                                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                    title={showValues[integration.id] ? 'Hide' : 'Show'}
                                  >
                                    {showValues[integration.id] ? (
                                      <EyeOff className="w-4 h-4 text-gray-500" />
                                    ) : (
                                      <Eye className="w-4 h-4 text-gray-500" />
                                    )}
                                  </button>
                                  {integration.value && (
                                    <button
                                      onClick={() => copyToClipboard(integration.value, integration.id)}
                                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                      title="Copy"
                                    >
                                      {copiedId === integration.id ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-gray-500" />
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Example/Help Text */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-600">
                              <strong>Example:</strong>{' '}
                              {integration.id === 'gtm' && 'GTM-XXXXXXX'}
                              {integration.id === 'ga4' && 'G-XXXXXXXXXX'}
                              {integration.id === 'google-ads' && 'AW-XXXXXXXXXX'}
                              {integration.id === 'facebook-pixel' && '1234567890123456'}
                              {integration.id === 'tiktok-pixel' && 'ABCDEFGHIJKLMNOP'}
                              {integration.id === 'hubspot' && '12345678'}
                              {integration.id === 'clarity' && 'abcd1234efgh'}
                              {integration.id === 'cloudflare' && '1x00000000000000000000AB'}
                              {(integration.id === 'hubspot-chat' || integration.id === 'google-ads-conversion') && 'Paste your full embed code'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === 'site' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[rgb(5,15,35)] mb-6">Company Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={siteSettings.companyName}
                    onChange={(e) => setSiteSettings({ ...siteSettings, companyName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={siteSettings.email}
                    onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={siteSettings.phone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours</label>
                  <input
                    type="text"
                    value={siteSettings.openingHours}
                    onChange={(e) => setSiteSettings({ ...siteSettings, openingHours: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={siteSettings.address}
                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[rgb(5,15,35)] mb-6">Social Media Links</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  <input
                    type="url"
                    value={siteSettings.facebookUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, facebookUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  <input
                    type="url"
                    value={siteSettings.instagramUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, instagramUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                  <input
                    type="url"
                    value={siteSettings.twitterUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, twitterUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    placeholder="https://twitter.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={siteSettings.linkedinUrl}
                    onChange={(e) => setSiteSettings({ ...siteSettings, linkedinUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEO Settings Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-[rgb(5,15,35)] mb-6">SEO Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                    <span className="text-gray-400 font-normal ml-2">({seoSettings.metaTitle.length}/60 characters)</span>
                  </label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    maxLength={60}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                    <span className="text-gray-400 font-normal ml-2">({seoSettings.metaDescription.length}/160 characters)</span>
                  </label>
                  <textarea
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    rows={3}
                    maxLength={160}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                  <input
                    type="text"
                    value={seoSettings.metaKeywords}
                    onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Open Graph Image URL</label>
                  <input
                    type="url"
                    value={seoSettings.ogImage}
                    onChange={(e) => setSeoSettings({ ...seoSettings, ogImage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(139,130,246)]"
                    placeholder="https://..."
                  />
                  {seoSettings.ogImage && (
                    <div className="mt-3">
                      <img src={seoSettings.ogImage} alt="OG Preview" className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Google Search Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="text-blue-600 text-lg hover:underline cursor-pointer">{seoSettings.metaTitle}</div>
                <div className="text-green-700 text-sm mt-1">https://www.buymetropreowned.ca</div>
                <div className="text-gray-600 text-sm mt-2">{seoSettings.metaDescription}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
