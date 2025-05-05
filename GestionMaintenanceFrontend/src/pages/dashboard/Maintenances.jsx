import React, { useState, useEffect } from 'react';
import { Button } from '../../components/maintenances/ButtonMain';
import { Calendar } from '../../components/maintenances/CalendarMain';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/maintenances/CardSousCard';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/maintenances/AlertDialog";
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle, AlertTriangle, Settings, Wrench, PlusCircle, BarChart, Clock, Check } from 'lucide-react';
import classNames from "classnames";
import Layout from '../../components/layout/Layout';

// Données de test
const maintenancesInitiales = [
    {
        id: '1',
        type: 'Préventive',
        titre: 'Maintenance Climatisation Salle A101',
        local: 'Salle A101',
        equipement: 'Climatisation',
        dateDebut: new Date(2024, 9, 21),
        dateFin: new Date(2024, 9, 21),
        status: 'Planifiée',
    },
    {
        id: '2',
        type: 'Corrective',
        titre: 'Réparation Projecteur Salle B205',
        local: 'Salle B205',
        equipement: 'Projecteur',
        dateDebut: new Date(2024, 9, 23),
        dateFin: new Date(2024, 9, 24),
        status: 'En Cours',
    },
    {
        id: '3',
        type: 'Préventive',
        titre: 'Maintenance Ordinateurs Labo 1',
        local: 'Laboratoire 1',
        equipement: 'Ordinateurs',
        dateDebut: new Date(2024, 10, 1),
        dateFin: new Date(2024, 10, 1),
        status: 'Planifiée',
    },
    {
        id: '4',
        type: 'Préventive',
        titre: 'Vérification Extincteurs',
        local: 'Tout le bâtiment',
        equipement: 'Extincteurs',
        dateDebut: new Date(2024, 9, 15),
        dateFin: new Date(2024, 9, 15),
        status: 'Terminée',
    },
    {
        id: '5',
        type: 'Corrective',
        titre: 'Fuite d\'eau Toilettes Hommes',
        local: 'Toilettes Hommes',
        equipement: 'Plomberie',
        dateDebut: new Date(2024, 9, 20),
        dateFin: new Date(2024, 9, 22),
        status: 'En Retard',
    },
];

