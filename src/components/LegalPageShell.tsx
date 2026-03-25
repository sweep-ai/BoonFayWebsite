import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type LegalPageShellProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalPageShell({ title, lastUpdated, children }: LegalPageShellProps) {
  return (
    <div className="min-h-screen relative z-[1]">
      <div className="container mx-auto px-4 max-w-3xl py-12 md:py-16">
        <Link
          to="/"
          className="text-sm text-blue-400 hover:text-blue-300 mb-8 inline-block"
        >
          &larr; Back to home
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-sm text-white/50 mb-10">Last updated: {lastUpdated}</p>
        <div className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-blue-400 hover:[&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
}
