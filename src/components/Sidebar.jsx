import { useState, useEffect } from "react";

const navItems = [
  { label: "Hem", href: "/" },
  {
    label: "Tjänster",
    isDropdown: true,
    children: [
      { href: "/rensning-imkanal", label: "Rensning Imkanal" },
      { href: "/ftx-varmevaxlare", label: "FTX / Värmeväxlare" },
      { href: "/avloppsrensning-spolning", label: "Avloppsrensning" },
      { href: "/rensning-franluft", label: "Rensning Frånluft" },
      { href: "/rensning-tilluft", label: "Rensning Tilluft" },
      { href: "/rensning-luft-luft", label: "Rensning Luft-Luft" },
      { href: "/service-omraden", label: "Serviceområden" },
    ],
  },
  { label: "Om Oss", href: "/about" },
  { label: "Kontakt", href: "/contact" },
  { label: "Blogg", href: "/blogg" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) setDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Toggle */}
      {!isOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 p-3 bg-[#2C3E50] text-white rounded-xl shadow-lg border border-white/10"
          onClick={() => setIsOpen(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 bg-[#1A252F] text-slate-200 z-50
          transform transition-transform duration-300 ease-in-out
          shadow-2xl flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Header / Logo */}
        <div className="p-6 border-b border-white/5 shrink-0">
          <a href="/" className="flex items-center gap-4 group" onClick={handleLinkClick}>
            <div className="relative">
              <img
                src="/images/logo.png"
                alt="Ecoventilation Logo"
                width="42"
                height="42"
                className="rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-lg ring-1 ring-white/20 group-hover:ring-emerald-400/50 transition-all" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base tracking-tight leading-tight">EcoVentilation</h2>
              <p className="text-[10px] text-[#3498DB] font-bold tracking-widest uppercase">Ventilation & Avlopp</p>
            </div>
          </a>
        </div>

        {/* Navigation - Takes up available space */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label} className={item.isDropdown ? "dropdown-container" : ""}>
                {item.isDropdown ? (
                  <>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all hover:bg-white/5 '}`}
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${dropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="mt-1 ml-4 border-l-2 border-white/5 space-y-0.5">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              onClick={handleLinkClick}
                              className="block py-1.5 px-4 text-[13px] text-slate-400 hover:text-white hover:bg-white/5 rounded-r-lg transition-colors"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center p-2.5 rounded-xl text-sm font-medium hover:bg-white/5 hover:translate-x-1 transition-all"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer - Compact Version */}
        <div className="p-5 bg-[#162029] border-t border-white/5 shrink-0">
          <div className="space-y-4">
            
            {/* Compact Insurance Box */}
            <div className="flex items-center gap-3 bg-[#3498DB]/10 p-2.5 rounded-lg border border-[#3498DB]/10">
              <img 
                src="/images/lansforsakringar-logo.png"
                alt="LF"
                className="h-6 w-auto opacity-90"
              />
              <span className="text-[10px] leading-tight text-slate-300 font-medium">
                Försäkrade genom <br/>Länsförsäkringar
              </span>
            </div>

            {/* Slim Contact Info */}
            <div className="space-y-1.5">
              <a href="tel:+4620104544" className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-[#3498DB] transition-colors duration-300 transition-colors">
                <span>📞</span> 020-10 45 44
              </a>
              <a href="mailto:kundservice@ecoventilation.se" className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-[#3498DB] transition-colors duration-300 transition-colors">
                <span>✉️</span> <span className="truncate">kundservice@ecoventilation.se</span>
              </a>
            </div>

            {/* Minimal Social & Copyright */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex gap-3 hover:text-[#3498DB]">
                {['FB', 'IG', 'LN'].map(soc => (
                  <a key={soc} href="#" className="text-[9px] font-bold text-slate-500 hover:text-[#3498DB] transition-colors">{soc}</a>
                ))}
              </div>
              <p className="text-[9px] text-slate-600">
                © {new Date().getFullYear()} EcoVentilation
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}