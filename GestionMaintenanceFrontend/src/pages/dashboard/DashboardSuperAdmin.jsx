// import { Users,  Download, Plus, ChevronDown, Filter, Calendar } from 'lucide-react'; 
// import Layout from '../../components/layout/Layout';

// const SuperAdminDashboard = () => {
//   // Données simulées
//   const maintenanceData = [
//     { type: "Climatiseur faible", date: "02/03/2025", duration: "3 jours", status: "Terminé", priority: "Normal" },
//     { type: "Nettoyage du PC", date: "12/03/2025", duration: "8h", status: "En cours", priority: "Normal" },
//     { type: "Reparer chaise gate", date: "14/03/2025", duration: "3h30min", status: "Planifié", priority: "Urgent" },
//     { type: "Tableaux gate", date: "30/03/2025", duration: "3h15min", status: "Terminé", priority: "Normal" }
//   ];

//   return (
//     <Layout>
//       <div className=" ml-0 md:ml-58 p-6 mt-8">
//         {/* En-tête */}
//         <header className="mb-6 flex justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Bienvenue, Trésor !</h1>
//             <p className="text-gray-600">Consulter et Gérer les activités de maintenance ici.</p>
//           </div>
//           <div className="relative">
//             <div className='flex justify-center space-x-3 flex-wrap md:flex-nowrap'>
//                 <button className="flex items-center px-3 py-1 bg-gray-100 rounded-lg border border-gray-200 text-sm whitespace-nowrap">
//                   <span>2025-04-04 Au 2025-05-10</span>
//                   <ChevronDown className="ml-1" />
//                 </button>
//                 <button className='flex items-center bg-[#1371B9] rounded-lg py-1 text-white text-sm whitespace-nowrap'>
//                   <Filter className='mx-3 text-white '/>
//                   <span className='mr-2 font font-semibold hidden sm:inline'> Filtrer</span>
//                 </button>
//               </div>
//               <div className='mt-2'>
//                 <button className='flex items-center bg-[#4091CE] rounded-lg py-1 text-white text-sm whitespace-nowrap'>
//                   <Calendar className='mx-3 text-white '/>
//                   <span className='mr-2 font font-semibold hidden sm:inline'> Planifier une Maintenance</span>
//                 </button>
//               </div>
//           </div> 
//         </header>

//         {/* Cartes Statistiques */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Carte Utilisateurs */}
          
//           <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
//                 <p className="text-xl font-bold my-2">12</p>
//                 <p className="text-green-500 text-sm">Ajout de 02 pers</p>
//               </div>
//               <div className="bg-blue-100  rounded-full">
//                 <Users className="text-blue-600 text-xl" />
//               </div>
//             </div>
//             <a href="#" className="text-blue-600 text-sm inline-block mt-2">voir plus</a>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
//                 <p className="text-3xl font-bold my-2">12</p>
//                 <p className="text-green-500 text-sm">Ajout de 02 pers</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <Users className="text-blue-600 text-xl" />
//               </div>
//             </div>
//             <a href="#" className="text-blue-600 text-sm inline-block mt-2">voir plus</a>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
//                 <p className="text-3xl font-bold my-2">12</p>
//                 <p className="text-green-500 text-sm">Ajout de 02 pers</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <Users className="text-blue-600 text-xl" />
//               </div>
//             </div>
//             <a href="#" className="text-blue-600 text-sm inline-block mt-2">voir plus</a>
//           </div>

//           {/* Carte Interventions */}
//           <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-gray-500 text-sm font-medium">Total Interventions</h3>
//                 <p className="text-3xl font-bold my-2">05</p>
//                 <div className="space-y-1">
//                   <p className="text-sm">Preventives : 02</p>
//                   <p className="text-sm">Correctives : 02</p>
//                 </div>
//               </div>
//               <div className="bg-orange-100 p-3 rounded-full">
//                 {/* <Tool className="text-orange-600 text-xl" /> */}
//               </div>
//             </div>
//             <a href="#" className="text-blue-600 text-sm inline-block mt-2">voir plus</a>
//           </div>
//         </div>

