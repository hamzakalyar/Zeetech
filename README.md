# 🔧 Zeetech Technical Services — Website

Professional technical services website for **Zeetech Technical Services** — AC repair, solar installation, refrigerator repair, inverter services, electrician, and carpentry in Islamabad & Rawalpindi, Pakistan.

🌐 **Live URL**: [https://zeetech26.com](https://zeetech26.com)

---

## 📁 Project Structure

```
Zeetech/
├── index.html                    # Homepage
├── services.html                 # Services page (flip cards)
├── about.html                    # About us page
├── contact.html                  # Contact page with form & map
├── support.html                  # Support/FAQ page
├── privacy-policy.html           # Privacy policy
├── terms-conditions.html         # Terms & conditions
├── refund-policy.html            # Refund policy
├── README.md                     # This file
│
├── assets/
│   ├── css/
│   │   ├── base.css              # Design system: reset, variables, typography
│   │   ├── layout.css            # Header, footer, navigation, containers
│   │   ├── components.css        # Buttons, cards, modals, forms, widgets
│   │   ├── responsive.css        # Media query breakpoints
│   │   └── pages/
│   │       ├── home.css          # Homepage-specific styles
│   │       ├── services.css      # Services page (flip cards)
│   │       ├── about.css         # About page (stats, values)
│   │       ├── contact.css       # Contact page (cards, map, form)
│   │       ├── support.css       # Support page (FAQ, categories)
│   │       └── policy.css        # Policy pages (shared)
│   │
│   ├── js/
│   │   ├── main.js               # Entry point — initializes all modules
│   │   ├── data/
│   │   │   ├── config.js         # ⚙️ Global settings (phone, email, timer, EmailJS)
│   │   │   └── services.js       # 📋 Service data (add/edit/remove services here)
│   │   └── modules/
│   │       ├── nav-menu.js       # Mobile hamburger, dropdowns, scroll header
│   │       ├── countdown-timer.js # Countdown timer (reads end date from config)
│   │       ├── booking-form.js   # Booking form validation & EmailJS submission
│   │       ├── review-form.js    # Review widget & star rating submission
│   │       ├── service-modal.js  # Service detail modal (dynamic from services.js)
│   │       └── form-validation.js # Shared validation utilities
│   │
│   ├── images/
│   │   ├── logo/                 # Logo and favicon files
│   │   ├── services/             # Service images (AC, solar, etc.)
│   │   ├── banners/              # Hero and promotional banners
│   │   └── icons/                # Custom icon assets
│   │
│   └── fonts/
│       ├── good-times-rg.otf     # Custom "Good Times Rg" font
│       └── good-times-rg.ttf
```

---

## ⚙️ How to Edit Common Settings

### Change Contact Info (Phone, Email, Address)
Edit: **`assets/js/data/config.js`**
```js
phone: '+92 300 5518622',        // Display format
whatsappNumber: '923005518622',  // WhatsApp link format
email: 'zeetechservices26@gmail.com',
address: 'G-12 Ghazali Road, Islamabad',
```

### Change the Countdown Timer
Edit: **`assets/js/data/config.js`**
```js
countdownEndDate: '2026-08-31T23:59:59',  // Format: YYYY-MM-DDTHH:MM:SS
discountPercent: 30,                        // Change discount percentage
```

### Add/Edit/Remove a Service
Edit: **`assets/js/data/services.js`**

Each service is an object in the `services` array. To add a new service, copy an existing one and modify:
```js
{
  id: 'new-service',
  name: 'New Service Name',
  icon: 'fa-solid fa-icon-name',
  image: 'assets/images/services/new-service.webp',
  shortDescription: 'Brief description...',
  fullDescription: 'Detailed description...',
  features: ['Feature 1', 'Feature 2', ...],
  priceRange: 'Starting from Rs. X,XXX'
}
```

### Set Up Email Form Submissions (EmailJS)
1. Go to [emailjs.com](https://www.emailjs.com/) → Create free account
2. Add your email service (Gmail, Outlook, etc.)
3. Create 3 templates: Booking, Review, Contact
4. Copy IDs into **`assets/js/data/config.js`**:
```js
emailjs: {
  publicKey: 'your_public_key_here',
  serviceId: 'your_service_id_here',
  bookingTemplateId: 'your_template_id',
  reviewTemplateId: 'your_template_id',
  contactTemplateId: 'your_template_id'
}
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure |
| TailwindCSS (CDN) | Utility classes |
| Custom CSS | Design system & components |
| Vanilla JavaScript (ES6 Modules) | Interactive functionality |
| Swiper.js 11 | Reviews carousel |
| Font Awesome 6 | Icons |
| Google Fonts (Poppins) | Typography |
| Good Times Rg | Brand heading font |
| Google Analytics | Traffic analytics |
| EmailJS | Form submissions (no server) |

---

## 🚀 Deployment

This is a **static website** — no build step required. Deploy to any static hosting:

- **GitHub Pages**: Push to `main` branch → Enable Pages in repo settings
- **Netlify**: Drag and drop the project folder, or connect GitHub repo
- **Vercel**: Import the GitHub repo
- **Shared Hosting**: Upload all files via FTP to `public_html/`

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `320px` | Small phones |
| `480px` | Large phones |
| `640px` | Small tablets |
| `768px` | Tablets / Desktop nav |
| `1024px` | Small laptops |
| `1440px` | Large desktops |

---

## 📄 License

© 2024 Zeetech Technical Services. All rights reserved.