function MaintenancesPage() {
    const [maintenances, setMaintenances] = useState(maintenancesInitiales);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCreating, setIsCreating] = useState(false);
    const [newMaintenance, setNewMaintenance] = useState({
        type: 'Préventive',
        dateDebut: new Date(),
        dateFin: new Date(),
    });
    const [stats, setStats] = useState({
        totalMaintenances: maintenancesInitiales.length,
        preventives: maintenancesInitiales.filter(m => m.type === 'Préventive').length,
        correctives: maintenancesInitiales.filter(m => m.type === 'Corrective').length,
        terminees: maintenancesInitiales.filter(m => m.status === 'Terminée').length,
        enCours: maintenancesInitiales.filter(m => m.status === 'En Cours').length,
        enRetard: maintenancesInitiales.filter(m => m.status === 'En Retard').length,
    });

     // Effet pour mettre à jour le statut et calculer les statistiques
    useEffect(() => {
        const interval = setInterval(() => {
            setMaintenances(prevMaintenances => {
                let total = prevMaintenances.length;
                let preventives = 0;
                let correctives = 0;
                let terminees = 0;
                let enCours = 0;
                let enRetard = 0;

                const updatedMaintenances = prevMaintenances.map(maintenance => {
                    if (maintenance.status === 'Planifiée' && maintenance.dateDebut <= new Date() && maintenance.dateFin >= new Date()) {
                        enCours++;
                        return { ...maintenance, status: 'En Cours' };
                    }
                    if (maintenance.status === 'En Cours' && maintenance.dateFin < new Date()) {
                        terminees++;
                        return { ...maintenance, status: 'Terminée' };
                    }
                    if (maintenance.status === 'Planifiée' && maintenance.dateDebut < new Date() && maintenance.dateFin < new Date()) {
                        enRetard++;
                        return {...maintenance, status: 'En Retard'};
                    }
                    if (maintenance.type === 'Préventive') {
                        preventives++;
                    } else {
                        correctives++;
                    }
                    return maintenance;
                });

                setStats({
                    totalMaintenances: total,
                    preventives,
                    correctives,
                    terminees,
                    enCours,
                    enRetard,
                });
                return updatedMaintenances;
            });
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCreateMaintenance = () => {
        if (newMaintenance.type && newMaintenance.titre && newMaintenance.local && 
            newMaintenance.equipement && newMaintenance.dateDebut && newMaintenance.dateFin) {
            const nouvelleMaintenance = {
                id: crypto.randomUUID(),
                type: newMaintenance.type,
                titre: newMaintenance.titre,
                local: newMaintenance.local,
                equipement: newMaintenance.equipement,
                dateDebut: newMaintenance.dateDebut,
                dateFin: newMaintenance.dateFin,
                status: 'Planifiée',
            };
            setMaintenances([...maintenances, nouvelleMaintenance]);
            setIsCreating(false);
            setNewMaintenance({});
        } else {
            alert('Veuillez remplir tous les champs pour créer une maintenance.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dateDebut' || name === 'dateFin') {
            setNewMaintenance({ ...newMaintenance, [name]: new Date(value) });
        } else {
            setNewMaintenance({ ...newMaintenance, [name]: value });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Planifiée': return 'text-blue-500';
            case 'En Cours': return 'text-yellow-500';
            case 'Terminée': return 'text-green-500';
            case 'En Retard': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Planifiée": return <CalendarIcon className="w-4 h-4 mr-1 text-blue-500" />;
            case "En Cours": return <Settings className="w-4 h-4 mr-1 text-yellow-500 animate-spin" />;
            case "Terminée": return <CheckCircle className="w-4 h-4 mr-1 text-green-500" />;
            case "En Retard": return <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />;
            default: return null;
        }
    };

    // Fonction pour obtenir la liste unique des équipements
    const getUniqueEquipements = (maintenances) => {
        const equipements = new Set();
        maintenances.forEach(maintenance => equipements.add(maintenance.equipement));
        return Array.from(equipements);
    };

    // Fonction pour obtenir la liste unique des locaux
    const getUniqueLocaux = (maintenances) => {
        const locaux = new Set();
        maintenances.forEach(maintenance => locaux.add(maintenance.local));
        return Array.from(locaux);
    };

    const uniqueEquipements = getUniqueEquipements(maintenances);
    const uniqueLocaux = getUniqueLocaux(maintenances);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Gestion des Maintenances</h1>
                    <Button
                        onClick={() => setIsCreating(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Planifier une Maintenance
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* cadre pour apercu des maintenances  */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Statistiques Générales</CardTitle>
                            <CardDescription>Aperçu de toutes les maintenances</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { value: stats.totalMaintenances, label: 'Total Maintenances', icon: <BarChart className="w-6 h-6 text-gray-500" /> },
                                { value: stats.preventives, label: 'Préventives', icon: <Wrench className="w-6 h-6 text-blue-500" /> },
                                { value: stats.correctives, label: 'Correctives', icon: <AlertTriangle className="w-6 h-6 text-red-500" /> },
                                { value: stats.terminees, label: 'Terminées', icon: <Check className="w-6 h-6 text-green-500" /> },
                                { value: stats.enCours, label: 'En Cours', icon: <Settings className="w-6 h-6 text-yellow-500" /> },
                                { value: stats.enRetard, label: 'En Retard', icon: <Clock className="w-6 h-6 text-red-500" /> }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.value}</h2>
                                        <p className="text-gray-500">{item.label}</p>
                                    </div>
                                    {item.icon}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* apercu des maintenances  */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Aperçu Rapide</CardTitle>
                            <CardDescription>Résumé des activités</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Maintenances Préventives</h2>
                                    <p className="text-gray-500">{maintenances.filter(m => m.type === 'Préventive').length} planifiées</p>
                                </div>
                                <Wrench className="w-6 h-6 text-blue-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">Maintenances Correctives</h2>
                                    <p className="text-gray-500">{maintenances.filter(m => m.type === 'Corrective').length} en cours</p>
                                </div>
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                        </CardContent>
                    </Card>

                     {/* calendrier des maintenances.     */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Calendrier</CardTitle>
                            <CardDescription>Sélectionnez une date</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Calendar
                                selected={selectedDate}
                                onSelect={handleDateChange}
                                className="border rounded-md"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* liste de maintenance des equipements  */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenances par Équipement</CardTitle>
                            <CardDescription>Liste des équipements concernés</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Équipement</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Date Début</TableCell>
                                        <TableCell>Date Fin</TableCell>
                                        <TableCell>Statut</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {uniqueEquipements.map((equipement, index) => {
                                        const maintenancesEquipement = maintenances.filter(m => m.equipement === equipement);
                                        const firstMaintenance = maintenancesEquipement[0];
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{equipement}</TableCell>
                                                <TableCell>{maintenancesEquipement.length}</TableCell>
                                                <TableCell>{firstMaintenance?.type || 'N/A'}</TableCell>
                                                <TableCell>{firstMaintenance ? format(firstMaintenance.dateDebut, 'dd/MM/yyyy') : 'N/A'}</TableCell>
                                                <TableCell>{firstMaintenance ? format(firstMaintenance.dateFin, 'dd/MM/yyyy') : 'N/A'}</TableCell>
                                                <TableCell className={classNames(getStatusColor(firstMaintenance?.status))}>
                                                    {getStatusIcon(firstMaintenance?.status)}
                                                    {firstMaintenance?.status || 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm">
                                                        Détails
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    
                    {/* liste de maintenance des locaux  */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Maintenances par Local</CardTitle>
                            <CardDescription>Liste des locaux concernés</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Local</TableCell>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Date Début</TableCell>
                                        <TableCell>Date Fin</TableCell>
                                        <TableCell>Statut</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {uniqueLocaux.map((local, index) => {
                                        const maintenancesLocal = maintenances.filter(m => m.local === local);
                                        const firstMaintenance = maintenancesLocal[0];
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{local}</TableCell>
                                                <TableCell>{maintenancesLocal.length}</TableCell>
                                                <TableCell>{firstMaintenance?.type || 'N/A'}</TableCell>
                                                <TableCell>{firstMaintenance ? format(firstMaintenance.dateDebut, 'dd/MM/yyyy') : 'N/A'}</TableCell>
                                                <TableCell>{firstMaintenance ? format(firstMaintenance.dateFin, 'dd/MM/yyyy') : 'N/A'}</TableCell>
                                                <TableCell className={classNames(getStatusColor(firstMaintenance?.status))}>
                                                    {getStatusIcon(firstMaintenance?.status)}
                                                    {firstMaintenance?.status || 'N/A'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="outline" size="sm">
                                                        Détails
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                 {/* Formulaire de Création de Maintenance (AlertDialog) */}
                {/* <AlertDialog open={isCreating} onOpenChange={setIsCreating}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Planifier une Maintenance</AlertDialogTitle>
                            <AlertDialogDescription>
                                Remplissez les informations nécessaires
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Type de Maintenance</label>
                                <select
                                    name="type"
                                    value={newMaintenance.type}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                >
                                    <option value="Préventive">Préventive</option>
                                    <option value="Corrective">Corrective</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Titre</label>
                                <input
                                    type="text"
                                    name="titre"
                                    value={newMaintenance.titre || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Local</label>
                                <input
                                    type="text"
                                    name="local"
                                    value={newMaintenance.local || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Équipement</label>
                                <input
                                    type="text"
                                    name="equipement"
                                    value={newMaintenance.equipement || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date Début</label>
                                    <input
                                        type="date"
                                        name="dateDebut"
                                        value={newMaintenance.dateDebut ? format(newMaintenance.dateDebut, 'yyyy-MM-dd') : ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date Fin</label>
                                    <input
                                        type="date"
                                        name="dateFin"
                                        value={newMaintenance.dateFin ? format(newMaintenance.dateFin, 'yyyy-MM-dd') : ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsCreating(false)}>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCreateMaintenance}>Créer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog> */}

                <AlertDialog open={isCreating} onOpenChange={setIsCreating}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Planifier une Maintenance</AlertDialogTitle>
                            <AlertDialogDescription>
                                Remplissez tous les champs pour planifier une nouvelle maintenance
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4">
                            {/* Type de maintenance */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Type d'intervention</label>
                                <select
                                    name="type"
                                    value={newMaintenance.type || 'Préventive'}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value="Préventive">Maintenance préventive</option>
                                    <option value="Corrective">Maintenance corrective</option>
                                </select>
                            </div>

                            {/* Champ pour sélectionner le type de cible */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Cible de la maintenance</label>
                                <select
                                    name="cibleType"
                                    value={newMaintenance.cibleType || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value="">Sélectionnez une option</option>
                                    <option value="equipement">Équipement spécifique</option>
                                    <option value="local">Local spécifique</option>
                                    <option value="both">Équipement et local</option>
                                </select>
                            </div>

                            {/* Champ conditionnel pour équipement */}
                            {['equipement', 'both'].includes(newMaintenance.cibleType) && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Équipement concerné</label>
                                    <select
                                        name="equipement"
                                        value={newMaintenance.equipement || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required={['equipement', 'both'].includes(newMaintenance.cibleType)}
                                    >
                                        <option value="">Sélectionnez un équipement</option>
                                        <option value="Climatisation">Climatisation</option>
                                        <option value="Projecteur">Projecteur</option>
                                        <option value="Ordinateurs">Ordinateurs</option>
                                        <option value="Extincteurs">Extincteurs</option>
                                        <option value="Plomberie">Plomberie</option>
                                    </select>
                                </div>
                            )}

                            {/* Champ conditionnel pour local */}
                            {['local', 'both'].includes(newMaintenance.cibleType) && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Local concerné</label>
                                    <select
                                        name="local"
                                        value={newMaintenance.local || ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required={['local', 'both'].includes(newMaintenance.cibleType)}
                                    >
                                        <option value="">Sélectionnez un local</option>
                                        <option value="Salle A101">Salle A101</option>
                                        <option value="Salle B205">Salle B205</option>
                                        <option value="Laboratoire 1">Laboratoire 1</option>
                                        <option value="Tout le bâtiment">Tout le bâtiment</option>
                                        <option value="Toilettes Hommes">Toilettes Hommes</option>
                                    </select>
                                </div>
                            )}

                            {/* Sélection du technicien */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Technicien assigné</label>
                                <select
                                    name="technicien"
                                    value={newMaintenance.technicien || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    required
                                >
                                    <option value="">Sélectionnez un technicien</option>
                                    <option value="Jean Dupont">Jean Dupont</option>
                                    <option value="Marie Martin">Marie Martin</option>
                                    <option value="Pierre Durand">Pierre Durand</option>
                                    <option value="Sophie Lambert">Sophie Lambert</option>
                                </select>
                            </div>

                            {/* Titre de la maintenance */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Titre de la maintenance</label>
                                <input
                                    type="text"
                                    name="titre"
                                    value={newMaintenance.titre || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Ex: Réparation climatisation"
                                    required
                                />
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date de début</label>
                                    <input
                                        type="date"
                                        name="dateDebut"
                                        value={newMaintenance.dateDebut ? format(newMaintenance.dateDebut, 'yyyy-MM-dd') : ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Date de fin</label>
                                    <input
                                        type="date"
                                        name="dateFin"
                                        value={newMaintenance.dateFin ? format(newMaintenance.dateFin, 'yyyy-MM-dd') : ''}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsCreating(false)}>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={handleCreateMaintenance}
                                disabled={!newMaintenance.type || !newMaintenance.cibleType || !newMaintenance.technicien || !newMaintenance.titre || !newMaintenance.dateDebut || !newMaintenance.dateFin}
                            >
                                Planifier
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </Layout>
    );
}

export default MaintenancesPage;




// // Modifiez l'état initial
// const [newMaintenance, setNewMaintenance] = useState({
//     type: 'Préventive',
//     cibleType: '',
//     equipement: '',
//     local: '',
//     technicien: '',
//     titre: '',
//     dateDebut: new Date(),
//     dateFin: new Date(),
// });

// // Adaptez la fonction de création
// const handleCreateMaintenance = () => {
//     // Validation des champs obligatoires
//     if (!newMaintenance.type || !newMaintenance.cibleType || !newMaintenance.technicien || 
//         !newMaintenance.titre || !newMaintenance.dateDebut || !newMaintenance.dateFin) {
//         alert('Veuillez remplir tous les champs obligatoires.');
//         return;
//     }

//     // Validation conditionnelle selon le type de cible
//     if (newMaintenance.cibleType === 'equipement' && !newMaintenance.equipement) {
//         alert('Veuillez sélectionner un équipement.');
//         return;
//     }

//     if (newMaintenance.cibleType === 'local' && !newMaintenance.local) {
//         alert('Veuillez sélectionner un local.');
//         return;
//     }

//     if (newMaintenance.cibleType === 'both' && (!newMaintenance.equipement || !newMaintenance.local)) {
//         alert('Veuillez sélectionner un équipement ET un local.');
//         return;
//     }

//     const nouvelleMaintenance = {
//         id: crypto.randomUUID(),
//         type: newMaintenance.type,
//         cibleType: newMaintenance.cibleType,
//         ...(newMaintenance.equipement && { equipement: newMaintenance.equipement }),
//         ...(newMaintenance.local && { local: newMaintenance.local }),
//         technicien: newMaintenance.technicien,
//         titre: newMaintenance.titre,
//         dateDebut: newMaintenance.dateDebut,
//         dateFin: newMaintenance.dateFin,
//         status: 'Planifiée',
//     };

//     setMaintenances([...maintenances, nouvelleMaintenance]);
//     setIsCreating(false);
//     setNewMaintenance({
//         type: 'Préventive',
//         cibleType: '',
//         equipement: '',
//         local: '',
//         technicien: '',
//         titre: '',
//         dateDebut: new Date(),
//         dateFin: new Date(),
//     });
// };