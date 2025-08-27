export const metadata = {
  title: 'MaKaleidos Studio',
  description: 'Content management for MaKaleidos Gallery',
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