//         {/* Section Utilisateurs */}
//         <section className="mb-6">
//           <h2 className="text-xl font-semibold mb-3">Utilisateurs</h2>
//           <div className="flex items-center space-x-3">
//             <div className="relative group">
//               <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
//                 <span className="font-medium">Locaux</span>
//                 <ChevronDown className="ml-2" />
//               </button>
//               <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-1 p-2 min-w-[160px] z-10 border border-gray-200">
//                 <a href="#" className="block px-3 py-1 hover:bg-gray-100">Equipements</a>
//                 <a href="#" className="block px-3 py-1 hover:bg-gray-100">Maintenance</a>
//               </div>
//             </div>
//           </div>
//         </section>



//         {/* Récapitulation */}
//         <section className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-6">
//           <h2 className="text-lg font-semibold mb-4">Recapitulation</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-sm text-gray-600">Appareil en Etat</p>
//               <p className="text-xl font-bold">60.3%</p>
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                 <div className="bg-green-500 h-2 rounded-full" style={{ width: '60.3%' }}></div>
//               </div>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Appareil en Defective</p>
//               <p className="text-xl font-bold">25.3%</p>
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                 <div className="bg-red-500 h-2 rounded-full" style={{ width: '25.3%' }}></div>
//               </div>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Locaux Disponibles</p>
//               <p className="text-xl font-bold">40.3%</p>
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40.3%' }}></div>
//               </div>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Locaux non Disponibles</p>
//               <p className="text-xl font-bold">5.3%</p>
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//                 <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '5.3%' }}></div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Planification et Tableau */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Colonne de gauche */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Planification */}
//             <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-semibold">Planifier une maintenance</h2>
//                 <div className="flex space-x-2">

//                   <button className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
//                     <Plus className="mr-1" />
//                     <span>Planifier</span>
//                   </button>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500">Plus 02 ajoutés <a href="#" className="text-blue-600">voir plus</a></p>
//             </div>

//             {/* Tableau Maintenance */}
//             <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//               <h2 className="text-lg font-semibold mb-4">Maintenance</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="text-left border-b">
//                       <th className="pb-2">Type</th>
//                       <th className="pb-2">Date</th>
//                       <th className="pb-2">Durée</th>
//                       <th className="pb-2">Status</th>
//                       <th className="pb-2">Priorité</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {maintenanceData.map((item, index) => (
//                       <tr key={index} className="border-b">
//                         <td className="py-3">{item.type}</td>
//                         <td>{item.date}</td>
//                         <td>{item.duration}</td>
//                         <td>
//                           <span className={`px-2 py-1 rounded-full text-xs ${
//                             item.status === 'Terminé' ? 'bg-green-100 text-green-800' :
//                             item.status === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
//                             'bg-blue-100 text-blue-800'
//                           }`}>
//                             {item.status}
//                           </span>
//                         </td>
//                         <td>
//                           <span className={`px-2 py-1 rounded-full text-xs ${
//                             item.priority === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
//                           }`}>
//                             {item.priority}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Colonne de droite */}
//           <div className="space-y-6">
//             {/* Coût Total */}
//             <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//               <h2 className="text-lg font-semibold mb-2">Cout Total des Maintenance du mois</h2>
//               <p className="text-2xl font-bold mb-4">30000 Fcfa</p>
              
//               <h3 className="font-medium mb-3">Etat Critique</h3>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="bg-gray-100 p-3 rounded-lg">
//                   <p>Locaux:</p>
//                   <p className="font-bold">03</p>
//                 </div>
//                 <div className="bg-gray-100 p-3 rounded-lg">
//                   <p>Equipements:</p>
//                   <p className="font-bold">03</p>
//                 </div>
//               </div>
//             </div>

//             {/* Télécharger Rapport */}
//             <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
//               <button className="w-full flex justify-center items-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//                 <Download className="mr-2" />
//                 <span>Télécharger un Rapport</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default SuperAdminDashboard;



import React, { useState, useEffect } from 'react';
import {Users, MapPin, Package, ShoppingCart, Download, AlertTriangle, Coins} from 'lucide-react';
import  Button  from '../../components/elements/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card/Card';
// import { Badge } from '../../components/card/Badge';
import ClassNames from 'classnames';
import Layout from '../../components/layout/Layout';

