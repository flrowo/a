import { useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import useUrlManager from '../hooks/useUrlManager.js';

export default function NavigationBar2({ paths = [] }) {
    const isWindowLessThan500px = useMediaQuery('(max-width: 500px)');
    const [menuOpen, setMenuOpen] = useState(false);

    const urlManager = useUrlManager();
    const currentPage = urlManager.page.get();

    const renderLinks = () => (
        paths.map((item) => {
            const isSelected = item.id === urlManager.page.get() || (item.isDefault && currentPage == null);
            const className = `${isSelected ? "text-rose-300 font-medium cursor-default" : "text-white cursor-pointer"}`;
            return (
                <div
                    key={item.id}
                    className={className}
                    onClick={() => {
                        if (!isSelected) {
                            setMenuOpen(false);
                            urlManager.page.set(item.id);
                        }
                    }}
                >
                    {item.label}
                </div>
            );
        })
    );

    return (
        <nav
            className="flex fixed h-[60px] px-4 py-3 z-[50] w-full items-center justify-between bg-[#2f2936cc] text-white"
            style={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
        >
            <div className="text-xl font-medium animate-rainbow">flrowo</div>

            {isWindowLessThan500px ? (
                <div className="relative">
                    <button onClick={() => setMenuOpen(v=>!v)} className="focus:outline-none">
                        {/* Hamburger icon */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-[#2f2936] rounded shadow-lg flex flex-col p-2 gap-2 z-50">
                            {renderLinks()}
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-4 items-center">
                    {renderLinks()}
                </div>
            )}
        </nav>
    );
}