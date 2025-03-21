import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from '../hooks/useTranslation';

interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onError }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setFormStatus('idle');
    
    try {
      // In a real application, you would send the form data to your API
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      setFormStatus('success');
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      if (onError) onError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
      {formStatus === 'success' ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('contact.form.success')}
          </h3>
          <button
            onClick={() => setFormStatus('idle')}
            className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formStatus === 'error' && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
              {t('contact.form.error')}
            </div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('contact.form.name')}
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.name
                  ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
                  : 'border-gray-300 focus:ring-primary-200 dark:focus:ring-primary-900'
              }`}
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('contact.form.email')}
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.email
                  ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
                  : 'border-gray-300 focus:ring-primary-200 dark:focus:ring-primary-900'
              }`}
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email?.type === 'required' && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                This field is required
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                Please enter a valid email address
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('contact.form.phone')}
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-900"
                {...register('phone')}
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('contact.form.company')}
              </label>
              <input
                id="company"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-900"
                {...register('company')}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.message
                  ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900'
                  : 'border-gray-300 focus:ring-primary-200 dark:focus:ring-primary-900'
              }`}
              {...register('message', { required: true })}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                t('contact.form.submit')
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 