// Composant pour la bannière de bienvenue affichée en haut du tableau de bord
const WelcomeBanner = ({ isDarkMode }) => (
    <div className={ClassNames("p-6 mb-6", isDarkMode ? "text-white" : "text-gray-900")}>
        <h2 className="text-2xl font-semibold">Bienvenue, Tresor !</h2>
        <p>Consulter et Gérer les activités de maintenance ici.</p>
    </div>
);

// Composant pour le filtre de date permettant de sélectionner une période
const DateFilter = () => (
    <div className="flex items-center justify-between mb-6">
        <span className="text-gray-300">2025-04-04 Au 2025-05-10</span>
        <Button variant="outline" className="text-gray-300 hover:bg-gray-800 hover:text-white border-gray-700">
            Filtrer
        </Button>
    </div>
);

// Composant pour les actions rapides, ici un bouton pour planifier une maintenance
const QuickActions = () => (
    <div className="mb-6">
        <Button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-white">
            Planifier une maintenance
        </Button>
    </div>
);

// Composant affichant des informations agrégées sur les utilisateurs et les locaux dans des cartes
const UsersAndLocaux = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Carte affichant le nombre total d'utilisateurs */}
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Users
                </CardTitle>
                <CardDescription className="text-gray-400">12</CardDescription>
            </CardHeader>
            <CardContent>
                <span className="text-blue-400">Ajout de 02 pers</span>
                <Button variant="link" className="text-blue-400 pl-0">voir plus</Button>
            </CardContent>
        </Card>

        {/* Carte affichant le nombre total de locaux */}
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Total locaux
                </CardTitle>
                <CardDescription className="text-gray-400">10</CardDescription>
            </CardHeader>
            <CardContent>
                <span className="text-blue-400">plus 0 ajoutes</span>
                <Button variant="link" className="text-blue-400 pl-0">voir plus</Button>
            </CardContent>
        </Card>
    </div>
);

// Composant affichant des informations agrégées sur les interventions et les équipements dans des cartes
const EquipmentsAndMaintenances = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Carte affichant le nombre total d'interventions */}
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Total interventions
                </CardTitle>
                <CardDescription className="text-gray-400">05</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-400">Preventives : 02</p>
                <p className="text-gray-400">Correctives : 02</p>
                <Button variant="link" className="text-blue-400 pl-0">voir plus</Button>
            </CardContent>
        </Card>

        {/* Carte affichant le nombre total d'équipements */}
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Total Equipement
                </CardTitle>
                <CardDescription className="text-gray-400">08</CardDescription>
            </CardHeader>
            <CardContent>
                <span className="text-blue-400">Plus 02 ajoutes</span>
                <Button variant="link" className="text-blue-400 pl-0">voir plus</Button>
            </CardContent>
        </Card>
    </div>
);

