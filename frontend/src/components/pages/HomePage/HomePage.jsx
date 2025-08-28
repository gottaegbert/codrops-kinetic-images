import { useHomeContent } from '@/hooks/useHomeContent'
import { useSanityLanguage } from '@/contexts/SanityLanguageContext'
import ExhibitionCard from '@/components/ui/ExhibitionCard/ExhibitionCard'
import ExhibitionContentRenderer from '@/components/ui/ExhibitionContentRenderer'
import styles from './HomePage.module.scss'

export default function HomePage() {
  const { homeData, exhibitionContent, currentExhibition, loading, error } = useHomeContent()
  const { language, t } = useSanityLanguage()

  // Group content by type for easy rendering
  const contentByType = exhibitionContent.reduce((acc, content) => {
    acc[content.contentType] = content
    return acc
  }, {})

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading exhibition content...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading content: {error}</p>
      </div>
    )
  }

  if (!homeData || !currentExhibition) {
    return (
      <div className={styles.noContent}>
        <p>No current exhibition configured. Please set up content in Sanity Studio.</p>
      </div>
    )
  }

  const { heroSection, contentNavigation } = homeData

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <ExhibitionCard exhibition={currentExhibition} />
        
        {/* Exhibition info scroll */}
        <div className={styles.infiniteScroll}>
          <div className={styles.scrollContent}>
            <div className={styles.scrollItem}>
              {heroSection?.issue?.[language] || t('home.issue')}
            </div>
            <div className={styles.scrollItem}>
              {currentExhibition.artist}
            </div>
            <div className={styles.scrollItem}>
              {currentExhibition.title}
            </div>
            <div className={styles.scrollItem}>
              {heroSection?.subtitle?.[language] || t('home.visions')}
            </div>
            {/* Duplicate for seamless loop */}
            <div className={styles.scrollItem}>
              {heroSection?.issue?.[language] || t('home.issue')}
            </div>
            <div className={styles.scrollItem}>
              {currentExhibition.artist}
            </div>
            <div className={styles.scrollItem}>
              {currentExhibition.title}
            </div>
            <div className={styles.scrollItem}>
              {heroSection?.subtitle?.[language] || t('home.visions')}
            </div>
          </div>
        </div>

        {/* Page navigation */}
        <div className={styles.pageNavigation}>
          <span className={styles.navLabel}>{t('home.onThisPage')}</span>
          <div className={styles.navLinks}>
            {contentNavigation?.showPressRelease && contentByType.pressRelease && (
              <a href="#pressRelease" className={styles.navLink}>
                {contentByType.pressRelease.title[language]}
              </a>
            )}
            {contentNavigation?.showInterview && contentByType.interview && (
              <a href="#interview" className={styles.navLink}>
                {contentByType.interview.title[language]}
              </a>
            )}
            {contentNavigation?.showBiography && contentByType.biography && (
              <a href="#biography" className={styles.navLink}>
                {contentByType.biography.title[language]}
              </a>
            )}
            {contentNavigation?.showSelectedExhibition && contentByType.selectedExhibition && (
              <a href="#selectedExhibition" className={styles.navLink}>
                {contentByType.selectedExhibition.title[language]}
              </a>
            )}
            {contentNavigation?.showSelectedPress && contentByType.selectedPress && (
              <a href="#selectedPress" className={styles.navLink}>
                {contentByType.selectedPress.title[language]}
              </a>
            )}
            {contentNavigation?.showStatement && contentByType.statement && (
              <a href="#statement" className={styles.navLink}>
                {contentByType.statement.title[language]}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className={styles.contentSections}>
        {/* Press Release */}
        {contentNavigation?.showPressRelease && contentByType.pressRelease && (
          <section id="pressRelease" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
              {contentByType.pressRelease.title[language]}
            </h2>
            <ExhibitionContentRenderer 
              content={contentByType.pressRelease.content} 
              language={language}
            />
          </section>
        )}

        {/* Biography */}
        {contentNavigation?.showBiography && contentByType.biography && (
          <section id="biography" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
              {contentByType.biography.title[language]}
            </h2>
            <ExhibitionContentRenderer 
              content={contentByType.biography.content} 
              language={language}
            />
          </section>
        )}

        {/* Statement */}
        {contentNavigation?.showStatement && contentByType.statement && (
          <section id="statement" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
              {contentByType.statement.title[language]}
            </h2>
            <ExhibitionContentRenderer 
              content={contentByType.statement.content} 
              language={language}
            />
          </section>
        )}

        {/* Selected Exhibition */}
        {contentNavigation?.showSelectedExhibition && contentByType.selectedExhibition && (
          <section id="selectedExhibition" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
              {contentByType.selectedExhibition.title[language]}
            </h2>
            <ExhibitionContentRenderer 
              content={contentByType.selectedExhibition.content} 
              language={language}
            />
          </section>
        )}

        {/* Selected Press */}
        {contentNavigation?.showSelectedPress && contentByType.selectedPress && (
          <section id="selectedPress" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
              {contentByType.selectedPress.title[language]}
            </h2>
            <ExhibitionContentRenderer 
              content={contentByType.selectedPress.content} 
              language={language}
            />
          </section>
        )}

        {/* Interview */}
        {contentNavigation?.showInterview && contentByType.interview && (
          <section id="interview" className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>
              {contentByType.interview.title[language]}
            </h2>
            <ExhibitionContentRenderer 
              content={contentByType.interview.content} 
              language={language}
            />
          </section>
        )}
      </div>
    </div>
  )
}