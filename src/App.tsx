import React, { useState } from 'react';
import { TopHeader } from './components/layout/TopHeader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { ProductGrid } from './components/products/ProductGrid';
import { ConfiguratorModal } from './components/rfq/ConfiguratorModal';
import { AiTechnicalAssistant } from './components/ai/AiTechnicalAssistant';
import { DealerPortal } from './components/portal/DealerPortal';
import { CustomerPortal } from './components/portal/CustomerPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TechnicalLibrary } from './components/library/TechnicalLibrary';
import { IndustriesSection } from './components/sections/IndustriesSection';
import { BrandsSection } from './components/sections/BrandsSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { SearchModal } from './components/common/SearchModal';
import { Product } from './types';
import { productsData } from './data/products';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [selectedProductForRfq, setSelectedProductForRfq] = useState<Product | undefined>(undefined);
  
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const handleOpenRfqModal = (product?: Product) => {
    setSelectedProductForRfq(product);
    setIsRfqModalOpen(true);
  };

  const handleOpenRfqByName = (productName?: string) => {
    const found = productsData.find((p) => p.name === productName);
    setSelectedProductForRfq(found);
    setIsRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 font-body antialiased selection:bg-flame-600 selection:text-white">
      
      {/* Top Header Bar */}
      <TopHeader />

      {/* Main Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenRfqModal={() => handleOpenRfqModal()}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* Main Content Router View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <HeroSection
              setActiveTab={setActiveTab}
              onOpenRfqModal={() => handleOpenRfqModal()}
              onOpenSearchModal={() => setIsSearchModalOpen(true)}
              onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            />

            <ProductGrid onConfigureRfq={(p) => handleOpenRfqModal(p)} />

            <IndustriesSection onConfigureRfq={() => handleOpenRfqModal()} />

            <BrandsSection onConfigureRfq={() => handleOpenRfqModal()} />

            <AboutSection />

            <ContactSection />
          </div>
        )}

        {activeTab === 'products' && (
          <ProductGrid onConfigureRfq={(p) => handleOpenRfqModal(p)} />
        )}

        {activeTab === 'industries' && (
          <IndustriesSection onConfigureRfq={() => handleOpenRfqModal()} />
        )}

        {activeTab === 'brands' && (
          <BrandsSection onConfigureRfq={() => handleOpenRfqModal()} />
        )}

        {activeTab === 'library' && <TechnicalLibrary />}

        {activeTab === 'dealer' && <DealerPortal />}

        {activeTab === 'customer' && <CustomerPortal />}

        {activeTab === 'admin' && <AdminDashboard />}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Global Interactive Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenRfqModal={() => handleOpenRfqModal()}
      />

      {/* Global Modals */}
      <ConfiguratorModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        initialProduct={selectedProductForRfq}
      />

      <AiTechnicalAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onConfigureRfq={(pName) => handleOpenRfqByName(pName)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectProduct={(p) => setActiveTab('products')}
        onConfigureRfq={(p) => handleOpenRfqModal(p)}
      />

    </div>
  );
};

export default App;