// Composant affichant une récapitulation sous forme de graphique circulaire et d'informations clés
const Recapitulation = () => {

    // État local pour les données du graphique circulaire (nom, valeur, couleur)
    const [etats] = useState([
        { nom: 'Appareils en état', valeur: 60.3, couleur: 'bg-green-500' },
        { nom: 'Appareils défectueux', valeur: 25.3, couleur: 'bg-red-500' },
        { nom: 'Locaux disponibles', valeur: 40.3, couleur: 'bg-blue-500' },
        { nom: 'Locaux non disponibles', valeur: 5.3, couleur: 'bg-yellow-500' },
    ]);

    // // Calcul du total des valeurs pour déterminer les pourcentages du graphique
    // const total = etats.reduce((acc, etat) => acc + etat.valeur, 0);

    // Fonction pour rendre le graphique circulaire de récapitulation
    // const renderRecapChart = () => (
    //     <div className="relative w-48 h-48 mb-4">
    //         <div className="w-full h-full rounded-full bg-white/20 absolute"></div>
    //         {etats.map((etat, index) => {
    //             const angle = (etat.valeur / total) * 360;
    //             let startAngle = 0;
    //             for (let i = 0; i < index; i++) {
    //                 startAngle += (etats[i].valeur / total) * 360;
    //             }
    //             const midAngle = startAngle + angle / 2;
    //             const x = Math.cos((midAngle - 90) * Math.PI / 180) * 24 + 24;
    //             const y = Math.sin((midAngle - 90) * Math.PI / 180) * 24 + 24;

    //             return (
    //                 <svg
    //                     key={index}
    //                     className="w-full h-full absolute"
    //                     style={{
    //                         transform: 'rotate(-90deg)', // Pour commencer à 12h
    //                     }}
    //                 >
    //                     <path
    //                         d={`M24,24 L24,0 A24,24 0 ${angle > 180 ? 1 : 0},1 ${
    //                             24 + 24 * Math.cos(startAngle + angle * Math.PI / 180),
    //                             24 + 24 * Math.sin(startAngle + angle * Math.PI / 180)
    //                         } Z`}
    //                         fill={etat.couleur}
    //                         stroke={etat.couleur}
    //                         strokeWidth="1"
    //                     />
    //                     <text
    //                         x={x}
    //                         y={y}
    //                         textAnchor="middle"
    //                         dominantBaseline="middle"
    //                         className="text-white text-xs"
    //                     >
    //                         {etat.valeur.toFixed(1)}%
    //                     </text>
    //                 </svg>
    //             );
    //         })}

    //         {/* Texte "Total" au centre du graphique */}
    //         <div className="text-white text-xl font-semibold absolute inset-0 flex items-center justify-center">
    //             Total
    //         </div>
    //     </div>
    // );

     // Fonction pour rendre la légende du graphique circulaire
    const renderRecapLegend = () => (
        <div className="flex flex-col justify-center">
            {etats.map((etat, index) => (
                <div key={index} className="flex items-center gap-2 my-1">
                    <div className={ClassNames("w-3 h-3 rounded-full", etat.couleur)}></div>
                    <span className="text-gray-300 text-sm">{etat.nom}</span>
                </div>
            ))}
        </div>
    );

    // Fonction pour rendre les informations sur le coût total des maintenances et l'état critique
    const renderCriticalInfo = () => (
        <div className="md:w-1/2 flex flex-col gap-4">
            <div className='flex items-center gap-2 p-4 rounded-md bg-gray-700'>
                <Coins className='w-6 h-6 text-yellow-400'/>
                <div>
                    <p className="text-gray-400">Coût Total des Maintenances du mois</p>
                    <p className="text-yellow-400 text-lg font-semibold">30000 Fcfa</p>
                </div>
            </div>
            <div className='flex items-center gap-2 p-4 rounded-md bg-gray-700'>
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <div>
                    <p className="text-gray-400">État Critique</p>
                    <div className="grid grid-cols-2 gap-2 text-gray-400 ">
                        <p>Locaux : <span className="text-red-400">03</span></p>
                        <p>Equipements : <span className="text-red-400">03</span></p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
                {/* Titre de la section Récapitulation */}
                <CardTitle className="text-white">Récapitulation</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row items-start ">
                    {/* Bloc contenant le graphique circulaire et sa légende */}
                    <div className="md:w-1/2 flex items-start mr-8">
                        {/* {renderRecapChart()} */}
                        {renderRecapLegend()}
                    </div>
                    {/* Bloc contenant les informations critiques */}
                    {renderCriticalInfo()}
                </div>
            </CardContent>
        </Card>
    );
};

