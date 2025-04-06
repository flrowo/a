export default function NavigationBar2 ({ paths = [], selectedPath, setSelectedPath }) {
    
    return (
        <nav className="flex fixed h-[60px] p-3 z-[50] w-full items-baseline gap-3 bg-[#2f2936cc] text-white" style={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
            <div className="text-xl font-medium animate-rainbow">flrowo</div>
            {paths.map((item) => {
                let isSelected = false;
                if (item.id === selectedPath || (item.isDefault && selectedPath == null)) {
                    isSelected = true;
                }
                const className = `${isSelected ? "text-rose-300 font-medium cursor-default" : "text-white cursor-pointer"}`;
                return <div
                    key={item.id}
                    className={className}
                    onClick={() => isSelected || setSelectedPath(item.id)}
                >
                    {item.label}
                </div>
            })}
        </nav>
    )
};