import React from 'react';
import Link from 'next/link';
import { useTranslation } from '../hooks/useTranslation';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink = '/contact',
  secondaryButtonText,
  secondaryButtonLink = '/services',
  backgroundImage = '/images/cta-background.jpg',
}) => {
  const { t } = useTranslation();

  // Use provided text or default to translations
  const ctaTitle = title || t('home.cta.title');
  const ctaSubtitle = subtitle || t('home.cta.subtitle');
  const primaryBtnText = primaryButtonText || t('home.cta.button1');
  const secondaryBtnText = secondaryButtonText || t('home.cta.button2');

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/90 z-10"></div>
        <img
          src={backgroundImage}
          alt="CTA Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {ctaTitle}
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {ctaSubtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={primaryButtonLink}>
              <a className="btn btn-primary px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                {primaryBtnText}
              </a>
            </Link>
            {secondaryBtnText && (
              <Link href={secondaryButtonLink}>
                <a className="btn btn-outline border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-colors duration-300">
                  {secondaryBtnText}
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 