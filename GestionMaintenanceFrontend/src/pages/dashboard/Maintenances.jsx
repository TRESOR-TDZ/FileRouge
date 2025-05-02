// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
//   } from "@/components/ui/alert-dialog"
// import { format } from 'date-fns';
// import { CalendarIcon, CheckCircle, AlertTriangle, Settings, Wrench, ListChecks, PlusCircle, Trash2, BarChart, Clock, Check } from 'lucide-react';
// import { cn } from "@/lib/utils"
// import { useTheme } from 'next-themes'; // Importez useTheme

// // Types
// /**
//  * @typedef {object} Maintenance
//  * @property {string} id
//  * @property {string} type 'Préventive' | 'Corrective'
//  * @property {string} titre
//  * @property {string} local
//  * @property {string} equipement
//  * @property {Date} dateDebut
//  * @property {Date} dateFin
//  * @property {string} status 'Planifiée' | 'En Cours' | 'Terminée' | 'En Retard'
//  */

// // Données de test
// const maintenancesInitiales: Maintenance[] = [
//     {
//         id: '1',
//         type: 'Préventive',
//         titre: 'Maintenance Climatisation Salle A101',
//         local: 'Salle A101',
//         equipement: 'Climatisation',
//         dateDebut: new Date(2024, 10, 21),
//         dateFin: new Date(2024, 10, 21),
//         status: 'Planifiée',
//     },
//     {
//         id: '2',
//         type: 'Corrective',
//         titre: 'Réparation Projecteur Salle B205',
//         local: 'Salle B205',
//         equipement: 'Projecteur',
//         dateDebut: new Date(2024, 10, 23),
//         dateFin: new Date(2024, 10, 24),
//         status: 'En Cours',
//     },
//     {
//         id: '3',
//         type: 'Préventive',
//         titre: 'Maintenance Ordinateurs Labo 1',
//         local: 'Laboratoire 1',
//         equipement: 'Ordinateurs',
//         dateDebut: new Date(2024, 11, 1),
//         dateFin: new Date(2024, 11, 1),
//         status: 'Planifiée',
//     },
//      {
//         id: '4',
//         type: 'Préventive',
//         titre: 'Vérification Extincteurs',
//         local: 'Tout le bâtiment',
//         equipement: 'Extincteurs',
//         dateDebut: new Date(2024, 10, 15),
//         dateFin: new Date(2024, 10, 15),
//         status: 'Terminée',
//     },
//     {
//         id: '5',
//         type: 'Corrective',
//         titre: 'Fuite d\'eau Toilettes Hommes',
//         local: 'Toilettes Hommes',
//         equipement: 'Plomberie',
//         dateDebut: new Date(2024, 10, 20),
//         dateFin: new Date(2024, 10, 22),
//         status: 'En Retard',
//     },
// ];

// function Main() {
//     const [maintenances, setMaintenances] = useState<Maintenance[]>(maintenancesInitiales);
//     const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//     const [isCreating, setIsCreating] = useState(false);
//     const [newMaintenance, setNewMaintenance] = useState<Partial<Maintenance>>({
//         type: 'Préventive',
//         dateDebut: new Date(),
//         dateFin: new Date(),
//     });
//     const [maintenanceToDelete, setMaintenanceToDelete] = useState<string | null>(null);
//     const [stats, setStats] = useState({
//         totalMaintenances: 0,
//         preventives: 0,
//         correctives: 0,
//         terminees: 0,
//         enCours: 0,
//         enRetard: 0,
//     });
//     const { setTheme } = useTheme(); // Utilisez le hook useTheme

