import React from 'react';
import { InvitationTheme } from '../types';

interface InvitationCardProps {
  recipientName: string;
  theme: InvitationTheme;
  lanternGlow: number;
}

export const InvitationCard = React.forwardRef<HTMLDivElement, InvitationCardProps>(
  ({ recipientName, theme, lanternGlow }, ref) => {
    
    // Choose refined background styles (no heavy images, absolute matte-black & midnight-charcoal velvet gradients)
    const getBackgroundStyles = () => {
      switch (theme) {
        case 'kyoto': // Warm Charcoal Black Slate
          return {
            backgroundColor: '#050505',
            backgroundImage: 'radial-gradient(circle at 50% 25%, #181510 0%, #050505 85%)',
          };
        case 'zen': // Deep Slate Midnight Cold Ink
          return {
            backgroundColor: '#040404',
            backgroundImage: 'radial-gradient(circle at 50% 20%, #0d1012 0%, #030405 90%)',
          };
        case 'minimal': // Absolute Infinite Obsidian Velvet
        default:
          return {
            backgroundColor: '#020202',
            backgroundImage: 'radial-gradient(circle at 50% 30%, #0b0b0b 0%, #010101 100%)',
          };
      }
    };

    return (
      <div
        ref={ref}
        id="luxury-invitation-card"
        className="paper-texture relative w-full h-auto min-h-[1150px] text-white flex flex-col items-center justify-between shadow-2xl overflow-hidden transition-all duration-1000 p-6 sm:p-12 md:p-16 border border-neutral-900/60 rounded-sm"
        style={{
          ...getBackgroundStyles(),
          boxShadow: `0 35px 80px -25px rgba(0, 0, 0, 0.95), inset 0 0 100px rgba(0, 0, 0, 0.98)`,
        }}
      >
        {/* ================= VECTOR WATERMARK: CLASSIC FIVE-STORY KYOTO PAGODA ================= */}
        {/* Rendered as inline high-resolution SVG with ultra-fine, faint golden brushwork lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-[0.055]">
          <svg 
            className="w-[125%] h-[125%] sm:w-[110%] sm:h-[110%] max-w-[850px] absolute translate-y-16" 
            viewBox="0 0 500 1000" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="gold-watermark-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a6f30" />
                <stop offset="30%" stopColor="#fdf0cd" />
                <stop offset="70%" stopColor="#bfa35d" />
                <stop offset="100%" stopColor="#5c4515" />
              </linearGradient>
            </defs>
            <g stroke="url(#gold-watermark-line)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
              
              {/* Pagoda Spire (Sorin) */}
              <line x1="250" y1="50" x2="250" y2="190" strokeWidth="1.2" />
              <path d="M243 85 Q250 80 257 85" />
              <path d="M241 100 Q250 95 259 100" />
              
              {/* Traditional interlocking rings of Sorin */}
              <ellipse cx="250" cy="110" rx="7" ry="2.2" />
              <ellipse cx="250" cy="118" rx="8" ry="2.5" />
              <ellipse cx="250" cy="126" rx="9" ry="2.8" />
              <ellipse cx="250" cy="134" rx="10" ry="3.1" />
              <ellipse cx="250" cy="142" rx="11" ry="3.3" />
              <ellipse cx="250" cy="151" rx="12" ry="3.6" />
              <ellipse cx="250" cy="160" rx="13" ry="3.9" />
              <ellipse cx="250" cy="169" rx="14" ry="4.1" />
              <ellipse cx="250" cy="178" rx="15" ry="4.4" />
              
              {/* Base scroll of the Finial */}
              <path d="M238 186 Q250 180 262 186" />
              <path d="M234 192 Q250 185 266 192" />

              {/* ====== Tier 5 (Topmost pagoda level) ====== */}
              {/* Curve of the Top Roof */}
              <path d="M216 195 L284 195 L292 190 Q297 186 301 191 L298 197 Q250 209 202 197 L199 191 Q203 186 208 190 Z" fill="#000" fillOpacity="0.7" />
              {/* Structural Columns */}
              <line x1="226" y1="197" x2="226" y2="213" />
              <line x1="238" y1="197" x2="238" y2="213" />
              <line x1="250" y1="197" x2="250" y2="213" />
              <line x1="262" y1="197" x2="262" y2="213" />
              <line x1="274" y1="197" x2="274" y2="213" />
              <line x1="223" y1="213" x2="277" y2="213" />

              {/* ====== Tier 4 ====== */}
              {/* Roof */}
              <path d="M206 215 L294 215 L303 209 Q308 205 313 210 L310 217 Q250 231 190 217 L187 210 Q192 205 197 209 Z" fill="#000" fillOpacity="0.7" />
              {/* Columns */}
              <line x1="219" y1="217" x2="219" y2="237" />
              <line x1="234" y1="217" x2="234" y2="237" />
              <line x1="250" y1="217" x2="250" y2="237" />
              <line x1="266" y1="217" x2="266" y2="237" />
              <line x1="281" y1="217" x2="281" y2="237" />
              <line x1="214" y1="237" x2="286" y2="237" />

              {/* ====== Tier 3 ====== */}
              {/* Roof */}
              <path d="M192 239 L308 239 L318 232 Q324 227 329 233 L326 241 Q250 257 174 241 L171 233 Q176 227 182 232 Z" fill="#000" fillOpacity="0.7" />
              {/* Columns */}
              <line x1="209" y1="241" x2="209" y2="266" />
              <line x1="229" y1="241" x2="229" y2="266" />
              <line x1="250" y1="241" x2="250" y2="266" />
              <line x1="271" y1="241" x2="271" y2="266" />
              <line x1="291" y1="241" x2="291" y2="266" />
              <line x1="202" y1="266" x2="298" y2="266" />

              {/* ====== Tier 2 ====== */}
              {/* Roof */}
              <path d="M178 268 L322 268 L334 260 Q341 255 347 262 L343 271 Q250 290 157 271 L153 262 Q159 255 166 260 Z" fill="#000" fillOpacity="0.7" />
              {/* Columns */}
              <line x1="199" y1="271" x2="199" y2="303" />
              <line x1="224" y1="271" x2="224" y2="303" />
              <line x1="250" y1="271" x2="250" y2="303" />
              <line x1="276" y1="271" x2="276" y2="303" />
              <line x1="301" y1="271" x2="301" y2="303" />
              <line x1="191" y1="303" x2="309" y2="303" />

              {/* ====== Tier 1 (Lowest Large Roof) ====== */}
              {/* Roof */}
              <path d="M158 305 L342 305 L356 295 Q364 290 370 298 L365 311 Q250 332 135 311 L130 298 Q136 290 144 295 Z" fill="#000" fillOpacity="0.7" />
              {/* Base Columns */}
              <line x1="184" y1="311" x2="184" y2="362" />
              <line x1="217" y1="311" x2="217" y2="362" />
              <line x1="250" y1="311" x2="250" y2="362" />
              <line x1="283" y1="311" x2="283" y2="362" />
              <line x1="316" y1="311" x2="316" y2="362" />
              
              {/* Ground Steps & Pagoda Brick Foundation */}
              <line x1="165" y1="362" x2="335" y2="362" strokeWidth="1.2" />
              <path d="M150 362 L350 362 L344 378 L156 378 Z" fill="#030303" fillOpacity="0.9" />
              <line x1="140" y1="378" x2="360" y2="378" strokeWidth="1.5" />
            </g>

            {/* Faint gold abstract ink clouds and temple gates outlines */}
            <g stroke="url(#gold-watermark-line)" strokeWidth="0.5" opacity="0.14" fill="none">
              <path d="M40 180 Q70 170 100 180 T160 180 Q130 195 100 190 T40 180 Z" />
              <path d="M340 140 Q370 130 400 140 T460 140 Q430 155 400 150 T340 140 Z" />
              <path d="M80 430 Q120 420 160 430 T240 430 Q180 445 130 440 T80 430 Z" />
              <path d="M260 470 Q300 460 340 470 T420 470 Q360 485 310 480 T260 470 Z" />
            </g>
          </svg>
        </div>

        {/* Soft Ambient Gold Candle Lantern Flare */}
        <div 
          className="lantern-glow-ambient absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full pointer-events-none mix-blend-color-dodge transition-all duration-700"
          style={{
            background: `radial-gradient(circle, rgba(212, 175, 55, ${lanternGlow * 0.0035}) 0%, rgba(133, 77, 14, 0) 72%)`,
            opacity: lanternGlow / 100,
          }}
        />

        {/* Traditional Japanese Corner Frame Overlay */}
        <div className="absolute inset-3 sm:inset-6 border border-neutral-800/35 pointer-events-none z-10">
          <div className="absolute inset-[1px] border border-neutral-500/5" />
          
          {/* Top Left Corner */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#bfa35d]/35" />
          {/* Top Right Corner */}
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#bfa35d]/35" />
          {/* Bottom Left Corner */}
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#bfa35d]/35" />
          {/* Bottom Right Corner */}
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#bfa35d]/35" />
        </div>

        {/* Outer Ultra Fine Golden Accent Border */}
        <div className="absolute inset-4 sm:inset-8 border border-[#937330]/15 pointer-events-none z-10" />

        {/* Elegant Content Container (Tighter margins to keep vertical hierarchy readable & cohesive) */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center relative z-10 py-4 sm:py-8">
          
          {/* Section 1: Confidentiality Tag */}
          <div className="mb-8 sm:mb-12 space-y-3">
            <span className="block font-gold text-xs sm:text-sm tracking-[0.35em] text-[#ecd89d] font-semibold uppercase leading-none">
              PRIVATE INVITATION
            </span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#bfa35d]/45 to-transparent mx-auto" />
            <span className="block font-sans text-[10px] sm:text-[11px] tracking-[0.22em] text-neutral-400 font-normal uppercase leading-tight">
              Strictly Confidential · Personal · Non-transferable
            </span>
          </div>

          {/* Section 2: Prepared For Frame (Amplified Recipient Readability) */}
          <div className="mb-10 sm:mb-14 space-y-3 w-full">
            <span className="block font-sans text-xs sm:text-sm tracking-[0.2em] text-neutral-400 font-light italic leading-none">
              Prepared exclusively for
            </span>
            
            {/* Massive Gilded Accent for the Recipient Name */}
            <div className="inline-block relative max-w-full px-8 py-2">
              <h2 className="gold-text font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.12em] font-light leading-snug uppercase break-words w-full">
                {recipientName || '[Recipient Name]'}
              </h2>
              {/* Very fine underscore line underneath recipient */}
              <div className="w-[110%] h-[1px] bg-gradient-to-r from-transparent via-[#937330]/30 to-transparent absolute bottom-0 left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* Section 3: Title & Event Branding */}
          <div className="mb-10 sm:mb-14 space-y-5">
            <div className="space-y-1">
              <h1 className="font-serif text-[42px] sm:text-5.5.5xl md:text-[68px] tracking-[0.16em] leading-[1.1] text-neutral-100 font-light uppercase">
                Ichi-go Ichi-e
              </h1>
              <h3 className="font-sans text-xs sm:text-sm tracking-[0.45em] text-[#bfa35d] font-semibold uppercase pt-1">
                The Kyoto Sojourn
              </h3>
              <p className="font-serif text-xs sm:text-sm tracking-[0.18em] italic text-neutral-400 font-light mt-1">
                by Luke Coutinho
              </p>
            </div>

            {/* Majestic Artistic Calligraphy Character Rendering */}
            <div className="py-4 space-y-2">
              {/* Massive centered Japanese character overlay with counter-acting default right letter spacing alignment */}
              <h4 className="font-serif text-6xl sm:text-[84px] md:text-[100px] tracking-[0.3em] text-[#ecd89d]/85 font-medium select-none pl-6 leading-none">
                一期一会
              </h4>
              <p className="font-serif text-[11px] sm:text-xs tracking-[0.25em] uppercase text-neutral-400 font-light">
                One encounter. Once in a lifetime.
              </p>
            </div>
            
            <div className="w-16 h-[1px] bg-[#937330]/30 mx-auto" />
          </div>

          {/* Section 4: Main Poetry Columns (Exact text with superb font size readability & reduced line spacing noise) */}
          <div className="space-y-6 sm:space-y-8 text-[15px] sm:text-[17px] md:text-[19px] leading-[1.8] text-neutral-300 font-serif font-light text-justify max-w-md md:max-w-lg tracking-wide">
            
            <div className="space-y-5">
              <p className="text-center italic text-[#fdf0cd]/95 font-medium leading-relaxed">
                There are moments that are chosen.<br />
                And moments that arrive only once.
              </p>
              <p className="text-center font-semibold tracking-[0.3em] text-[#ecd89d] uppercase text-xs sm:text-sm">
                Life is one such moment.
              </p>
            </div>

            <p className="text-neutral-300">
              Each day carries the possibility of a pause to reset, to realign, to begin again. Yet presence is often delayed, traded for repetition.
            </p>

            <p className="text-center italic text-[#bfa35d] font-normal py-1">
              This invitation exists in that space.
            </p>

            {/* Indented styled poem blocks */}
            <div className="space-y-2.5 pl-6 sm:pl-10 border-l border-[#bfa35d]/30 text-neutral-200">
              <p>To step away from repetition.</p>
              <p>To return to what matters.</p>
              <p>To experience time differently.</p>
            </div>

            {/* Core Announcement Accent Container */}
            <div className="py-6 sm:py-8 my-3 border-y border-neutral-900/80 space-y-4">
              <p className="text-center font-sans text-[11px] tracking-[0.22em] text-[#ecd89d] uppercase font-semibold">
                In October 2026
              </p>
              <p className="text-stone-100 text-center font-normal leading-relaxed text-lg sm:text-[20px] md:text-[22px]">
                Luke will host a singular private experience in Kyoto.
              </p>
              <p className="text-center text-[10px] sm:text-xs tracking-[0.16em] text-neutral-400 uppercase font-sans space-y-1">
                <span className="block font-light">Created for one individual only.</span>
                <span className="block font-light">Not publicly offered.</span>
                <span className="block font-light">Not designed for scale.</span>
                <span className="block font-light">Never repeated in the same form again.</span>
              </p>
            </div>

            <p>
              Last year, a similar experience unfolded in another part of the world, quietly and without public record.
            </p>

            <p>
              This year, Kyoto becomes the setting.
            </p>

            {/* Verbatim Bullet list layout */}
            <div className="py-4 text-center space-y-3 leading-loose">
              <div className="font-sans text-[11px] tracking-[0.45em] text-[#bfa35d] uppercase font-bold">
                THE ACCORD
              </div>
              <div className="font-serif text-lg sm:text-xl tracking-widest text-[#fdf0cd] space-y-1">
                <p>One guest.</p>
                <p>Five days.</p>
                <p className="gold-text font-semibold uppercase text-xl sm:text-2xl mt-1">Kyoto.</p>
              </div>
            </div>

            <div className="w-16 h-[1px] bg-neutral-900/80 mx-auto" />

            <div className="space-y-3 italic text-neutral-300 text-center">
              <p>A quieter rhythm.</p>
              <p>Rare access.</p>
            </div>

            <div className="space-y-2 text-center text-neutral-300">
              <p>A private tea ceremony held in stillness.</p>
              <p>Temple doors rarely opened.</p>
              <p>Quiet spaces.</p>
              <p>A version of Kyoto experienced differently.</p>
            </div>

            {/* Highly striking focal point block */}
            <div className="py-6 sm:py-8 my-3 bg-black/45 border border-neutral-900/85 px-4 sm:px-6 space-y-3 rounded-sm shadow-xl">
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#bfa35d] font-semibold">
                Most importantly
              </p>
              <h4 className="font-serif text-2xl sm:text-3xl tracking-wider text-[#ecd89d] font-normal leading-normal">
                Time with Luke.
              </h4>
              <p className="font-sans text-[10px] tracking-[0.4em] text-neutral-400 uppercase font-light">
                Uninterrupted. Unfiltered. Unhurried.
              </p>
            </div>

            <p className="text-center italic">
              Away from the demands of everyday life.
            </p>

            <p className="text-neutral-300">
              Shared meals. Conversations that unfold naturally. Space to think.
            </p>

            <div className="space-y-1 font-sans text-xs tracking-[0.25em] uppercase text-neutral-400 py-1 text-center">
              <p>No audience.</p>
              <p>No performance.</p>
              <p className="text-[#ecd89d] font-bold tracking-[0.35em] mt-1">Only presence.</p>
            </div>

            <div className="pt-4 border-t border-neutral-900/60 text-neutral-300">
              <p>Luke will host one guest.</p>
              <p className="text-center text-[#fdf0cd]/95 italic my-2 font-medium">This year, your name was considered.</p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 text-center leading-relaxed">
              You may also choose to gift this experience to someone you love or deeply value.
            </p>

            {/* RSPV / Contacts Block (Sleed layout with optimized vertical margins) */}
            <div className="py-8 my-6 border-y border-[#937330]/20 bg-[#0c0a07]/50 rounded-sm space-y-5 max-w-md mx-auto">
              <p className="font-serif text-xs tracking-[0.15em] uppercase text-neutral-400 text-center leading-normal px-4">
                Should you wish to privately receive further details, please write to:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-center">
                <div className="space-y-0.5">
                  <span className="block font-sans text-xs tracking-[0.22em] uppercase text-[#ecd89d] font-semibold">Ankita</span>
                  <a 
                    href="mailto:ankita.nair@lukecoutinho.com" 
                    className="block font-mono text-xs text-neutral-300 hover:text-[#fdf0cd] transition-colors hover:underline"
                  >
                    ankita.nair@lukecoutinho.com
                  </a>
                </div>
                
                <div className="space-y-0.5">
                  <span className="block font-sans text-xs tracking-[0.22em] uppercase text-[#ecd89d] font-semibold">Clive</span>
                  <a 
                    href="mailto:clive@lukecoutinho.com" 
                    className="block font-mono text-xs text-neutral-300 hover:text-[#fdf0cd] transition-colors hover:underline"
                  >
                    clive@lukecoutinho.com
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-400 text-center italic leading-relaxed">
              This invitation has been prepared personally for one individual only.
            </p>
          </div>

          {/* Section 5: Traditional Wax Seal Imprimatur at the Bottom */}
          <div className="mt-12 sm:mt-16 flex flex-col items-center space-y-3">
            
            {/* Authentic Gold Foil Wax Seal Stamp */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfc07b] via-[#91712a] to-[#5a4415] p-[1px] shadow-lg shadow-black/80 relative hover:scale-[1.05] transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#694e18] via-[#cca960] to-[#806222] flex items-center justify-center relative overflow-hidden">
                <span className="font-serif text-base font-bold text-[#fdf0cd] tracking-widest leading-none drop-shadow-md select-none">
                  一期
                </span>
                
                <div className="absolute inset-1 border border-[#dfc07b]/30 rounded-full pointer-events-none" />
                <div className="absolute inset-[2px] border border-black/15 rounded-full pointer-events-none" />
              </div>
            </div>
            
            <p className="font-sans text-[9px] tracking-[0.4em] text-neutral-500 uppercase">
              Strictly private & confidential.
            </p>
          </div>

        </div>
      </div>
    );
  }
);

InvitationCard.displayName = 'InvitationCard';
