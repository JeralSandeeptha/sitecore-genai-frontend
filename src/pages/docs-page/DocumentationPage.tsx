import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Copy, Check } from 'lucide-react';
import Header from '@/components/header/Header';

const components = [
  { name: 'Button', category: 'Components' },
  { name: 'Input', category: 'Components' },
  { name: 'Badge', category: 'Components' },
  { name: 'Card', category: 'Components' },
  { name: 'Alert', category: 'Components' },
  { name: 'Modal', category: 'Components' },
  { name: 'Tabs', category: 'Components' },
  { name: 'Dropdown', category: 'Components' },
]

export default function DocsPage() {
  const [selectedComponent, setSelectedComponent] = useState('Button')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`import { ${selectedComponent} } from "@/components/ui/${selectedComponent.toLowerCase()}"`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Top Navigation */}
      <Header isDoc={true} />

      <div className="flex bg-[#f8f5fc] min-h-[calc(100vh-56px)]">
        {/* Left Sidebar */}
        <aside className="hidden lg:block top-14 sticky bg-background/50 border-border border-r w-64 h-[calc(100vh-56px)] overflow-y-auto">
          <div className="space-y-8 p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground/60 text-xs uppercase">Getting Started</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-foreground/70 hover:text-foreground transition">Introduction</Link></li>
                <li><Link to="#" className="text-foreground/70 hover:text-foreground transition">Installation</Link></li>
                <li><Link to="#" className="text-foreground/70 hover:text-foreground transition">Usage</Link></li>
              </ul>
            </div>
