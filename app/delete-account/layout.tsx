// app/delete-account/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Account | Vivexa Learn',
  description: 'Request permanent deletion of your Vivexa Learn account and associated personal data.',
  alternates: {
    canonical: 'https://vit.vivexatech.in/delete-account',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}