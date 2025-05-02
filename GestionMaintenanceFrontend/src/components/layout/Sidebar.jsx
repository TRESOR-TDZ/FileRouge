import React, { useState } from 'react';
import {LayoutDashboard, Users, MapPin, Package, CheckCircle, ChevronDown,} from 'lucide-react';
import  Button  from '../elements/Button';
import  classNames  from 'classnames';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion"


const ClassNames = classNames;
const Sidebar = ({ isDarkMode }) => {

    // État local pour gérer l'ouverture/fermeture du sous-menu
    const [open, setOpen] = useState(false);

    // Définition des éléments de navigation
    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Utilisateurs', icon: Users, path: '/users' },
        { label: 'Locaux', icon: MapPin, path: '/locaux' },
        { label: 'Equipements', icon: Package, path: '/equipements' },
        { label: 'Maintenances', icon: CheckCircle, path: '/maintenances',
          children: [
            { label: 'Locaux', path: '/maintenances/locaux' },
            { label: 'Equipements', path: '/maintenances/equipements' },
          ],
        },
    ];

    // Fonction pour rendre le sous-menu animé
    const renderSubMenu = (children) => (
      <AnimatePresence>
        {/* Condition pour afficher le sous-menu si 'open' est true */}
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-1 ml-6">
                    
            {/* Parcours des éléments enfants du sous-menu */}
            {children.map((child) => (
              <Button key={child.label} variant="ghost" className={ClassNames("w-full justify-start", isDarkMode ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900")}
                as="a">
                {/* Libellé de l'élément du sous-menu */}
                {child.label}
              </Button>
            ))}
          </motion.div>)
       }
      </AnimatePresence>
    );

    // Fonction pour rendre un élément de navigation avec un sous-menu
    const renderNavItem = (item) => (
      <Button key={item.label} variant="ghost" className={ClassNames("w-full justify-start", isDarkMode ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900")}
          onClick={() => item.children && setOpen(!open)} // Ouvrir/fermer le sous-menu au clic
        >
          {/* Conteneur pour l'icône et le libellé */}
          <div className="flex items-center">
            <item.icon className={ClassNames("mr-2 h-4 w-4", isDarkMode ? "text-gray-300" : "text-gray-700")} />
            {item.label}
          </div>

            {/* Icône de chevron pour indiquer la présence d'un sous-menu */}
            {item.children && (
                <ChevronDown className={ClassNames( "h-4 w-4 m-4 transition-transform",  open ? "rotate-180" : "rotate-0" // Rotation de l'icône en fonction de l'état du sous-menu
                )}/>
          )}
      </Button>
    );

    // Fonction pour rendre un élément de navigation simple (sans sous-menu)
    const renderSimpleNavItem = (item) => (
      <Button key={item.label} variant="ghost" className={ClassNames("w-full justify-start",
          isDarkMode ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900")}
        as="a">
          {/* Icône et libellé de l'élément de navigation */}
            <item.icon className={ClassNames("mr-2 h-4 w-4", isDarkMode ? "text-gray-300" : "text-gray-700")} />
            {item.label}
      </Button>
    );

  return (
    <aside className={ClassNames( "w-64 hidden md:block flex-shrink-0 border-r", isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")}>

      {/* En-tête de la barre latérale (peut contenir un logo) */}
      <div className="p-4">
        <div className={ClassNames("h-8 rounded mb-6", isDarkMode ? "bg-white/20" : "bg-gray-200")}></div>
      </div>
     
     {/* Navigation principale */}
     <nav className="space-y-2">
     
      {/* Parcours des éléments de navigation et rendu en fonction de la présence d'enfants */}
      {navItems.map((item) => item.children ? (
        <div key={item.label}>
        {renderNavItem(item)}
        {renderSubMenu(item.children)}
        </div>
        ) : (
          renderSimpleNavItem(item) )
      )}
     </nav>
    </aside>
  );
};

export default Sidebar;