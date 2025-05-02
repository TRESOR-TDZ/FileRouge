import React from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';
import classNames from 'classnames';


const cn = classNames;
// Composant de mise en page principal (structure de base de la page)
const Layout = ({ isDarkMode, toggleTheme, children }) => {
  return (
    <div className={cn("flex h-screen", isDarkMode ? "bg-gray-950" : "bg-white")}>
    
      {/* Barre latérale de navigation */}
      <Sidebar isDarkMode={isDarkMode} />
            
      {/* Conteneur principal pour le contenu de la page */}
      <div className="flex-1 flex flex-col overflow-hidden">
      
        {/* Barre de navigation supérieure */}
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        {/* Contenu principal de la page (les enfants passés au composant Layout) */}
        <main className={cn("flex-1 overflow-y-auto p-6", isDarkMode ? "bg-gray-950" : "bg-white")}>
          {children}
        </main>
        
        {/* Pied de page */}
          <Footer />
      </div>
    </div>
  );
};

export default Layout;