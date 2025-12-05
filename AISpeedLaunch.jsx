import React, { useState, useEffect, useRef } from 'react'

// ============================================
// AI SPEED-LAUNCH SYSTEM - React Component
// For Framer Embed
// ============================================

export default function AISpeedLaunch() {
  // State
  const [mode, setMode] = useState('challenge') // 'challenge' | 'reference'
  const [challengeStep, setChallengeStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState({})
  const [checkboxStates, setCheckboxStates] = useState({})
  const [selectedWorkflow, setSelectedWorkflow] = useState('glowup')
  const [expandedSections, setExpandedSections] = useState({})
  const [copiedPrompt, setCopiedPrompt] = useState(null)
  const [showCelebration, setShowCelebration] = useState(false)

  // Refs for scrolling
  const step1Ref = useRef(null)
  const step2Ref = useRef(null)
  const step3Ref = useRef(null)
  const workflowRefs = {
    trend: useRef(null),
    glowup: useRef(null),
    nichepack: useRef(null),
  }

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('speedlaunch-mode')
      const savedStep = localStorage.getItem('speedlaunch-step')
      const savedCompleted = localStorage.getItem('speedlaunch-completed')
      const savedCheckboxes = localStorage.getItem('speedlaunch-checkboxes')

      if (savedMode) setMode(savedMode)
      if (savedStep) setChallengeStep(parseInt(savedStep))
      if (savedCompleted) setCompletedSteps(JSON.parse(savedCompleted))
      if (savedCheckboxes) setCheckboxStates(JSON.parse(savedCheckboxes))
    } catch (e) {
      console.log('localStorage not available')
    }
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('speedlaunch-mode', mode)
      localStorage.setItem('speedlaunch-step', challengeStep.toString())
      localStorage.setItem('speedlaunch-completed', JSON.stringify(completedSteps))
      localStorage.setItem('speedlaunch-checkboxes', JSON.stringify(checkboxStates))
    } catch (e) {
      console.log('localStorage not available')
    }
  }, [mode, challengeStep, completedSteps, checkboxStates])

  // Toggle checkbox
  const toggleCheckbox = (id) => {
    setCheckboxStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Toggle accordion
  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Copy prompt to clipboard
  const copyPrompt = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedPrompt(id)
      setTimeout(() => setCopiedPrompt(null), 2000)
    } catch (e) {
      console.log('Copy failed')
    }
  }

  // Complete step and advance
  const completeStep = (step) => {
    setCompletedSteps(prev => ({ ...prev, [step]: true }))
    if (step === 2) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
    if (step < 3) {
      setChallengeStep(step + 1)
    }
  }

  // Scroll to step
  const scrollToStep = (step) => {
    const refs = { 1: step1Ref, 2: step2Ref, 3: step3Ref }
    refs[step]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // ============================================
  // STYLES
  // ============================================
  const styles = {
    // Colors
    colors: {
      coral: '#E8927C',
      coralDark: '#D4735D',
      coralLight: '#FCE8E4',
      teal: '#2D8B8B',
      tealDark: '#1F6B6B',
      tealLight: '#E8F5F0',
      cream: '#FFF9F0',
      creamDark: '#F5EDE0',
      textDark: '#2D2D2D',
      textMedium: '#5A5A5A',
      textLight: '#888888',
      white: '#FFFFFF',
    },

    // Container - no scroll, Framer handles it
    container: {
      fontFamily: "'Satoshi', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '17px',
      lineHeight: 1.7,
      color: '#2D2D2D',
      background: '#FFFFFF',
      minHeight: '100%',
      overflow: 'visible', // Let Framer handle scrolling
    },

    // Typography
    h1: {
      fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif",
      fontWeight: 700,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0,
    },
    h2: {
      fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif",
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      margin: 0,
    },
    h3: {
      fontFamily: "'Ogg', 'Cormorant Garamond', Georgia, serif",
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.3,
      margin: 0,
    },
    label: {
      fontFamily: "'Satoshi', 'DM Sans', sans-serif",
      fontWeight: 700,
      fontSize: '0.7rem',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#888888',
    },
    mono: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.9rem',
    },

    // Layout
    section: {
      padding: '3rem 1.5rem',
      maxWidth: '800px',
      margin: '0 auto',
    },

    // Header
    header: {
      background: 'linear-gradient(180deg, #FFF9F0 0%, #FFFFFF 100%)',
      padding: '2.5rem 1.5rem',
      textAlign: 'center',
    },

    // Mode Toggle
    modeToggle: {
      display: 'inline-flex',
      background: '#F5EDE0',
      borderRadius: '100px',
      padding: '4px',
      gap: '4px',
      marginTop: '1.5rem',
    },
    modeButton: (active, color) => ({
      padding: '0.6rem 1.25rem',
      borderRadius: '100px',
      border: 'none',
      background: active ? (color === 'coral' ? '#E8927C' : '#2D8B8B') : 'transparent',
      color: active ? '#FFFFFF' : '#5A5A5A',
      fontFamily: "'Satoshi', sans-serif",
      fontWeight: 600,
      fontSize: '0.85rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),

    // The One Rule
    ruleBox: {
      background: '#FFFFFF',
      borderRadius: '16px',
      padding: '1.5rem',
      marginTop: '2rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      borderLeft: '4px solid #E8927C',
      textAlign: 'left',
    },
    ruleText: {
      fontFamily: "'Ogg', 'Cormorant Garamond', serif",
      fontWeight: 500,
      fontSize: '1.1rem',
      lineHeight: 1.7,
      color: '#2D2D2D',
      margin: 0,
    },

    // Progress Tracker
    progressBar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem',
      background: '#FFF9F0',
      borderBottom: '1px solid #F5EDE0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    progressStep: (active, completed) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '100px',
      background: active ? '#E8927C' : completed ? '#E8F5F0' : 'transparent',
      color: active ? '#FFFFFF' : completed ? '#2D8B8B' : '#888888',
      fontWeight: 600,
      fontSize: '0.85rem',
      cursor: completed || active ? 'pointer' : 'default',
      transition: 'all 0.2s',
    }),
    progressDot: (completed) => ({
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: completed ? '#2D8B8B' : '#ccc',
    }),

    // Workflow Cards
    workflowCards: {
      display: 'grid',
      gap: '1rem',
      marginTop: '1.5rem',
    },
    workflowCard: (selected, color) => ({
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center',
      gap: '1rem',
      padding: '1.25rem',
      background: selected ? (color === 'coral' ? '#FCE8E4' : '#E8F5F0') : '#FFFFFF',
      border: `2px solid ${selected ? (color === 'coral' ? '#E8927C' : '#2D8B8B') : '#F5EDE0'}`,
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    workflowIcon: (color) => ({
      width: '56px',
      height: '56px',
      background: color === 'coral' ? '#FCE8E4' : '#E8F5F0',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    workflowTime: (color) => ({
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.85rem',
      color: color === 'coral' ? '#D4735D' : '#1F6B6B',
      background: color === 'coral' ? '#FCE8E4' : '#E8F5F0',
      padding: '0.35rem 0.75rem',
      borderRadius: '100px',
    }),

    // Speed Card
    speedCard: (color) => ({
      background: '#FFFFFF',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      marginTop: '2rem',
    }),
    speedCardHeader: (color) => ({
      background: color === 'coral' ? '#E8927C' : '#2D8B8B',
      color: '#FFFFFF',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    speedCardBadge: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.9rem',
      background: 'rgba(255,255,255,0.2)',
      padding: '0.4rem 0.8rem',
      borderRadius: '100px',
    },

    // Step Item
    stepItem: (checked, color) => ({
      display: 'grid',
      gridTemplateColumns: '80px 1fr auto',
      gap: '1rem',
      padding: '1rem 0',
      borderBottom: '1px solid #F5EDE0',
      opacity: checked ? 0.6 : 1,
      transition: 'opacity 0.2s',
    }),
    stepTime: (color) => ({
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.8rem',
      color: color === 'coral' ? '#D4735D' : '#1F6B6B',
      fontWeight: 500,
    }),
    stepNum: (color) => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '22px',
      height: '22px',
      background: color === 'coral' ? '#FCE8E4' : '#E8F5F0',
      color: color === 'coral' ? '#D4735D' : '#1F6B6B',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.7rem',
      fontWeight: 600,
      borderRadius: '50%',
      marginRight: '0.5rem',
    }),

    // Checkbox
    checkbox: (checked, color) => ({
      width: '24px',
      height: '24px',
      borderRadius: '6px',
      border: `2px solid ${color === 'coral' ? '#E8927C' : '#2D8B8B'}`,
      background: checked ? (color === 'coral' ? '#E8927C' : '#2D8B8B') : '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      flexShrink: 0,
    }),

    // Checklist
    checklist: {
      background: '#FFF9F0',
      borderRadius: '16px',
      padding: '1rem',
      marginTop: '1.5rem',
    },
    checklistItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '0.75rem',
      borderBottom: '1px solid #F5EDE0',
    },

    // Prompt Block
    promptBlock: {
      background: '#FFF9F0',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
    },
    promptHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.75rem',
    },
    copyButton: (copied) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.4rem 0.8rem',
      background: copied ? '#2D8B8B' : '#F5EDE0',
      color: copied ? '#FFFFFF' : '#5A5A5A',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s',
    }),
    promptText: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.9rem',
      lineHeight: 1.7,
      color: '#2D2D2D',
      whiteSpace: 'pre-wrap',
    },
    placeholder: {
      background: '#FCE8E4',
      color: '#D4735D',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontWeight: 500,
    },

    // Accordion
    accordion: {
      border: '1px solid #F5EDE0',
      borderRadius: '12px',
      overflow: 'hidden',
      marginTop: '1rem',
    },
    accordionHeader: (open) => ({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: open ? '#FFF9F0' : '#FFFFFF',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }),
    accordionContent: (open) => ({
      maxHeight: open ? '2000px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.4s ease',
    }),
    accordionInner: {
      padding: '1rem',
      background: '#FFFFFF',
    },

    // FAQ Item
    faqItem: {
      borderBottom: '1px solid #F5EDE0',
    },
    faqQuestion: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      cursor: 'pointer',
    },
    faqAnswer: (open) => ({
      maxHeight: open ? '500px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease',
    }),
    faqAnswerInner: {
      padding: '0 1rem 1rem 1rem',
      color: '#1F6B6B',
      fontSize: '0.95rem',
    },

    // Button
    primaryButton: (color) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem 2rem',
      background: color === 'coral' ? '#E8927C' : '#2D8B8B',
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '100px',
      fontFamily: "'Satoshi', sans-serif",
      fontWeight: 700,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginTop: '1.5rem',
    }),

    // Video Card
    videoCard: (color) => ({
      display: 'grid',
      gridTemplateColumns: 'auto 1fr auto',
      alignItems: 'center',
      gap: '1rem',
      background: 'linear-gradient(135deg, #FFF9F0 0%, #FFFFFF 100%)',
      border: '2px solid #F5EDE0',
      borderRadius: '16px',
      padding: '1rem',
      marginTop: '1.5rem',
    }),
    videoThumbnail: (color) => ({
      width: '80px',
      height: '80px',
      background: color === 'coral' ? '#E8927C' : '#2D8B8B',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),

    // Data Table
    dataTable: {
      width: '100%',
      borderCollapse: 'collapse',
      background: '#FFFFFF',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
      marginTop: '1rem',
    },
    tableHeader: {
      fontWeight: 700,
      fontSize: '0.7rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#888888',
      textAlign: 'left',
      padding: '1rem',
      background: '#FFF9F0',
      borderBottom: '2px solid #F5EDE0',
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #F5EDE0',
      fontSize: '0.95rem',
    },

    // Rules List
    rulesList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    rulesItem: {
      display: 'flex',
      gap: '1rem',
      padding: '1rem 0',
      borderBottom: '1px solid #F5EDE0',
    },
    ruleNumber: (index) => ({
      fontFamily: "'Ogg', 'Cormorant Garamond', serif",
      fontSize: '1.75rem',
      fontWeight: 700,
      color: index % 2 === 0 ? '#E8927C' : '#2D8B8B',
      lineHeight: 1,
      flexShrink: 0,
      width: '2rem',
    }),

    // Celebration
    celebration: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#FFFFFF',
      borderRadius: '24px',
      padding: '3rem',
      boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
      textAlign: 'center',
      zIndex: 1000,
      animation: 'popIn 0.3s ease',
    },

    // Mini Nav
    miniNav: {
      display: 'flex',
      gap: '0.5rem',
      overflowX: 'auto',
      padding: '1rem 0',
      marginBottom: '1rem',
    },
    miniNavButton: (active) => ({
      padding: '0.5rem 1rem',
      borderRadius: '100px',
      border: 'none',
      background: active ? '#2D8B8B' : '#F5EDE0',
      color: active ? '#FFFFFF' : '#5A5A5A',
      fontWeight: 600,
      fontSize: '0.8rem',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.2s',
    }),

    // Footer
    footer: {
      textAlign: 'center',
      padding: '4rem 1.5rem',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF9F0 100%)',
    },
    footerQuote: {
      fontFamily: "'Ogg', 'Cormorant Garamond', serif",
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#2D2D2D',
      maxWidth: '480px',
      margin: '0 auto 0.5rem',
      lineHeight: 1.4,
    },
    footerSub: {
      fontSize: '1rem',
      color: '#5A5A5A',
    },
  }

  // ============================================
  // SVG ICONS
  // ============================================
  const Icons = {
    Sparkle: ({ color = '#E8927C', size = 28 }) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M14 2L16.5 11.5L26 14L16.5 16.5L14 26L11.5 16.5L2 14L11.5 11.5L14 2Z" stroke={color} strokeWidth="2" fill="none"/>
        <circle cx="14" cy="14" r="3" fill={color}/>
      </svg>
    ),
    Trend: ({ color = '#2D8B8B', size = 28 }) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <path d="M4 22L10 14L15 18L24 6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 6H24V13" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Grid: ({ color = '#2D8B8B', size = 28 }) => (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="9" height="9" rx="2" stroke={color} strokeWidth="2" fill="none"/>
        <rect x="16" y="3" width="9" height="9" rx="2" stroke={color} strokeWidth="2" fill="none"/>
        <rect x="3" y="16" width="9" height="9" rx="2" stroke={color} strokeWidth="2" fill="none"/>
        <rect x="16" y="16" width="9" height="9" rx="2" stroke={color} strokeWidth="2" fill="none"/>
      </svg>
    ),
    Play: ({ color = '#FFFFFF', size = 32 }) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M12 8L24 16L12 24V8Z" fill={color}/>
      </svg>
    ),
    Check: ({ color = '#FFFFFF', size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <path d="M3 7L6 10L11 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Chevron: ({ open, color = '#5A5A5A', size = 12 }) => (
      <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
        <path d="M2 4L6 8L10 4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Plus: ({ open, color = '#5A5A5A', size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
        <path d="M7 2V12M2 7H12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    Clock: ({ color = '#E8927C', size = 64 }) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="3" fill="none"/>
        <path d="M32 16V32L42 42" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="32" cy="32" r="4" fill={color}/>
      </svg>
    ),
    Copy: ({ size = 14 }) => (
      <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <rect x="4" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 4V2.5A1.5 1.5 0 008.5 1H2.5A1.5 1.5 0 001 2.5v6A1.5 1.5 0 002.5 10H4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    Arrow: ({ color = '#FFFFFF', size = 16 }) => (
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    Celebrate: ({ size = 64 }) => (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" fill="#E8F5F0"/>
        <path d="M22 32L28 38L42 24" stroke="#2D8B8B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  }

  // ============================================
  // PROMPT DATA
  // ============================================
  const prompts = {
    styleVariations: {
      label: 'Get Style Variations',
      text: 'Give me 10 different style variation ideas to remake this design that would sell well on Etsy in the [NICHE] niche.',
    },
    fullPrompt: {
      label: 'Get the Full Prompt',
      text: 'Write me a full AI art prompt for variation [NUMBER]. Make it [STYLE WORDS like "grungy" or "metallic" or "watercolor"]. Do not include the words "tumbler wrap design" — just say "digital design."',
    },
    moreUnique: {
      label: 'Make It More Unique',
      text: 'Rewrite this prompt to be more unique and trendy. Add [ELEMENT like "gold metallic effects" or "camouflage"]. Remove any reference to tumblers.',
    },
    screenshotToPrompt: {
      label: 'Screenshot to AI Prompt',
      text: 'Create an AI art prompt based on this image.',
    },
    themeVariations: {
      label: 'Get Theme Variations',
      text: 'Give me 10 different holiday/style themes I could apply to this design that would sell well on Etsy.',
    },
    rewriteStyle: {
      label: 'Rewrite with Chosen Style',
      text: 'Rewrite this prompt to change the style to [THEME like "Scandinavian glam gold"]. Have lots of metallic effects. Keep [MAIN ELEMENT] super cute and watercolor. Add a magical matching background.',
    },
    batchVariations: {
      label: 'Get All Variations at Once',
      text: 'Create 10 AI written prompts for the most widely known [VARIATIONS like "cancers" or "states" or "dog breeds"] for this type of style, with one prompt containing [ALL COLORS/ALL ELEMENTS] that says "[MAIN TEXT like \'Cancer Comes in Many Colors\']". The other 9 should have the text "[INDIVIDUAL TEXT like \'Survivor\']" along with its [COLOR/THEME].',
    },
    makeThemUnique: {
      label: 'Make Them More Unique',
      text: 'Rewrite prompts 2-10 to be more unique and trendy. Do not include the word "tumbler wrap design" or reference a tumbler. Include [ELEMENT like "gold metallic elements"] in all.',
    },
    quickSEO: {
      label: 'Quick SEO',
      text: 'Generate the SEO formatted title and tags for an Etsy listing for this design. The title needs to be under 40 characters and the tags need to be 13 in total and they can\'t exceed 21 characters.',
    },
  }

  // ============================================
  // COMPONENTS
  // ============================================

  // Checkbox Component
  const Checkbox = ({ id, color = 'coral', label }) => (
    <div style={styles.checklistItem} onClick={() => toggleCheckbox(id)}>
      <div style={styles.checkbox(checkboxStates[id], color)}>
        {checkboxStates[id] && <Icons.Check />}
      </div>
      <span style={{ fontSize: '0.95rem', color: '#2D2D2D' }}>{label}</span>
    </div>
  )

  // Prompt Block Component
  const PromptBlock = ({ id, label, text }) => {
    // Format text with placeholders
    const formatPrompt = (text) => {
      const parts = text.split(/(\[[^\]]+\])/)
      return parts.map((part, i) =>
        part.startsWith('[') ?
          <span key={i} style={styles.placeholder}>{part}</span> :
          part
      )
    }

    return (
      <div style={styles.promptBlock}>
        <div style={styles.promptHeader}>
          <span style={styles.label}>{label}</span>
          <button
            style={styles.copyButton(copiedPrompt === id)}
            onClick={() => copyPrompt(text, id)}
          >
            <Icons.Copy />
            {copiedPrompt === id ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div style={styles.promptText}>
          {formatPrompt(text)}
        </div>
      </div>
    )
  }

  // Accordion Component
  const Accordion = ({ id, title, children, defaultOpen = false }) => {
    const isOpen = expandedSections[id] ?? defaultOpen
    return (
      <div style={styles.accordion}>
        <div style={styles.accordionHeader(isOpen)} onClick={() => toggleSection(id)}>
          <span style={{ fontWeight: 600, color: '#2D2D2D' }}>{title}</span>
          <Icons.Chevron open={isOpen} />
        </div>
        <div style={styles.accordionContent(isOpen)}>
          <div style={styles.accordionInner}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  // FAQ Item Component
  const FAQItem = ({ id, question, answer }) => {
    const isOpen = expandedSections[id]
    return (
      <div style={styles.faqItem}>
        <div style={styles.faqQuestion} onClick={() => toggleSection(id)}>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#2D2D2D', paddingRight: '1rem' }}>"{question}"</span>
          <div style={{ width: 28, height: 28, background: isOpen ? '#FCE8E4' : '#F5EDE0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icons.Plus open={isOpen} />
          </div>
        </div>
        <div style={styles.faqAnswer(isOpen)}>
          <div style={styles.faqAnswerInner}>→ {answer}</div>
        </div>
      </div>
    )
  }

  // Speed Card Step Component
  const SpeedStep = ({ num, time, task, id, color = 'coral' }) => (
    <div style={styles.stepItem(checkboxStates[id], color)}>
      <div style={styles.stepTime(color)}>{time}</div>
      <div style={{ fontSize: '0.95rem', color: '#2D2D2D' }}>
        <span style={styles.stepNum(color)}>{num}</span>
        {task}
      </div>
      <div style={styles.checkbox(checkboxStates[id], color)} onClick={() => toggleCheckbox(id)}>
        {checkboxStates[id] && <Icons.Check />}
      </div>
    </div>
  )

  // Video Card Component
  const VideoCard = ({ workflow, title, desc, time, color = 'coral' }) => (
    <div style={styles.videoCard(color)}>
      <div style={styles.videoThumbnail(color)}>
        <Icons.Play />
      </div>
      <div>
        <div style={{ ...styles.label, color: color === 'coral' ? '#D4735D' : '#1F6B6B', marginBottom: '0.25rem' }}>{workflow}</div>
        <div style={{ fontFamily: "'Ogg', serif", fontSize: '1.15rem', fontWeight: 700, color: '#2D2D2D', marginBottom: '0.25rem' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: '#5A5A5A' }}>{desc}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#888888', marginBottom: '0.5rem' }}>{time}</div>
        <button style={{ ...styles.primaryButton(color), marginTop: 0, padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Watch</button>
      </div>
    </div>
  )

  // ============================================
  // RENDER - HEADER
  // ============================================
  const renderHeader = () => (
    <div style={styles.header}>
      <h1 style={styles.h1}>AI Speed-Launch System</h1>

      {/* Mode Toggle */}
      <div style={styles.modeToggle}>
        <button
          style={styles.modeButton(mode === 'challenge', 'coral')}
          onClick={() => setMode('challenge')}
        >
          🎯 Challenge Mode
        </button>
        <button
          style={styles.modeButton(mode === 'reference', 'teal')}
          onClick={() => setMode('reference')}
        >
          📖 Quick Reference
        </button>
      </div>

      {/* The One Rule */}
      <div style={styles.ruleBox}>
        <p style={styles.ruleText}>
          Don't start from zero. Find what's already working and make your version. Duplicate listings. Keep the SEO. Swap the art. Ship.
        </p>
      </div>
    </div>
  )

  // ============================================
  // RENDER - CHALLENGE MODE
  // ============================================
  const renderChallengeMode = () => (
    <>
      {/* Progress Tracker */}
      <div style={styles.progressBar}>
        <div
          style={styles.progressStep(challengeStep === 1, completedSteps[1])}
          onClick={() => { if (completedSteps[1] || challengeStep >= 1) { setChallengeStep(1); scrollToStep(1); }}}
        >
          <div style={styles.progressDot(completedSteps[1])} />
          Setup
        </div>
        <span style={{ color: '#ccc' }}>→</span>
        <div
          style={styles.progressStep(challengeStep === 2, completedSteps[2])}
          onClick={() => { if (completedSteps[1] || challengeStep >= 2) { setChallengeStep(2); scrollToStep(2); }}}
        >
          <div style={styles.progressDot(completedSteps[2])} />
          Glow-Up
        </div>
        <span style={{ color: '#ccc' }}>→</span>
        <div
          style={styles.progressStep(challengeStep === 3, completedSteps[3])}
          onClick={() => { if (completedSteps[2] || challengeStep >= 3) { setChallengeStep(3); scrollToStep(3); }}}
        >
          <div style={styles.progressDot(completedSteps[3])} />
          What's Next
        </div>
      </div>

      {/* Step 1: Setup */}
      <div ref={step1Ref} style={styles.section}>
        <span style={{ ...styles.label, color: '#E8927C' }}>STEP 1</span>
        <h2 style={{ ...styles.h2, marginTop: '0.5rem' }}>Get Ready</h2>

        <h3 style={{ ...styles.h3, marginTop: '2rem' }}>Open Your Tools</h3>
        <div style={styles.checklist}>
          <Checkbox id="setup-etsy" label="Etsy (logged in)" />
          <Checkbox id="setup-chatgpt" label="ChatGPT" />
          <Checkbox id="setup-kittl" label="Kittl" />
          <Checkbox id="setup-photoshop" label="Photoshop" />
          <Checkbox id="setup-bulkmockup" label="BulkMockup" />
          <Checkbox id="setup-vela" label="Vela" />
        </div>

        <h3 style={{ ...styles.h3, marginTop: '2rem' }}>Have This Handy</h3>
        <div style={{ background: '#2D2D2D', color: '#FFFFFF', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
          Canvas: 2790 × 2460 px, 300 DPI
        </div>
        <p style={{ marginTop: '1rem', color: '#5A5A5A' }}>
          <strong style={{ color: '#2D2D2D' }}>Bailey's generators:</strong> Nano Banana Pro, Sea Dream 4, Dolly 3
        </p>

        <h3 style={{ ...styles.h3, marginTop: '2rem' }}>Grab Your Shop Autopsy</h3>
        <div style={{ background: '#FCE8E4', borderRadius: '12px', padding: '1.25rem', marginTop: '1rem' }}>
          <p style={{ margin: 0, color: '#2D2D2D' }}>
            Open your Shop Autopsy Sheet. Find your FIX pile. Pick <strong>ONE</strong> listing to upgrade.
          </p>
        </div>

        <button
          style={styles.primaryButton('coral')}
          onClick={() => { completeStep(1); scrollToStep(2); }}
        >
          I'm Ready <Icons.Arrow />
        </button>
      </div>

      {/* Step 2: Glow-Up */}
      <div ref={step2Ref} style={{ ...styles.section, background: challengeStep >= 2 ? 'transparent' : '#F5F5F5', opacity: challengeStep >= 2 ? 1 : 0.5 }}>
        <span style={{ ...styles.label, color: '#E8927C' }}>STEP 2</span>
        <h2 style={{ ...styles.h2, marginTop: '0.5rem' }}>Glow-Up — Fix That Listing</h2>
        <p style={{ color: '#5A5A5A', marginTop: '0.5rem' }}>
          You picked a listing from your FIX pile. Now upgrade it with AI — new design, same SEO, back to selling.
        </p>

        {/* Loom Video */}
        <VideoCard
          workflow="WORKFLOW 2"
          title="Glow-Up Walkthrough"
          desc="Watch Bailey upgrade a listing in real-time"
          time="~25 min"
          color="coral"
        />
        <p style={{ fontSize: '0.9rem', color: '#888888', textAlign: 'center', marginTop: '0.5rem', fontStyle: 'italic' }}>
          Keep it playing. Follow along below. Don't add extra steps.
        </p>

        {/* Speed Card */}
        <div style={styles.speedCard('coral')}>
          <div style={styles.speedCardHeader('coral')}>
            <h3 style={{ ...styles.h3, color: '#FFFFFF', margin: 0 }}>Glow-Up in 60 Minutes</h3>
            <span style={styles.speedCardBadge}>30-60 min</span>
          </div>
          <div style={{ padding: '1rem 1.5rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#888888', marginBottom: '1rem' }}>
              Bailey can do this in ~30 minutes. Plan for up to 60 the first few times.
            </p>
            <SpeedStep num={1} time="0-5 min" task="Pick one listing with consistent sales but dated design" id="glowup-1" />
            <SpeedStep num={2} time="5-10 min" task="Screenshot → ChatGPT → get 10 style variations" id="glowup-2" />
            <SpeedStep num={3} time="10-15 min" task="Pick one → have ChatGPT write the full Kittl prompt" id="glowup-3" />
            <SpeedStep num={4} time="15-25 min" task="Generate in Kittl (test 2-3 generators)" id="glowup-4" />
            <SpeedStep num={5} time="25-30 min" task="Add text manually if needed, upscale, download" id="glowup-5" />
            <SpeedStep num={6} time="30-40 min" task="Make seamless in Photoshop (skip if not needed)" id="glowup-6" />
            <SpeedStep num={7} time="40-55 min" task="BulkMockup → Vela → duplicate listing → swap images + files" id="glowup-7" />
            <SpeedStep num={8} time="55-60 min" task="Final check → publish" id="glowup-8" />
          </div>
        </div>

        {/* Prompts */}
        <h3 style={{ ...styles.h3, marginTop: '2.5rem' }}>Prompts You'll Need</h3>
        <div style={{ marginTop: '1rem' }}>
          <PromptBlock id="p1" label={prompts.styleVariations.label} text={prompts.styleVariations.text} />
          <PromptBlock id="p2" label={prompts.fullPrompt.label} text={prompts.fullPrompt.text} />
          <PromptBlock id="p3" label={prompts.moreUnique.label} text={prompts.moreUnique.text} />
        </div>

        {/* Where You'll Get Stuck */}
        <Accordion id="stuck-glowup" title="If You Get Stuck">
          <div style={{ border: '1px solid #F5EDE0', borderRadius: '12px', overflow: 'hidden' }}>
            <FAQItem id="faq-1" question="I don't know how to write a good AI prompt." answer="Screenshot your old design → upload to ChatGPT → ask for 10 style variations → pick one → ask for the full prompt. It does the work." />
            <FAQItem id="faq-2" question="I'm trying to revive a listing that never sold." answer="Stop. Glow-ups are for winners. Pick something with real sales history." />
            <FAQItem id="faq-3" question="Should I rewrite the SEO?" answer="No. If it ranked before, leave it. Only change images and files." />
            <FAQItem id="faq-4" question="The AI messed up the text." answer="Add text manually in Kittl. Font → type → stroke/shadow. 2 minutes." />
            <FAQItem id="faq-5" question="Edit the original or make a new listing?" answer="Bailey duplicates and keeps SEO. Editing original is fine too — just don't change keywords." />
          </div>
        </Accordion>

        {/* Bailey's Rules */}
        <Accordion id="rules-glowup" title="Bailey's Rules for Glow-Ups">
          <ol style={styles.rulesList}>
            <li style={styles.rulesItem}>
              <span style={styles.ruleNumber(0)}>1</span>
              <p style={{ margin: 0 }}><strong>Pick listings with consistent sales and high conversion</strong> — if people buy when they find it, demand exists.</p>
            </li>
            <li style={styles.rulesItem}>
              <span style={styles.ruleNumber(1)}>2</span>
              <p style={{ margin: 0 }}><strong>Cross-niche for broader appeal</strong> — Christian + military + men = 3 audiences.</p>
            </li>
            <li style={styles.rulesItem}>
              <span style={styles.ruleNumber(2)}>3</span>
              <p style={{ margin: 0 }}><strong>Men prefer realistic, women prefer graphic</strong> — adjust generator.</p>
            </li>
            <li style={styles.rulesItem}>
              <span style={styles.ruleNumber(3)}>4</span>
              <p style={{ margin: 0 }}><strong>Duplicate, don't edit from scratch</strong> — same SEO, new art.</p>
            </li>
            <li style={{ ...styles.rulesItem, borderBottom: 'none' }}>
              <span style={styles.ruleNumber(4)}>5</span>
              <p style={{ margin: 0 }}><strong>Check quantity in Vela</strong> — back to 999 after duplicating.</p>
            </li>
          </ol>
        </Accordion>

        {/* Final Checklist */}
        <h3 style={{ ...styles.h3, marginTop: '2.5rem' }}>Final Checklist</h3>
        <p style={{ color: '#5A5A5A', marginTop: '0.5rem' }}>Before you mark this complete:</p>
        <div style={styles.checklist}>
          <Checkbox id="final-1" label="New design generated and downloaded" />
          <Checkbox id="final-2" label="Mockups created" />
          <Checkbox id="final-3" label="Listing duplicated in Vela" />
          <Checkbox id="final-4" label="Images + files swapped" />
          <Checkbox id="final-5" label="SEO left unchanged" />
          <Checkbox id="final-6" label="Quantity set to 999" />
          <Checkbox id="final-7" label="Published to Etsy" />
        </div>

        <button
          style={styles.primaryButton('coral')}
          onClick={() => { completeStep(2); scrollToStep(3); }}
        >
          I Published It! <Icons.Arrow />
        </button>
      </div>

      {/* Step 3: What's Next */}
      <div ref={step3Ref} style={{ ...styles.section, opacity: challengeStep >= 3 ? 1 : 0.5 }}>
        <span style={{ ...styles.label, color: '#2D8B8B' }}>STEP 3</span>
        <h2 style={{ ...styles.h2, marginTop: '0.5rem' }}>What's Next</h2>

        <div style={{ background: '#E8F5F0', borderRadius: '16px', padding: '1.5rem', marginTop: '1.5rem' }}>
          <p style={{ margin: 0, color: '#2D2D2D', fontSize: '1.1rem' }}>
            <strong>You just upgraded a listing using AI.</strong> That's the core skill. Everything else is just variations of what you did.
          </p>
        </div>

        <h3 style={{ ...styles.h3, marginTop: '2rem' }}>Your Options Now</h3>

        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ padding: '1.25rem', border: '2px solid #F5EDE0', borderRadius: '12px', marginBottom: '1rem' }}>
            <strong style={{ color: '#2D2D2D' }}>Option A: Do Another Glow-Up</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#5A5A5A', fontSize: '0.95rem' }}>Go back to your FIX pile, pick another listing, repeat.</p>
            <button
              style={{ ...styles.primaryButton('coral'), padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              onClick={() => { setChallengeStep(2); scrollToStep(2); }}
            >
              Do Another Glow-Up
            </button>
          </div>

          <div style={{ padding: '1.25rem', border: '2px solid #F5EDE0', borderRadius: '12px', marginBottom: '1rem' }}>
            <strong style={{ color: '#2D2D2D' }}>Option B: Try Trend → Listing</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#5A5A5A', fontSize: '0.95rem' }}>Need a brand new product? Use Workflow 1.</p>
            <button
              style={{ ...styles.primaryButton('teal'), padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              onClick={() => { setMode('reference'); setSelectedWorkflow('trend'); }}
            >
              Try Trend → Listing
            </button>
          </div>

          <div style={{ padding: '1.25rem', border: '2px solid #F5EDE0', borderRadius: '12px' }}>
            <strong style={{ color: '#2D2D2D' }}>Option C: Try Niche Pack</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#5A5A5A', fontSize: '0.95rem' }}>Want to own a whole niche with 10+ products? Use Workflow 3.</p>
            <button
              style={{ ...styles.primaryButton('teal'), padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              onClick={() => { setMode('reference'); setSelectedWorkflow('nichepack'); }}
            >
              Try Niche Pack
            </button>
          </div>
        </div>

        <p style={{ marginTop: '2rem', color: '#888888', fontStyle: 'italic', textAlign: 'center' }}>
          The other workflows work exactly like the Glow-Up — same tools, same prompts, just different starting points.
        </p>
      </div>
    </>
  )

  // ============================================
  // RENDER - QUICK REFERENCE MODE
  // ============================================
  const renderQuickReferenceMode = () => (
    <>
      {/* Workflow Selector */}
      <div style={styles.section}>
        <h3 style={{ ...styles.h3, textAlign: 'center', marginBottom: '1.5rem' }}>Choose Your Workflow</h3>

        <div style={styles.workflowCards}>
          <div
            style={styles.workflowCard(selectedWorkflow === 'glowup', 'coral')}
            onClick={() => setSelectedWorkflow('glowup')}
          >
            <div style={styles.workflowIcon('coral')}>
              <Icons.Sparkle color="#D4735D" />
            </div>
            <div>
              <div style={styles.label}>I need to fix an old listing</div>
              <div style={{ fontFamily: "'Ogg', serif", fontSize: '1.25rem', fontWeight: 700, color: '#2D2D2D' }}>Glow-Up</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#5A5A5A' }}>Same SEO, new art, more sales</p>
            </div>
            <div style={styles.workflowTime('coral')}>30-60 min</div>
          </div>

          <div
            style={styles.workflowCard(selectedWorkflow === 'trend', 'teal')}
            onClick={() => setSelectedWorkflow('trend')}
          >
            <div style={styles.workflowIcon('teal')}>
              <Icons.Trend color="#1F6B6B" />
            </div>
            <div>
              <div style={styles.label}>I need a brand new product idea</div>
              <div style={{ fontFamily: "'Ogg', serif", fontSize: '1.25rem', fontWeight: 700, color: '#2D2D2D' }}>Trend → Listing</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#5A5A5A' }}>Find what's selling, ship today</p>
            </div>
            <div style={styles.workflowTime('teal')}>45-60 min</div>
          </div>

          <div
            style={styles.workflowCard(selectedWorkflow === 'nichepack', 'teal')}
            onClick={() => setSelectedWorkflow('nichepack')}
          >
            <div style={styles.workflowIcon('teal')}>
              <Icons.Grid color="#1F6B6B" />
            </div>
            <div>
              <div style={styles.label}>I want to own a niche with 10+ products</div>
              <div style={{ fontFamily: "'Ogg', serif", fontSize: '1.25rem', fontWeight: 700, color: '#2D2D2D' }}>Niche Pack</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#5A5A5A' }}>One concept, 10+ listings</p>
            </div>
            <div style={styles.workflowTime('teal')}>60-90 min</div>
          </div>
        </div>
      </div>

      {/* Selected Workflow Content */}
      {selectedWorkflow === 'glowup' && renderGlowUpWorkflow()}
      {selectedWorkflow === 'trend' && renderTrendWorkflow()}
      {selectedWorkflow === 'nichepack' && renderNichePackWorkflow()}
    </>
  )

  // ============================================
  // RENDER - GLOW-UP WORKFLOW (Quick Ref)
  // ============================================
  const renderGlowUpWorkflow = () => (
    <div style={styles.section}>
      <span style={{ ...styles.label, color: '#D4735D', background: '#FCE8E4', padding: '0.4rem 0.8rem', borderRadius: '100px', display: 'inline-block' }}>WORKFLOW 2</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <Icons.Sparkle color="#E8927C" size={48} />
        <div>
          <h2 style={styles.h2}>Glow-Up</h2>
          <p style={{ margin: 0, color: '#5A5A5A' }}>Upgrade one existing listing with a fresh AI design. Same SEO, new art, more sales.</p>
        </div>
      </div>

      <VideoCard workflow="WORKFLOW 2" title="Glow-Up Walkthrough" desc="Watch Bailey upgrade a listing" time="~25 min" color="coral" />

      {/* Speed Card */}
      <div style={styles.speedCard('coral')}>
        <div style={styles.speedCardHeader('coral')}>
          <h3 style={{ ...styles.h3, color: '#FFFFFF', margin: 0 }}>Speed Card</h3>
          <span style={styles.speedCardBadge}>30-60 min</span>
        </div>
        <div style={{ padding: '1rem 1.5rem' }}>
          <SpeedStep num={1} time="0-5 min" task="Pick one listing with consistent sales but dated design" id="ref-glowup-1" />
          <SpeedStep num={2} time="5-10 min" task="Screenshot → ChatGPT → get 10 style variations" id="ref-glowup-2" />
          <SpeedStep num={3} time="10-15 min" task="Pick one → have ChatGPT write the full Kittl prompt" id="ref-glowup-3" />
          <SpeedStep num={4} time="15-25 min" task="Generate in Kittl (test 2-3 generators)" id="ref-glowup-4" />
          <SpeedStep num={5} time="25-30 min" task="Add text manually if needed, upscale, download" id="ref-glowup-5" />
          <SpeedStep num={6} time="30-40 min" task="Make seamless in Photoshop (skip if not needed)" id="ref-glowup-6" />
          <SpeedStep num={7} time="40-55 min" task="BulkMockup → Vela → duplicate listing → swap images + files" id="ref-glowup-7" />
          <SpeedStep num={8} time="55-60 min" task="Final check → publish" id="ref-glowup-8" />
        </div>
      </div>

      <Accordion id="ref-glowup-checklist" title="Checklist">
        <div style={{ background: '#FFF9F0', borderRadius: '12px', padding: '0.5rem' }}>
          <Checkbox id="ref-gc-1" label="Picked a listing with real sales history" />
          <Checkbox id="ref-gc-2" label="Got style variations from ChatGPT" />
          <Checkbox id="ref-gc-3" label="Generated upgraded design in Kittl" />
          <Checkbox id="ref-gc-4" label="Made seamless (if needed)" />
          <Checkbox id="ref-gc-5" label="Created mockups" />
          <Checkbox id="ref-gc-6" label="Duplicated listing in Vela" />
          <Checkbox id="ref-gc-7" label="Swapped images + digital files (kept SEO)" />
          <Checkbox id="ref-gc-8" label="Set quantity to 999" />
          <Checkbox id="ref-gc-9" label="Published" />
        </div>
      </Accordion>

      <Accordion id="ref-glowup-prompts" title="Prompts" defaultOpen>
        <PromptBlock id="ref-p1" label={prompts.styleVariations.label} text={prompts.styleVariations.text} />
        <PromptBlock id="ref-p2" label={prompts.fullPrompt.label} text={prompts.fullPrompt.text} />
        <PromptBlock id="ref-p3" label={prompts.moreUnique.label} text={prompts.moreUnique.text} />
      </Accordion>

      <Accordion id="ref-glowup-stuck" title="Where You'll Get Stuck">
        <div style={{ border: '1px solid #F5EDE0', borderRadius: '12px', overflow: 'hidden' }}>
          <FAQItem id="ref-faq-1" question="I don't know how to write a good AI prompt." answer="Screenshot your old design → upload to ChatGPT → ask for 10 style variations → pick one → ask for the full prompt." />
          <FAQItem id="ref-faq-2" question="I'm trying to revive a listing that never sold." answer="Stop. Glow-ups are for winners. Pick something with real sales history." />
          <FAQItem id="ref-faq-3" question="Should I rewrite the SEO?" answer="No. If it ranked before, leave it. Only change images and files." />
          <FAQItem id="ref-faq-4" question="The AI messed up the text." answer="Add text manually in Kittl. Font → type → stroke/shadow. 2 minutes." />
        </div>
      </Accordion>

      <Accordion id="ref-glowup-rules" title="Bailey's Rules">
        <ol style={styles.rulesList}>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(0)}>1</span><p style={{ margin: 0 }}><strong>Pick listings with consistent sales</strong> — if people buy when they find it, demand exists.</p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(1)}>2</span><p style={{ margin: 0 }}><strong>Cross-niche for broader appeal</strong> — Christian + military + men = 3 audiences.</p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(2)}>3</span><p style={{ margin: 0 }}><strong>Men prefer realistic, women prefer graphic</strong></p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(3)}>4</span><p style={{ margin: 0 }}><strong>Duplicate, don't edit from scratch</strong></p></li>
          <li style={{ ...styles.rulesItem, borderBottom: 'none' }}><span style={styles.ruleNumber(4)}>5</span><p style={{ margin: 0 }}><strong>Check quantity in Vela</strong> — back to 999</p></li>
        </ol>
      </Accordion>
    </div>
  )

  // ============================================
  // RENDER - TREND WORKFLOW (Quick Ref)
  // ============================================
  const renderTrendWorkflow = () => (
    <div style={styles.section}>
      <span style={{ ...styles.label, color: '#1F6B6B', background: '#E8F5F0', padding: '0.4rem 0.8rem', borderRadius: '100px', display: 'inline-block' }}>WORKFLOW 1</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <Icons.Trend color="#2D8B8B" size={48} />
        <div>
          <h2 style={styles.h2}>Trend → Listing</h2>
          <p style={{ margin: 0, color: '#5A5A5A' }}>New product from scratch. Find what's selling, make your version, ship today.</p>
        </div>
      </div>

      <VideoCard workflow="WORKFLOW 1" title="Trend → Listing Walkthrough" desc="Find a trend and ship a listing" time="~35 min" color="teal" />

      {/* Speed Card */}
      <div style={styles.speedCard('teal')}>
        <div style={styles.speedCardHeader('teal')}>
          <h3 style={{ ...styles.h3, color: '#FFFFFF', margin: 0 }}>Speed Card</h3>
          <span style={styles.speedCardBadge}>45-60 min</span>
        </div>
        <div style={{ padding: '1rem 1.5rem' }}>
          <SpeedStep num={1} time="0-5 min" task="Etsy + ProfitTree/EverBee → find listing <3 months old with high sales + badges" id="ref-trend-1" color="teal" />
          <SpeedStep num={2} time="5-10 min" task="Screenshot → ChatGPT → get AI prompt → 10 theme variations → pick one" id="ref-trend-2" color="teal" />
          <SpeedStep num={3} time="10-20 min" task="Generate in Kittl (2-3 generators) → pick best" id="ref-trend-3" color="teal" />
          <SpeedStep num={4} time="20-30 min" task="Make seamless in Photoshop" id="ref-trend-4" color="teal" />
          <SpeedStep num={5} time="30-32 min" task="BulkMockup" id="ref-trend-5" color="teal" />
          <SpeedStep num={6} time="32-55 min" task="Vela → use template → add images, files, niche tags" id="ref-trend-6" color="teal" />
          <SpeedStep num={7} time="55-60 min" task="Publish" id="ref-trend-7" color="teal" />
        </div>
      </div>

      {/* What to Look For */}
      <h3 style={{ ...styles.h3, marginTop: '2rem' }}>What to Look For in Trend Research</h3>
      <table style={styles.dataTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Signal</th>
            <th style={styles.tableHeader}>What It Means</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>Listing age</td><td style={styles.tableCell}>Less than 3-4 months old</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>Sales</td><td style={styles.tableCell}>High number relative to age</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>Badges</td><td style={styles.tableCell}>Bestseller or Popular Now</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600, borderBottom: 'none' }}>Social proof</td><td style={{ ...styles.tableCell, borderBottom: 'none' }}>"6 people bought this in the last 24 hours"</td></tr>
        </tbody>
      </table>
      <p style={{ fontSize: '0.9rem', color: '#888888', fontStyle: 'italic', marginTop: '0.5rem' }}>2-3 of these = good enough. Stop researching.</p>

      <Accordion id="ref-trend-checklist" title="Checklist">
        <div style={{ background: '#FFF9F0', borderRadius: '12px', padding: '0.5rem' }}>
          <Checkbox id="ref-tc-1" color="teal" label="Found trending design (<3 months, high sales, badges)" />
          <Checkbox id="ref-tc-2" color="teal" label="Screenshot → ChatGPT → got variations" />
          <Checkbox id="ref-tc-3" color="teal" label="Generated in Kittl" />
          <Checkbox id="ref-tc-4" color="teal" label="Made seamless" />
          <Checkbox id="ref-tc-5" color="teal" label="Mockups done" />
          <Checkbox id="ref-tc-6" color="teal" label="Used Vela template" />
          <Checkbox id="ref-tc-7" color="teal" label="Added niche tags (only 3 needed)" />
          <Checkbox id="ref-tc-8" color="teal" label="Published" />
        </div>
      </Accordion>

      <Accordion id="ref-trend-prompts" title="Prompts" defaultOpen>
        <PromptBlock id="ref-tp1" label={prompts.screenshotToPrompt.label} text={prompts.screenshotToPrompt.text} />
        <PromptBlock id="ref-tp2" label={prompts.themeVariations.label} text={prompts.themeVariations.text} />
        <PromptBlock id="ref-tp3" label={prompts.rewriteStyle.label} text={prompts.rewriteStyle.text} />
      </Accordion>

      <Accordion id="ref-trend-stuck" title="Where You'll Get Stuck">
        <div style={{ border: '1px solid #F5EDE0', borderRadius: '12px', overflow: 'hidden' }}>
          <FAQItem id="ref-tfaq-1" question="I've been scrolling for 20 minutes looking for the perfect trend." answer="Stop at 5 minutes. Pick something with: <3-4 months + high sales + badge. That's enough. Move on." />
          <FAQItem id="ref-tfaq-2" question="I don't know what tags to use." answer="Copy from the listing you got inspiration from + think like a buyer. Done." />
          <FAQItem id="ref-tfaq-3" question="I want to make 5 products." answer="Make 1. Ship it. Then make the next one." />
        </div>
      </Accordion>

      <Accordion id="ref-trend-rules" title="Bailey's Rules">
        <ol style={styles.rulesList}>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(0)}>1</span><p style={{ margin: 0 }}><strong>5 minutes max on trend research</strong> — signals present = move on.</p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(1)}>2</span><p style={{ margin: 0 }}><strong>Don't overthink SEO</strong> — copy keywords + buyer language.</p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(2)}>3</span><p style={{ margin: 0 }}><strong>Ship one, then repeat</strong> — no batching until this is easy.</p></li>
          <li style={{ ...styles.rulesItem, borderBottom: 'none' }}><span style={styles.ruleNumber(3)}>4</span><p style={{ margin: 0 }}><strong>Use Vela templates</strong> — never write descriptions from scratch.</p></li>
        </ol>
      </Accordion>
    </div>
  )

  // ============================================
  // RENDER - NICHE PACK WORKFLOW (Quick Ref)
  // ============================================
  const renderNichePackWorkflow = () => (
    <div style={styles.section}>
      <span style={{ ...styles.label, color: '#1F6B6B', background: '#E8F5F0', padding: '0.4rem 0.8rem', borderRadius: '100px', display: 'inline-block' }}>WORKFLOW 3</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
        <Icons.Grid color="#2D8B8B" size={48} />
        <div>
          <h2 style={styles.h2}>Niche Pack</h2>
          <p style={{ margin: 0, color: '#5A5A5A' }}>Own a niche with multiple products + bundle. One concept, 10+ listings.</p>
        </div>
      </div>

      <VideoCard workflow="WORKFLOW 3" title="Niche Pack Walkthrough" desc="Batch create 10+ listings" time="~40 min" color="teal" />

      {/* Speed Card */}
      <div style={styles.speedCard('teal')}>
        <div style={styles.speedCardHeader('teal')}>
          <h3 style={{ ...styles.h3, color: '#FFFFFF', margin: 0 }}>Speed Card</h3>
          <span style={styles.speedCardBadge}>60-90 min</span>
        </div>
        <div style={{ padding: '1rem 1.5rem' }}>
          <SpeedStep num={1} time="0-5 min" task="Pick niche with easy variations (awareness, states, hobbies)" id="ref-np-1" color="teal" />
          <SpeedStep num={2} time="5-15 min" task="ChatGPT → get 10 variation prompts at once" id="ref-np-2" color="teal" />
          <SpeedStep num={3} time="15-35 min" task="Batch generate in Kittl" id="ref-np-3" color="teal" />
          <SpeedStep num={4} time="35-45 min" task="Batch seamless in Photoshop" id="ref-np-4" color="teal" />
          <SpeedStep num={5} time="45-50 min" task="BulkMockup all at once" id="ref-np-5" color="teal" />
          <SpeedStep num={6} time="50-75 min" task="Vela → duplicate base listing → bulk replace images/files/tags" id="ref-np-6" color="teal" />
          <SpeedStep num={7} time="75-90 min" task="Create bundle (PDF → Google Drive link)" id="ref-np-7" color="teal" />
        </div>
      </div>

      {/* Niches Table */}
      <h3 style={{ ...styles.h3, marginTop: '2rem' }}>Niches That Work</h3>
      <table style={styles.dataTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Niche</th>
            <th style={styles.tableHeader}>Variations</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>Cancer / Awareness</td><td style={styles.tableCell}>Breast, lung, colon, childhood, etc. (10+)</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>States</td><td style={styles.tableCell}>All 50</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>Countries</td><td style={styles.tableCell}>Flags, landmarks</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>Hobbies</td><td style={styles.tableCell}>Golf, fishing, camping, gardening</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600 }}>Professions</td><td style={styles.tableCell}>Nurse, teacher, firefighter</td></tr>
          <tr><td style={{ ...styles.tableCell, fontWeight: 600, borderBottom: 'none' }}>Animals</td><td style={{ ...styles.tableCell, borderBottom: 'none' }}>Dogs by breed, cats by breed</td></tr>
        </tbody>
      </table>
      <p style={{ fontSize: '0.9rem', color: '#888888', fontStyle: 'italic', marginTop: '0.5rem' }}>Pick one with 10+ variations without inventing new concepts.</p>

      <Accordion id="ref-np-checklist" title="Checklist">
        <div style={{ background: '#FFF9F0', borderRadius: '12px', padding: '0.5rem' }}>
          <Checkbox id="ref-npc-1" color="teal" label="Picked niche with 10+ natural variations" />
          <Checkbox id="ref-npc-2" color="teal" label="Got all prompts from ChatGPT in one conversation" />
          <Checkbox id="ref-npc-3" color="teal" label="Batch generated designs" />
          <Checkbox id="ref-npc-4" color="teal" label="Batch made seamless" />
          <Checkbox id="ref-npc-5" color="teal" label="Bulk mockups" />
          <Checkbox id="ref-npc-6" color="teal" label="Duplicated base listing for each variation" />
          <Checkbox id="ref-npc-7" color="teal" label="Used Find & Replace for titles/tags" />
          <Checkbox id="ref-npc-8" color="teal" label="Published all individual listings" />
          <Checkbox id="ref-npc-9" color="teal" label="Created bundle with PDF + Google Drive" />
        </div>
      </Accordion>

      <Accordion id="ref-np-prompts" title="Prompts" defaultOpen>
        <PromptBlock id="ref-npp1" label={prompts.styleVariations.label} text={prompts.styleVariations.text.replace('[NICHE]', '[NICHE]') + ' It should not be word art like this one.'} />
        <PromptBlock id="ref-npp2" label={prompts.batchVariations.label} text={prompts.batchVariations.text} />
        <PromptBlock id="ref-npp3" label={prompts.makeThemUnique.label} text={prompts.makeThemUnique.text} />
      </Accordion>

      <Accordion id="ref-np-stuck" title="Where You'll Get Stuck">
        <div style={{ border: '1px solid #F5EDE0', borderRadius: '12px', overflow: 'hidden' }}>
          <FAQItem id="ref-npfaq-1" question="I can't pick a niche." answer="Start with awareness ribbons, states, or hobbies. These always have built-in variations." />
          <FAQItem id="ref-npfaq-2" question="I'm recreating SEO for each listing." answer="No. Duplicate + Find & Replace in Vela. Only change niche-specific words." />
          <FAQItem id="ref-npfaq-3" question="One prompt came out bad." answer="Skip it. Don't let 1 bad prompt stall 9 good ones. Come back later." />
        </div>
      </Accordion>

      <Accordion id="ref-np-rules" title="Bailey's Rules">
        <ol style={styles.rulesList}>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(0)}>1</span><p style={{ margin: 0 }}><strong>Start with awareness, states, or hobbies</strong> — built-in variations.</p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(1)}>2</span><p style={{ margin: 0 }}><strong>Don't let 1 bad prompt stall 9 good ones</strong></p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(2)}>3</span><p style={{ margin: 0 }}><strong>Use Find & Replace in Vela</strong> — only niche-specific words change.</p></li>
          <li style={styles.rulesItem}><span style={styles.ruleNumber(3)}>4</span><p style={{ margin: 0 }}><strong>Price low to rank faster</strong> — $1 temporarily, then raise.</p></li>
          <li style={{ ...styles.rulesItem, borderBottom: 'none' }}><span style={styles.ruleNumber(4)}>5</span><p style={{ margin: 0 }}><strong>Bundle = PDF + Google Drive</strong> — Etsy's limits won't fit 10+.</p></li>
        </ol>
      </Accordion>
    </div>
  )

  // ============================================
  // RENDER - PROMPT APPENDIX
  // ============================================
  const renderPromptAppendix = () => (
    <div style={{ background: '#FFF9F0', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={styles.h2}>All Prompts</h2>
          <p style={{ color: '#5A5A5A', marginTop: '0.5rem' }}>Building blocks. Fill in the <span style={styles.placeholder}>[BRACKETS]</span> for your niche.</p>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <PromptBlock id="app-1" label="Style Variations" text={prompts.styleVariations.text} />
          <PromptBlock id="app-2" label="Screenshot → AI Prompt" text={prompts.screenshotToPrompt.text} />
          <PromptBlock id="app-3" label="Rewrite with Style" text="Rewrite this prompt to change the style to [STYLE]. Make it [DESCRIPTORS]. Do not include \"tumbler wrap design.\"" />
          <PromptBlock id="app-4" label="Make More Unique" text={prompts.moreUnique.text} />
          <PromptBlock id="app-5" label="Batch Variations" text={prompts.batchVariations.text} />
          <PromptBlock id="app-6" label="Quick SEO" text={prompts.quickSEO.text} />
        </div>
      </div>
    </div>
  )

  // ============================================
  // RENDER - FOOTER
  // ============================================
  const renderFooter = () => (
    <div style={styles.footer}>
      <Icons.Clock />
      <p style={styles.footerQuote}>The point isn't to be perfect.<br/>The point is to ship.</p>
      <p style={styles.footerSub}>One listing out in the world beats ten listings stuck in your head.</p>
    </div>
  )

  // ============================================
  // RENDER - CELEBRATION MODAL
  // ============================================
  const renderCelebration = () => showCelebration && (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={styles.celebration}>
        <Icons.Celebrate size={80} />
        <h2 style={{ ...styles.h2, marginTop: '1rem' }}>You did it!</h2>
        <p style={{ color: '#5A5A5A', marginTop: '0.5rem' }}>Your listing is live. That's the skill.</p>
      </div>
    </div>
  )

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <>
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/ogg');
        @import url('https://fonts.cdnfonts.com/css/satoshi');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow: visible; }

        @keyframes popIn {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>

      <div style={styles.container}>
        {renderHeader()}

        {mode === 'challenge' && renderChallengeMode()}
        {mode === 'reference' && renderQuickReferenceMode()}

        {renderPromptAppendix()}
        {renderFooter()}
        {renderCelebration()}
      </div>
    </>
  )
}
