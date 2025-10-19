// HEECO Website Generator
// Save this as "generate-heeco.js" and run: node generate-heeco.js

const fs = require('fs');
const path = require('path');

const files = {
  'package.json': `{
  "name": "heeco-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.4"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.8",
    "postcss": "^8.4.24",
    "autoprefixer": "^10.4.14"
  }
}`,

  'next.config.js': `module.exports = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}`,

  'netlify.toml': `[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,

  'postcss.config.js': `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  'tailwind.config.js': `module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          white: '#FFFFFF',
        }
      }
    }
  },
  plugins: []
}`,

  '.gitignore': `node_modules
.next
out
.env*.local
.DS_Store
*.log
package-lock.json`,

  'styles/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`,

  'pages/_app.js': `import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}`,

  'pages/_document.js': `import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="HIND ELECTRICAL & ELECTRONICS CO. - Industrial automation, LED, PCBs & Servicing" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}`,

  'components/Navbar.js': `import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">HE</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">HEECO</div>
              <div className="text-xs text-gray-500">Electrical & Electronics Co.</div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-red-600 transition font-medium">About</a>
            <a href="#services" className="text-gray-700 hover:text-red-600 transition font-medium">Services</a>
            <a href="#products" className="text-gray-700 hover:text-red-600 transition font-medium">Products</a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition font-medium">Contact</a>
            <a href="#contact" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">Get Quote</a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <a href="#about" className="block text-gray-700 hover:text-red-600">About</a>
            <a href="#services" className="block text-gray-700 hover:text-red-600">Services</a>
            <a href="#products" className="block text-gray-700 hover:text-red-600">Products</a>
            <a href="#contact" className="block text-gray-700 hover:text-red-600">Contact</a>
          </div>
        </motion.div>
      )}
    </nav>
  )
}`,

  'components/Footer.js': `export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">HEECO</div>
            <p className="text-gray-400">
              HIND ELECTRICAL & ELECTRONICS CO.<br/>
              Alwar Bypass Road, Tapukara<br/>
              Rajasthan - 301707
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-400 hover:text-white">About Us</a>
              <a href="#services" className="block text-gray-400 hover:text-white">Services</a>
              <a href="#products" className="block text-gray-400 hover:text-white">Products</a>
              <a href="#contact" className="block text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>📞 +91 74138 557163</p>
              <p>📞 +91 96025 61973</p>
              <p>✉️ heecoindia@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} HEECO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}`,

  'components/CustomerBanner.js': `import { motion } from 'framer-motion'

export default function CustomerBanner() {
  const customers = ["TATA Motors", "Mahindra", "L&T", "Siemens", "ABB", "Schneider Electric", "Honeywell", "Bosch", "GE", "Philips"]

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Trusted by Industry Leaders</h2>
        <div className="relative h-96">
          <div className="absolute inset-0 flex justify-center">
            <motion.div animate={{ y: [0, -2000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="space-y-8">
              {[...customers, ...customers, ...customers].map((customer, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1, rotate: 5 }} className="bg-white rounded-xl shadow-lg p-8 w-64 text-center border-2 border-gray-100">
                  <p className="text-xl font-bold text-gray-800">{customer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  )
}`,

  'components/ServiceCard.js': `export default function ServiceCard({ title, description, features }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-500">
      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center mb-6">
        <span className="text-3xl">⚡</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-red-600 mr-2">✓</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <a href="#contact" className="mt-6 inline-block text-red-600 font-bold hover:text-red-700">Learn More →</a>
    </div>
  )
}`,

  'components/ProductCard.js': `export default function ProductCard({ title, specs }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="h-48 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
        <span className="text-6xl">💡</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-2 mb-6">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-start text-sm">
              <span className="text-red-600 mr-2">•</span>
              <span className="text-gray-700">{spec}</span>
            </div>
          ))}
        </div>
        <a href="#contact" className="block w-full py-3 bg-red-600 text-white text-center rounded-lg font-bold hover:bg-red-700 transition">Request Quote</a>
      </div>
    </div>
  )
}`,

  'pages/index.js': `import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomerBanner from '../components/CustomerBanner'
import ServiceCard from '../components/ServiceCard'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Reliable Industrial Electrical & Electronic Solutions</h1>
              <p className="text-xl mb-8 text-red-100">At HIND ELECTRICAL AND ELECTRONICS CO., we design, manufacture and service high-quality LED lighting, custom PCBs, PLC/HMI servicing and precision components.</p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg shadow-lg hover:bg-red-50 transition">Get Quote</a>
                <a href="#products" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition">View Products</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center"><div className="text-4xl font-bold text-red-600">15+</div><div className="text-sm text-gray-600 mt-2">Years Experience</div></div>
                  <div className="text-center"><div className="text-4xl font-bold text-red-600">500+</div><div className="text-sm text-gray-600 mt-2">Projects</div></div>
                  <div className="text-center"><div className="text-4xl font-bold text-red-600">100+</div><div className="text-sm text-gray-600 mt-2">Clients</div></div>
                  <div className="text-center"><div className="text-4xl font-bold text-red-600">24/7</div><div className="text-sm text-gray-600 mt-2">Support</div></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About HEECO</h2>
              <p className="text-lg text-gray-700 mb-4">HIND ELECTRICAL AND ELECTRONICS CO. is a leading provider of innovative electrical and electronic solutions.</p>
              <p className="text-lg text-gray-700 mb-6">With expertise in manufacturing, engineering and servicing, we prioritize efficiency, safety and sustainability.</p>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl"></div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive electrical and electronic solutions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard title="LED Manufacturing" description="Design & manufacture of durable, efficient LED lighting." features={["Custom LED solutions", "Energy efficient", "50,000+ hours lifespan", "Technical support"]} />
            <ServiceCard title="PCB Design & Assembly" description="Precision PCB design with DFM optimization and testing." features={["Single & multi-layer", "DFM optimization", "Testing included", "Fast turnaround"]} />
            <ServiceCard title="PLC/HMI Servicing" description="15+ years experience in industrial automation support." features={["On-site diagnostics", "24/7 support", "Preventive maintenance", "System upgrades"]} />
          </div>
        </div>
      </section>

      <CustomerBanner />

      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">LED Product Catalogue</h2>
            <p className="text-xl text-gray-600">High-quality LED solutions with technical specifications</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard title="Industrial LED Panel - IP65" specs={["Power: 36W/48W/60W", "Lumens: 3600-6000lm", "Color: 3000K-6500K", "Lifespan: 50,000+ hours", "IP65 rated", "3 years warranty"]} />
            <ProductCard title="LED Street Light" specs={["Power: 50W/100W/150W", "Lumens: 5000-15,000lm", "Color: 4000K-5000K", "Lifespan: 50,000+ hours", "IP66 rated", "5 years warranty"]} />
            <ProductCard title="LED High Bay Light" specs={["Power: 100W/150W/200W", "Lumens: 13,000-26,000lm", "Color: 4000K-6000K", "Lifespan: 50,000+ hours", "IP65 rated", "5 years warranty"]} />
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-4">For pricing and bulk orders, contact our sales team</p>
            <a href="#contact" className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">Request Price Quote</a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-700 mb-8">Contact us for a free consultation and quote.</p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white">📍</div>
                  <div className="ml-4"><h3 className="font-bold">Address</h3><p className="text-gray-600">Alwar Bypass Road, Tapukara, Rajasthan - 301707</p></div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white">📞</div>
                  <div className="ml-4"><h3 className="font-bold">Phone</h3><p className="text-gray-600">+91 74138 557163<br/>+91 96025 61973</p></div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white">✉️</div>
                  <div className="ml-4"><h3 className="font-bold">Email</h3><p className="text-gray-600">heecoindia@gmail.com</p></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              {submitted && <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">Thank you! We'll contact you soon.</div>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Message *</label><textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500" /></div>
                <button type="submit" className="w-full px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}`,

  'public/images/logo.svg': `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="15" fill="#DC2626"/>
  <text x="50" y="60" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">HE</text>
</svg>`,
};

// Create directory structure
const dirs = ['pages', 'components', 'styles', 'public', 'public/images'];

console.log('🚀 Creating HEECO Website...\n');

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Write all files
Object.keys(files).forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  fs.writeFileSync(fullPath, files[filePath]);
  console.log(`✅ Created file: ${filePath}`);
});

console.log('\n🎉 HEECO Website created successfully!\n');
console.log('📦 Next steps:');
console.log('1. npm install');
console.log('2. npm run dev (to test locally)');
console.log('3. npm run build (to build for production)');
console.log('4. Deploy the "out" folder to Netlify\n');
console.log('✨ Done!');
