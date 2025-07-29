import styles from './GlassCard.module.scss';

const GlassCard = ({ 
  children, 
  variant = 'medium', 
  className = '', 
  hover = true,
  glow = false,
  floating = false,
  ...props 
}) => {
  const cardClasses = [
    styles.glassCard,
    styles[`variant-${variant}`],
    hover && styles.hover,
    glow && styles.glow,
    floating && styles.floating,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
