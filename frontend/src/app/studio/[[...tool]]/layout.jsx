export async function generateStaticParams() {
  return [
    { tool: [] },
    { tool: ['desk'] },
    { tool: ['vision'] }
  ]
}

export default function StudioLayout({ children }) {
  return children
}
