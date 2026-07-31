/**
 * config.js — Global Configuration
 * 
 * This is the ONLY file you need to edit to change:
 * - Contact info (phone, email, address)
 * - Countdown timer end date
 * - Discount percentage
 * - EmailJS settings (for form submissions)
 * - Google Maps embed URL
 * - Social media links
 * 
 * HOW TO UPDATE THE COUNTDOWN TIMER:
 * Change the 'countdownEndDate' value below to your desired end date.
 * Format: 'YYYY-MM-DDTHH:MM:SS' (Year-Month-DayTHour:Minute:Second)
 * Example: '2026-12-31T23:59:59' = December 31, 2026 at 11:59 PM
 */

export const config = {
  // ========================================
  // BUSINESS INFORMATION
  // ========================================
  businessName: 'Zeetech Technical Services',
  tagline: 'Professional Technical Services',

  // ========================================
  // CONTACT DETAILS
  // Change these to update contact info sitewide
  // ========================================
  phone: '+92 300 5518622',
  phoneClean: '+923005518622',          // used for tel: links (no spaces)
  whatsappNumber: '923005518622',       // used for wa.me links
  email: 'zeetechservices26@gmail.com',
  address: 'G-12 Ghazali Road, Islamabad',
  addressFull: 'G-12 Ghazali Road, Islamabad, Pakistan',

  // ========================================
  // BUSINESS HOURS
  // ========================================
  businessHours: {
    weekdays: 'Mon - Sat: 8:00 AM - 10:00 PM',
    sunday: 'Sun: 10:00 AM - 6:00 PM',
    emergency: '24/7 Emergency Services Available'
  },

  // ========================================
  // COUNTDOWN TIMER
  // Change 'countdownEndDate' to set when the offer expires
  // ========================================
  countdownEndDate: '2026-08-31T23:59:59', // <-- CHANGE THIS DATE
  discountPercent: 30,                      // <-- CHANGE DISCOUNT %
  offerText: 'LIMITED TIME OFFER',

  // ========================================
  // GOOGLE MAPS
  // ========================================
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.0!2d73.0479!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sG-12+Islamabad!5e0!3m2!1sen!2spk',
  googleMapsLink: 'https://maps.google.com/?q=G-12+Ghazali+Road+Islamabad+Pakistan',

  // ========================================
  // SOCIAL MEDIA LINKS
  // ========================================
  social: {
    facebook: 'https://facebook.com/zeetechservices',
    instagram: 'https://instagram.com/zeetechservices',
    tiktok: 'https://tiktok.com/@zeetechservices'
  },

  // ========================================
  // EMAILJS CONFIGURATION (for form submissions)
  // 
  // HOW TO SET UP:
  // 1. Go to https://www.emailjs.com/ and create a free account
  // 2. Add an email service (Gmail, Outlook, etc.)
  // 3. Create 2 email templates:
  //    - Booking form template (with fields: service, name, phone, email, address, date, time, message)
  //    - Review form template (with fields: name, rating, review)
  // 4. Copy your Service ID, Template IDs, and Public Key below
  // ========================================
  emailjs: {
    publicKey: 'yWrJJGQ_3XZYwPLmC',               // <-- PASTE YOUR PUBLIC KEY
    serviceId: 'service_qw37s49',               // <-- PASTE YOUR SERVICE ID
    bookingTemplateId: 'template_dgm4nd9', // <-- PASTE BOOKING TEMPLATE ID
    reviewTemplateId: 'YOUR_REVIEW_TEMPLATE',   // <-- PASTE REVIEW TEMPLATE ID
    contactTemplateId: 'template_yamm9bd'  // <-- PASTE CONTACT TEMPLATE ID
  },

  // ========================================
  // GOOGLE ANALYTICS
  // ========================================
  googleAnalyticsId: 'G-C6FNQC8YRL',
  googleVerification: 'EvANHmpMdUIBccZ6bvzk3d9mmdWdL4-65TbTR8AJtDo'
};
