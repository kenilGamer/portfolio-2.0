(The file `d:\dev\portfolio-2.0\README.md` exists, but is empty)
# Portfolio 2.0

An advanced, interactive developer portfolio built with React, TypeScript, Vite, and GSAP. Showcases modern web development, 3D/GSAP animation, and a professional project gallery.

## 🚀 Features
- Animated hero, about, and section transitions (GSAP, SplitText)
- 3D/Parallax cards and effects (Three.js, custom components)
- Responsive design (Tailwind CSS)
- Project gallery with live links and GitHub
- Contact form (EmailJS integration)
- Testimonials, skills, and services sections
- Custom UI elements: MagneticButton, TiltCard, CustomCursor, PageLoader, and more

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, custom CSS
- **Animation:** GSAP, Framer Motion, Three.js
- **Email:** EmailJS
- **Other:** Locomotive Scroll, custom hooks, modular components

## 📁 Folder Structure
```
src/
  App.tsx           # Main app logic, GSAP plugin registration
  main.tsx          # Entry point
  index.css         # Global styles (Tailwind, custom)
  components/       # All UI and section components
	 3DCard.tsx      # 3D card effect
	 About.tsx       # About section (animated)
	 Contact.tsx     # Contact form (EmailJS)
	 Footer.tsx      # Footer with 3D/hover effects
	 Galaxy.css      # Galaxy background styles
	 Header.tsx      # Sticky/animated header
	 Hero.tsx        # Hero section (animated)
	 LiquidEther.tsx # Custom Three.js effect
	 Projects.tsx    # Project gallery
	 Services.tsx    # Services cards
	 Skills.tsx      # Skills with progress
	 Testimonials.tsx # Client testimonials
	 TrueFocus.tsx   # Animated text focus effect
	 ui/             # Reusable UI (MagneticButton, TiltCard, etc)
  assets/           # Static assets (e.g., react.svg)
```

## 🧩 Main Components
- **App.tsx:** Registers all GSAP plugins, renders all sections, manages global effects.
- **Header/Hero/About/Skills/Services/Projects/Contact/Testimonials/Footer:** Each is a modular, animated section.
- **Projects.tsx:**
  - Example projects:
	 - **E-commerce Platform:** Next.js, TypeScript, MongoDB ([Live](https://whitezone.vercel.app/), [GitHub](https://github.com/kenilGamer/whitezone))
	 - **3D Product Viewer:** Three.js, WebGL ([Live](https://amaya.godcraft.fun/), [GitHub](https://github.com/kenilGamer/Amaya))
	 - **AI-Powered Dashboard:** React, Node.js, TensorFlow ([Live](https://ai.godcraft.fun/), [GitHub](https://github.com/kenilGamer/AI-Image-Enhancer))
	 - **Movie Website:** React, Node.js, MongoDB ([Live](https://movies.godcraft.fun/), [GitHub](https://github.com/kenilGamer/Movies-app))
- **Contact.tsx:** EmailJS-powered contact form.
- **Skills.tsx:** Animated skill bars for frontend, backend, 3D, and tools.
- **Testimonials.tsx:** Client/company testimonials with images.

## 📦 Installation & Usage
1. **Clone the repo:**
	```sh
	git clone https://github.com/your-username/portfolio-2.0.git
	cd portfolio-2.0
	```
2. **Install dependencies:**
	```sh
	npm install
	# or
	yarn install
	```
3. **Run locally:**
	```sh
	npm run dev
	# or
	yarn dev
	```
4. **Build for production:**
	```sh
	npm run build
	```

## ✨ Credits
- [GSAP](https://greensock.com/gsap/), [Three.js](https://threejs.org/), [Framer Motion](https://www.framer.com/motion/), [Tailwind CSS](https://tailwindcss.com/), [EmailJS](https://www.emailjs.com/)
- Inspired by modern interactive portfolios and creative web design trends.

---
_Built and designed by kenil Sagani._4
