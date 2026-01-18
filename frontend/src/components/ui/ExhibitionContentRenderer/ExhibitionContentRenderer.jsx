import { PortableText } from '@portabletext/react'
import styles from './ExhibitionContentRenderer.module.scss'

const components = {
  block: {
    h1: ({children}) => <h1 className={styles.heading1}>{children}</h1>,
    h2: ({children}) => <h2 className={styles.heading2}>{children}</h2>,
    h3: ({children}) => <h3 className={styles.heading3}>{children}</h3>,
    normal: ({children}) => <p className={styles.paragraph}>{children}</p>,
    blockquote: ({children}) => <blockquote className={styles.blockquote}>{children}</blockquote>,
  },
  marks: {
    strong: ({children}) => <strong className={styles.strong}>{children}</strong>,
    em: ({children}) => <em className={styles.italic}>{children}</em>,
    underline: ({children}) => <span className={styles.underline}>{children}</span>,
    link: ({children, value}) => (
      <a 
        href={value.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.link}
      >
        {children}
      </a>
    ),
  }
}

export default function ExhibitionContentRenderer({ content, language = 'en' }) {
  if (!content || !content[language]) {
    return null
  }

  return (
    <div className={styles.content} data-content-section>
      <PortableText 
        value={content[language]} 
        components={components}
      />
    </div>
  )
}