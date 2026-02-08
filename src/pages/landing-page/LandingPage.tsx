import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Images,
  Zap,
  Brain,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/header/Header';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <Header isDoc={false} />

      {/* Announcement Badge */}
      <section className="bg-[#f8f5fc] px-4 py-4 border-border border-b text-center">
        <div className="mx-auto container">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-full">
            <span className="bg-orange-500 rounded-full w-2 h-2 animate-pulse" />
            <span className="text-foreground">
              Now available: Advanced image analysis with multiple file support
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative bg-[#f8f5fc] px-4 py-24 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-5xl container">
          <div className="space-y-8 mb-16 text-center">
            <h1 className="font-bold text-5xl md:text-7xl text-balance leading-tight">
              This is <span className="gradient-red-purple-text">AIChat</span>
            </h1>
            <p className="mx-auto max-w-3xl text-foreground/70 text-xl text-balance">
              One platform. Unlimited possibilities.
            </p>
            <Link to="/chat">
              <Button className="px-8 py-6 border-0 rounded-full text-white text-lg cursor-pointer gradient-red-purple">
                Discover SitecoreAI <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Hero Visual - Dark card with circle */}
          <div className="relative flex justify-center items-center bg-black rounded-2xl h-96 md:h-[500px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-50" />
            <div className="relative flex justify-center items-center bg-white shadow-2xl rounded-full w-80 md:w-96 h-80 md:h-96">
              <div className="space-y-4 text-center">
                <Sparkles className="mx-auto w-16 h-16 text-primary animate-pulse" />
                <p className="font-bold text-foreground text-2xl">AI Magic</p>
                <p className="text-foreground/60 text-sm">Powered by advanced neural networks</p>
              </div>
            </div>
            {/* Diagonal black shapes */}
            <div
              className="top-0 left-0 absolute bg-black w-32 h-full -skew-x-12 transform"
              style={{ clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)' }}
            />
            <div
              className="right-0 bottom-0 absolute bg-black w-32 h-full skew-x-12 transform"
              style={{ clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)' }}
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#f8f5fc] px-4 py-16 border-border">
        <div className="mx-auto max-w-5xl container">
          <p className="mb-8 text-foreground/60 text-sm text-center">
            Trusted by leading organizations
          </p>
          <div className="justify-items-center items-center gap-8 grid grid-cols-2 md:grid-cols-4">
            {['TechCorp', 'InnovateLabs', 'Digital Pro', 'Future Systems'].map((company) => (
              <div key={company} className="font-semibold text-foreground/40 text-sm">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid with Testimonials */}
      <section className="bg-[#f8f5fc] px-4 py-20">
        <div className="mx-auto max-w-5xl container">
          <div className="gap-8 grid md:grid-cols-3">
            {[
              {
                company: 'TechCorp',
                title: 'Delivered personalized experiences with AIChat',
                description:
                  'Using advanced AI capabilities to understand customer needs and deliver tailored solutions.',
              },
              {
                company: 'InnovateLabs',
                title: 'Transforming digital delivery with AIChat',
                description:
                  'A streamlined image analysis solution that enhances content strategy and delivery.',
              },
              {
                company: 'Digital Pro',
                title: 'Innovative digital experiences at scale',
                description:
                  'Scaling AI-powered solutions to create meaningful customer interactions and insights.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/50 p-8 border border-border hover:border-primary/30 rounded-xl transition"
              >
                <p className="mb-3 text-primary/60 text-xs uppercase tracking-wider">
                  {item.company}
                </p>
                <h3 className="mb-3 font-bold text-foreground text-lg">{item.title}</h3>
                <p className="text-foreground/70 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section - Deep Blue */}
      <section
        id="features"
        className="bg-gradient-to-r from-[#1a07ad] via-[#6025e8] to-[#8b27f5] px-4 py-20"
      >
        <div className="mx-auto max-w-5xl container">
          <div className="gap-12 grid md:grid-cols-2 mb-16">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 font-bold text-white text-4xl">One platform.</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  Streamline your global marketing teams to rapidly deploy personalized content for
                  any audience. Integrate everything with AIChat's unified platform for maximum
                  impact.
                </p>
              </div>
              <Link to="/register">
              <Button className="px-8 py-6 border-0 rounded-full text-white text-lg cursor-pointer gradient-red-purple">
                Discover SitecoreAI <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: Brain,
                  title: 'Content Management System',
                  desc: 'Organize, create, and deliver assets',
                },
                {
                  icon: Images,
                  title: 'Digital Asset Management',
                  desc: 'Organize, find and deliver assets',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur p-6 border border-white/20 rounded-lg"
                >
                  <item.icon className="mb-3 w-8 h-8 text-primary" />
                  <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section
        id="capabilities"
        className="bg-gradient-to-r from-[#1a07ad] via-[#6025e8] to-[#8b27f5] px-4 py-20"
      >
        <div className="mx-auto max-w-5xl container">
          <div className="mb-12">
            <h2 className="mb-4 font-bold text-white text-4xl">Unlimited possibilities.</h2>
            <p className="max-w-2xl text-white/80 text-lg">
              Orchestrate every interaction with AI-driven automation that delivers connected
              experiences.
            </p>
          </div>

          <div className="gap-6 grid md:grid-cols-2">
            {[
              {
                title: 'Personalization Engine',
                desc: 'Deliver hyper-personalized experiences powered by AI',
              },
              {
                title: 'Content Operations',
                desc: 'Streamline content creation and distribution workflows',
              },
              {
                title: 'Analytics Intelligence',
                desc: 'Understand customer behavior with AI insights',
              },
              {
                title: 'Commerce Optimization',
                desc: 'Increase conversions with intelligent recommendations',
              },
              {
                title: 'Customer Experience',
                desc: 'Create memorable interactions at every touchpoint',
              },
              {
                title: 'Workflow Automation',
                desc: 'Automate complex processes with AI assistance',
              },
            ].map((capability, idx) => (
              <div
                key={idx}
                className="bg-white/10 hover:bg-white/20 backdrop-blur p-6 border border-white/20 rounded-lg transition"
              >
                <Zap className="mb-3 w-6 h-6 text-primary" />
                <h3 className="mb-2 font-bold text-white">{capability.title}</h3>
                <p className="text-white/70 text-sm">{capability.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#f8f5fc] px-4 py-20">
        <div className="mx-auto max-w-5xl container">
          <h2 className="mb-16 font-bold text-foreground text-4xl text-center">
            Trusted by leaders
          </h2>
          <div className="gap-8 grid md:grid-cols-3">
            {[
              {
                name: 'Jennifer Hartlinger',
                title: 'Chief Business Officer of General Specialty',
                image: '👩‍💼',
              },
              {
                name: 'Rigoberto Villarante',
                title: 'Director of Global Work Marketing at Shoe',
                image: '👨‍💼',
              },
              { name: 'Tim Disston', title: 'Vice President, Platform Ops', image: '👨‍💼' },
            ].map((person, idx) => (
              <div key={idx} className="text-center">
                <div className="flex justify-center items-center bg-gradient-to-br from-primary to-accent mx-auto mb-4 rounded-lg w-40 h-40 text-6xl">
                  {person.image}
                </div>
                <h3 className="mb-1 font-bold text-foreground">{person.name}</h3>
                <p className="text-foreground/60 text-sm">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#f8f5fc] px-4 py-20 border-border border-b">
        <div className="space-y-8 mx-auto max-w-3xl text-center container">
          <h2 className="font-bold text-foreground text-4xl">Ready to do so much more?</h2>
          <p className="text-foreground/70 text-lg">
            Join 3000+ enterprise customers who use AIChat to deliver social digital experiences
            that deliver.
          </p>
          <div className="flex sm:flex-row flex-col justify-center gap-4">
            <Link to="/register">
              <Button className="px-8 py-6 border-0 rounded-full text-white text-lg cursor-pointer gradient-red-purple">
                Request a demo
              </Button>
            </Link>
            <Link to="/chat">
              <Button
                variant="outline"
                className="bg-transparent px-8 py-6 border-0 border-foreground/20 rounded-full h-12 text-foreground text-lg cursor-pointer"
              >
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a07ad] to-[#6025e8] px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl container">
          <div className="gap-8 grid md:grid-cols-5 mb-12">
            <div>
              <h4 className="mb-4 font-bold">Platform</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Image Analysis
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Capabilities
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Solutions</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Startups
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Resources</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Company</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <Link to="#" className="hover:text-white transition">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Legal</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-between items-center pt-8 border-white/20 border-t">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex items-center gap-2 w-40">
                <Link to="/">
                  <img
                    alt="Sitecore"
                    dam-content-type="Image"
                    dam-id="fnRSPQUlFUSPAd_qHZD7Zw"
                    loading="eager"
                    width="463"
                    height="100"
                    decoding="async"
                    data-nimg="1"
                    style={{ color: 'transparent' }}
                    src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/1a4cb6c5678d4a66a51589f568e71e08?t=sc42h"
                  />
                </Link>
              </div>
            </div>
            <p className="text-white/60 text-sm text-center md:text-right">
              &copy; 2026 AIChat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
