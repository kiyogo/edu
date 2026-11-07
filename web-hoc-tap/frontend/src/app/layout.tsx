import React from 'react';
import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { Providers } from '../components/Providers';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-be-vietnam',
});

export const metadata: Metadata = {
  title: 'KiyoEdu - Nền tảng Giáo dục & Quản lý Học tập Thông minh',
  description: 'Nền tảng giao bài, chấm điểm và tạo đề kiểm tra phân hóa tự động chuẩn Bộ GD&ĐT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`h-full ${beVietnamPro.variable} ${beVietnamPro.className}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Anti-crash & Anti-injection shield for rogue extensions / adware (prevents M_ID error & blocks unauthorized TikTok/Douyin iframe feeds) */}
        <script
          id="urban-vpn-config-shield"
          data-config='{"config":{"properties":{"M_ID":"1","M_TYPE":"1"}}}'
        />
        <script
          id="extension-error-shield"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                function isExtensionError(detail) {
                  if (!detail) return false;
                  var s = String(detail);
                  return (
                    s.indexOf('chrome-extension://') !== -1 ||
                    s.indexOf('moz-extension://') !== -1 ||
                    s.indexOf('safari-web-extension://') !== -1 ||
                    s.indexOf('M_ID') !== -1 ||
                    s.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1
                  );
                }

                window.addEventListener('error', function(e) {
                  var detail = (e.filename || '') + ' ' + (e.message || '') + ' ' + (e.error && e.error.stack || '');
                  if (isExtensionError(detail)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  var reason = e.reason;
                  var detail = ((reason && reason.stack) || '') + ' ' + ((reason && reason.message) || '') + ' ' + String(reason || '');
                  if (isExtensionError(detail)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);

                var origOnError = window.onerror;
                window.onerror = function(msg, url, line, col, err) {
                  var detail = (msg || '') + ' ' + (url || '') + ' ' + (err && err.stack || '');
                  if (isExtensionError(detail)) {
                    return true;
                  }
                  if (origOnError) return origOnError.apply(this, arguments);
                };

                // Guard against adware / rogue extension iframe and embed injections (e.g. TikTok / Douyin background view-farming)
                function isRogueNode(node) {
                  if (!node || node.nodeType !== 1) return false;
                  var tag = (node.tagName || '').toLowerCase();
                  if (tag === 'iframe' || tag === 'embed' || tag === 'object') {
                    var src = (node.src || node.getAttribute('src') || '').toLowerCase();
                    if (
                      src.indexOf('tiktok') !== -1 ||
                      src.indexOf('douyin') !== -1 ||
                      src.indexOf('urban-vpn') !== -1 ||
                      src.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1
                    ) {
                      return true;
                    }
                  }
                  var cls = (node.className || '');
                  if (typeof cls === 'string' && (cls.indexOf('tiktok-embed') !== -1 || cls.indexOf('douyin-embed') !== -1)) {
                    return true;
                  }
                  if (node.hasAttribute && (node.hasAttribute('data-video-id') || (node.id && node.id.indexOf('tiktok') !== -1))) {
                    return true;
                  }
                  return false;
                }

                function purgeRogueElements(root) {
                  if (!root) return;
                  if (isRogueNode(root)) {
                    try { root.remove(); } catch (e) {}
                    return;
                  }
                  if (root.querySelectorAll) {
                    try {
                      var bad = root.querySelectorAll('iframe[src*="tiktok"], iframe[src*="douyin"], iframe[src*="urban-vpn"], blockquote.tiktok-embed, div[id*="tiktok-embed"], .tiktok-embed');
                      for (var i = 0; i < bad.length; i++) {
                        bad[i].remove();
                      }
                    } catch (e) {}
                  }
                }

                var origAppend = Element.prototype.appendChild;
                Element.prototype.appendChild = function(child) {
                  if (isRogueNode(child)) {
                    return child;
                  }
                  return origAppend.apply(this, arguments);
                };

                var origInsert = Element.prototype.insertBefore;
                Element.prototype.insertBefore = function(newNode, refNode) {
                  if (isRogueNode(newNode)) {
                    return newNode;
                  }
                  return origInsert.apply(this, arguments);
                };

                if (typeof MutationObserver !== 'undefined') {
                  var obs = new MutationObserver(function(mutations) {
                    for (var m = 0; m < mutations.length; m++) {
                      var added = mutations[m].addedNodes;
                      for (var a = 0; a < added.length; a++) {
                        purgeRogueElements(added[a]);
                      }
                    }
                  });
                  if (document.documentElement) {
                    obs.observe(document.documentElement, { childList: true, subtree: true });
                  } else {
                    document.addEventListener('DOMContentLoaded', function() {
                      if (document.documentElement) {
                        obs.observe(document.documentElement, { childList: true, subtree: true });
                      }
                    });
                  }
                }
              })();
            `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#131314] text-slate-900 dark:text-slate-100 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
