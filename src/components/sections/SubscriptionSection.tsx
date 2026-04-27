import React, { useState } from 'react';
import {
  Crown,
  Sparkles,
  Users,
  Check,
  X,
  ExternalLink,
  Camera,
  Loader2,
  Lock,
  Calendar,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '../ui/button';


const STRIPE_GARDEN_PRO_URL = 'https://buy.stripe.com/your-garden-pro-plan';
const DISCORD_URL = 'https://discord.gg/your-invite-code';

const COMPARISON = [
  { label: 'AI Garden Doctor diagnoses', free: '3 / day', pro: 'Unlimited' },
  { label: 'Monthly seed calendar PDF',   free: false, pro: true },
  { label: 'Premium PDF library',         free: false, pro: true },
  { label: 'Early access to new guides',  free: false, pro: true },
  { label: 'Members-only community',      free: false, pro: true },
  { label: 'WhatsApp Q&A with Danielle', free: false, pro: true },
  { label: 'Free YouTube videos',         free: true,  pro: true },
  { label: 'Basic planting guide',        free: true,  pro: true },
];

const PILLARS = [
  {
    icon: Calendar,
    title: 'Monthly Drops',
    body: 'Seed calendars and premium PDF guides land in your inbox every month, tuned to the Mauritius growing season.',
  },
  {
    icon: Sparkles,
    title: 'AI Garden Doctor',
    body: 'Snap a photo of a sick plant. Claude AI reads it and gives you an organic remedy in under 10 seconds — unlimited for Pro.',
  },
  {
    icon: Users,
    title: 'Private Community',
    body: 'A quiet, expert-only Discord where you can share harvests, ask Danielle anything, and swap seeds with fellow growers.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya M.',
    location: 'Rose Hill, Mauritius',
    avatar: 'PM',
    quote: 'The monthly seed calendar alone is worth it. I finally know what to plant without Googling for hours.',
  },
  {
    name: 'Jean-Claude R.',
    location: 'Curepipe, Mauritius',
    avatar: 'JR',
    quote: 'Uploaded a photo of my tomato leaves and got a diagnosis in seconds. Saved the whole crop.',
  },
  {
    name: 'Aisha P.',
    location: 'Flic en Flac',
    avatar: 'AP',
    quote: "The Discord community is so warm. I'm learning things I'd never find on YouTube.",
  },
];

const FAQS = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes — cancel with one click from your Stripe Customer Portal. No questions asked. Access continues to end of billing period.',
  },
  {
    q: 'What currencies can I pay in?',
    a: 'Stripe accepts USD, EUR, GBP and most major currencies. You can pay in USD from any Mauritian card.',
  },
  {
    q: 'How does the AI Garden Doctor work?',
    a: "You upload a photo of your plant. Our server sends it to Claude AI which analyses the symptoms and returns a tailored organic remedy.",
  },
  {
    q: 'When do I get community access?',
    a: 'Within 24 hours of your first payment, Danielle will send you a personal Discord invite via your checkout email.',
  },
];

