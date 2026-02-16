import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Images,
  Zap,
  Brain,
  Sparkles,
  Code2,
  GitBranch,
  Database,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import Header from '@/components/header/Header';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <Header isDoc={false} />

      {/* Hero Section */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-background/80" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Generate Sitecore Components with <span className="gradient-red-purple-text">AI</span>
            </h1>
            <p className="text-xl text-foreground/70 text-balance max-w-3xl mx-auto">
              Teralis accelerates component creation for Sitecore XM Cloud. Connect your v0 account, describe your component, and get production-ready Next.js code instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/chat">
                <Button className="gradient-red-purple text-white border-0 text-lg h-12 px-8">
                  Start Creating <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary/10 text-lg h-12 px-8">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 px-4 border-b border-border bg-white/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold gradient-red-purple-text mb-2">30s</p>
              <p className="text-foreground/70">Component Generation Time</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-red-purple-text mb-2">100%</p>
              <p className="text-foreground/70">Sitecore Compatible</p>
            </div>
            <div>
              <p className="text-4xl font-bold gradient-red-purple-text mb-2">∞</p>
              <p className="text-foreground/70">Possibilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Sales Engineers
            </h2>
            <p className="text-lg text-foreground/60">
              Everything you need to accelerate Sitecore component development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={idx} className="group p-8 rounded-2xl bg-gradient-to-br from-white to-background border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                {/* <feature.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition" /> */}
                <h3 className="text-xl font-bold text-foreground mb-3">
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
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-white text-center mb-16">How Teralis Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
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
                <div className="bg-white/10 border border-white/20 backdrop-blur rounded-lg p-6 h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-red-purple flex items-center justify-center text-white font-bold text-lg mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/70 text-sm">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 text-white/40">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Architecture
            </h2>
            <p className="text-lg text-foreground/60">
              Built for scale with microservices, Kubernetes, and cloud-native infrastructure
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/50 border border-border">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Microservice Architecture</h3>
                  <p className="text-foreground/70">User Service, AI Service, Knowledge Service, Code Generation Service independently deployed and scaled</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Vector-Based RAG</h3>
                  <p className="text-foreground/70">Qdrant integration for semantic similarity search to retrieve relevant component patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Message Queue Processing</h3>
                  <p className="text-foreground/70">RabbitMQ for async processing with automatic retry mechanisms and dead-letter queues</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Cloud-Native Deployment</h3>
                  <p className="text-foreground/70">Docker containerized services on Kubernetes with 99% uptime target and automatic scaling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-white/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
            Perfect For
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
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
              <div key={idx} className="p-8 rounded-xl border border-border hover:border-primary/30 transition">
                <h3 className="text-xl font-bold text-foreground mb-3">{useCase.title}</h3>
                <p className="text-foreground/70">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-red-purple opacity-20" />
            <div className="relative p-12 md:p-16 text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to accelerate your workflow?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Join Sales Engineers and agencies already using Teralis to deliver Sitecore components 10x faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button className="gradient-red-purple text-white border-0 text-lg h-12 px-8">
                    Start Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="#">
                  <Button variant="outline" className="border-foreground/20 text-foreground h-12">
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
