/**
 * services.js — Service Data
 * 
 * All service information is stored here as structured data.
 * To ADD a new service: copy one of the objects below and modify the values.
 * To EDIT a service: find it by 'id' and change the values you need.
 * To REMOVE a service: delete the entire object (including the { } braces and the comma).
 * 
 * The homepage, services page, and modals all pull from this single data source.
 */

export const services = [
  {
    id: 'ac-repair',
    name: 'AC Repair & Service',
    icon: 'fa-solid fa-snowflake',
    image: 'assets/images/services/ac-repair.webp',
    shortDescription: 'Expert AC installation, repair, gas refill & deep cleaning for all brands.',
    fullDescription: 'We provide comprehensive air conditioning services including installation, repair, maintenance, gas refilling, and deep cleaning for all major brands. Our certified technicians handle split ACs, window units, and central air conditioning systems with guaranteed quality workmanship.',
    features: [
      'AC Installation & Fitting',
      'Gas Refilling (R-22, R-410A)',
      'Deep Cleaning & Servicing',
      'PCB Board Repair',
      'Compressor Repair',
      'Thermostat Replacement',
      'Duct Cleaning',
      'Annual Maintenance Plans'
    ],
    priceRange: 'Starting from Rs. 1,500'
  },
  {
    id: 'solar-installation',
    name: 'Solar Panel Installation',
    icon: 'fa-solid fa-solar-panel',
    image: 'assets/images/services/solar-panel.webp',
    shortDescription: 'Professional solar panel installation, maintenance & consultation.',
    fullDescription: 'Go green with our professional solar panel installation services. We offer complete solutions from consultation and site survey to installation and after-sales support. Our team works with top-tier solar brands to ensure maximum energy efficiency and long-term savings on your electricity bills.',
    features: [
      'Site Survey & Consultation',
      'Solar Panel Installation',
      'Inverter Setup & Configuration',
      'Net Metering Assistance',
      'Battery Storage Solutions',
      'System Monitoring Setup',
      'Maintenance & Cleaning',
      'Warranty Support'
    ],
    priceRange: 'Custom quotes available'
  },
  {
    id: 'refrigerator-repair',
    name: 'Refrigerator Repair',
    icon: 'fa-solid fa-temperature-low',
    image: 'assets/images/services/fridge-repair.webp',
    shortDescription: 'Fast & reliable fridge repair, gas refill, and compressor services.',
    fullDescription: 'Our expert technicians handle all types of refrigerator issues — from simple thermostat adjustments to complex compressor replacements. We service all brands including Dawlance, Haier, PEL, Samsung, and LG. Same-day service available for urgent repairs.',
    features: [
      'Compressor Repair & Replacement',
      'Gas Refilling & Leak Detection',
      'Thermostat Repair',
      'Door Gasket Replacement',
      'Ice Maker Repair',
      'Deep Freezer Service',
      'Water Dispenser Repair',
      'All Brands Supported'
    ],
    priceRange: 'Starting from Rs. 1,200'
  },
  {
    id: 'inverter-services',
    name: 'Inverter & UPS Services',
    icon: 'fa-solid fa-car-battery',
    image: 'assets/images/services/inverter.webp',
    shortDescription: 'UPS installation, battery replacement & inverter repair solutions.',
    fullDescription: 'Keep your home powered during outages with our UPS and inverter services. We install, repair, and maintain all types of UPS systems and inverters. Whether you need a new installation or battery replacement, our technicians ensure uninterrupted power supply for your home or office.',
    features: [
      'UPS Installation & Setup',
      'Inverter Repair & Service',
      'Battery Replacement',
      'Voltage Stabilizer Installation',
      'Power Backup Solutions',
      'Wiring & Circuit Upgrades',
      'Load Balancing',
      'Preventive Maintenance'
    ],
    priceRange: 'Starting from Rs. 2,000'
  },
  {
    id: 'electrician',
    name: 'Electrician Services',
    icon: 'fa-solid fa-bolt',
    image: 'assets/images/services/electrician.webp',
    shortDescription: 'Licensed electricians for wiring, fixtures, circuit breakers & more.',
    fullDescription: 'Our licensed and experienced electricians handle everything from basic wiring repairs to complete electrical installations. We ensure all work meets safety standards and building codes. Available for residential, commercial, and emergency electrical services.',
    features: [
      'Electrical Wiring & Rewiring',
      'Circuit Breaker Installation',
      'Light Fixture Installation',
      'Fan Installation & Repair',
      'Switch & Socket Replacement',
      'Electrical Safety Inspection',
      'Generator Connection',
      'Emergency Electrical Repairs'
    ],
    priceRange: 'Starting from Rs. 800'
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Woodwork',
    icon: 'fa-solid fa-hammer',
    image: 'assets/images/services/carpentry.webp',
    shortDescription: 'Custom furniture, cabinet work, door repairs & wood finishing.',
    fullDescription: 'Our skilled carpenters deliver high-quality woodwork for your home and office. From custom furniture design to kitchen cabinets, door repairs, and wood finishing — we bring craftsmanship and attention to detail to every project.',
    features: [
      'Custom Furniture Design',
      'Kitchen Cabinet Installation',
      'Door Repair & Installation',
      'Wardrobe & Closet Building',
      'Wood Polishing & Finishing',
      'Partition Walls',
      'Shelving & Storage Solutions',
      'Furniture Restoration'
    ],
    priceRange: 'Starting from Rs. 2,500'
  }
];

/**
 * Helper: Get a single service by its ID
 * @param {string} id - The service id (e.g., 'ac-repair')
 * @returns {Object|undefined} The service object, or undefined if not found
 */
export function getServiceById(id) {
  return services.find(service => service.id === id);
}

/**
 * Helper: Get all service names for dropdown menus
 * @returns {Array} Array of {id, name, icon} objects
 */
export function getServiceNavItems() {
  return services.map(({ id, name, icon }) => ({ id, name, icon }));
}
