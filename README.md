# Valves – Frontend Practice Project

A modern and responsive frontend practice project designed for a valve products and industrial solutions website.

This project was created to practice and demonstrate frontend development concepts using React, TypeScript, Tailwind CSS, and Vite. It focuses mainly on building a professional user interface, reusable components, responsive layouts, product sections, portals, and interactive UI elements.

> **Note:** This is a frontend practice project. It does not represent a complete production-ready valve management or eCommerce system.

---

## 📌 Project Overview

The Valves project is a modern industrial-themed website frontend that presents valve products, company information, industries, technical resources, and customer/dealer interfaces.

The main purpose of this project is to practice:

- React component development
- TypeScript
- Tailwind CSS
- Responsive web design
- Reusable UI components
- Modal interfaces
- Navigation and layouts
- Product cards and filtering
- Dashboard UI design
- Frontend state management
- Modern website structure

---

## ✨ Features

### 🏠 Homepage

- Modern navigation bar
- Top header
- Hero section
- Industrial-themed design
- 3D-style valve presentation
- Company information
- Industry sections
- Brands section
- Contact section
- Responsive layout

### 📦 Product Section

- Product listing
- Product cards
- Product filtering
- Product details modal
- Product information
- Technical datasheets

### 👤 Customer Portal

A frontend interface designed to represent a customer portal with relevant customer-facing features.

### 🏢 Dealer Portal

A separate frontend interface for dealer-related interactions.

### ⚙️ Admin Dashboard

A practice dashboard interface containing administrative UI elements.

### 🤖 AI Technical Assistant

A frontend interface designed to represent an AI-based technical assistant for answering valve-related technical questions.

### 📚 Technical Library

A section for presenting technical documents, resources, and datasheets.

### 🔎 Search

Interactive search modal for exploring website content.

### 📋 RFQ / Configurator

Frontend interface for configuring product requirements and requesting quotations.

---

## 🛠️ Technologies Used

### Frontend

- React
- TypeScript
- HTML5
- CSS3

### Styling

- Tailwind CSS

### Build Tool

- Vite

### Package Management

- npm

---

## 📂 Project Structure

```text
Valves/
│
├── src/
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx
│   │   │
│   │   ├── ai/
│   │   │   └── AiTechnicalAssistant.tsx
│   │   │
│   │   ├── common/
│   │   │   └── SearchModal.tsx
│   │   │
│   │   ├── hero/
│   │   │   ├── Hero3DValve.tsx
│   │   │   └── HeroSection.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── TopHeader.tsx
│   │   │
│   │   ├── library/
│   │   │   └── TechnicalLibrary.tsx
│   │   │
│   │   ├── portal/
│   │   │   ├── CustomerPortal.tsx
│   │   │   └── DealerPortal.tsx
│   │   │
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductDetailModal.tsx
│   │   │   ├── ProductFilter.tsx
│   │   │   └── ProductGrid.tsx
│   │   │
│   │   ├── rfq/
│   │   │   └── ConfiguratorModal.tsx
│   │   │
│   │   └── sections/
│   │       ├── AboutSection.tsx
│   │       ├── BrandsSection.tsx
│   │       ├── ContactSection.tsx
│   │       └── IndustriesSection.tsx
│   │
│   ├── data/
│   │   ├── brands.ts
│   │   ├── companyInfo.ts
│   │   ├── datasheets.ts
│   │   ├── industries.ts
│   │   └── products.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── pdfHelper.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md