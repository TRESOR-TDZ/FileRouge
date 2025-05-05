


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
