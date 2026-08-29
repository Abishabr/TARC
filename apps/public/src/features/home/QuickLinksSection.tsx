import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LINKS = [
  {
    title: 'Research Programs',
    description:
      'Explore our ongoing research initiatives in agriculture, horticulture, and plant pathology.',
    href: '/research',
  },
  {
    title: 'Our Team',
    description: 'Meet the dedicated scientists and staff driving innovation at TARC.',
    href: '/about',
  },
  {
    title: 'Get in Touch',
    description: 'Have questions or want to collaborate? Reach out to our team.',
    href: '/contact',
  },
];

export function QuickLinksSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#101712] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
            Navigate
          </p>
          <h2 className="font-heading text-[32px] lg:text-[48px] font-bold leading-[1.05]">
            How Can We Help?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="group bg-[#101712] p-8 lg:p-10 hover:bg-white/5 transition-colors"
            >
              <h3 className="text-[18px] font-semibold mb-3 group-hover:text-[#B58B45] transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-6">{link.description}</p>
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                Learn More
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
