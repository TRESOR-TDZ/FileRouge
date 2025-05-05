import React from 'react';
import { useNavigate } from 'react-router-dom';
import {LayoutDashboard, Users, MapPin, Package, CheckCircle} from 'lucide-react';
import Button from '../elements/Button';
import classNames from 'classnames';

const ClassNames = classNames;
const Sidebar = ({ isDarkMode }) => {
    const navigate = useNavigate();

    // Définition des éléments de navigation
    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Utilisateurs', icon: Users, path: '/DashboardUsersPage' },
        { label: 'Locaux', icon: MapPin, path: '/locaux' },
        { label: 'Equipements', icon: Package, path: '/equipements' },
        { label: 'Maintenances', icon: CheckCircle, path: '/maintenances' },

    ];

    // Fonction pour rendre un élément de navigation
    const renderNavItem = (item) => (
        <Button 
            key={item.label} 
            variant="ghost" 
            className={ClassNames("w-full justify-start text-white", 
                isDarkMode ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-700 hover:bg-[#4091CE] hover:text-white"
            )}
            onClick={() => navigate(item.path)}
        >
            <div className="flex items-center">
                <item.icon className={ClassNames("mr-2 h-4 w-4 text-white", isDarkMode ? "text-gray-300" : "text-gray-700")} />
                {item.label}
            </div>
        </Button>
    );

    return (
        <aside className={ClassNames("w-64 hidden md:block flex-shrink-0 border-r", 
            isDarkMode ? "bg-gray-900 border-gray-800" : "bg-[#1371B9] border-gray-200")}
        >
            {/* En-tête de la barre latérale (peut contenir un logo) */}
            <div className="p-4">
                <div className={ClassNames("h-8 rounded mb-6 ", isDarkMode ? "bg-white/20" : "bg-gray-200")}></div>
            </div>
            
            {/* Navigation principale */}
            <nav className="space-y-2">
                {navItems.map((item) => renderNavItem(item))}
            </nav>
        </aside>
    );
};

export default Sidebar;