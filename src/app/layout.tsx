import QueryProvider from '@/app/providers/QueryProvider';
import { BettingSlipProvider } from '@/app/context/BetSlipContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <QueryProvider>
          <BettingSlipProvider>
            {children}
          </BettingSlipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}