import { ArrowRight, Github, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

type HeaderProps = {
    isDoc: boolean;
};

const Header = (props: HeaderProps) => {
  return (
    <header className="top-0 z-50 sticky bg-background/95 supports-[backdrop-filter]:bg-background/90 backdrop-blur py-5 border-border border-b">
        <div className="flex justify-between items-center mx-auto px-4 h-16 container">
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
                src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/84e2fe0c5c864276982940181a1f0fe3?v=39975d16"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/docs"
              className="text-foreground hover:text-foreground/70 text-lg transition"
            >
              Docs
            </Link>
            <Link
              to="#capabilities"
              className="text-foreground hover:text-foreground/70 text-lg transition"
            >
              Components
            </Link>
            <Link to="" className="text-foreground hover:text-foreground/70 text-lg transition">
              Resources
            </Link>
            <Link to="#" className="text-foreground hover:text-foreground/70 text-lg transition">
              Company
            </Link>
          </nav>
          {
            props.isDoc ? (
                <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-muted px-3 py-2 border border-border rounded-lg">
              <Search className="w-4 h-4 text-foreground/50" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none w-32 placeholder:text-foreground/40 text-sm"
              />
              <span className="text-foreground/40 text-xs">⌘K</span>
            </div>
            <Link to="https://github.com" className="text-foreground/70 hover:text-foreground">
              <Github className="w-5 h-5" />
            </Link>
          </div>
            ) : (
              <div className="flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                className="bg-transparent px-8 py-6 border-0 border-foreground/20 rounded-full h-12 text-foreground text-lg cursor-pointer"
              >
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="px-8 py-6 border-0 rounded-full text-white text-lg cursor-pointer gradient-red-purple">
                Sign In <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
            )
          }
        </div>
      </header>
  )
}

export default Header;
