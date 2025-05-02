import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importez Axios

const DashboardEquipements = () => {
  const [formData, setFormData] = useState({
    nom: '',
    marque: '',
    categorie: '',
    emplacement: '',
    etat: '',
    dateMiseDisposition: '',
    prix: '',
    statut: '',
    image: null,
  });
  const [formHeight, setFormHeight] = useState(0);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Utilisez Axios pour envoyer les données à votre API Laravel
      const response = await axios.post('http://your-laravel-api.com/api/equipements', formData); // Ajustez l'URL
      console.log('Réponse de Laravel:', response.data);
      // Gérez la réponse de votre API, par exemple, affichez un message de succès ou réinitialisez le formulaire
      setFormData({
        nom: '',
        marque: '',
        categorie: '',
        emplacement: '',
        etat: '',
        dateMiseDisposition: '',
        prix: '',
        statut: '',
        image: null,
      });
      navigate('/equipements'); // Redirige vers la liste des équipements après l'ajout
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données à Laravel:', error);
      // Gérez les erreurs, par exemple, affichez un message d'erreur à l'utilisateur
    }
  };

  const handleAddEquipementClick = () => {
    navigate('/ajouter-equipement');
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  return (
    <div className={cn(
      "p-4 md:p-6 lg:p-8",
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
    )}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold ">Équipements</h1>
        <Button
          onClick={handleAddEquipementClick}
          className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
        >
          Ajouter un équipement
        </Button>
      </div>
      <h2 className="text-lg mb-4 text-gray-600 dark:text-gray-400">Ajouter un équipement</h2>

      <div className={cn(
        "shadow-md rounded-lg p-6",
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      )}>
        <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Formulaire à gauche */}
            <div className="space-y-6 col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nom" className="block text-sm font-medium ">Nom</Label>
                  <Input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={cn(
                      "mt-1",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}
                    placeholder="Entrez le nom de l'équipement"
                  />
                </div>
                <div>
                  <Label htmlFor="marque" className="block text-sm font-medium ">Marque</Label>
                  <Input
                    type="text"
                    id="marque"
                    name="marque"
                    value={formData.marque}
                    onChange={handleChange}
                    className={cn(
                      "mt-1",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}
                    placeholder="Entrez la marque"
                  />
                </div>
                <div>
                  <Label htmlFor="categorie" className="block text-sm font-medium ">Catégorie</Label>
                  <Input
                    type="text"
                    id="categorie"
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    className={cn(
                      "mt-1",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}
                    placeholder="Entrez la catégorie"
                  />
                </div>
                <div>
                  <Label htmlFor="emplacement" className="block text-sm font-medium ">Emplacement</Label>
                  <Input
                    type="text"
                    id="emplacement"
                    name="emplacement"
                    value={formData.emplacement}
                    onChange={handleChange}
                    className={cn(
                      "mt-1",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}
                    placeholder="Entrez l'emplacement"
                  />
                </div>
                <div>
                  <Label htmlFor="etat" className="block text-sm font-medium ">État</Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, etat: value })}
                    value={formData.etat}
                  >
                    <SelectTrigger className={cn(
                      "mt-1 w-full",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}>
                      <SelectValue placeholder="Sélectionnez l'état" />
                    </SelectTrigger>
                    <SelectContent className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>
                      <SelectItem value="neuf" className={theme === 'dark' ? 'hover:bg-gray-700' : ''}>Neuf</SelectItem>
                      <SelectItem value="bon" className={theme === 'dark' ? 'hover:bg-gray-700' : ''}>Bon</SelectItem>
                      <SelectItem value="use" className={theme === 'dark' ? 'hover:bg-gray-700' : ''}>Usé</SelectItem>
                      <SelectItem value="endommage" className={theme === 'dark' ? 'hover:bg-gray-700' : ''}>Endommagé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateMiseDisposition" className="block text-sm font-medium ">Date de mise à disposition</Label>
                  <Input
                    type="date"
                    id="dateMiseDisposition"
                    name="dateMiseDisposition"
                    value={formData.dateMiseDisposition}
                    onChange={handleChange}
                    className={cn(
                      "mt-1",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="prix" className="block text-sm font-medium ">Prix</Label>
                  <Input
                    type="number"
                    id="prix"
                    name="prix"
                    value={formData.prix}
                    onChange={handleChange}
                    className={cn(
                      "mt-1",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}
                    placeholder="Entrez le prix"
                  />
                </div>
                <div>
                  <Label htmlFor="statut" className="block text-sm font-medium ">Statut</Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, statut: value })}
                    value={formData.statut}
                  >
                    <SelectTrigger className={cn(
                      "mt-1 w-full",
                      theme === 'dark'
                        ? 'bg-blue-950 text-blue-300 border-blue-900/50'
                        : 'bg-blue-50 text-blue-900 border-blue-500/50'
                    )}>
                      <SelectValue placeholder="Sélectionnez le statut" />
                    </SelectTrigger>
                    <SelectContent className={theme === 'dark' ? 'bg-gray-800 text-white' : ''}>
                      <SelectItem value="disponible" className={theme === 'dark' ? 'hover:bg-gray-700' : ''}>Disponible</SelectItem>
                      <SelectItem value="indisponible" className={theme === 'dark' ? 'hover:bg-gray-700' : ''}>Indisponible</SelectItem>
                      <SelectItem value="maintenance" className={theme === 'dark' ? 'hover:bg-gray-700' : ''}>En maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </div>
            <div className="flex justify-end mt-6 col-span-1 md:col-span-3">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Ajouter
              </Button>
            </div>

            {/* Image à droite */}
            <div className="lg:w-1/3 flex flex-col items-start">
              <div className="flex items-center gap-2 mb-4">
                <Label htmlFor="image" className="block text-sm font-medium ">
                  Importer une image
                </Label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="image"
                  className={cn(
                    "cursor-pointer rounded-md px-4 py-2 flex items-center",
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                    "transition-colors duration-200"
                  )}
                >
                  <UploadCloud className="mr-2 w-4 h-4" />
                  Choisir un fichier
                </Label>
              </div>
              {formData.image && (
                <div className="mt-2" style={{ maxHeight: `${formHeight}px`, overflow: 'hidden' }}>
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-auto max-w-full rounded-md object-contain"
                    style={{ maxHeight: '100%' }}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardEquipements;