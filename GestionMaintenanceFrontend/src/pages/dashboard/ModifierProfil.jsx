import React, { useState, useEffect, } from 'react';// useCallback 
import { Button } from '@/components/ui/button'; // Assurez-vous que le chemin est correct
import { Input } from '@/components/ui/input';   // Assurez-vous que le chemin est correct
import { Label } from '@/components/ui/label';   // Assurez-vous que le chemin est correct
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assurez-vous que le chemin est correct
import { Switch } from '@/components/ui/switch'; // Assurez-vous que le chemin est correct
// import { cn } from '@/lib/utils';     // Assurez-vous que le chemin est correct
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assurez-vous que le chemin est correct
import { ImagePlus, Moon, Sun } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';
// import { useTheme } from 'next-themes';

// Définir les types pour les rôles
// type Role = 'superAdmin' | 'admin' | 'utilisateur'; // Pas de Typescript

const DashboardAddUser = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenoms: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: '',
    role: '',
    activerDesactiver: false,
    avatar: null,
  });
  const [displayName, setDisplayName] = useState('');
  const [displayEmail, setDisplayEmail] = useState('');
//   const { theme, setTheme } = useTheme();
//   const location = useLocation();

    // State pour simuler le rôle de l'utilisateur connecté
    // const [userRole, setUserRole] = useState<Role>('utilisateur'); // Par défaut à 'utilisateur'
    // const [userRole, setUserRole] = useState('utilisateur'); // Par défaut à 'utilisateur'

  useEffect(() => {
    setDisplayName(`${formData.nom} ${formData.prenoms}`);
    setDisplayEmail(formData.email);
  }, [formData.nom, formData.prenoms, formData.email]);

    // Fonction pour gérer le changement de thème
    // const handleThemeChange = () => {
    //     setTheme(theme === 'light' ? 'dark' : 'light');
    // };

  const handleChange = (e) => { // Suppression de : React.ChangeEvent<...>
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked) => { // Suppression de : boolean
    setFormData({ ...formData, activerDesactiver: checked });
  };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

  const handleSubmit = (e) => { // Suppression de : React.FormEvent
    e.preventDefault();
    console.log(formData);
  };

    // Fonction pour déterminer si un champ doit être affiché
    // const shouldShowField = useCallback((fieldName) => { // Suppression de : keyof typeof formData
    //     if (userRole === 'superAdmin' || userRole === 'admin') {
    //         return true;
    //     }
    //     if (userRole === 'utilisateur') {
    //         const hiddenFields = ['role', 'activerDesactiver'];
    //         return !hiddenFields.includes(fieldName);
    //     }
    //     return false;
    // }, [userRole]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Ajouter un utilisateur</h1>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Barre de dégradé */}
          <div className="bg-gradient-to-r from-[#4091CE] to-transparent h-6 -mt-6 mb-6 -mx-6 rounded-t-lg"></div>
          <div className="flex flex-col  gap-6">
            {/* Section Avatar et Infos */}
            <div className=" flex  items-center gap-4">
              <Avatar className="w-24 h-24 relative">
                <AvatarImage src={formData.avatar || "/placeholder-user.jpg"} alt="Avatar de l'utilisateur" />
                <AvatarFallback>
                  <span className="text-lg font-semibold">
                    {formData.nom.charAt(0)}
                    {formData.prenoms.charAt(0)}
                  </span>
                </AvatarFallback>
                <div className="absolute bottom-0 right-0">
                  <Label
                    htmlFor="avatar-input"
                    className="cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 p-1 flex items-center justify-center
                                               hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                    title="Modifier l'avatar"
                  >
                    <ImagePlus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </Label>
                  <Input
                    type="file"
                    id="avatar-input"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              </Avatar>
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{displayName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{displayEmail}</p>
              </div>
            </div>

            {/* Formulaire Principal */}
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* {shouldShowField('nom') && ( */}
                  <>
                    <Label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</Label>
                    <Input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Entrez votre nom"
                    />
                  </>
                {/* // )} */}
              </div>
              <div>
                {/* {shouldShowField('motDePasse') && ( */}
                  <>
                    <Label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mot de passe</Label>
                    <Input
                      type="password"
                      id="motDePasse"
                      name="motDePasse"
                      value={formData.motDePasse}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Entrez votre mot de passe"
                    />
                  </>
                {/* )} */}
              </div>
              <div>
                {/* {shouldShowField('prenoms') && ( */}
                  <>
                    <Label htmlFor="prenoms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prénoms</Label>
                    <Input
                      type="text"
                      id="prenoms"
                      name="prenoms"
                      value={formData.prenoms}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Entrez vos prénoms"
                    />
                  </>
                {/* )} */}
              </div>
              <div>
                {/* {shouldShowField('confirmerMotDePasse') && ( */}
                  <>
                    <Label htmlFor="confirmerMotDePasse" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmer le mot de passe</Label>
                    <Input
                      type="password"
                      id="confirmerMotDePasse"
                      name="confirmerMotDePasse"
                      value={formData.confirmerMotDePasse}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Confirmez votre mot de passe"
                    />
                  </>
                {/* )} */}
              </div>
              <div>
                {/* {shouldShowField('email') && ( */}
                  <>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="Entrez votre email"
                    />
                  </>
                {/* )} */}
              </div>
              <div>
                {/* {shouldShowField('role') && ( */}
                  <>
                    <Label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, role: value })} value={formData.role}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="utilisateur">Utilisateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                {/* )} */}
              </div>
              <div>
                {/* {shouldShowField('activerDesactiver') && ( */}
                  <div className="flex items-center gap-4 mt-6">
                    <Switch
                      id="activerDesactiver"
                      checked={formData.activerDesactiver}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="activerDesactiver" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Activer / Désactiver
                    </Label>
                  </div>
                {/* )} */}
              </div>
            </div>
          </div>
          {/* Ajoutez le lien "Dashboard" avant le lien "Modifier" */}
          <div className="flex gap-4 items-center">
            <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
              Dashboard
            </Link>
            {/* Supprimez le bouton de changement de thème d'ici */}
            <Link to="/modifier-utilisateur" className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
              Modifier
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddUser;

