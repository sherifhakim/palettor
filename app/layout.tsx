import type {Metadata} from 'next';
import { Inter, Space_Grotesk, Geist, Fredoka } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka' });

export const metadata: Metadata = {
  title: 'MarkPalette',
  description: 'Generate beautiful color palettes',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn(space.variable, "font-sans", geist.variable,fredoka.variable)}>
      <body className="font-sans antialiased bg-zinc-50 text-zinc-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
