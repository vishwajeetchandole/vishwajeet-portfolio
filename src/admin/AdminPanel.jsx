import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Save, RotateCcw, Download, Upload, Plus, Trash2, ChevronUp, ChevronDown,
  User, GraduationCap, Cpu, FolderGit2, History, Award, Mail, CheckCircle, Eye,
  LogOut, Image, Link, Settings, AlertTriangle, Info, Check,
  BookOpen, Heart
} from 'lucide-react';
import { usePortfolio, showGlobalToast, registerToastCallback, unregisterToastCallback } from '../context/PortfolioContext';
import { clearAdminSession } from './AdminLogin';

// Toast Component
function Toast({ message, type, onClose }) {
  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500'
  };
  const icons = { success: Check, error: AlertTriangle, info: Info, warning: AlertTriangle };
  const ToastIcon = icons[type] || Check;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-semibold max-w-sm ${colors[type]}`}
    >
      <ToastIcon className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100 cursor-pointer">
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (message, type) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    };

    registerToastCallback(handler);
    return () => unregisterToastCallback(handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type}
            onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Reusable order controls
function OrderControls({ idx, totalLength, sectionKey, reorderItem }) {
  return (
    <div className="flex flex-col gap-0.5">
      <button
        onClick={() => reorderItem(sectionKey, idx, 'up')}
        disabled={idx === 0}
        className="p-1 text-gray-400 hover:text-brand-orange disabled:opacity-25 rounded-md hover:bg-orange-50 cursor-pointer disabled:cursor-not-allowed transition-all"
        title="Move Up"
      ><ChevronUp className="h-3.5 w-3.5" /></button>
      <button
        onClick={() => reorderItem(sectionKey, idx, 'down')}
        disabled={idx === totalLength - 1}
        className="p-1 text-gray-400 hover:text-brand-orange disabled:opacity-25 rounded-md hover:bg-orange-50 cursor-pointer disabled:cursor-not-allowed transition-all"
        title="Move Down"
      ><ChevronDown className="h-3.5 w-3.5" /></button>
    </div>
  );
}

export default function AdminPanel({ onLogout }) {
  const { data, updateSection, updateField, reorderItem, resetAllData, exportJSON, importJSON } = usePortfolio();
  const [activeTab, setActiveTab] = useState('hero');

  const handleSave = () => showGlobalToast('Changes saved & published!', 'success');

  const handleLogout = () => {
    clearAdminSession();
    if (onLogout) onLogout();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => importJSON(ev.target.result);
    reader.readAsText(file);
  };

  // Education
  const handleEducationChange = (idx, field, value) => {
    const arr = [...data.education];
    arr[idx] = { ...arr[idx], [field]: value };
    updateSection('education', arr);
  };
  const addEducation = () => {
    const newEdu = { id: Date.now(), order: data.education.length + 1, degree: "New Degree", institute: "Institute Name", duration: "2026 - Present", score: "", status: "Ongoing", description: "Enter description..." };
    updateSection('education', [...data.education, newEdu]);
    showGlobalToast('Education entry added!', 'success');
  };
  const deleteEducation = (idx) => {
    updateSection('education', data.education.filter((_, i) => i !== idx));
    showGlobalToast('Education entry removed.', 'info');
  };

  // Skills
  const handleSkillChange = (catIdx, field, value) => {
    const arr = [...data.skills];
    if (field === 'skills') {
      arr[catIdx] = { ...arr[catIdx], skills: typeof value === 'string' ? value.split(',').map(s => s.trim()).filter(Boolean) : value };
    } else {
      arr[catIdx] = { ...arr[catIdx], [field]: value };
    }
    updateSection('skills', arr);
  };
  const addSkill = () => {
    updateSection('skills', [...data.skills, { id: Date.now(), title: "New Category", iconName: "Code", skills: ["Skill 1"] }]);
    showGlobalToast('Skill category added!', 'success');
  };
  const deleteSkill = (idx) => {
    updateSection('skills', data.skills.filter((_, i) => i !== idx));
    showGlobalToast('Skill category removed.', 'info');
  };

  // Projects
  const handleProjectChange = (idx, field, value) => {
    const arr = [...data.projects];
    if (field === 'tech') {
      arr[idx] = { ...arr[idx], tech: typeof value === 'string' ? value.split(',').map(t => t.trim()).filter(Boolean) : value };
    } else {
      arr[idx] = { ...arr[idx], [field]: value };
    }
    updateSection('projects', arr);
  };
  const addProject = () => {
    updateSection('projects', [...data.projects, { id: Date.now(), order: data.projects.length + 1, title: "New Project", tagline: "Project Tagline", description: "Project description...", tech: ["React"], iconName: "Folder", accent: "orange", github: "", demo: "" }]);
    showGlobalToast('Project added!', 'success');
  };
  const deleteProject = (idx) => {
    updateSection('projects', data.projects.filter((_, i) => i !== idx));
    showGlobalToast('Project removed.', 'info');
  };

  // Journey
  const handleJourneyChange = (idx, field, value) => {
    const arr = [...data.journey];
    arr[idx] = { ...arr[idx], [field]: value };
    updateSection('journey', arr);
  };
  const addJourney = () => {
    updateSection('journey', [...data.journey, { id: Date.now(), year: "2026", iconName: "Zap", content: "New milestone...", tag: "Development" }]);
    showGlobalToast('Journey milestone added!', 'success');
  };
  const deleteJourney = (idx) => {
    updateSection('journey', data.journey.filter((_, i) => i !== idx));
    showGlobalToast('Milestone removed.', 'info');
  };

  // Achievements
  const handleAchievementChange = (idx, field, value) => {
    const arr = [...data.achievements];
    arr[idx] = { ...arr[idx], [field]: value };
    updateSection('achievements', arr);
  };
  const addAchievement = () => {
    updateSection('achievements', [...data.achievements, { id: Date.now(), order: data.achievements.length + 1, title: "New Achievement", desc: "Achievement description...", iconName: "Trophy", image: "", link: "" }]);
    showGlobalToast('Achievement added!', 'success');
  };
  const deleteAchievement = (idx) => {
    updateSection('achievements', data.achievements.filter((_, i) => i !== idx));
    showGlobalToast('Achievement removed.', 'info');
  };

  // About
  const handleAboutField = (field, value) => updateField('about', field, value);
  const handleFocusAreaChange = (idx, value) => {
    const arr = [...(data.about?.focusAreas || [])];
    arr[idx] = value;
    updateField('about', 'focusAreas', arr);
  };
  const addFocusArea = () => {
    updateField('about', 'focusAreas', [...(data.about?.focusAreas || []), 'New Focus Area']);
    showGlobalToast('Focus area added!', 'success');
  };
  const deleteFocusArea = (idx) => {
    updateField('about', 'focusAreas', (data.about?.focusAreas || []).filter((_, i) => i !== idx));
    showGlobalToast('Focus area removed.', 'info');
  };
  const handleHighlightChange = (idx, field, value) => {
    const arr = [...(data.about?.highlights || [])];
    arr[idx] = { ...arr[idx], [field]: value };
    updateField('about', 'highlights', arr);
  };
  const addHighlight = () => {
    updateField('about', 'highlights', [...(data.about?.highlights || []), { iconName: 'Code', title: 'New Highlight', desc: 'Short description' }]);
    showGlobalToast('Highlight card added!', 'success');
  };
  const deleteHighlight = (idx) => {
    updateField('about', 'highlights', (data.about?.highlights || []).filter((_, i) => i !== idx));
    showGlobalToast('Highlight card removed.', 'info');
  };

  // Beyond Coding
  const handleBeyondField = (field, value) => updateField('beyondCoding', field, value);
  const handleBeyondCardChange = (idx, field, value) => {
    const arr = [...(data.beyondCoding?.cards || [])];
    arr[idx] = { ...arr[idx], [field]: value };
    updateField('beyondCoding', 'cards', arr);
  };
  const addBeyondCard = () => {
    updateField('beyondCoding', 'cards', [...(data.beyondCoding?.cards || []), { title: 'New Interest', desc: 'Describe your interest...', iconName: 'BookOpen' }]);
    showGlobalToast('Interest card added!', 'success');
  };
  const deleteBeyondCard = (idx) => {
    updateField('beyondCoding', 'cards', (data.beyondCoding?.cards || []).filter((_, i) => i !== idx));
    showGlobalToast('Interest card removed.', 'info');
  };

  const tabs = [
    { id: 'hero', label: 'Hero & Bio', icon: User },
    { id: 'about', label: 'About Me', icon: BookOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'journey', label: 'Journey', icon: History },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'beyond', label: 'Beyond Coding', icon: Heart },
    { id: 'contact', label: 'Contact & Email', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-orange to-brand-orange-light text-white shadow-md">
            <Settings className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-xl text-gray-900">Portfolio Admin Dashboard</h1>
            <p className="text-xs text-gray-400">Editing content live — changes auto-save to browser</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" /><span>Save & Publish</span>
          </button>
          <a href="/" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            <Eye className="h-4 w-4" /><span>View Site</span>
          </a>
          <button onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider rounded-xl border border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" /><span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-5 space-y-1 overflow-y-auto flex-shrink-0">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-3">Content Sections</div>
          {tabs.map(({ id, label, icon: TabIcon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer text-left ${
                activeTab === id
                  ? 'bg-gradient-to-r from-brand-orange to-brand-orange-light text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <TabIcon className={`h-4 w-4 ${activeTab === id ? 'text-white' : 'text-gray-400'}`} />
              {label}
            </button>
          ))}

          <div className="pt-5 border-t border-gray-100 mt-4 space-y-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Data Operations</div>
            <button onClick={exportJSON}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
            ><Download className="h-3.5 w-3.5 text-brand-orange" /><span>Export JSON Backup</span></button>
            <label className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold transition-colors cursor-pointer">
              <Upload className="h-3.5 w-3.5 text-brand-orange" /><span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
            <button onClick={resetAllData}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors cursor-pointer"
            ><RotateCcw className="h-3.5 w-3.5" /><span>Reset to Defaults</span></button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">

          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-display font-extrabold text-lg text-gray-900 border-b pb-3">Hero Section</h3>
                <Field label="Welcome Badge" value={data.hero.badge} onChange={v => updateField('hero', 'badge', v)} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Display Name" value={data.hero.name} onChange={v => updateField('hero', 'name', v)} />
                  <Field label="Role / Specialization" value={data.hero.role} onChange={v => updateField('hero', 'role', v)} />
                </div>
                <Field label="Tagline (Italic Quote)" value={data.hero.tagline} onChange={v => updateField('hero', 'tagline', v)} />
                <Field label="Introduction Bio" value={data.hero.description} onChange={v => updateField('hero', 'description', v)} type="textarea" />
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 font-semibold flex items-start gap-2">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  Institute and Location are optional. Leave blank to hide them from the hero section.
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Institute (Optional)" value={data.hero.institute || ''} onChange={v => updateField('hero', 'institute', v)} placeholder="e.g. KIT College..." />
                  <Field label="Location (Optional)" value={data.hero.location || ''} onChange={v => updateField('hero', 'location', v)} placeholder="e.g. Kolhapur, Maharashtra" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-display font-extrabold text-lg text-gray-900 border-b pb-3">About Section</h3>
                <Field label="About Headline" value={data.about.subtitle} onChange={v => updateField('about', 'subtitle', v)} />
                <Field label="Bio Paragraph 1" value={data.about.bio1} onChange={v => updateField('about', 'bio1', v)} type="textarea" />
                <Field label="Bio Paragraph 2" value={data.about.bio2} onChange={v => updateField('about', 'bio2', v)} type="textarea" />
              </div>
            </div>
          )}

          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <div className="space-y-5 max-w-3xl">
              <SectionHeader title="Education Qualifications" onAdd={addEducation} addLabel="Add Qualification" />
              {data.education.map((edu, idx) => (
                <motion.div key={edu.id || idx} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-lg">Entry #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <OrderControls idx={idx} totalLength={data.education.length} sectionKey="education" reorderItem={reorderItem} />
                      <button onClick={() => deleteEducation(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Degree / Title" value={edu.degree} onChange={v => handleEducationChange(idx, 'degree', v)} />
                    <Field label="Institute" value={edu.institute} onChange={v => handleEducationChange(idx, 'institute', v)} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Field label="Duration" value={edu.duration} onChange={v => handleEducationChange(idx, 'duration', v)} />
                    <Field label="Score / Grade (Optional)" value={edu.score || ''} onChange={v => handleEducationChange(idx, 'score', v)} placeholder="e.g. Distinction" />
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">Status</label>
                      <select value={edu.status} onChange={e => handleEducationChange(idx, 'status', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border rounded-xl bg-gray-50 focus:border-brand-orange focus:outline-none"
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <Field label="Description" value={edu.description} onChange={v => handleEducationChange(idx, 'description', v)} type="textarea" rows={2} />
                </motion.div>
              ))}
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-5 max-w-3xl">
              <SectionHeader title="Skill Categories" onAdd={addSkill} addLabel="Add Category" />
              {data.skills.map((cat, idx) => (
                <motion.div key={cat.id || idx} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-orange uppercase tracking-wider bg-orange-50 border border-orange-200 px-3 py-1 rounded-lg">{cat.title}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => deleteSkill(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <Field label="Category Name" value={cat.title} onChange={v => handleSkillChange(idx, 'title', v)} />
                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">Skills (Comma separated)</label>
                    <input type="text" value={Array.isArray(cat.skills) ? cat.skills.join(', ') : cat.skills}
                      onChange={e => handleSkillChange(idx, 'skills', e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:border-brand-orange focus:outline-none focus:bg-white transition-all"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(Array.isArray(cat.skills) ? cat.skills : cat.skills.split(',').map(s => s.trim())).map((skill, si) => (
                        <span key={si} className="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-700 text-xs rounded-lg font-semibold">{skill}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-5 max-w-3xl">
              <SectionHeader title="Featured Projects" onAdd={addProject} addLabel="Add Project" />
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 font-semibold flex items-start gap-2">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                Live Demo is optional. Leave blank to hide the demo button from the project card.
              </div>
              {data.projects.map((proj, idx) => (
                <motion.div key={proj.id || idx} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">{proj.title || `Project #${idx + 1}`}</span>
                    <div className="flex items-center gap-2">
                      <OrderControls idx={idx} totalLength={data.projects.length} sectionKey="projects" reorderItem={reorderItem} />
                      <button onClick={() => deleteProject(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Project Title" value={proj.title} onChange={v => handleProjectChange(idx, 'title', v)} />
                    <Field label="Tagline / Subtitle" value={proj.tagline || ''} onChange={v => handleProjectChange(idx, 'tagline', v)} />
                  </div>
                  <Field label="Description" value={proj.description} onChange={v => handleProjectChange(idx, 'description', v)} type="textarea" rows={3} />
                  <Field label="Tech Stack (Comma separated)" value={Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech} onChange={v => handleProjectChange(idx, 'tech', v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="GitHub Link" value={proj.github || ''} onChange={v => handleProjectChange(idx, 'github', v)} placeholder="https://github.com/..." />
                    <Field label="Live Demo (Optional)" value={proj.demo || ''} onChange={v => handleProjectChange(idx, 'demo', v)} placeholder="https://yourproject.com" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">Card Color Accent</label>
                    <div className="flex gap-2">
                      {['orange', 'violet', 'sky', 'emerald', 'rose', 'amber'].map(color => (
                        <button key={color} onClick={() => handleProjectChange(idx, 'accent', color)}
                          className={`w-8 h-8 rounded-lg border-2 transition-all cursor-pointer ${proj.accent === color ? 'border-gray-700 scale-110' : 'border-gray-200'} bg-${color}-400`}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* JOURNEY TAB */}
          {activeTab === 'journey' && (
            <div className="space-y-5 max-w-3xl">
              <SectionHeader title="Journey Milestones" onAdd={addJourney} addLabel="Add Milestone" />
              {data.journey.map((item, idx) => (
                <motion.div key={item.id || idx} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-orange text-sm">{item.year}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => deleteJourney(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Year / Label" value={item.year} onChange={v => handleJourneyChange(idx, 'year', v)} />
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5">Tag / Category</label>
                      <select value={item.tag || 'Development'} onChange={e => handleJourneyChange(idx, 'tag', e.target.value)}
                        className="w-full px-3 py-2.5 text-sm border rounded-xl bg-gray-50 focus:border-brand-orange focus:outline-none"
                      >
                        {['Education', 'Development', 'Achievement', 'Current', 'Work', 'Research'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Field label="Milestone Description" value={item.content} onChange={v => handleJourneyChange(idx, 'content', v)} type="textarea" rows={2} />
                </motion.div>
              ))}
            </div>
          )}

          {/* ACHIEVEMENTS TAB */}
          {activeTab === 'achievements' && (
            <div className="space-y-5 max-w-3xl">
              <SectionHeader title="Achievements & Milestones" onAdd={addAchievement} addLabel="Add Achievement" />
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 font-semibold flex items-start gap-2">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                Image and link are optional. Leave blank to hide them from the card.
              </div>
              {data.achievements.map((item, idx) => (
                <motion.div key={item.id || idx} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">{item.title}</span>
                    <div className="flex items-center gap-2">
                      <OrderControls idx={idx} totalLength={data.achievements.length} sectionKey="achievements" reorderItem={reorderItem} />
                      <button onClick={() => deleteAchievement(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <Field label="Achievement Title" value={item.title} onChange={v => handleAchievementChange(idx, 'title', v)} />
                  <Field label="Description" value={item.desc} onChange={v => handleAchievementChange(idx, 'desc', v)} />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <Image className="h-3.5 w-3.5 text-brand-orange" /> Image URL (Optional)
                      </label>
                      <input type="text" value={item.image || ''} onChange={e => handleAchievementChange(idx, 'image', e.target.value)}
                        placeholder="https://..." className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <Link className="h-3.5 w-3.5 text-brand-orange" /> Link URL (Optional)
                      </label>
                      <input type="text" value={item.link || ''} onChange={e => handleAchievementChange(idx, 'link', e.target.value)}
                        placeholder="https://..." className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>
                  {item.image && (
                    <div className="rounded-xl overflow-hidden border border-gray-200 h-24 bg-gray-50">
                      <img src={item.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-5 max-w-3xl">
              {/* Bio */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-display font-extrabold text-lg text-gray-900 border-b pb-3">About Me — Bio</h3>
                <Field label="Section Subtitle (Main Heading)" value={data.about?.subtitle || ''} onChange={v => handleAboutField('subtitle', v)} />
                <Field label="Bio Paragraph 1" value={data.about?.bio1 || ''} onChange={v => handleAboutField('bio1', v)} type="textarea" rows={4} />
                <Field label="Bio Paragraph 2" value={data.about?.bio2 || ''} onChange={v => handleAboutField('bio2', v)} type="textarea" rows={4} />
              </div>

              {/* Focus Areas */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-display font-extrabold text-lg text-gray-900">Core Technical Focus Areas</h3>
                  <button onClick={addFocusArea} className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-brand-orange to-brand-orange-light text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                    <Plus className="h-3.5 w-3.5" /> Add Area
                  </button>
                </div>
                <div className="space-y-2">
                  {(data.about?.focusAreas || []).map((area, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={area}
                        onChange={e => handleFocusAreaChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:border-brand-orange focus:outline-none transition-all"
                      />
                      <button onClick={() => deleteFocusArea(idx)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer flex-shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Cards */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-display font-extrabold text-lg text-gray-900">Highlight Cards (Right Column)</h3>
                  <button onClick={addHighlight} className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-brand-orange to-brand-orange-light text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                    <Plus className="h-3.5 w-3.5" /> Add Card
                  </button>
                </div>
                <div className="space-y-4">
                  {(data.about?.highlights || []).map((h, idx) => (
                    <motion.div key={idx} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Card #{idx + 1}</span>
                        <button onClick={() => deleteHighlight(idx)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Title" value={h.title} onChange={v => handleHighlightChange(idx, 'title', v)} />
                        <Field label="Description" value={h.desc} onChange={v => handleHighlightChange(idx, 'desc', v)} />
                      </div>
                      <Field label="Icon Name (e.g. Terminal, Cpu, Award, Code)" value={h.iconName} onChange={v => handleHighlightChange(idx, 'iconName', v)} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BEYOND CODING TAB */}
          {activeTab === 'beyond' && (
            <div className="space-y-5 max-w-3xl">
              {/* Main Content */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-display font-extrabold text-lg text-gray-900 border-b pb-3">Beyond Coding — Intro</h3>
                <Field label="Section Description" value={data.beyondCoding?.description || ''} onChange={v => handleBeyondField('description', v)} type="textarea" rows={4} />
                <Field label="Philosophy Quote" value={data.beyondCoding?.quote || ''} onChange={v => handleBeyondField('quote', v)} placeholder="e.g. Curiosity is the engine of achievement." />
              </div>

              {/* Interest Cards */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-display font-extrabold text-lg text-gray-900">Interest Cards</h3>
                  <button onClick={addBeyondCard} className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-brand-orange to-brand-orange-light text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                    <Plus className="h-3.5 w-3.5" /> Add Card
                  </button>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 font-semibold">
                  Available icons: GitBranch, Rocket, BookOpen, BrainCircuit, Lightbulb, Compass
                </div>
                <div className="space-y-4">
                  {(data.beyondCoding?.cards || []).map((card, idx) => (
                    <motion.div key={idx} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Card #{idx + 1}</span>
                        <button onClick={() => deleteBeyondCard(idx)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Card Title" value={card.title} onChange={v => handleBeyondCardChange(idx, 'title', v)} />
                        <Field label="Icon Name" value={card.iconName} onChange={v => handleBeyondCardChange(idx, 'iconName', v)} />
                      </div>
                      <Field label="Description" value={card.desc} onChange={v => handleBeyondCardChange(idx, 'desc', v)} type="textarea" rows={2} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div className="space-y-5 max-w-3xl">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-display font-extrabold text-lg text-gray-900 border-b pb-3">Contact Information</h3>
                <Field label="Email Address" value={data.contact?.email || ''} onChange={v => updateField('contact', 'email', v)} />
                <Field label="Location" value={data.contact?.location || ''} onChange={v => updateField('contact', 'location', v)} />
                <Field label="GitHub URL" value={data.contact?.github || ''} onChange={v => updateField('contact', 'github', v)} />
                <Field label="LinkedIn URL" value={data.contact?.linkedin || ''} onChange={v => updateField('contact', 'linkedin', v)} />
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-display font-extrabold text-lg text-gray-900 border-b pb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-brand-orange" /> EmailJS Configuration
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700 font-semibold space-y-1">
                  <p className="font-bold text-sm mb-2">📧 How to set up EmailJS Auto-Reply:</p>
                  <p>1. In EmailJS dashboard, create your primary template (e.g. <code>template_contact</code>) for notifications sent to you.</p>
                  <p>2. Create a <strong>second Auto-Reply template</strong> (e.g. <code>template_autoreply</code>) configured with <code>To Email: {'{{reply_to}}'}</code> or <code>{'{{from_email}}'}</code>.</p>
                  <p>3. Add your parameters: <code>from_name</code>, <code>from_email</code>, <code>reply_to</code>, <code>message</code>.</p>
                  <p>4. Paste both Template IDs below and click Save!</p>
                </div>
                <Field label="Service ID" value={data.emailjs?.serviceId || ''} onChange={v => updateField('emailjs', 'serviceId', v)} placeholder="service_xxxxxxx" />
                <Field label="Primary Contact Template ID" value={data.emailjs?.templateId || ''} onChange={v => updateField('emailjs', 'templateId', v)} placeholder="template_xxxxxxx" />
                <Field label="Auto-Reply Template ID (Optional)" value={data.emailjs?.autoReplyTemplateId || ''} onChange={v => updateField('emailjs', 'autoReplyTemplateId', v)} placeholder="template_autoreply_xxxxxxx" />
                <Field label="Public Key" value={data.emailjs?.publicKey || ''} onChange={v => updateField('emailjs', 'publicKey', v)} placeholder="Your EmailJS public key" />
                {data.emailjs?.serviceId && data.emailjs?.templateId && data.emailjs?.publicKey &&
                  !data.emailjs.serviceId.includes('YOUR') && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-bold">
                    <CheckCircle className="h-4 w-4" /> EmailJS configured — contact form is live!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-5 max-w-3xl">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
                <h3 className="font-display font-extrabold text-lg text-gray-900 border-b pb-3">Admin Account Info</h3>
                <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600 space-y-2 font-mono">
                  <div><span className="font-bold text-gray-800">Username:</span> vishwajeet</div>
                  <div><span className="font-bold text-gray-800">Session:</span> 4 hours (auto-expires)</div>
                  <div><span className="font-bold text-gray-800">Admin Route:</span> /admin</div>
                </div>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider rounded-xl border border-red-200 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Logout from Admin
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Reusable field
function Field({ label, value, onChange, type = 'input', rows = 3, placeholder = '' }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">{label}</label>
      {type === 'textarea' ? (
        <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:border-brand-orange focus:bg-white focus:outline-none transition-all resize-none"
        />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:border-brand-orange focus:bg-white focus:outline-none transition-all"
        />
      )}
    </div>
  );
}

function SectionHeader({ title, onAdd, addLabel }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-display font-extrabold text-xl text-gray-900">{title}</h3>
      <button onClick={onAdd}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-brand-orange to-brand-orange-light text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        <Plus className="h-4 w-4" />{addLabel}
      </button>
    </div>
  );
}
