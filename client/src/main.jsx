import 'leaflet/dist/leaflet.css';
import './index.css';

import L from 'leaflet';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Fix Leaflet default marker icon path (Vite asset handling)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

import { ClerkProvider } from '@clerk/react';
import { dark } from '@clerk/themes';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignInUrl="/"
      afterSignUpUrl="/"
      appearance={{
        baseTheme: dark,
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
        },
        variables: {
          colorPrimary: '#e8c469',
          colorBackground: '#1a1c23',
          colorInputBackground: 'rgba(255,255,255,0.03)',
          colorInputText: '#f0f2f5',
          colorText: '#f0f2f5',
          colorTextSecondary: '#8a8f9e',
          colorShimmer: 'rgba(255,255,255,0.1)',
          colorDanger: '#ef4444',
          colorSuccess: '#22c55e',
          colorWarning: '#e8c469',
          borderRadius: '16px',
        },
        elements: {
          card: "bg-transparent shadow-none border-none p-0 w-full",
          rootBox: "w-full !max-w-full",
          cardBox: "!bg-transparent !shadow-none !p-0 !overflow-hidden !w-full !mb-6",
          userButtonAvatarBox: "w-9 h-9 border border-white/10",
          headerTitle: "hidden",
          headerSubtitle: "hidden",
          formHeader: "hidden", // Hide Clerk's header completely since we have our own
          socialButtonsBlockButton: "!bg-[rgba(255,255,255,0.03)] !border !border-white/5 hover:!bg-[rgba(255,255,255,0.08)] !text-white !rounded-xl !transition-all !duration-300 py-3",
          socialButtonsBlockButtonText: "!text-white !font-medium !text-[15px]",
          dividerLine: "!bg-white/10",
          dividerText: "!text-[#8a8f9e]",
          formFieldLabel: "!text-[#f0f2f5] !font-medium !mb-1.5",
          formFieldInput: "!bg-[rgba(255,255,255,0.05)] !border !border-white/10 !text-white !rounded-xl focus:!border-[#e8c469] focus:!ring-1 focus:!ring-[#e8c469] !transition-all !duration-300 !py-2.5",
          formButtonPrimary: "!bg-[#e8c469] hover:!bg-[#d4b05a] !text-[#0f1117] !font-bold !py-3 !w-full !rounded-xl !transition-all !duration-300 !shadow-[0_4px_12px_rgba(232,196,105,0.2)] !mt-2",
          footerActionLink: "!text-[#e8c469] hover:!text-[#d4b05a] !font-semibold !transition-colors text-base",
          footerActionText: "!text-[#8a8f9e] text-base",
          identityPreviewText: "!text-[#f0f2f5]",
          identityPreviewEditButtonIcon: "!text-[#e8c469]",
          otpCodeFieldInput: "!bg-[#1a1c23] !border !border-white/5 !text-[#f0f2f5] !rounded-xl focus:!border-[#e8c469]",
        }
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
);
