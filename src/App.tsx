import React, { useState, useEffect } from 'react';
import LuxBuild from './components/LuxBuild';
import TimberElite from './components/TimberElite';
import CrystalTech from './components/CrystalTech';
import UestoneGallery from './components/UestoneGallery';
import WoodFloorGallery from './components/WoodFloorGallery';
import { motion, AnimatePresence } from 'motion/react';

type View = 'lux' | 'timber' | 'crystal' | 'uestone' | 'woodfloor';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('lux');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case 'lux':
        return <LuxBuild onNavigate={(v) => setCurrentView(v as View)} />;
      case 'timber':
        return <TimberElite onNavigate={(v) => setCurrentView(v as View)} />;
      case 'crystal':
        return <CrystalTech onNavigate={(v) => setCurrentView(v as View)} />;
      case 'uestone':
        return <UestoneGallery onNavigate={(v) => setCurrentView(v as View)} />;
      case 'woodfloor':
        return <WoodFloorGallery onNavigate={(v) => setCurrentView(v as View)} />;
      default:
        return <LuxBuild onNavigate={(v) => setCurrentView(v as View)} />;
    }
  };

  return (
    <div className="font-sans antialiased">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
