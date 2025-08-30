'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import styles from './PDFDownload.module.scss';

export default function PDFDownload({ artistResume, artistName }) {
  const { language, t } = useLanguage();

  if (!artistResume) return null;

  const currentResume = artistResume[language];
  const fallbackResume = artistResume[language === 'en' ? 'zh' : 'en'];
  const resumeToShow = currentResume || fallbackResume;

  if (!resumeToShow?.asset) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeToShow.asset.url;
    link.download = resumeToShow.asset.originalFilename || `${artistName || 'Artist'}_Resume.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)}MB`;
  };

  return (
    <div className={styles.pdfDownload}>
      <div className={styles.downloadCard}>
        <div className={styles.pdfIcon}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="14,2 14,8 20,8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="16"
              y1="13"
              x2="8"
              y2="13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="16"
              y1="17"
              x2="8"
              y2="17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="10,9 9,9 8,9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.downloadInfo}>
          <h3 className={styles.downloadTitle}>
            {t('exhibition.artistResume') || 'Artist Resume'}
          </h3>
          <p className={styles.downloadMeta}>
            {resumeToShow.asset.originalFilename}
            {resumeToShow.asset.size && (
              <span className={styles.fileSize}>
                • {formatFileSize(resumeToShow.asset.size)}
              </span>
            )}
          </p>
          {currentResume !== resumeToShow && (
            <p className={styles.languageNote}>
              {t('exhibition.resumeLanguageNote') || 'Available in alternate language'}
            </p>
          )}
        </div>
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          aria-label={`Download ${artistName || 'Artist'} Resume PDF`}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="7,10 12,15 17,10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="15"
              x2="12"
              y2="3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t('exhibition.download') || 'Download'}
        </button>
      </div>
    </div>
  );
}