//     // Effet pour mettre à jour le statut et calculer les statistiques
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setMaintenances(prevMaintenances => {
//                 let total = prevMaintenances.length;
//                 let preventives = 0;
//                 let correctives = 0;
//                 let terminees = 0;
//                 let enCours = 0;
//                 let enRetard = 0;

//                 const updatedMaintenances = prevMaintenances.map(maintenance => {
//                     if (maintenance.status === 'Planifiée' && maintenance.dateDebut <= new Date() && maintenance.dateFin >= new Date()) {
//                         enCours++;
//                         return { ...maintenance, status: 'En Cours' };
//                     }
//                     if (maintenance.status === 'En Cours' && maintenance.dateFin < new Date()) {
//                         terminees++;
//                         return { ...maintenance, status: 'Terminée' };
//                     }
//                     if (maintenance.status === 'Planifiée' && maintenance.dateDebut < new Date() && maintenance.dateFin < new Date()){
//                         enRetard++;
//                         return {...maintenance, status: 'En Retard'}
//                     }
//                     if(maintenance.type === 'Préventive'){
//                         preventives++;
//                     }
//                     else{
//                         correctives++;
//                     }
//                     return maintenance;
//                 });

//                 setStats({
//                     totalMaintenances: total,
//                     preventives: preventives,
//                     correctives: correctives,
//                     terminees: terminees,
//                     enCours: enCours,
//                     enRetard: enRetard,
//                 });
//                 return updatedMaintenances;
//             });
//         }, 60000);

//         return () => clearInterval(interval);
//     }, []);

//      const handleDateChange = (date: Date | undefined) => {
//         setSelectedDate(date);
//     };

//     const handleCreateMaintenance = () => {
//         if (
//             newMaintenance.type &&
//             newMaintenance.titre &&
//             newMaintenance.local &&
//             newMaintenance.equipement &&
//             newMaintenance.dateDebut &&
//             newMaintenance.dateFin
//         ) {
//             const nouvelleMaintenance: Maintenance = {
//                 id: crypto.randomUUID(),
//                 type: newMaintenance.type,
//                 titre: newMaintenance.titre,
//                 local: newMaintenance.local,
//                 equipement: newMaintenance.equipement,
//                 dateDebut: newMaintenance.dateDebut,
//                 dateFin: newMaintenance.dateFin,
//                 status: 'Planifiée',
//             };
//             setMaintenances([...maintenances, nouvelleMaintenance]);
//             setIsCreating(false);
//             setNewMaintenance({});
//         } else {
//             alert('Veuillez remplir tous les champs pour créer une maintenance.');
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         if (name === 'dateDebut' || name === 'dateFin') {
//             setNewMaintenance({ ...newMaintenance, [name]: new Date(value) });
//         }
//         else{
//         setNewMaintenance({ ...newMaintenance, [name]: value });
//         }
//     };

//     const filteredMaintenances = selectedDate
//         ? maintenances.filter(maintenance => format(maintenance.dateDebut, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'))
//         : maintenances;

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'Planifiée': return 'text-blue-500';
//             case 'En Cours': return 'text-yellow-500';
//             case 'Terminée': return 'text-green-500';
//             case 'En Retard': return 'text-red-500';
//             default: return 'text-gray-500';
//         }
//     };

//       const getStatusIcon = (status: string) => {
//         switch (status) {
//           case "Planifiée":
//             return <CalendarIcon className="w-4 h-4 mr-1 text-blue-500" />;
//           case "En Cours":
//             return <Settings className="w-4 h-4 mr-1 text-yellow-500 animate-spin" />;
//           case "Terminée":
//             return <CheckCircle className="w-4 h-4 mr-1 text-green-500" />;
//           case "En Retard":
//             return <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />;
//           default:
//             return null;
//         }
//       };

//     const handleDeleteMaintenance = (id: string) => {
//         setMaintenanceToDelete(id);
//       };

//     const confirmDeleteMaintenance = () => {
//         if (maintenanceToDelete) {
//           setMaintenances(maintenances.filter((m) => m.id !== maintenanceToDelete));
//         }
//         setMaintenanceToDelete(null);
//       };

//     const cancelDeleteMaintenance = () => {
//         setMaintenanceToDelete(null);
//     };

//     // Fonction pour obtenir la liste unique des équipements
//     const getUniqueEquipements = (maintenances: Maintenance[]) => {
//         const equipements = new Set<string>();
//         maintenances.forEach(maintenance => equipements.add(maintenance.equipement));
//         return Array.from(equipements);
//     };

//     // Fonction pour obtenir la liste unique des locaux
//       const getUniqueLocaux = (maintenances: Maintenance[]) => {
//         const locaux = new Set<string>();
//         maintenances.forEach(maintenance => locaux.add(maintenance.local));
//         return Array.from(locaux);
//     };

//     const uniqueEquipements = getUniqueEquipements(maintenances);
//     const uniqueLocaux = getUniqueLocaux(maintenances);

//     return (
//         <main className="p-6 space-y-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                 <h1 className="text-3xl font-bold text-gray-900">Gestion des Maintenances</h1>
//                  <div className="flex gap-4 items-center">
//                     <Button
//                         onClick={() => setIsCreating(true)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white"
//                     >
//                         <PlusCircle className="mr-2 h-4 w-4" />
//                         Planifier une Maintenance
//                     </Button>
//                 </div>
//             </div>

//             {/* Section des statistiques */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Statistiques Générales</CardTitle>
//                         <CardDescription>Aperçu de toutes les maintenances</CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">{stats.totalMaintenances}</h2>
//                                 <p className="text-gray-500">Total Maintenances</p>
//                             </div>
//                             <BarChart className="w-6 h-6 text-gray-500" />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">{stats.preventives}</h2>
//                                 <p className="text-gray-500">Préventives</p>
//                             </div>
//                             <Wrench className="w-6 h-6 text-blue-500" />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                  <h2 className="text-xl font-semibold">{stats.correctives}</h2>
//                                 <p className="text-gray-500">Correctives</p>
//                             </div>
//                             <AlertTriangle className="w-6 h-6 text-red-500" />
//                         </div>
//                          <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">{stats.terminees}</h2>
//                                 <p className="text-gray-500">Terminées</p>
//                             </div>
//                             <Check className="w-6 h-6 text-green-500" />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">{stats.enCours}</h2>
//                                 <p className="text-gray-500">En Cours</p>
//                             </div>
//                             <Settings className="w-6 h-6 text-yellow-500" />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">{stats.enRetard}</h2>
//                                 <p className="text-gray-500">En Retard</p>
//                             </div>
//                             <Clock className="w-6 h-6 text-red-500" />
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader>
//                         <CardTitle>Aperçu Rapide</CardTitle>
//                         <CardDescription>Résumé des activités de maintenance</CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">Maintenances Préventives</h2>
//                                 <p className="text-gray-500">{maintenances.filter(m => m.type === 'Préventive').length} planifiées</p>
//                             </div>
//                             <Wrench className="w-6 h-6 text-blue-500" />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h2 className="text-xl font-semibold">Maintenances Correctives</h2>
//                                  <p className="text-gray-500">{maintenances.filter(m => m.type === 'Corrective').length} en cours</p>
//                             </div>
//                             <AlertTriangle className="w-6 h-6 text-red-500" />
//                         </div>
//                         <div>
//                             <Button variant="outline" className="w-full">
//                                 Voir toutes les maintenances
//                             </Button>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Calendrier des Maintenances</CardTitle>
//                     <CardDescription>Sélectionner une date pour voir les maintenances</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="rounded-md border">
//                       <Calendar
//                         mode="single"
//                         selected={selectedDate}
//                         onSelect={handleDateChange}
//                         className="rounded-md w-full"
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//             </div>

//             {/* Listes des Maintenances par Equipement et Local */}
//             <div className="flex flex-col gap-8">
//                 <div>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Maintenances par Équipement</CardTitle>
//                             <CardDescription>Liste des équipements concernés par les maintenances</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableHead>Équipement</TableHead>
//                                         <TableHead>Nombre de Maintenances</TableHead>
//                                         <TableHead>Type</TableHead>
//                                         <TableHead>Date Début</TableHead>
//                                         <TableHead>Date Fin</TableHead>
//                                         <TableHead>Statut</TableHead>
//                                         <TableHead>Actions</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {uniqueEquipements.map(equipement => {
//                                         const maintenancesEquipement = maintenances.filter(m => m.equipement === equipement);
//                                         const maintenanceCount = maintenancesEquipement.length;
//                                         // Get the first maintenance for the equipement to show details
//                                         const firstMaintenance = maintenancesEquipement[0];

//                                         return (
//                                         <TableRow key={equipement}>
//                                             <TableCell className="font-medium">{equipement}</TableCell>
//                                             <TableCell>{maintenanceCount}</TableCell>
//                                              <TableCell>{firstMaintenance?.type}</TableCell>
//                                             <TableCell>{firstMaintenance ? format(firstMaintenance.dateDebut, 'dd/MM/yyyy') : 'N/A'}</TableCell>
//                                             <TableCell>{firstMaintenance ? format(firstMaintenance.dateFin, 'dd/MM/yyyy') : 'N/A'}</TableCell>
//                                             <TableCell className={cn(getStatusColor(firstMaintenance?.status || ''))}>
//                                                 {getStatusIcon(firstMaintenance?.status || '')}
//                                                 {firstMaintenance?.status || 'N/A'}
//                                             </TableCell>
//                                             <TableCell>
//                                             <Button variant="outline" size="sm">
//                                                 Voir les détails
//                                             </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                         )
//                                     })}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>
//                 </div>
//                 <div>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Maintenances par Local</CardTitle>
//                             <CardDescription>Liste des locaux concernés par les maintenances</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <Table>
//                                  <TableHeader>
//                                     <TableRow>
//                                         <TableHead>Local</TableHead>
//                                         <TableHead>Nombre de Maintenances</TableHead>
//                                         <TableHead>Type</TableHead>
//                                         <TableHead>Date Début</TableHead>
//                                         <TableHead>Date Fin</TableHead>
//                                         <TableHead>Statut</TableHead>
//                                         <TableHead>Actions</TableHead>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                      {uniqueLocaux.map(local => {
//                                         const maintenancesLocal = maintenances.filter(m => m.local === local);
//                                         const maintenanceCount = maintenancesLocal.length;
//                                          // Get the first maintenance for the local to show details
//                                         const firstMaintenance = maintenancesLocal[0];
//                                         return(
//                                         <TableRow key={local}>
//                                             <TableCell className="font-medium">{local}</TableCell>
//                                             <TableCell>{maintenanceCount}</TableCell>
//                                             <TableCell>{firstMaintenance?.type}</TableCell>
//                                             <TableCell>{firstMaintenance ? format(firstMaintenance.dateDebut, 'dd/MM/yyyy') : 'N/A'}</TableCell>
//                                             <TableCell>{firstMaintenance ? format(firstMaintenance.dateFin, 'dd/MM/yyyy') : 'N/A'}</TableCell>
//                                             <TableCell className={cn(getStatusColor(firstMaintenance?.status || ''))}>
//                                                 {getStatusIcon(firstMaintenance?.status || '')}
//                                                 {firstMaintenance?.status || 'N/A'}
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Button variant="outline" size="sm">
//                                                     Voir les détails
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                         )
//                                      })}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>

//             {/* Formulaire de Création de Maintenance (AlertDialog) */}
//             <AlertDialog open={isCreating} onOpenChange={setIsCreating}>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <AlertDialogTitle>Planifier une Maintenance</AlertDialogTitle>
//                         <AlertDialogDescription>
//                             Veuillez remplir les informations ci-dessous pour planifier une nouvelle maintenance.
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <div className="space-y-4">
//                         <div>
//                             <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type de Maintenance</label>
//                             <select
//                                 id="type"
//                                 name="type"
//                                 value={newMaintenance.type || 'Préventive'}
//                                 onChange={handleInputChange}
//                                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                             >
//                                 <option value="Préventive">Préventive</option>
//                                 <option value="Corrective">Corrective</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label htmlFor="titre" className="block text-sm font-medium text-gray-700">Titre</label>
//                             <input
//                                 type="text"
//                                 name="titre"
//                                 id="titre"
//                                 value={newMaintenance.titre || ''}
//                                 onChange={handleInputChange}
//                                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="local" className="block text-sm font-medium text-gray-700">Local</label>
//                             <input
//                                 type="text"
//                                 name="local"
//                                 id="local"
//                                 value={newMaintenance.local || ''}
//                                 onChange={handleInputChange}
//                                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="equipement" className="block text-sm font-medium text-gray-700">Équipement</label>
//                             <input
//                                 type="text"
//                                 name="equipement"
//                                 id="equipement"
//                                 value={newMaintenance.equipement || ''}
//                                 onChange={handleInputChange}
//                                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                             />
//                         </div>
//                          <div>
//                             <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">Date de Début</label>
//                             <input
//                                 type="date"
//                                 name="dateDebut"
//                                 id="dateDebut"
//                                 value={newMaintenance.dateDebut ? format(newMaintenance.dateDebut, 'yyyy-MM-dd') : ''}
//                                 onChange={handleInputChange}
//                                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">Date de Fin</label>
//                             <input
//                                 type="date"
//                                 name="dateFin"
//                                 id="dateFin"
//                                 value={newMaintenance.dateFin ? format(newMaintenance.dateFin, 'yyyy-MM-dd') : ''}
//                                  onChange={handleInputChange}
//                                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                             />
//                         </div>
//                     </div>
//                     <AlertDialogFooter>
//                         <AlertDialogCancel onClick={() => setIsCreating(false)}>Annuler</AlertDialogCancel>
//                         <AlertDialogAction onClick={handleCreateMaintenance}>Créer</AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </main>
//     );
// }

// export default Main;

