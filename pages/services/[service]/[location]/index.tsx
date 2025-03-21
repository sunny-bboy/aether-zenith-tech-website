import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import CTASection from '../../../../components/CTASection';
import { getServiceById, getServiceSlugs, Service } from '../../../../lib/services';
import { getLocationById, getServiceLocationPaths, Location } from '../../../../lib/locations';
import { getServiceLocationSEO } from '../../../../lib/seo';
import { useTranslation } from '../../../../hooks/useTranslation';

interface ServiceLocationPageProps {
  service: Service;
  location: Location;
}

const ServiceLocationPage: React.FC<ServiceLocationPageProps> = ({ service, location }) => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const seo = getServiceLocationSEO(service, location, locale);

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
        <link rel="alternate" hrefLang="en-GB" href={`https://aetherzenith.tech/en-GB/services/${service.id}/${location.id}`} />
        <link rel="alternate" hrefLang="en-US" href={`https://aetherzenith.tech/en-US/services/${service.id}/${location.id}`} />
        <link rel="alternate" hrefLang="en-ZA" href={`https://aetherzenith.tech/en-ZA/services/${service.id}/${location.id}`} />
        <link rel="alternate" hrefLang="es-ES" href={`https://aetherzenith.tech/es-ES/services/${service.id}/${location.id}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://aetherzenith.tech/services/${service.id}/${location.id}`} />
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
                {service.title} in {location.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                {service.shortDescription} Tailored for businesses in {location.name}, {location.country}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  {t('common.getInTouch')}
                </Link>
                <Link href="#case-studies" className="btn btn-outline border-white text-white hover:bg-white/10">
                  {t('common.viewCaseStudy')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Location Overview Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{service.title} in {location.name}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {service.fullDescription}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Our {location.name} office specializes in providing {service.title} to businesses across {location.region}. 
                  With deep expertise in {location.keyIndustries.slice(0, 3).join(', ')}, and more, 
                  we deliver tailored solutions that address the unique challenges and opportunities in the {location.name} market.
                </p>
              </div>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <Image 
                  src={`/images/locations/${location.id}.jpg`} 
                  alt={location.name} 
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Industries Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Industries We Serve in {location.name}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our {service.title} are tailored to meet the specific needs of these key industries in {location.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {location.keyIndustries.map((industry, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-4">
                      <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">{industry}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our {service.title} help {industry} businesses in {location.name} optimize operations, 
                    enhance customer experiences, and drive growth through innovative technology solutions.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Our {service.title} in {location.name}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Here's how our {service.title} can transform your business in {location.name}
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
                  <p className="text-gray-600 dark:text-gray-300">
                    Tailored specifically for the {location.name} market, this benefit helps businesses navigate 
                    local challenges and capitalize on regional opportunities.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Case Studies from {location.name}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                See how we've helped businesses in {location.name} with our {service.title}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {location.localCaseStudies.map((caseStudy, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 shadow-lg rounded-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image 
                        src={`/images/case-study-${location.id}-${index + 1}.jpg`} 
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

        {/* Contact Information Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Our {location.name} Office</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Ready to discuss how our {service.title} can help your business in {location.name}? 
                  Get in touch with our local team of experts.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-gray-600 dark:text-gray-300">{location.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">{location.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-300">{location.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/contact" className="btn btn-primary">
                    {t('common.getInTouch')}
                  </Link>
                </div>
              </div>
              
              <div className="h-96 rounded-xl overflow-hidden shadow-xl">
                <iframe 
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location.address)}&center=${location.coordinates.lat},${location.coordinates.lng}&zoom=15`} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  className="rounded-xl"
                ></iframe>
              </div>
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
  const serviceSlugs = getServiceSlugs();
  const paths = getServiceLocationPaths(serviceSlugs);
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en-GB' }) => {
  const serviceId = params?.service as string;
  const locationId = params?.location as string;
  
  const service = getServiceById(serviceId);
  const location = getLocationById(locationId);
  
  if (!service || !location) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      service,
      location,
      locale,
    },
    revalidate: 60 * 60 * 24, // Revalidate once per day
  };
};

export default ServiceLocationPage; 