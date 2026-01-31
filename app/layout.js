import "./globals.css";

export const metadata = {
  title: "Prompt Injection Playground — Learn AI Security by Breaking It",
  description:
    "An interactive CTF-style playground where you learn prompt injection attacks by exploiting vulnerable AI chatbots. 5 levels from easy to expert.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