// Composant pour le tableau affichant les informations détaillées de maintenance
const MaintenanceTable = () => {

    // Données de maintenance simulées (pour l'affichage)
    const maintenances = [
        {
            maintenance: 'climatiseur faible', type: 'Corrective', date: '02/03/2025',
            temps: '3h30min', cout: '30000 Fcfa', status: 'Termine'
        },
        {
            maintenance: 'Nettoyage du PC', type: 'Preventive', date: '12/03/2025',
            temps: '2h', cout: '30000 Fcfa', status: 'Urgent'
        },
        {
            maintenance: 'Reparer chaise gatte', type: 'Corrective', date: '14/03/2025',
            temps: '3 jours', cout: '30000 Fcfa', status: 'Planifier'
        },
        {
            maintenance: 'Tableaux gate', type: 'Corrective', date: '30/03/2025',
            temps: '8h', cout: '30000 Fcfa', status: 'Termine'
        },
        {
            maintenance: 'nettoyage des salles', type: 'Preventive', date: '23/03/2025',
            temps: '3h30min', cout: '30000 Fcfa', status: 'Urgent'
        },
        {
            maintenance: 'nettoyage des salle', type: 'Preventive', date: '18/03/2025',
            temps: '3h15min', cout: '30000 Fcfa', status: 'Planifier'
        },
    ];

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                {/* Titre du tableau de maintenance */}
                <CardTitle className="text-white">Maintenance</CardTitle>
                <div className="flex items-center justify-between">
                    <span className="text-gray-300">2025-04-04 Au 2025-05-10</span>
                </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-300">Maintenance</th>
                            <th className="px-4 py-2 text-left text-gray-300">Type</th>
                            <th className="px-4 py-2 text-left text-gray-300">Date</th>
                            <th className="px-4 py-2 text-left text-gray-300">Temps</th>
                            <th className="px-4 py-2 text-left text-gray-300">Cout</th>
                            <th className="px-4 py-2 text-left text-gray-300">Status</th>
                            <th className="px-4 py-2 text-left text-gray-300"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {/* Parcours des données de maintenance pour afficher chaque ligne */}
                        {maintenances.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-white">{item.maintenance}</td>
                                <td className="px-4 py-2 text-gray-400">{item.type}</td>
                                <td className="px-4 py-2 text-gray-400">{item.date}</td>
                                <td className="px-4 py-2 text-gray-400">{item.temps}</td>
                                <td className="px-4 py-2 text-yellow-400">{item.cout}</td>
                                <td className="px-4 py-2">
                                    {/* <Badge
                                        variant="secondary"
                                        className={ClassNames(
                                            "px-2 py-1 rounded",
                                            item.status === 'Termine' && 'bg-green-500/20 text-green-400',
                                            item.status === 'Urgent' && 'bg-red-500/20 text-red-400',
                                            item.status === 'Planifier' && 'bg-yellow-500/20 text-yellow-400'
                                        )}
                                    >
                                        {item.status}
                                    </Badge> */}
                                </td>
                                <td className="px-4 py-2">
                                    <Button variant="link" className="text-blue-400 pl-0">
                                        Detail
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
};

// Composant pour le bouton de téléchargement de rapport
const DownloadReport = () => (
    <div className="mt-6">
        <Button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-white flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Telecharger un Rapport
        </Button>
    </div>
);

// Composant principal de la page de tableau de bord pour l'administrateur super
const DashboardSuperAdmin = () => {

    // État local pour gérer le mode sombre (clair/sombre)
    const [isDarkMode, setIsDarkMode] = useState(false);

    // État local pour s'assurer que le composant est monté côté client (pour éviter les erreurs SSR avec localStorage)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('dashboardTheme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
        setMounted(true);
    }, []);

    // Effet de bord qui s'exécute chaque fois que isDarkMode change et que le composant est monté
    useEffect(() => {

        // Si le composant est monté, sauvegarde le thème actuel dans le localStorage
        if (mounted) {
            localStorage.setItem('dashboardTheme', isDarkMode ? 'dark' : 'light');
        }
    }, [isDarkMode, mounted]);

    // Fonction pour basculer entre le mode clair et le mode sombre
    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    if (!mounted) {
        return <div className="h-screen bg-gray-950">Loading...</div>
    }

    return (
        // Composant de mise en page qui enveloppe le contenu du tableau de bord
        <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
            <WelcomeBanner isDarkMode={isDarkMode} />
            <DateFilter />
            <QuickActions />
            <UsersAndLocaux />
            <EquipmentsAndMaintenances />
            <Recapitulation />
            <MaintenanceTable />
            <DownloadReport />
        </Layout>
    );
};

export default DashboardSuperAdmin;
