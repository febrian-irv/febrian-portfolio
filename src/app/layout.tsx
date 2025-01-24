import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "febrian.",
  description: "Febrian Irvansyah portfolio site",
};

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/images/f.svg" type="image/svg+xml" />
      <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet"/>
      </head>
      <body className="container mx-auto px-12 font-serif bg-blue-950 text-white">
        <div className="absolute inset-0 w-[600px] h-[600px] top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-rose-700 opacity-100 blur-[150px] z-0 pointer-events-none rounded-full"></div>
        <div className="absolute inset-0 w-[700px] h-[700px] top-[45%] left-[70%] -translate-x-1/2 -translate-y-1/2 bg-indigo-600 opacity-80 blur-[500px] z-0 pointer-events-none rounded-full"></div>
        <div className="absolute inset-0 w-[600px] h-[600px] top-[90%] left-[30%] -translate-x-1/2 -translate-y-1/2 bg-cyan-500 opacity-60 blur-[500px] z-0 pointer-events-none rounded-full"></div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
