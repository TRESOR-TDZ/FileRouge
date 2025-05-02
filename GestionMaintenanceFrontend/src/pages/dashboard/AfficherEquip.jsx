// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { cn } from '@/lib/utils';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import axios from 'axios'; // Importation d'Axios


// const EquipmentsPage = () => {
//     const [theme, setTheme] = useState<'light' | 'dark'>('light');
//     const [isDarkMode, setIsDarkMode] = useState(false);
//     const [equipments, setEquipments] = useState<any[]>([]); // État pour stocker les données des équipements
//     const [loading, setLoading] = useState(true); // État pour gérer le chargement
//     const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

//     useEffect(() => {
//         if (
//             localStorage.theme === 'dark' ||
//             (!('theme' in localStorage) &&
//                 window.matchMedia('(prefers-color-scheme: dark)').matches)
//         ) {
//             document.documentElement.classList.add('dark');
//             setTheme('dark');
//             setIsDarkMode(true);
//         } else {
//             document.documentElement.classList.remove('dark');
//             setTheme('light');
//             setIsDarkMode(false);
//         }
//     }, []);

//     // Fonction pour récupérer les équipements depuis le backend Laravel
//     const fetchEquipments = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await axios.get<any[]>('http://localhost:8000/api/equipments'); // Remplacez par l'URL de votre API Laravel
//             setEquipments(response.data);
//         } catch (err: any) {
//             setError(err.message || 'Une erreur est survenue lors de la récupération des équipements.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchEquipments();
//     }, []);

//     const toggleTheme = () => {
//         const newTheme = isDarkMode ? 'light' : 'dark';
//         setTheme(newTheme);
//         setIsDarkMode(!isDarkMode);
//         if (newTheme === 'dark') {
//             localStorage.theme = 'dark';
//             document.documentElement.classList.add('dark');
//         } else {
//             localStorage.theme = 'light';
//             document.documentElement.classList.remove('dark');
//         }
//     };

//     // Fonction pour simuler la mise à jour d'un équipement (à adapter avec votre API Laravel)
//     const handleUpdateEquipment = async (id: number, updatedData: any) => {
//         try {
//             // Envoie une requête PUT/PATCH à votre API Laravel pour mettre à jour l'équipement
//             const response = await axios.patch(`http://localhost:8000/api/equipments/${id}`, updatedData); // Assurez-vous que l'URL est correcte
//              // Mettre à jour l'état local
//             setEquipments(equipments.map(eq => eq.id === id ? { ...eq, ...response.data} : eq));
//             // Affiche un message de succès
//             alert("Equipement mis à jour avec succès !");

//         } catch (error: any) {
//             console.error("Erreur lors de la mise à jour de l'équipement:", error);
//             alert("Erreur lors de la mise à jour de l'équipement !");
//         }
//     };


//     if (loading) {
//         return <div className="p-4">Chargement des équipements...</div>; // Simple indicateur de chargement
//     }

//     if (error) {
//         return <div className="p-4 text-red-500">Erreur : {error}</div>; // Affichage de l'erreur
//     }

//     return (
//         <div className={cn(
//             "p-4 md:p-6 lg:p-8",
//             isDarkMode ? 'dark' : ''
//         )}>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 lg:mb-8">
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200">
//                     Équipements
//                 </h1>
//                 <Button
//                     onClick={toggleTheme}
//                     className="bg-blue-500 hover:bg-blue-600 text-white"
//                 >
//                     Changer de thème
//                 </Button>
//             </div>
//             {/* Ajout des liens ici */}
//             <div className="mb-4 md:mb-6 lg:mb-8 text-sm text-gray-500 dark:text-gray-400">
//                 <span>Équipements</span> <span className="mx-1">/</span> <span>Détails équipement</span>
//             </div>

//             <Card className="shadow-lg">
//                 <CardHeader>
//                     <CardTitle className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300">
//                         Informations détaillées
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
//                         {/* Détails de l'équipement */}
//                         {equipments.length > 0 ? (
//                             <div className="space-y-4">
//                                 <div className={cn(
//                                     "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md",
//                                     "bg-blue-50 dark:bg-blue-950/50"
//                                 )}>
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">Nom</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].name}</span>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md">
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">Marque</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].brand}</span>
//                                 </div>
//                                 <div className={cn(
//                                     "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md",
//                                     "bg-blue-50 dark:bg-blue-950/50"
//                                 )}>
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">Catégorie</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].category}</span>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md">
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">État</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].condition}</span>
//                                 </div>
//                                 <div className={cn(
//                                     "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md",
//                                     "bg-blue-50 dark:bg-blue-950/50"
//                                 )}>
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">Date mise à disposition</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].date}</span>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md">
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">Emplacement</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].location}</span>
//                                 </div>
//                                 <div className={cn(
//                                     "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md",
//                                     "bg-blue-50 dark:bg-blue-950/50"
//                                 )}>
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">Statut</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].status}</span>
//                                 </div>
//                                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 py-2 px-2 rounded-md">
//                                     <span className="font-medium text-gray-600 dark:text-gray-400">Prix</span>
//                                     <span className="text-gray-900 dark:text-gray-100">{equipments[0].price}</span>
//                                 </div>
//                                  <Button
//                                     className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
//                                     onClick={() => handleUpdateEquipment(equipments[0].id, {
//                                         name: 'Nouveau Nom',
//                                         price: '200000 FCFA'
//                                     })}
//                                 >
//                                     Modifier
//                                 </Button>
//                             </div>
//                         ) : (
//                             <div className="text-gray-500 dark:text-gray-400">Aucun équipement disponible.</div>
//                         )}

//                         {/* Image de l'équipement (simulée avec une carte) */}
//                         <div className="flex items-start justify-center">
//                             <Card className="w-full max-w-md shadow-md">
//                                 <CardHeader>
//                                     <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Aperçu</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     {/* Remplacer cette div avec une image si vous avez une URL */}
//                                     <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
//                                         <span className="text-gray-500 dark:text-gray-400 text-sm">Image de l'équipement</span>
//                                     </div>
//                                     {/* Vous pouvez ajouter une légende ou une description ici si nécessaire */}
//                                     <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                                         Ceci est une représentation visuelle de l'équipement.
//                                     </p>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default EquipmentsPage;
