import "./globals.css";

export const metadata = {
  title: "Prompt Injection Playground — Learn AI Security by Breaking It",
  description:
    "An interactive CTF-style playground where you learn prompt injection attacks by exploiting vulnerable AI chatbots. 4 levels from easy to expert, across multiple AI models.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
