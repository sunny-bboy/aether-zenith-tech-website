import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CTASection from '../../../components/CTASection';
import { getAllServices, getServiceById, getServicePaths, Service } from '../../../lib/services';
import { getAllLocations, Location } from '../../../lib/locations';
import { getServiceSEO } from '../../../lib/seo';
import { useTranslation } from '../../../hooks/useTranslation';

interface ServicePageProps {
  service: Service;
  relatedLocations: Location[];
}

const ServicePage: React.FC<ServicePageProps> = ({ service, relatedLocations }) => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const seo = getServiceSEO(service, locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.additionalMetaTags?.[0].content} />
        <meta property="og:title" content={seo.openGraph?.title || ''} />
        <meta property="og:description" content={seo.openGraph?.description || ''} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seo.canonical || ''} />
        <meta property="og:image" content={seo.openGraph?.images?.[0].url || ''} />
        <meta name="twitter:card" content={seo.twitter?.cardType || 'summary_large_image'} />
        <link rel="canonical" href={seo.canonical || ''} />
        
        {/* hreflang tags */}
        <link rel="alternate" hrefLang="en-GB" href={`https://aetherzenith.tech/en-GB/services/${service.id}`} />
        <link rel="alternate" hrefLang="en-US" href={`https://aetherzenith.tech/en-US/services/${service.id}`} />
        <link rel="alternate" hrefLang="en-ZA" href={`https://aetherzenith.tech/en-ZA/services/${service.id}`} />
        <link rel="alternate" hrefLang="es-ES" href={`https://aetherzenith.tech/es-ES/services/${service.id}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://aetherzenith.tech/services/${service.id}`} />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-white/10 p-4 rounded-full">
                  <Image 
                    src={`/images/${service.icon}`} 
                    alt={service.title} 
                    width={80} 
                    height={80}
                    className="text-white"
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {service.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  {t('common.getInTouch')}
                </Link>
                <Link href="#locations" className="btn btn-outline border-white text-white hover:bg-white/10">
                  {t('common.exploreServices')} {t('common.byLocation')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('services.overview')}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {service.fullDescription}
                </p>
              </div>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 z-10"></div>
                <div className="absolute inset-0 bg-[url('/images/services/detail.jpg')] bg-cover bg-center"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.benefits')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('services.benefitsSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-4">
                      <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">{benefit}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.technologies')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('services.technologiesSubtitle')}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {service.technologies.map((tech, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-full text-gray-800 dark:text-gray-200 font-medium">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.caseStudies')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('services.caseStudiesSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {service.caseStudies.map((caseStudy, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 shadow-lg rounded-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image 
                        src={`/images/case-study-${index + 1}.jpg`} 
                        alt={caseStudy.title} 
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                      <h3 className="text-2xl font-bold text-white relative z-10 px-6 text-center">{caseStudy.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{caseStudy.description}</p>
                    <Link href="#" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                      {t('common.readMore')} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section id="locations" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title} {t('common.byLocation')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t('services.locationsSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedLocations.map((location) => (
                <Link 
                  key={location.id} 
                  href={`/services/${service.id}/${location.id}`}
                  className="bg-white dark:bg-gray-700 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <div className="h-48 relative">
                    <Image 
                      src={`/images/locations/${location.id}.jpg`} 
                      alt={location.name} 
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{location.name}</h3>
                      <p className="text-white/80">{location.country}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{location.description}</p>
                    <div className="text-primary-600 dark:text-primary-400 font-medium">
                      {t('common.viewServices')} →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getServicePaths();
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en-GB' }) => {
  const serviceId = params?.service as string;
  const service = getServiceById(serviceId);
  
  if (!service) {
    return {
      notFound: true,
    };
  }

  const allLocations = getAllLocations();
  
  return {
    props: {
      service,
      relatedLocations: allLocations,
      locale,
    },
    revalidate: 60 * 60 * 24, // Revalidate once per day
  };
};

export default ServicePage; 