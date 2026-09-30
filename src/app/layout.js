export const metadata = {
  title: "Spoiler Safe - Spoiler-Aware TV Show Chatbot",
  description: "A RAG chatbot for TV show discussions that respects how far you've watched",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
