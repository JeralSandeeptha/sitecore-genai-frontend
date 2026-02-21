import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Zap,
  Code2,
  GitBranch,
  Database,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import Header from '@/components/header/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header isDoc={false} />

      {/* Hero Section */}
      <section className="relative px-4 py-24 overflow-hidden bg-center bg-no-repeat bg-cover md:py-40">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/80" />
        <div className="container relative z-10 max-w-5xl mx-auto">
          <div className="mb-16 space-y-8 text-center">
            <h1 className="text-5xl font-bold leading-tight md:text-7xl text-balance">
              Generate Sitecore Components with <span className="gradient-red-purple-text">AI</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-foreground/70 text-balance">
              Teralis accelerates component creation for Sitecore XM Cloud. Connect your v0 account, describe your component, and get production-ready Next.js code instantly.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link to="/chat">
                <Button className="h-12 px-8 text-lg text-white border-0 gradient-red-purple">
                  Start Creating <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="h-12 px-8 text-lg border-2 border-secondary text-secondary hover:bg-secondary/10">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="px-4 py-16 border-b border-border bg-white/30">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <p className="mb-2 text-4xl font-bold gradient-red-purple-text">30s</p>
              <p className="text-foreground/70">Component Generation Time</p>
            </div>
            <div>
              <p className="mb-2 text-4xl font-bold gradient-red-purple-text">100%</p>
              <p className="text-foreground/70">Sitecore Compatible</p>
            </div>
            <div>
              <p className="mb-2 text-4xl font-bold gradient-red-purple-text">∞</p>
              <p className="text-foreground/70">Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 bg-white/50">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
              Powerful Features for Sales Engineers
            </h2>
            <p className="text-lg text-foreground/60">
              Everything you need to accelerate Sitecore component development
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Code2,
                title: 'AI-Powered Generation',
                desc: 'Describe components in natural language and get production-ready React/TypeScript code'
              },
              {
                icon: GitBranch,
                title: 'v0 Integration',
                desc: 'Securely connect your v0 account and generate components directly in your personal workspace'
              },
              {
                icon: Database,
                title: 'RAG Knowledge Base',
                desc: 'Leverage vector-based retrieval for context-aware component generation'
              },
              {
                icon: Shield,
                title: 'Sitecore Field Integration',
                desc: 'Auto-generate Sitecore field bindings for seamless XM Cloud integration'
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Get responses in under 30 seconds with optimized infrastructure'
              },
              {
                icon: Lock,
                title: 'Enterprise Security',
                desc: 'Encrypted API keys, HTTPS-only communication, and role-based access control'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 transition-all border group rounded-2xl bg-gradient-to-br from-white to-background border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                {/* <feature.icon className="w-12 h-12 mb-6 transition text-primary group-hover:scale-110" /> */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-foreground/70">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-[#1a07ad] via-[#6025e8] to-[#8b27f5]">
        <div className="container max-w-5xl mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center text-white">How Teralis Works</h2>
          
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                number: 1,
                title: 'Connect v0',
                desc: 'Add your v0 API key securely in your profile'
              },
              {
                number: 2,
                title: 'Describe Component',
                desc: 'Provide a prompt and optional image reference'
              },
              {
                number: 3,
                title: 'AI Generates',
                desc: 'RAG retrieves context and v0 generates code'
              },
              {
                number: 4,
                title: 'Deploy to XM Cloud',
                desc: 'Use generated component in your Sitecore project'
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="h-full p-6 border rounded-lg bg-white/10 border-white/20 backdrop-blur">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 text-lg font-bold text-white rounded-full bg-gradient-red-purple">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-white/70">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="absolute hidden transform -translate-y-1/2 md:flex top-1/2 -right-3 text-white/40">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="px-4 py-20">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
              Enterprise-Grade Architecture
            </h2>
            <p className="text-lg text-foreground/60">
              Built for scale with microservices, Kubernetes, and cloud-native infrastructure
            </p>
          </div>

          <div className="p-8 border rounded-2xl bg-white/50 border-border">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="mb-1 font-bold text-foreground">Microservice Architecture</h3>
                  <p className="text-foreground/70">User Service, AI Service, Knowledge Service, Code Generation Service independently deployed and scaled</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="mb-1 font-bold text-foreground">Vector-Based RAG</h3>
                  <p className="text-foreground/70">Qdrant integration for semantic similarity search to retrieve relevant component patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="mb-1 font-bold text-foreground">Message Queue Processing</h3>
                  <p className="text-foreground/70">RabbitMQ for async processing with automatic retry mechanisms and dead-letter queues</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="flex-shrink-0 w-6 h-6 mt-1 text-primary" />
                <div>
                  <h3 className="mb-1 font-bold text-foreground">Cloud-Native Deployment</h3>
                  <p className="text-foreground/70">Docker containerized services on Kubernetes with 99% uptime target and automatic scaling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 py-20 bg-white/30">
        <div className="container max-w-5xl mx-auto">
          <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl text-foreground">
            Perfect For
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: 'Sales Engineers',
                desc: 'Rapidly prototype and deliver custom Sitecore components without deep coding knowledge'
              },
              {
                title: 'Template Creators',
                desc: 'Accelerate marketplace template development with AI-powered component generation'
              },
              {
                title: 'Development Teams',
                desc: 'Reduce development cycle time and focus on complex business logic'
              },
              {
                title: 'Agencies',
                desc: 'Scale Sitecore project delivery while maintaining code quality and consistency'
              }
            ].map((useCase, idx) => (
              <div key={idx} className="p-8 transition border rounded-xl border-border hover:border-primary/30">
                <h3 className="mb-3 text-xl font-bold text-foreground">{useCase.title}</h3>
                <p className="text-foreground/70">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="container max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 gradient-red-purple opacity-20" />
            <div className="relative p-12 space-y-8 text-center md:p-16">
              <h2 className="text-3xl font-bold md:text-4xl text-foreground">
                Ready to accelerate your workflow?
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-foreground/70">
                Join Sales Engineers and agencies already using Teralis to deliver Sitecore components 10x faster.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link to="/register">
                  <Button className="h-12 px-8 text-lg text-white border-0 gradient-red-purple">
                    Start Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="#">
                  <Button variant="outline" className="h-12 border-foreground/20 text-foreground">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1a07ad] to-[#6025e8] px-4 py-16 text-white">
        <div className="container max-w-5xl mx-auto">
          <div className="grid gap-8 mb-12 md:grid-cols-5">
            <div>
              <h4 className="mb-4 font-bold">Platform</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Image Analysis
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Capabilities
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Solutions</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Startups
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Resources</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Company</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link to="#" className="transition hover:text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Legal</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="#" className="transition hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between pt-8 border-t md:flex-row border-white/20">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex items-center w-40 gap-2">
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
            <p className="text-sm text-center text-white/60 md:text-right">
              &copy; 2026 AIChat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