to
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground/60 text-xs uppercase">Components</h3>
              <ul className="space-y-2 text-sm">
                {components.map((comp) => (
                  <li key={comp.name}>
                    <button
                      onClick={() => setSelectedComponent(comp.name)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedComponent === comp.name
                          ? 'bg-primary text-white'
                          : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {comp.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground/60 text-xs uppercase">Reference</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-foreground/70 hover:text-foreground transition">API Reference</Link></li>
                <li><Link to="#" className="text-foreground/70 hover:text-foreground transition">Changelog</Link></li>
                <li><Link to="#" className="text-foreground/70 hover:text-foreground transition">FAQ</Link></li>
              </ul>to
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-12 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 font-bold text-5xl">{selectedComponent}</h1>
            <p className="text-foreground/70 text-lg">
              A versatile component for displaying information. Highly customizable with support for icons, badges, and interactive states.
            </p>
          </div>

          {/* Component Preview */}
          <div className="bg-white/40 mb-12 p-8 border-2 border-border rounded-xl">
            <div className="flex flex-wrap justify-center items-center gap-4 min-h-32">
              <Button className="text-white gradient-red-purple">Primary</Button>
              <Button variant="outline" className="bg-transparent border-secondary text-secondary">Secondary</Button>
              <Button variant="ghost" className="text-foreground">Ghost</Button>
              <Button className="bg-accent text-white">Accent</Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-12 border border-border rounded-lg overflow-hidden">
            <div className="flex bg-muted p-4 border-border border-b">
              <button className="px-4 py-2 border-primary border-b-2 font-medium text-foreground text-sm">
                Usage
              </button>
              <button className="px-4 py-2 text-foreground/60 hover:text-foreground text-sm">
                API
              </button>
              <button className="px-4 py-2 text-foreground/60 hover:text-foreground text-sm">
                Examples
              </button>
            </div>

            {/* Code Block */}
            <div className="relative bg-black p-6">
              <button
                onClick={handleCopy}
                className="top-4 right-4 absolute hover:bg-white/10 p-2 rounded transition"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-white/60" />
                )}
              </button>
              <pre className="overflow-x-auto font-mono text-white/80 text-sm">
                <code>{`import { ${selectedComponent} } from "@/components/ui/${selectedComponent.toLowerCase()}"

export function ${selectedComponent}Demo() {
  return (
    <${selectedComponent}>
      Click me
    </${selectedComponent}>
  )
}`}</code>
              </pre>
            </div>
          </div>

          {/* API Reference */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-6 font-bold text-3xl">API Reference</h2>
              
              <div className="mb-8">
                <h3 className="mb-4 font-bold text-xl">{selectedComponent}</h3>
                <p className="mb-6 text-foreground/70">
                  The {selectedComponent} component displays UI elements with customizable styling and behavior.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-border border-b-2">
                        <th className="px-4 py-4 font-semibold text-foreground text-left">Prop</th>
                        <th className="px-4 py-4 font-semibold text-foreground text-left">Type</th>
                        <th className="px-4 py-4 font-semibold text-foreground text-left">Default</th>
                        <th className="px-4 py-4 font-semibold text-foreground text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-muted/50 transition">
                        <td className="px-4 py-4 font-mono text-primary">variant</td>
                        <td className="px-4 py-4 text-foreground/70">
                          <span className="bg-muted px-2 py-1 rounded text-xs">
                            "default" | "secondary" | "destructive" | "outline" | "ghost"
                          </span>
                        </td>
                        <td className="px-4 py-4 text-foreground/70">"default"</td>
                        <td className="px-4 py-4 text-foreground/70">Visual style variant</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition">
                        <td className="px-4 py-4 font-mono text-primary">size</td>
                        <td className="px-4 py-4 text-foreground/70">
                          <span className="bg-muted px-2 py-1 rounded text-xs">
                            "sm" | "md" | "lg" | "icon"
                          </span>
                        </td>
                        <td className="px-4 py-4 text-foreground/70">"md"</td>
                        <td className="px-4 py-4 text-foreground/70">Component size</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition">
                        <td className="px-4 py-4 font-mono text-primary">disabled</td>
                        <td className="px-4 py-4 text-foreground/70">
                          <span className="bg-muted px-2 py-1 rounded text-xs">
                            boolean
                          </span>
                        </td>
                        <td className="px-4 py-4 text-foreground/70">false</td>
                        <td className="px-4 py-4 text-foreground/70">Disable interaction</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition">
                        <td className="px-4 py-4 font-mono text-primary">onClick</td>
                        <td className="px-4 py-4 text-foreground/70">
                          <span className="bg-muted px-2 py-1 rounded text-xs">
                            () =&gt; void
                          </span>
                        </td>
                        <td className="px-4 py-4 text-foreground/70">-</td>
                        <td className="px-4 py-4 text-foreground/70">Click handler</td>
                      </tr>
                      <tr className="hover:bg-muted/50 transition">
                        <td className="px-4 py-4 font-mono text-primary">className</td>
                        <td className="px-4 py-4 text-foreground/70">
                          <span className="bg-muted px-2 py-1 rounded text-xs">
                            string
                          </span>
                        </td>
                        <td className="px-4 py-4 text-foreground/70">-</td>
                        <td className="px-4 py-4 text-foreground/70">Custom CSS class</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Variants Section */}
            <div>
              <h2 className="mb-6 font-bold text-2xl">Variants</h2>
              <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-white/40 p-6 border border-border rounded-lg">
                  <h3 className="mb-4 font-semibold">Primary</h3>
                  <Button className="text-white gradient-red-purple">Primary Button</Button>
                </div>
                <div className="bg-white/40 p-6 border border-border rounded-lg">
                  <h3 className="mb-4 font-semibold">Secondary</h3>
                  <Button variant="outline" className="bg-transparent border-secondary text-secondary">Secondary Button</Button>
                </div>
                <div className="bg-white/40 p-6 border border-border rounded-lg">
                  <h3 className="mb-4 font-semibold">Destructive</h3>
                  <Button className="bg-primary text-white">Destructive Button</Button>
                </div>
                <div className="bg-white/40 p-6 border border-border rounded-lg">
                  <h3 className="mb-4 font-semibold">Ghost</h3>
                  <Button variant="ghost" className="text-foreground">Ghost Button</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Content */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 mt-16 p-6 border border-primary/20 rounded-lg">
            <h3 className="mb-2 font-bold">Next.js Integration</h3>
            <p className="mb-4 text-foreground/70 text-sm">
              This component is fully compatible with Next.js App Router and can be used in both server and client components.
            </p>
            <Button variant="outline" className="bg-transparent text-sm">Learn More</Button>
          </div>
        </main>

        {/* Right Sidebar - On This Page */}
        <aside className="hidden xl:block top-14 sticky p-6 border-border border-l w-56 h-[calc(100vh-56px)] overflow-y-auto">
          <h3 className="mb-4 font-semibold text-foreground/60 text-xs uppercase">On this page</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="#" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition">
                <ChevronRight className="w-4 h-4" /> Installation
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition">
                <ChevronRight className="w-4 h-4" /> Usage
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition">
                <ChevronRight className="w-4 h-4" /> Examples
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition">
                <ChevronRight className="w-4 h-4" /> API Reference
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition">
                <ChevronRight className="w-4 h-4" /> Variants
              </Link>
            </li>
          </ul>

          <div className="bg-primary/10 mt-8 p-4 border border-primary/20 rounded-lg">
            <p className="mb-3 text-foreground/70 text-xs">
              Need help? Check our community
            </p>
            <Button variant="outline" size="sm" className="bg-transparent w-full text-xs">
              Ask a Question
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