// ── AI Garden Doctor ──────────────────────────────────────────────────────────
function AiGardenDoctor() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const usedToday = 1;
  const remaining = 3 - usedToday;

  const applyFile = (f: File) => { setFile(f); setPreview(URL.createObjectURL(f)); setResult(null); };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) applyFile(f); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f?.type.startsWith('image/')) applyFile(f); };
  const reset = () => { setFile(null); setPreview(null); setResult(null); };

  const handleDiagnose = async () => {
    if (!file) return;
    setLoading(true);
    // TODO: POST to /api/garden-doctor — calls Claude API (claude-sonnet-4-6)
    await new Promise((r) => setTimeout(r, 2000));
    setResult(
      'Early-stage powdery mildew — caused by high humidity and poor air circulation. Remove affected leaves, space plants further apart, and mist every 3 days with neem oil (1 tsp per litre of water). Avoid overhead watering. If symptoms persist after 2 weeks, apply a copper-based fungicide safe for edibles.'
    );
    setLoading(false);
  };

  const step = result ? 3 : file ? 2 : 1;

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: '2px solid #bbf7d0' }}>
      {/* Header */}
      <div className="bg-green-900 px-6 py-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white leading-tight">AI Garden Doctor</h3>
              <p className="text-green-300 text-xs">Powered by Claude AI</p>
            </div>
          </div>
          {remaining > 0
            ? <span className="text-xs text-white px-3 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>{remaining} of 3 free today</span>
            : <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: '#facc15', color: '#166534' }}>Limit reached — Go Pro</span>
          }
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2 mt-5">
          {['Upload photo', 'AI analysis', 'Get remedy'].map((label, i) => {
            const idx = i + 1;
            const done = idx < step;
            const active = idx === step;
            return (
              <React.Fragment key={label}>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      border: '2px solid white',
                      backgroundColor: done ? 'white' : active ? 'rgba(255,255,255,0.2)' : 'transparent',
                      color: done ? '#166534' : 'white',
                    }}
                  >
                    {done ? <Check className="w-3.5 h-3.5" /> : idx}
                  </div>
                  <span className="text-xs hidden sm:block" style={{ color: active ? 'white' : done ? '#86efac' : '#4ade80' }}>
                    {label}
                  </span>
                </div>
                {i < 2 && <div className="flex-1 h-px" style={{ backgroundColor: done ? 'white' : '#166534' }} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white p-6 space-y-4">
        {remaining === 0 ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" style={{ color: '#9ca3af' }} />
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#111827' }}>Daily free limit reached</p>
              <p className="text-sm text-gray-600 mt-1">Upgrade to Garden Pro for unlimited diagnoses every day.</p>
            </div>
            <Button asChild className="bg-green-600 text-white px-8">
              <a href={STRIPE_GARDEN_PRO_URL} target="_blank" rel="noopener noreferrer">
                <Crown className="w-4 h-4 mr-2" />Upgrade to Garden Pro — $7/mo
              </a>
            </Button>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl" style={{ border: '1px solid #bbf7d0' }}>
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-600 text-sm mb-1">Diagnosis complete</p>
                <p className="text-gray-700 text-sm leading-relaxed">{result}</p>
                <p className="text-xs mt-3" style={{ color: '#9ca3af' }}>Powered by Claude AI · Always consult a local expert for severe cases</p>
              </div>
            </div>
            {preview && (
              <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
                <img src={preview} alt="Diagnosed plant" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Your plant</p>
                  <p className="text-xs text-gray-600">{file?.name}</p>
                </div>
              </div>
            )}
            <Button variant="outline" className="w-full border-green-300 text-green-600" onClick={reset}>
              Diagnose another plant
            </Button>
          </div>
        ) : (
          <>
            <label className="block">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
                style={{ borderColor: dragOver ? '#16a34a' : preview ? '#16a34a' : '#d1d5db', backgroundColor: preview || dragOver ? '#f0fdf4' : 'white' }}
              >
                {preview ? (
                  <div className="space-y-2">
                    <img src={preview} alt="Plant preview" className="max-h-48 mx-auto rounded-lg object-contain shadow-xl" />
                    <p className="text-xs text-green-600 font-medium">Ready to diagnose · Click to change photo</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto" style={{ border: '1px solid #bbf7d0' }}>
                      <Camera className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Drop your plant photo here</p>
                      <p className="text-xs text-gray-600 mt-0.5">or click to browse · JPG, PNG up to 10 MB</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg">
                      <Camera className="w-3.5 h-3.5" />Choose Photo
                    </div>
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
            </label>

            <Button
              className="w-full bg-green-600 text-white font-semibold"
              style={{ padding: '1.25rem' }}
              onClick={handleDiagnose}
              disabled={!file || loading}
            >
              {loading
                ? <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" />Claude is reading your plant...</span>
                : <span className="flex items-center gap-2"><Sparkles className="w-5 h-5" />{file ? 'Diagnose My Plant' : 'Upload a photo to begin'}</span>
              }
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// ── FAQ item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen((v) => !v)} className="w-full text-left rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: open ? '#f9fafb' : 'white' }}>
        <span className="text-sm font-semibold pr-4" style={{ color: '#111827' }}>{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-600 flex-shrink-0" />}
      </div>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed" style={{ borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem' }}>
          {a}
        </div>
      )}
    </button>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function SubscriptionSection() {
  return (
    <div className="space-y-16 sm:space-y-24">

      {/* Hero */}
      <div className="relative bg-green-900 rounded-3xl px-6 py-12 sm:py-16 text-center overflow-hidden">
        <div className="absolute top-6 left-6 w-24 h-24 rounded-full opacity-30" style={{ backgroundColor: '#14532d' }} />
        <div className="absolute bottom-6 right-6 w-40 h-40 rounded-full opacity-20" style={{ backgroundColor: '#14532d' }} />
        <div className="relative space-y-5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <Crown className="w-3.5 h-3.5" />Garden Pro Membership
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Your garden's secret<br />weapon — $7 / month
          </h2>
          <p className="text-green-200 text-lg max-w-xl mx-auto">
            Monthly seed calendars, unlimited AI plant diagnoses, and a private community of growers who know their stuff.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button asChild size="lg" className="bg-white font-bold text-base px-8" style={{ color: '#166534' }}>
              <a href={STRIPE_GARDEN_PRO_URL} target="_blank" rel="noopener noreferrer">
                <Crown className="w-5 h-5 mr-2" />Start for $7 / month
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-green-200 text-base" style={{ borderColor: '#166534' }}>
              <a href="#doctor-section">
                Try AI Doctor free<ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
          <p className="text-green-300 text-xs">Cancel anytime · 30-day money-back guarantee · Stripe secure checkout</p>

          {/* Social proof */}
          <div className="flex flex-wrap justify-center gap-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[['120+', 'Active members'], ['4.9 ★', 'Member rating'], ['2,400+', 'Diagnoses run']].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-white">{num}</p>
                <p className="text-green-300 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefit pillars */}
      <div>
        <p className="text-center text-xs font-semibold text-green-600 tracking-widest uppercase mb-3">What you get</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: '#111827' }}>
          Three reasons growers love Garden Pro
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-2xl bg-green-50 p-6 space-y-3" style={{ border: '2px solid #bbf7d0' }}>
                <div className="w-11 h-11 rounded-xl bg-green-600 flex items-center justify-center shadow-xl">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-lg" style={{ color: '#111827' }}>{p.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <p className="text-center text-xs font-semibold text-green-600 tracking-widest uppercase mb-3">Pricing</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: '#111827' }}>Simple, honest pricing</h3>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl" style={{ border: '2px solid #e5e7eb' }}>
          {/* Free */}
          <div className="bg-gray-100 p-8" style={{ borderRight: '1px solid #e5e7eb' }}>
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Free</p>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-5xl font-bold" style={{ color: '#111827' }}>$0</span>
              <span className="text-gray-600 text-sm mb-2">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              {COMPARISON.map(({ label, free }) => (
                <li key={label} className="flex items-start gap-2.5 text-sm">
                  {free === false
                    ? <X className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#d1d5db' }} />
                    : <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  }
                  <span style={{ color: free === false ? '#9ca3af' : '#374151', textDecoration: free === false ? 'line-through' : 'none' }}>
                    {label}{typeof free === 'string' && <span className="text-gray-600 ml-1">({free})</span>}
                  </span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full" disabled>Current plan</Button>
          </div>

          {/* Pro */}
          <div className="bg-green-900 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#facc15', color: '#166534' }}>
                Most popular
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4" style={{ color: '#facc15' }} />
              <p className="text-sm font-semibold text-green-300 uppercase tracking-wide">Garden Pro</p>
            </div>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-5xl font-bold text-white">$7</span>
              <span className="text-green-300 text-sm mb-2">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              {COMPARISON.map(({ label, pro }) => (
                <li key={label} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#facc15' }} />
                  <span className="text-green-200">
                    {label}{typeof pro === 'string' && <span className="text-green-300 ml-1">({pro})</span>}
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild className="w-full bg-white font-bold" style={{ color: '#166534' }}>
              <a href={STRIPE_GARDEN_PRO_URL} target="_blank" rel="noopener noreferrer">
                <Crown className="w-4 h-4 mr-2" />Get Garden Pro
                <ExternalLink className="w-3.5 h-3.5 ml-2" />
              </a>
            </Button>
            <p className="text-center text-green-300 text-xs mt-3">Cancel anytime · No contracts</p>
          </div>
        </div>
      </div>

      {/* AI Garden Doctor */}
      <div id="doctor-section">
        <p className="text-center text-xs font-semibold text-green-600 tracking-widest uppercase mb-3">Try it free</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3" style={{ color: '#111827' }}>AI Garden Doctor</h3>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto text-sm">
          Photo in, diagnosis out. Claude reads visual symptoms and returns an organic remedy in under 10 seconds. Free members get 3 diagnoses per day.
        </p>
        <div className="max-w-xl mx-auto">
          <AiGardenDoctor />
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <p className="text-center text-xs font-semibold text-green-600 tracking-widest uppercase mb-3">Member stories</p>
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: '#111827' }}>Growers love it</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-xl space-y-4" style={{ border: '1px solid #f3f4f6' }}>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" style={{ fill: '#facc15' }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#111827' }}>{t.name}</p>
                  <p className="text-xs text-gray-600">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community */}
      <div className="bg-green-50 rounded-3xl p-8 sm:p-12" style={{ border: '2px solid #bbf7d0' }}>
        <div className="max-w-2xl mx-auto text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold" style={{ color: '#111827' }}>Private growers' community</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            A quiet, expert-focused Discord. Share your harvests, ask Danielle anything, swap seeds with neighbours, and get feedback on your garden — no algorithm, no noise.
          </p>
          <div className="flex justify-center">
            <div className="flex -space-x-2">
              {['PM', 'JR', 'AP', 'NK', 'SB'].map((init, i) => (
                <div key={init} className="w-9 h-9 rounded-full border-2 border-white bg-green-600 flex items-center justify-center text-white text-xs font-bold" style={{ zIndex: 5 - i }}>
                  {init}
                </div>
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-white text-xs font-bold">+115</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-green-600 text-white font-semibold">
              <a href={STRIPE_GARDEN_PRO_URL} target="_blank" rel="noopener noreferrer">
                <Crown className="w-4 h-4 mr-2" />Join as a Pro member
              </a>
            </Button>
            <Button asChild variant="outline" className="border-green-500 text-green-600">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />Preview the community
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <p className="text-center text-xs font-semibold text-green-600 tracking-widest uppercase mb-3">FAQ</p>
        <h3 className="text-2xl font-bold text-center mb-6" style={{ color: '#111827' }}>Common questions</h3>
        <div className="space-y-3">{FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}</div>
      </div>

      {/* Final CTA */}
      <div className="text-center space-y-5 pb-4">
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          30-day money-back guarantee — no questions asked
        </div>
        <div className="space-y-3">
          <Button asChild size="lg" className="bg-green-600 text-white font-bold text-base px-10 py-6">
            <a href={STRIPE_GARDEN_PRO_URL} target="_blank" rel="noopener noreferrer">
              <Crown className="w-5 h-5 mr-2" />Start Garden Pro — $7 / month
            </a>
          </Button>
          <p className="text-xs" style={{ color: '#9ca3af' }}>Cancel anytime from your Stripe dashboard · Instant access on payment</p>
        </div>
      </div>

    </div>
  );
}
