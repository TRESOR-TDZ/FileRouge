import React from 'react';
import {Search, Bell, User, Menu, Sun, Moon, Settings} from 'lucide-react';
import  Button  from '../elements/Button';
import  classNames  from 'classnames';

const cn = classNames;
const Navbar = ({ isDarkMode, toggleTheme }) => {

    // Fonction pour rendre la barre de recherche (affichée sur les écrans moyens et grands)
    const renderSearchInput = () => (
        <div className="relative w-64 hidden md:block ml-4">
          {/* Icône de recherche */}
          <Search className={cn("absolute left-2.5 top-2.5 h-4 w-4", isDarkMode ? "text-gray-500" : "text-gray-500")} />

          {/* Input de texte pour la recherche */}
          <input type="text"placeholder="Search here..." className={cn("w-full pl-8 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2",
              isDarkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-blue-500"
              : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500"
            )}
          />
        </div>
    );

    // Fonction pour rendre le bouton de bascule du thème (clair/sombre)
    const renderThemeToggleButton = () => (
        <Button variant="ghost" size="icon" className = 'border  border-gray-500' onClick={toggleTheme}>
          {/* Affichage de l'icône Soleil si le thème sombre est actif, sinon l'icône Lune */}
          {isDarkMode ? (
            <Sun className="h-6 w-6 text-gray-300" />
          ) : (
            <Moon className="h-6 w-6 text-gray-300 " />
          )}
        </Button>
    );

    // Fonction pour rendre le bouton des notifications
    const renderNotificationButton = () => (
      <Button variant="ghost" size="icon" className="relative border  border-gray-500">
        {/* Icône de la cloche pour les notifications */}
        <Bell className={cn("h-6 w-6", isDarkMode ? "text-gray-300" : "text-gray-700")} />

        {/* Indicateur visuel pour les nouvelles notifications */}
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
      </Button>
    );

    // Fonction pour rendre le bouton de l'utilisateur
    const renderUserButton = () => (
      <Button variant="ghost" size="icon" className='border  border-gray-500'>
        {/* Icône de l'utilisateur */}
        <User className={cn("h-6 w-6", isDarkMode ? "text-gray-300" : "text-gray-700")} />
      </Button>
    );

    // Fonction pour rendre le bouton des paramètres
    const renderSettingsButton = () => (
      <Button variant="ghost" size="icon" className='border  border-gray-500'>
        {/* Icône des paramètres */}
        <Settings className={cn("h-6 w-6", isDarkMode ? "text-gray-300" : "text-gray-700")} />
      </Button>
    );

    // Fonction pour rendre le bouton du menu mobile (affiché sur les petits écrans)
    const renderMobileMenuButton = () => (
      <Button variant="ghost" size="icon" className="md:hidden">
        {/* Icône du menu */}
        <Menu className={cn("h-6 w-6", isDarkMode ? "text-gray-300" : "text-gray-700")} />
      </Button>
    );

    return (
      <nav className={cn("backdrop-blur-md border-b-2 p-4 flex items-center justify-between",
            isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white/10 border-white/10" )}>

          {/* Section gauche de la barre de navigation : menu mobile et titre */}
        <div className="flex items-center gap-4">
          {renderMobileMenuButton()}
          <h1 className={cn("text-xl font-semibold", isDarkMode ? "text-white" : "text-gray-900")}>Dashboard</h1>
          {renderSearchInput()}
        </div>
        
        {/* Section droite de la barre de navigation : boutons d'actions */}
        <div className="flex items-center gap-4">
          {renderThemeToggleButton()}
          {renderNotificationButton()}
          {renderUserButton()}
          {renderSettingsButton()}
        </div>
      </nav>
    );
};

export default Navbar;