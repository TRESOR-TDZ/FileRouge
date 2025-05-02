import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

const DashboardMain = () => {
  // Déclaration de l'état pour gérer le thème ('light' ou 'dark')
  const [theme, setTheme] = useState('light');

  // Définition de la couleur d'arrière-plan de la carte en fonction du thème
  const cardBackgroundColor = theme === 'light' ? 'bg-[#4091CE]' : 'bg-[#2D3748]';

  // Effet pour appliquer le thème au chargement de la page
  useEffect(() => {
    // Vérifie si le thème est enregistré dans le stockage local du navigateur
    if (
      localStorage.theme === 'dark' ||
      // Si aucun thème n'est enregistré, vérifie si l'utilisateur préfère le thème sombre (paramètres du système/navigateur)
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      // Si le thème est sombre, définit l'état sur 'dark' et ajoute la classe 'dark' à l'élément racine du document (<html>)
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      // Sinon (thème clair), définit l'état sur 'light' et supprime la classe 'dark' de l'élément racine
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []); // Le tableau vide [] garantit que cet effet ne s'exécute qu'une seule fois, au montage du composant

  // Fonction pour basculer entre les thèmes clair et sombre
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // Enregistre le thème sélectionné par l'utilisateur dans le stockage local du navigateur
      localStorage.theme = newTheme;
      // Ajoute ou supprime la classe 'dark' de l'élément racine du document (<html>) pour appliquer les styles CSS appropriés
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  // Rendu du composant
  return (
    <div className={cn(
        "p-4 md:p-6 lg:p-8",
        // Applique les styles de texte et d'arrière-plan en fonction du thème actuel
        theme === 'dark' ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    )}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center gap-2">
            {/* Lien de navigation avec style de texte conditionnel */}
            <a href="#" className={cn(
                "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                // Applique la couleur du texte en fonction du thème
                theme === 'light' ? 'text-black' : 'text-white'
            )}>
              Utilisateur
            </a>
            <span className="text-gray-500 dark:text-gray-400">/</span>
             {/* Lien de navigation avec style de texte conditionnel */}
            <a href="#"  className={cn(
                "hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                 // Applique la couleur du texte en fonction du thème
                theme === 'light' ? 'text-black' : 'text-white'
            )}>
              Profil Détail
            </a>
        </div>
        {/* Bouton pour basculer entre les thèmes */}
        <Button
            variant="outline"
            onClick={toggleTheme}
            className={cn(
            "hover:bg-blue-700 hover:text-white transition-colors",
            // Applique les styles du bouton en fonction du thème actuel
            theme === "light" ? "bg-[#4091CE] text-white" : "bg-gray-800 text-white"
            )}
        >
            Modifier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className={cn("md:col-span-1", cardBackgroundColor)}>
          <CardHeader>
            <CardTitle className="text-white">Profil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={'/placeholder-user.jpg'} alt={'TRESOR ZIGNA'} />
              <AvatarFallback>
                <User className="w-10 h-10 text-gray-500" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-white">TRESOR ZIGNA</p>
              <div className="w-full bg-white/20 h-[1px] my-2"></div>
              <p className="text-sm text-gray-200">zignatresor@gmail.com</p>
              <p className="text-sm text-gray-200">Role: Admin</p>
            </div>
          </CardContent>
        </Card>

        {/* General Information Card */}
        <Card className={cn("md:col-span-2", cardBackgroundColor)}>
          <CardHeader>
            <CardTitle className="text-white">Informations Générales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
                "border-t border-l border-r border-b rounded-md",
                // Applique les styles de bordure en fonction du thème actuel
                theme === 'light'
                ? "border-gray-200 dark:border-gray-700"
                : "border-gray-700"
            )}>
              <div className="grid grid-cols-2 border-b border-white/20">
                <div className="text-sm font-medium text-gray-200 p-4">Champ</div>
                <div className="text-white p-4">Valeur</div>
              </div>
                <div className="grid grid-cols-2 border-b border-white/20">
                    <div className="text-sm font-medium text-gray-200 p-4">Statut</div>
                    <div className="text-white p-4">Actif</div>
                </div>
                <div className="grid grid-cols-2 border-b border-white/20">
                    <div className="text-sm font-medium text-gray-200 p-4">Tel</div>
                    <div className="text-white p-4">677800799</div>
                </div>
                 <div className="grid grid-cols-2 ">
                    <div className="text-sm font-medium text-gray-200 p-4">Adresse</div>
                     <div className="text-white p-4">Akwa Palace</div>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className={cn("md:col-span-2", "md:col-start-2", "max-h-[200px]", cardBackgroundColor)}>
          <CardHeader>
            <CardTitle className="text-white">Sécurité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-2 border-b border-white/20">
                <div className="text-sm font-medium text-gray-200 p-4">Mot de passe</div>
                <div className="text-white p-4">motdepasse_exemple</div>
              </div>
              <div className="grid grid-cols-2">
                 <div className="text-sm font-medium text-gray-200 p-4">Catégorie</div>
                  <div className="text-white p-4">Utilisateur Premium</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={cn(
          "mt-8 text-center text-sm",
          // Applique la couleur du texte en fonction du thème actuel
          theme === 'light' ? "text-gray-500 dark:text-gray-400" : "text-gray-400"
      )}>
        Designed by TRESOR ZIGNA / AVRIL 2025
      </div>
    </div>
  );
};

export default DashboardMain;