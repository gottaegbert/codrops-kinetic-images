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

  const fileName = resumeToShow.asset.originalFilename || `${artistName || 'Artist'}_CV.pdf`;
  const linkText = t('exhibition.downloadArtistCV') || 'Download artist CV';

  return (
    <div className={styles.pdfDownload}>
      <a
        className={styles.singleLineLink}
        href={resumeToShow.asset.url}
        download={fileName}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${artistName || 'Artist'} CV`}
      >
        <strong>{linkText}</strong>
      </a>
    </div>
  );
}
