import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Leaf, 
  Volume2, 
  VolumeX, 
  Download, 
  Eye, 
  EyeOff, 
  Printer, 
  FileText, 
  Check, 
  RefreshCw, 
  User, 
  Sliders, 
  FileDown 
} from 'lucide-react';
import { InvitationTheme, AtmosphereSettings } from './types';
import { PRESET_RECIPIENTS } from './data/presets';
import { InvitationCard } from './components/InvitationCard';
import AtmosphereOverlay from './components/AtmosphereOverlay';
import { zenDroneInstance } from './utils/audio';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function App() {
  const [recipientName, setRecipientName] = useState<string>('Lady Charlotte Templeton');
  const [theme, setTheme] = useState<InvitationTheme>('kyoto');
  const [isEngraving, setIsEngraving] = useState<boolean>(false);
  const [engravingStep, setEngravingStep] = useState<string>('');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [exportType, setExportType] = useState<string>('');

  // Atmospheric settings state
  const [atmosphere, setAtmosphere] = useState<AtmosphereSettings>({
    fallingLeaves: true,
    goldDust: true,
    lanternGlow: 65,
    ambientSound: false,
    presentationMode: false,
  });

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Toggle Zen Music Drone
  const toggleSound = () => {
    const nextSoundState = !atmosphere.ambientSound;
    setAtmosphere(prev => ({ ...prev, ambientSound: nextSoundState }));
    
    if (nextSoundState) {
      zenDroneInstance.start();
    } else {
      zenDroneInstance.stop();
    }
  };

  // Clean-up audio context on unmount
  useEffect(() => {
    return () => {
      zenDroneInstance.stop();
    };
  }, []);

  // Escape key handler to leave Presentation/Sanctuary mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && atmosphere.presentationMode) {
        setAtmosphere(prev => ({ ...prev, presentationMode: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [atmosphere.presentationMode]);

  // Download High-Resolution JPG Image
  const downloadAsImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsEngraving(true);
      setEngravingStep('Capturing luxury texture...');
      
      // Delay briefly to allow rendering structures to settle
      await new Promise(resolve => setTimeout(resolve, 800));

      setEngravingStep('Engraving metallic gold foil letters...');
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Doubled resolution for retina-crisp high res
        useCORS: true,
        backgroundColor: '#050505',
        logging: false,
        windowWidth: 700, // Forces clean portrait aspect ratio constraints during capture
        onclone: (clonedDoc) => {
          // Adjust cloned document card state to be fully expanded and static if needed
          const card = clonedDoc.getElementById('luxury-invitation-card');
          if (card) {
            card.style.transform = 'none';
            card.style.borderRadius = '0px';
          }
        }
      });

      setEngravingStep('Polishing gild borders & saving layout...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      
      // Sanitizing name for filing
      const safeName = recipientName.replace(/[^a-zA-Z0-9]/g, '_') || 'Guest';
      link.download = `Kyoto_Sojourn_Invitation_${safeName}.jpg`;
      link.href = imgData;
      link.click();

      // Trigger success banner
      setExportType('High-Res Invitation JPG');
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);

    } catch (e) {
      console.error('Error generating image', e);
    } finally {
      setIsEngraving(false);
      setEngravingStep('');
    }
  };

  // Download Luxury PDF
  const downloadAsPDF = async () => {
    if (!cardRef.current) return;
    try {
      setIsEngraving(true);
      setEngravingStep('Analyzing canvas layout details...');
      
      await new Promise(resolve => setTimeout(resolve, 600));

      setEngravingStep('Gilding vectors & layers...');
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#050505',
        logging: false,
        windowWidth: 720
      });

      setEngravingStep('Fusing luxury PDF sheets...');
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Calculate portrait size
      const imgWidth = 210; // A4 size in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Centering and scaling image to match PDF layout nicely
      pdf.setFillColor(5, 5, 5); // Dark luxury backdrop for empty padding
      pdf.rect(0, 0, imgWidth, pageHeight, 'F');
      
      // Fit or expand card onto PDF sheet
      if (imgHeight <= pageHeight) {
        const topMargin = (pageHeight - imgHeight) / 2;
        pdf.addImage(imgData, 'JPEG', 0, topMargin, imgWidth, imgHeight);
      } else {
        // Multi-page PDF if card scales longer, but fit nicely
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      }

      const safeName = recipientName.replace(/[^a-zA-Z0-9]/g, '_') || 'Guest';
      pdf.save(`Kyoto_Sojourn_Invitation_${safeName}.pdf`);

      setExportType('Luxury Presentation PDF');
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);

    } catch (e) {
      console.error('Error generating PDF', e);
    } finally {
      setIsEngraving(false);
      setEngravingStep('');
    }
  };

  // System Print Integration
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200 overflow-x-hidden select-none flex flex-col relative">
      
      {/* Animated Subtle Japanese Smoke/Mist drifting in the master frame */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen opacity-30">
        <div className="mist-layer" />
        <div className="mist-layer-reverse" />
      </div>

      {/* Dynamic Canvas Particles */}
      <AtmosphereOverlay settings={atmosphere} />

      {/* Success Banner */}
      <AnimatePresence>
        {exportSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neutral-900 via-[#1a1711] to-neutral-900 border border-[#bfa35d]/40 py-3.5 px-6 rounded-md shadow-2xl z-50 flex items-center space-x-3"
          >
            <div className="w-5 h-5 rounded-full bg-[#c5a059] flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />
            </div>
            <p className="font-sans text-xs sm:text-sm tracking-wide text-neutral-200">
              Your <span className="text-[#ecd89d] font-semibold">{exportType}</span> has been crafted & saved.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Luxury Engraving Loader */}
      <AnimatePresence>
        {isEngraving && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="relative mb-8">
              {/* Spinning luxury circular frame */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-24 h-24 rounded-full border-t border-b border-r border-[#ecd89d]/60 border-l border-transparent"
              />
              <div className="absolute inset-2 border border-neutral-900 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-[#c5a059] animate-spin opacity-40" />
              </div>
            </div>

            <h3 className="font-serif text-lg tracking-[0.25em] text-[#ecd89d] uppercase mb-2">
              CLAYTON & CO. ENGRAVING EST.
            </h3>
            <p className="font-sans text-xs text-neutral-400 tracking-widest uppercase animate-pulse">
              {engravingStep}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN LAYOUT CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        
        {/* LEFT WORKSPACE: THE LUXURY EVENT DETAILS / EDITING DESK */}
        <AnimatePresence>
          {!atmosphere.presentationMode && (
            <motion.div 
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -120 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[420px] xl:w-[460px] bg-neutral-950 border-r border-neutral-900 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto no-print space-y-10 relative z-30 shrink-0"
              style={{ maxHeight: '100vh' }}
            >
              <div className="space-y-10">
                {/* Brand / Title Header */}
                <div>
                  <span className="text-[10px] tracking-[0.4em] text-[#bfa35d] font-semibold block mb-1">
                    CRAFT STUDIO · KYOTO SPECIALS
                  </span>
                  <h1 className="font-serif text-2xl tracking-wider text-neutral-100 font-normal">
                    The Ceremony Atelier
                  </h1>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    Configure your high-net-worth recipient details and save in master printable qualities.
                  </p>
                </div>

                <div className="w-full h-[1px] bg-neutral-900" />

                {/* Recipient Config section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-[#ecd89d]">
                    <User className="w-3.5 h-3.5" />
                    <label className="text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
                      Recipient Customization
                    </label>
                  </div>
                  
                  {/* Dynamic Input Frame */}
                  <div className="relative group">
                    <input 
                      type="text" 
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      maxLength={40}
                      placeholder="Insert Guest Full Name..."
                      className="w-full bg-[#070707] border border-neutral-800 focus:border-[#bfa35d] focus:ring-0 text-sm py-3 px-4 rounded-sm text-[#ecd89d] placeholder-neutral-700 tracking-wide transition-all outline-none"
                    />
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-600">
                      {recipientName.length}/40
                    </div>
                  </div>

                  {/* Luxury Presets list */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] tracking-widest text-[#937330] font-sans uppercase block">
                      Recommended Guest Presets:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PRESET_RECIPIENTS.map((preset) => (
                        <button
                          key={preset.name}
                          onClick={() => setRecipientName(preset.name)}
                          className={`text-left p-2.5 rounded-sm border transition-all flex flex-col justify-start outline-none ${
                            recipientName === preset.name 
                              ? 'border-[#bfa35d]/60 bg-[#12100a]' 
                              : 'border-neutral-900 bg-[#070707] hover:border-neutral-800'
                          }`}
                        >
                          <span className="text-xs text-neutral-200 font-medium tracking-wide truncate w-full">
                            {preset.name}
                          </span>
                          <span className="text-[9px] text-neutral-500 truncate w-full mt-0.5">
                            {preset.role}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-neutral-900" />

                {/* Atmosphere controls */}
                <div className="space-y-5">
                  <div className="flex items-center space-x-2 text-[#ecd89d]">
                    <Sliders className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
                      Scenic Ambience Desk
                    </span>
                  </div>

                  {/* Themes toggler */}
                  <div className="space-y-2">
                    <span className="text-[10px] tracking-widest text-neutral-500 uppercase block">
                      Canvas Backdrop Spec:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'kyoto', name: 'Kyoto House', desc: 'Mysterious Machiya' },
                        { id: 'zen', name: 'Zen Sumi-e', desc: 'Ink Ink Wash' },
                        { id: 'minimal', name: 'Velvet Flat', desc: 'Charcoal Silk' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setTheme(item.id as InvitationTheme)}
                          className={`p-2.5 rounded-sm border transition-all text-center flex flex-col items-center justify-center group outline-none ${
                            theme === item.id 
                              ? 'border-[#ecd89d] bg-[#12110e]' 
                              : 'border-neutral-950 bg-[#050505] hover:border-neutral-800'
                          }`}
                        >
                          <span className={`text-xs font-semibold tracking-wide ${theme === item.id ? 'text-[#ecd89d]' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Atmospheric elements sliders & toggles */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Maple leaf toggler */}
                    <button
                      onClick={() => setAtmosphere(p => ({ ...p, fallingLeaves: !p.fallingLeaves }))}
                      className={`py-3 px-4 rounded-sm border text-left flex items-center justify-between transition-all outline-none ${
                        atmosphere.fallingLeaves
                          ? 'border-[#bfa35d]/40 bg-[#12100a]/30 text-neutral-200'
                          : 'border-neutral-900 bg-[#070707] text-neutral-500 hover:text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Leaf className="w-4 h-4 text-[#8c2d19]" />
                        <span className="text-xs tracking-wider">Momiji Leaves</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${atmosphere.fallingLeaves ? 'bg-[#c5a059]' : 'bg-neutral-800'}`} />
                    </button>

                    {/* Gold dust toggler */}
                    <button
                      onClick={() => setAtmosphere(p => ({ ...p, goldDust: !p.goldDust }))}
                      className={`py-3 px-4 rounded-sm border text-left flex items-center justify-between transition-all outline-none ${
                        atmosphere.goldDust
                          ? 'border-[#bfa35d]/40 bg-[#12100a]/30 text-neutral-200'
                          : 'border-neutral-900 bg-[#070707] text-neutral-500 hover:text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Sparkles className="w-4 h-4 text-[#ecd89d]" />
                        <span className="text-xs tracking-wider">Gold Dust</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${atmosphere.goldDust ? 'bg-[#c5a059]' : 'bg-neutral-800'}`} />
                    </button>
                  </div>

                  {/* Lantern light slider */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-[10px] tracking-wider text-neutral-500 uppercase">
                      <span>Lantern Glow Backlight</span>
                      <span className="font-mono text-neutral-300">{atmosphere.lanternGlow}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={atmosphere.lanternGlow}
                      onChange={(e) => setAtmosphere(p => ({ ...p, lanternGlow: parseInt(e.target.value) }))}
                      className="w-full h-1 bg-neutral-900 rounded-sm appearance-none cursor-pointer accent-[#bfa35d]"
                    />
                  </div>

                  {/* Custom Web Audio API master trigger */}
                  <button
                    onClick={toggleSound}
                    className={`w-full py-4 px-4 rounded-sm border text-left flex items-center justify-between transition-all outline-none ${
                      atmosphere.ambientSound
                        ? 'border-[#ecd89d] bg-gradient-to-r from-[#12110e] to-neutral-900 text-neutral-100 shadow-[0_0_15px_rgba(197,160,89,0.1)]'
                        : 'border-neutral-900 bg-[#060606] text-neutral-400 hover:border-neutral-800 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      {atmosphere.ambientSound ? (
                        <div className="relative">
                          <span className="absolute animate-ping inline-flex h-2.5 w-2.5 rounded-full bg-[#ecd89d] opacity-75" />
                          <Volume2 className="relative inline-flex w-4.5 h-4.5 text-[#ecd89d]" />
                        </div>
                      ) : (
                        <VolumeX className="w-4.5 h-4.5 text-neutral-600" />
                      )}
                      <div className="text-left">
                        <p className="text-xs font-semibold tracking-wider">Kyoto Sanctuary Sound</p>
                        <p className="text-[10px] text-neutral-500 font-light">Organic 65.4Hz Zen drone acoustics</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-[#ecd89d]">
                      {atmosphere.ambientSound ? 'ONLINE' : 'MUTED'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Presentation mode switch */}
              <div className="space-y-3 pt-6 border-t border-neutral-900">
                <button
                  onClick={() => {
                    // Activate presentation mode and sound as a luxury experience
                    setAtmosphere(p => ({ ...p, presentationMode: true }));
                    if (!atmosphere.ambientSound) {
                      toggleSound();
                    }
                  }}
                  className="w-full py-3 px-4 bg-[#ecd89d] hover:bg-[#cbd5e1] text-black text-xs font-serif font-semibold tracking-[0.2em] uppercase rounded-sm flex items-center justify-center space-x-2 transition-all outline-none shadow-lg shadow-black/30 hover:scale-[1.01]"
                >
                  <Eye className="w-4 h-4 stroke-[2px]" />
                  <span>Enter Zen Sanctuary</span>
                </button>
                <p className="text-[10px] text-neutral-600 text-center font-light leading-normal px-2">
                  Hides workspace overlays and starts acoustic drones. Press <kbd className="font-mono bg-neutral-900 px-1 py-0.5 rounded text-neutral-500">ESC</kbd> to return.
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT WORKSPACE: THE SCENIC PREVIEW STAGE */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-8 overflow-y-auto relative min-h-screen">
          
          {/* Subtle Stage Backlighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none rounded-full bg-radial from-[#12100c]/40 via-transparent to-transparent blur-3xl z-0" />

          {/* Floating Workspace top-panel bar (Only visible when not in presentation mode) */}
          <AnimatePresence>
            {!atmosphere.presentationMode && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-5 sm:py-4 bg-neutral-950/80 border border-neutral-900 rounded-sm mb-10 no-print z-30 backdrop-blur-md relative"
              >
                <div>
                  <span className="text-[10px] font-sans tracking-[0.25em] text-[#bfa35d] uppercase block">
                    Luxury Invitation Preview
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                    <span className="text-xs text-neutral-400 font-light truncate">
                      Portrait Layout &bull; Export Quality Perfected
                    </span>
                  </div>
                </div>

                {/* Main Instant Action Downloads */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto py-1">
                  
                  {/* Download JPG button */}
                  <button
                    onClick={downloadAsImage}
                    title="Export high-resolution Jpeg image vector"
                    className="flex-1 sm:flex-initial py-2.5 px-4 bg-[#0a0a0a] hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs tracking-wider rounded-sm flex items-center justify-center space-x-2 transition-all outline-none"
                  >
                    <Download className="w-3.5 h-3.5 text-[#ecd89d]" />
                    <span className="hidden sm:inline">Download Image</span>
                    <span className="sm:hidden">JPG</span>
                  </button>

                  {/* Download PDF button */}
                  <button
                    onClick={downloadAsPDF}
                    title="Export vector bounds single sheet PDF"
                    className="flex-1 sm:flex-initial py-2.5 px-4 bg-[#0a0a0a] hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white text-xs tracking-wider rounded-sm flex items-center justify-center space-x-2 transition-all outline-none"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#ecd89d]" />
                    <span className="hidden sm:inline font-sans">Download PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </button>

                  <div className="w-[1px] h-6 bg-neutral-900 hidden sm:block" />

                  {/* Print custom template button */}
                  <button
                    onClick={triggerPrint}
                    title="Print out on offline textured letterhead paper"
                    className="py-2.5 px-3.5 bg-neutral-900 hover:bg-[#1a1711] text-neutral-400 hover:text-[#ecd89d] border border-neutral-800 rounded-sm flex items-center justify-center transition-all outline-none"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE LUXURY PORTRAIT CANVAS CARD STAGED AREA */}
          <div className="flex-1 flex items-center justify-center z-10 py-4 w-full relative">
            
            {/* Presentation Mode Floating controls */}
            <AnimatePresence>
              {atmosphere.presentationMode && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-black/80 border border-[#bfa35d]/30 py-3 px-6 rounded-full shadow-2xl z-40 backdrop-blur-md no-print"
                >
                  <button
                    onClick={() => setAtmosphere(p => ({ ...p, presentationMode: false }))}
                    className="text-xs font-serif font-medium tracking-[0.2em] text-[#ecd89d] uppercase hover:text-white transition-colors flex items-center space-x-2 outline-none"
                  >
                    <EyeOff className="w-4 h-4 text-neutral-500" />
                    <span>Exit Sanctuary</span>
                  </button>
                  <span className="w-[1px] h-4 bg-neutral-800" />
                  <button
                    onClick={toggleSound}
                    className="text-neutral-400 hover:text-[#ecd89d] transition-colors outline-none"
                  >
                    {atmosphere.ambientSound ? <Volume2 className="w-4.5 h-4.5 text-[#ecd89d]" /> : <VolumeX className="w-4.5 h-4.5 text-neutral-600" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated Gilded Easel Stand wrapper around portrait design */}
            <motion.div 
              layout
              className={`w-full transition-all duration-1000 origin-center ${
                atmosphere.presentationMode
                  ? 'max-w-[700px] h-auto my-0 scale-[1.02] sm:scale-[1.05]'
                  : 'max-w-[620px] h-auto'
              }`}
            >
              {/* Premium outer framing stand */}
              <div className="relative p-[1.5px] rounded-sm bg-gradient-to-b from-[#bfa35d]/20 via-neutral-900/60 to-black shadow-3xl">
                
                {/* Visual shadow block */}
                <div className="absolute inset-0 bg-black rounded-sm" />
                
                {/* Inner actual rendered invitation card */}
                <InvitationCard 
                  ref={cardRef}
                  recipientName={recipientName}
                  theme={theme}
                  lanternGlow={atmosphere.lanternGlow}
                />
              </div>
            </motion.div>

          </div>

          {/* Footer branding of application */}
          <AnimatePresence>
            {!atmosphere.presentationMode && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="w-full text-center py-6 text-[9px] tracking-[0.3em] font-sans uppercase text-neutral-600 no-print border-t border-neutral-900/35 z-10"
              >
                Kyoto Sojourn Ceremonial Craft System &bull; Private High-Resolution Emailer Design
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
