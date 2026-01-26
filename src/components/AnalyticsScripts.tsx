import { useEffect, useState } from 'react';
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

interface Settings {
  integrations: Integration[];
}

export function AnalyticsScripts() {
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      if (loaded) return;

      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-baa3db23/settings`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        
        if (!response.ok) return;
        
        const data: Settings = await response.json();
        setSettings(data);
        
        if (!data?.integrations) return;

        data.integrations.forEach(integration => {
          if (!integration.enabled || !integration.value) return;

          // AVA Credit Financing
          if (integration.id === 'ava-credit') {
             const script = document.createElement('script');
             script.src = `https://assets.askava.ai/v2/api.js?widgetId=${integration.value}&features=modal,customCta`;
             script.async = true;
             script.defer = true;
             document.body.appendChild(script);
          }
          
          // Google Tag Manager
          else if (integration.id === 'gtm') {
            // Script
            const script = document.createElement('script');
            script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${integration.value}');`;
            document.head.appendChild(script);
            
            // NoScript (iframe)
            const noscript = document.createElement('noscript');
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.googletagmanager.com/ns.html?id=${integration.value}`;
            iframe.height = "0";
            iframe.width = "0";
            iframe.style.display = "none";
            iframe.style.visibility = "hidden";
            noscript.appendChild(iframe);
            document.body.appendChild(noscript);
          }

          // HubSpot
          else if (integration.id === 'hubspot') {
             const script = document.createElement('script');
             script.src = `//js.hs-scripts.com/${integration.value}.js`;
             script.async = true;
             script.defer = true;
             script.id = 'hs-script-loader';
             document.body.appendChild(script);
          }

          // IT Rating (Meta Tags)
          else if (integration.id === 'it-rating') {
            // Expecting value to be comma separated IDs or just one
            const ids = integration.value.split(',').map(s => s.trim());
            ids.forEach(id => {
              const meta = document.createElement('meta');
              meta.name = 'it-rating';
              meta.content = id;
              document.head.appendChild(meta);
            });
          }

          // Nocodelytics
          else if (integration.id === 'nocodelytics') {
            const script = document.createElement('script');
            script.src = "https://tracker.nocodelytics.com/api/tracker/assets/nocodelytics.js";
            script.async = true;
            script.id = "nocodelytics-snippet";
            document.head.appendChild(script);
          }

          // Meta Pixel (Generic implementation for all Pixel IDs)
          else if (integration.type === 'pixel') {
             const script = document.createElement('script');
             script.innerHTML = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${integration.value}');
fbq('track', 'PageView');
             `;
             document.head.appendChild(script);

             const noscript = document.createElement('noscript');
             const img = document.createElement('img');
             img.height = 1;
             img.width = 1;
             img.style.display = 'none';
             img.src = `https://www.facebook.com/tr?id=${integration.value}&ev=PageView&noscript=1`;
             noscript.appendChild(img);
             document.body.appendChild(noscript);
          }

          // Google Ads
          else if (integration.id === 'google-ads') {
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${integration.value}`;
            document.head.appendChild(script1);

            const script2 = document.createElement('script');
            script2.innerHTML = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${integration.value}');
            `;
            document.head.appendChild(script2);
          }

          // TikTok Pixel
          else if (integration.id === 'tiktok-pixel') {
             const script = document.createElement('script');
             script.innerHTML = `
!function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = w[t] = w[t] || [];
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } };
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e };
    ttq.load = function (e, n) {
        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = [];
        ttq._i[e]._u = i; ttq._t = ttq._t || {}; ttq._t[e] = +new Date;
        ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        var o = document.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = i + "?sdkid=" + e + "&lib=" + t;
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(o, a)
    };
    ttq.load('${integration.value}');
    ttq.page();
}(window, document, 'ttq');
             `;
             document.head.appendChild(script);
          }

        });
        
        setLoaded(true);
      } catch (error) {
        console.error("Error loading analytics scripts:", error);
      }
    };

    fetchSettings();
  }, [loaded]);

  // Form URL Tracker (Dynamic)
  useEffect(() => {
    if (!settings?.integrations) return;

    const tracker = settings.integrations.find(i => i.id === 'form-url-tracker' && i.enabled);
    if (!tracker) return;

    const updateInput = () => {
      const el = document.getElementById('current-page') as HTMLInputElement;
      if (el) {
        el.value = window.location.href;
      }
    };

    // Initial check
    updateInput();

    // Setup interval to check for form appearing
    const interval = setInterval(updateInput, 1000);

    // Also update on any click which might trigger navigation or modal
    const handleClick = () => setTimeout(updateInput, 100);
    window.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleClick);
    };
  }, [settings]);

  return null;
}