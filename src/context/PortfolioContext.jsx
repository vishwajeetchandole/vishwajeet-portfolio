import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const STORAGE_KEY = 'vishwajeet_portfolio_data_v2';

const PortfolioContext = createContext();

// Toast notification system
let toastCallbacks = [];
export function registerToastCallback(fn) { toastCallbacks.push(fn); }
export function unregisterToastCallback(fn) { toastCallbacks = toastCallbacks.filter(f => f !== fn); }
export function showGlobalToast(message, type = 'success') {
  toastCallbacks.forEach(fn => fn(message, type));
}

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initialData to ensure new fields exist
        return {
          ...initialData,
          ...parsed,
          hero: { ...initialData.hero, ...parsed.hero },
          contact: { ...initialData.contact, ...parsed.contact },
          emailjs: { ...initialData.emailjs, ...(parsed.emailjs || {}) }
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return initialData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  const updateSection = (sectionKey, newSectionData) => {
    setData((prev) => ({ ...prev, [sectionKey]: newSectionData }));
  };

  const updateField = (sectionKey, fieldKey, value) => {
    setData((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [fieldKey]: value }
    }));
  };

  // Reorder helper: move item at index up or down in an array
  const reorderItem = (sectionKey, fromIndex, direction) => {
    const arr = [...(data[sectionKey] || [])];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= arr.length) return;
    [arr[fromIndex], arr[toIndex]] = [arr[toIndex], arr[fromIndex]];
    setData(prev => ({ ...prev, [sectionKey]: arr }));
  };

  const resetAllData = () => {
    setData(initialData);
    localStorage.removeItem(STORAGE_KEY);
    showGlobalToast('Portfolio reset to default values.', 'info');
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio_data_backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showGlobalToast('Data exported successfully!', 'success');
  };

  const importJSON = (jsonStr) => {
    try {
      const parsed = JSON.parse(jsonStr);
      setData(parsed);
      showGlobalToast('Data imported successfully!', 'success');
    } catch (e) {
      showGlobalToast('Invalid JSON file format.', 'error');
    }
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      updateSection,
      updateField,
      reorderItem,
      resetAllData,
      exportJSON,
      importJSON,
      isAdminOpen,
      setIsAdminOpen,
      toggleAdmin: () => setIsAdminOpen(prev => !prev)
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
}
