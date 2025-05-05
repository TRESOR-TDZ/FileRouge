// // import React, { useState, useEffect } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { cn } from '@/lib/utils';
// // import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
// // import axios from 'axios'; // Importez Axios
// // import { User, UserPlus, UserMinus, UserX, Users, Edit, AlertCircle, Loader2, ToggleLeft, ToggleRight, ChevronRight, BarChart, Users2, Briefcase, CheckCircle} from 'lucide-react';


// // const DashboardUsersPage = () => {
// //     const [theme, setTheme] = useState('light');
// //     const [isDarkMode, setIsDarkMode] = useState(false);
// //     const [users, setUsers] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [selectedUser, setSelectedUser] = useState(null);
// //     const [page, setPage] = useState(1);
// //     const [perPage, setPerPage] = useState(10);
// //     const [totalUsers, setTotalUsers] = useState(0);
// //     const [adminCount, setAdminCount] = useState(0);
// //     const [userCount, setUserCount] = useState(0);
// //     const [technicianCount, setTechnicianCount] = useState(0);
// //     const [activeUserCount, setActiveUserCount] = useState(0);

// //     // Configuration de base pour Axios
// //     const api = axios.create({
// //         baseURL: 'http://votre-domaine.com/api', // Remplacez par l'URL de votre API Laravel
// //         headers: {
// //             'Content-Type': 'application/json',
// //             'Accept': 'application/json',
// //         },
// //         withCredentials: true, // Si vous utilisez des cookies d'authentification
// //     });

// //     useEffect(() => {
// //         if (
// //             localStorage.theme === 'dark' ||
// //             (!('theme' in localStorage) &&
// //                 window.matchMedia('(prefers-color-scheme: dark)').matches)
// //         ) {
// //             document.documentElement.classList.add('dark');
// //             setTheme('dark');
// //             setIsDarkMode(true);
// //         } else {
// //             document.documentElement.classList.remove('dark');
// //             setTheme('light');
// //             setIsDarkMode(false);
// //         }
// //     }, []);

// //     const fetchUsers = async () => {
// //         setLoading(true);
// //         setError(null);
// //         try {
// //             // Utilisez Axios pour faire une requête GET à votre API Laravel
// //             const response = await api.get(`/users?page=${page}&perPage=${perPage}`); // Adaptez l'endpoint

// //             // Les données de réponse de Laravel sont généralement dans un objet 'data'
// //             setUsers(response.data.data);
// //             setTotalUsers(response.data.meta.total); // Si votre API Laravel renvoie le total
// //              // Mise à jour des stats
// //             const admins = response.data.data.filter((user) => user.role === 'admin' || user.role === 'superadmin').length;
// //             const regularUsers = response.data.data.filter((user) => user.role === 'user').length;
// //             const technicians = response.data.data.filter((user) => user.role === 'technician').length;
// //             const activeUsers = response.data.data.filter((user) => user.status === 'active').length;

// //             setAdminCount(admins);
// //             setUserCount(regularUsers);
// //             setTechnicianCount(technicians);
// //             setActiveUserCount(activeUsers);

// //         } catch (err: any) {
// //             setError(err.response?.data?.message || 'Une erreur est survenue lors de la récupération des utilisateurs.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchUsers();
// //     }, [page, perPage]);

// //     const toggleTheme = () => {
// //         const newTheme = isDarkMode ? 'light' : 'dark';
// //         setTheme(newTheme);
// //         setIsDarkMode(!isDarkMode);
// //         if (newTheme === 'dark') {
// //             localStorage.theme = 'dark';
// //             document.documentElement.classList.add('dark');
// //         } else {
// //             localStorage.theme = 'light';
// //             document.documentElement.classList.remove('dark');
// //         }
// //     };

// //     const handleCreateUser = async (userData) => {
// //         try {
// //             // Utilisez Axios pour envoyer une requête POST à votre API Laravel
// //             const response = await api.post('/users', userData); // Adaptez l'endpoint

// //             alert('Utilisateur créé avec succès !');
// //             // setUsers([...users, response.data]); // Pas besoin, refetch la liste
// //             await fetchUsers();

// //         } catch (error: any) {
// //             const errorMessage = error.response?.data?.message || "Failed to create user";
// //             console.error('Erreur lors de la création de l’utilisateur :', errorMessage);
// //             alert('Erreur lors de la création de l’utilisateur !');
// //         }
// //     };

// //     const handleUpdateUser = async (id, updatedData) => {
// //         try {
// //             // Utilisez Axios pour envoyer une requête PUT/PATCH à votre API Laravel
// //             const response = await api.patch(`/users/${id}`, updatedData); // Adaptez l'endpoint

// //             alert('Utilisateur mis à jour avec succès !');
// //              await fetchUsers();
// //             // setUsers(
// //             //     users.map((user) =>
// //             //         user.id === id ? { ...user, ...response.data } : user
// //             //     )
// //             // );

// //         } catch (error: any) {
// //              const errorMessage = error.response?.data?.message || "Failed to update user";
// //             console.error('Erreur lors de la mise à jour de l’utilisateur :', errorMessage);
// //             alert('Erreur lors de la mise à jour de l’utilisateur !');
// //         }
// //     };

// //     const handleDeleteUser = async (id) => {
// //         try {
// //             // Utilisez Axios pour envoyer une requête DELETE à votre API Laravel
// //             await api.delete(`/users/${id}`); // Adaptez l'endpoint

// //             alert('Utilisateur supprimé avec succès !');
// //             setUsers(users.filter((user) => user.id !== id));
// //             setTotalUsers(prev => prev - 1);

// //         } catch (error: any) {
// //              const errorMessage = error.response?.data?.message || "Failed to delete user";
// //             console.error('Erreur lors de la suppression de l’utilisateur :', errorMessage);
// //             alert('Erreur lors de la suppression de l’utilisateur !');
// //         }
// //     };

// //       const handlePromoteToAdmin = async (id) => {
// //         await handleUpdateUser(id, { role: 'admin' });
// //     };

// //     const handlePromoteToSuperAdmin = async (id) => {
// //         await handleUpdateUser(id, { role: 'superadmin' });
// //     };

// //     const handleDemoteToUser = async (id) => {
// //         await handleUpdateUser(id, { role: 'user' });
// //     };

// //     const handleActivateUser = async (id) => {
// //         await handleUpdateUser(id, { status: 'active' });
// //     };

// //     const handleDeactivateUser = async (id) => {
// //         await handleUpdateUser(id, { status: 'inactive' });
// //     };

// //     const handleUserSelect = (user) => {
// //         setSelectedUser(user);
// //     };

// //     const handlePageChange = (newPage) => {
// //          if (newPage >= 1 && newPage <= Math.ceil(totalUsers / perPage)) {
// //             setPage(newPage);
// //         }
// //     };

// //     const handlePerPageChange = (newPerPage) => {
// //         setPerPage(newPerPage);
// //         setPage(1);
// //     };

// //     const getRoleLabel = (role) => {
// //         switch (role) {
// //             case 'superadmin': return 'Super Admin';
// //             case 'admin': return 'Admin';
// //             case 'user': return 'Utilisateur';
// //             case 'technician': return 'Technicien';
// //             default: return 'Inconnu';
// //         }
// //     };

// //     const goToEditPage = (userId) => {
// //         window.location.href = `/users/${userId}/edit`;
// //     };

// //     const goToDetailPage = (userId) => {
// //         window.location.href = `/users/${userId}/details`;
// //     };

// //     if (loading) {
// //         return (
// //             <div className="flex items-center justify-center h-64">
// //                 <Loader2 className="animate-spin text-4xl text-gray-500 dark:text-gray-400" />
// //             </div>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <div className="p-4 flex items-center gap-2 text-red-500 dark:text-red-400">
// //                 <AlertCircle className="h-5 w-5" />
// //                 <span>Erreur : {error}</span>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className={cn(
// //             "p-4 md:p-6 lg:p-8",
// //             isDarkMode ? 'dark' : ''
// //         )}>
//             // <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 lg:mb-8">
//             //     <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
//             //         <Users className="h-6 w-6" />
//             //         Gestion des utilisateurs
//             //     </h1>
//             //     <Button
//             //         onClick={() => handleCreateUser({
//             //             name: 'Nouvel Utilisateur',
//             //             email: `nouvelutilisateur${Date.now()}@example.com`,
//             //             role: 'user',
//             //             status: 'pending',
//             //             category: 'Informatique'
//             //         })}
//             //         className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
//             //     >
//             //         <UserPlus className="h-4 w-4" />
//             //         Ajouter un utilisateur
//             //     </Button>
//             // </div>

//             // {/* User Statistics Cards */}
//             // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
//             //     <Card className="shadow-lg transition-transform hover:scale-105">
//             //         <CardHeader className="flex flex-row items-center justify-between pb-2">
//             //             <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
//             //                 <Users2 className="h-4 w-4" />
//             //                 Total
//             //             </CardTitle>
//             //             <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//             //         </CardHeader>
//             //         <CardContent className="text-center">
//             //             <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalUsers}</div>
//             //             <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs</p>
//             //         </CardContent>
//             //     </Card>

//             //     <Card className="shadow-lg transition-transform hover:scale-105">
//             //         <CardHeader className="flex flex-row items-center justify-between pb-2">
//             //             <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-500 dark:text-blue-400">
//             //                 <User className="h-4 w-4" />
//             //                 Admins
//             //             </CardTitle>
//             //             <User className="h-5 w-5" />
//             //         </CardHeader>
//             //         <CardContent className="text-center">
//             //             <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{adminCount}</div>
//             //             <p className="text-sm text-gray-500 dark:text-gray-400">Administrateurs</p>
//             //         </CardContent>
//             //     </Card>

//             //     <Card className="shadow-lg transition-transform hover:scale-105">
//             //         <CardHeader className="flex flex-row items-center justify-between pb-2">
//             //             <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-500 dark:text-green-400">
//             //                 <Users className="h-4 w-4" />
//             //                 Utilisateurs
//             //             </CardTitle>
//             //             <Users className="h-5 w-5" />
//             //         </CardHeader>
//             //         <CardContent className="text-center">
//             //             <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userCount}</div>
//             //             <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs Simples</p>
//             //         </CardContent>
//             //     </Card>

//             //     <Card className="shadow-lg transition-transform hover:scale-105">
//             //         <CardHeader className="flex flex-row items-center justify-between pb-2">
//             //             <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-500 dark:text-orange-400">
//             //                 <Briefcase className="h-4 w-4" />
//             //                 Techniciens
//             //             </CardTitle>
//             //             <Briefcase className="h-5 w-5" />
//             //         </CardHeader>
//             //         <CardContent className="text-center">
//             //             <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{technicianCount}</div>
//             //             <p className="text-sm text-gray-500 dark:text-gray-400">Techniciens</p>
//             //         </CardContent>
//             //     </Card>

//             //     <Card className="shadow-lg transition-transform hover:scale-105">
//             //         <CardHeader className="flex flex-row items-center justify-between pb-2">
//             //             <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
//             //                 <CheckCircle className="h-4 w-4" />
//             //                 Actifs
//             //             </CardTitle>
//             //             <CheckCircle className="h-5 w-5" />
//             //         </CardHeader>
//             //         <CardContent className="text-center">
//             //             <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeUserCount}</div>
//             //             <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs Actifs</p>
//             //         </CardContent>
//             //     </Card>
//             // </div>

//             // <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
//             //     <div>
//             //         <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
//             //             <Users className="h-5 w-5" />
//             //             Liste des utilisateurs
//             //         </h2>
//             //         <div className="space-y-4">
//             //             <Card className="shadow-md">
//             //                 <CardContent>
//             //                     <Table>
//             //                         <TableHeader>
//             //                             <TableRow>
//             //                                 <TableHead>Nom et Email</TableHead>
//             //                                 <TableHead>Rôle</TableHead>
//             //                                 <TableHead>Catégorie</TableHead>
//             //                                 <TableHead>Statut</TableHead>
//             //                                 <TableHead>Date de création</TableHead>
//             //                                 <TableHead>Actions</TableHead>
//             //                             </TableRow>
//             //                         </TableHeader>
//             //                         <TableBody>
//             //                             {users.map((user) => (
//             //                                 <TableRow
//             //                                     key={user.id}
//             //                                     className={cn(
//             //                                         "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
//             //                                         selectedUser?.id === user.id && "ring-2 ring-blue-500 dark:ring-blue-400"
//             //                                     )}
//             //                                     onClick={() => handleUserSelect(user)}
//             //                                 >
//             //                                     <TableCell>
//             //                                         <div className="flex flex-col">
//             //                                             <span className="font-medium">{user.name}</span>
//             //                                             <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
//             //                                         </div>
//             //                                     </TableCell>
//             //                                     <TableCell>{getRoleLabel(user.role)}</TableCell>
//             //                                     <TableCell>{user.category}</TableCell>
//             //                                     <TableCell>
//             //                                         <span
//             //                                             className={cn(
//             //                                                 "text-xs font-medium px-2 py-1 rounded",
//             //                                                 user.status === 'active' && 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
//             //                                                 user.status === 'inactive' && 'bg-red-100 text-red-800 dark:text-red-100',
//             //                                                 user.status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
//             //                                                 user.status === null && 'text-gray-500 dark:text-gray-400'
//             //                                             )}
//             //                                         >
//             //                                             {user.status === 'active' ? 'Actif' :
//             //                                                 user.status === 'inactive' ? 'Inactif' :
//             //                                                     user.status === 'pending' ? 'En attente' :
//             //                                                         'N/A'}
//             //                                         </span>
//             //                                     </TableCell>
//             //                                     <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
//             //                                     <TableCell>
//             //                                         <div className="flex gap-2">
//             //                                             {user.role !== 'technician' && (
//             //                                                 <>
//             //                                                      <Button
//             //                                                         size="icon"
//             //                                                         variant="ghost"
//             //                                                         onClick={(e) => {
//             //                                                             e.stopPropagation();
//             //                                                             if (user.status === 'active') {
//             //                                                                 handleDeactivateUser(user.id);
//             //                                                             } else {
//             //                                                                 handleActivateUser(user.id);
//             //                                                             }
//             //                                                         }}
//             //                                                         className={cn(
//             //                                                             user.status === 'active'
//             //                                                                 ? "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//             //                                                                 : "text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
//             //                                                         )}
//             //                                                     >
//             //                                                         {user.status === 'active' ? (
//             //                                                             <ToggleLeft className="h-4 w-4" />
//             //                                                         ) : (
//             //                                                             <ToggleRight className="h-4 w-4" />
//             //                                                         )}
//             //                                                     </Button>
//             //                                                 </>
//             //                                             )}
//             //                                             <Button
//             //                                                 size="icon"
//             //                                                 variant="ghost"
//             //                                                 onClick={(e) => {
//             //                                                     e.stopPropagation();
//             //                                                     goToEditPage(user.id);
//             //                                                 }}
//             //                                                 className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
//             //                                             >
//             //                                                 <Edit className="h-4 w-4" />
//             //                                             </Button>
//             //                                             <Button
//             //                                                 size="icon"
//             //                                                 variant="ghost"
//             //                                                 onClick={(e) => {
//             //                                                     e.stopPropagation();
//             //                                                     handleDeleteUser(user.id);
//             //                                                 }}
//             //                                                 className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//             //                                             >
//             //                                                 <UserX className="h-4 w-4" />
//             //                                             </Button>
//             //                                             <Button
//             //                                                 size="icon"
//             //                                                 variant="ghost"
//             //                                                 onClick={(e) => {
//             //                                                     e.stopPropagation();
//             //                                                     goToDetailPage(user.id)
//             //                                                 }}
//             //                                                 className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             //                                             >
//             //                                                 <ChevronRight className="h-4 w-4" />
//             //                                             </Button>
//             //                                         </div>
//             //                                     </TableCell>
//             //                                 </TableRow>
//             //                             ))}
//             //                         </TableBody>
//             //                     </Table>
//             //                 </CardContent>
//             //             </Card>
//             //         </div>
//             //         <div className="flex items-center justify-between mt-4 flex-row-reverse">
//             //             <div className="flex items-center gap-2">
//             //                 <Button
//             //                     onClick={() => handlePageChange(page + 1)}
//             //                     disabled={page >= Math.ceil(totalUsers / perPage)}
//             //                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
//             //                 >
//             //                     Suivant
//             //                 </Button>
//             //                 <span className="text-sm text-gray-500 dark:text-gray-400">
//             //                     Page {page} sur {Math.ceil(totalUsers / perPage)}
//             //                 </span>
//             //                 <Button
//             //                     onClick={() => handlePageChange(Math.max(1, page - 1))}
//             //                     disabled={page === 1}
//             //                     className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
//             //                 >
//             //                     Précédent
//             //                 </Button>
//             //             </div>
//             //         </div>
//             //          <div className="flex items-center gap-4 mt-4">
//             //             <span className="text-sm text-gray-500 dark:text-gray-400">
//             //                 Utilisateurs par page:
//             //             </span>
//             //             <select
//             //                 value={perPage}
//             //                 onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
//             //                 className="bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//             //             >
//             //                 <option value="5">5</option>
//             //                 <option value="10">10</option>
//             //                 <option value="20">20</option>
//             //                 <option value="50">50</option>
//             //             </select>
//             //         </div>
//             //     </div>
//             // </div>
// //         </div>
// //     );
// // };

// // export default DashboardUsersPage;



// import React, { useState, useEffect, useCallback } from 'react';
// import Button  from '../../components/elements/Button';
// import Card  from '../../components/elements/Card';
// import CardContent from '../../components/elements/CardContent';
// import CardHeader from '../../components/elements/CardHeader';
// import CardTitle from '../../components/elements/CardTitle';
// import classNames from 'classnames';
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import axios from 'axios';
// import { User, UserPlus, UserX, Users, Edit, AlertCircle, Loader2, ToggleLeft, ToggleRight, ChevronRight, Users2, Briefcase, CheckCircle } from 'lucide-react';

// const cn = classNames;
// const DashboardUsersPage = () => {
//     // const [isDarkMode, setIsDarkMode] = useState(false);
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [page, setPage] = useState(1);
//     const [perPage, setPerPage] = useState(10);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [adminCount, setAdminCount] = useState(0);
//     const [userCount, setUserCount] = useState(0);
//     const [technicianCount, setTechnicianCount] = useState(0);
//     const [activeUserCount, setActiveUserCount] = useState(0);

//     const api = axios.create({
//         baseURL: 'http://localhost:8000/api/users',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         withCredentials: true,
//     });

//     // useEffect(() => {
//     //     const themeCheck = () => {
//     //         if (localStorage.theme === 'dark' || 
//     //             (!('theme' in localStorage) && 
//     //              window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     //             document.documentElement.classList.add('dark');
//     //             setIsDarkMode(true);
//     //         } else {
//     //             document.documentElement.classList.remove('dark');
//     //             setIsDarkMode(false);
//     //         }
//     //     };
//     //     themeCheck();
//     // }, []);
//     const fetchUsers = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await api.get(`/users?page=${page}&perPage=${perPage}`);
            
//             const data = response.data.data || [];
//             setUsers(data);
//             setTotalUsers(response.data.meta?.total || 0);
            
//             // Calcul des statistiques
//             const admins = data.filter(u => ['admin', 'superadmin'].includes(u.role)).length;
//             const regularUsers = data.filter(u => u.role === 'user').length;
//             const technicians = data.filter(u => u.role === 'technician').length;
//             const activeUsers = data.filter(u => u.status === 'active').length;

//             setAdminCount(admins);
//             setUserCount(regularUsers);
//             setTechnicianCount(technicians);
//             setActiveUserCount(activeUsers);

//         } catch (err) {
//             setError(err.response?.data?.message || 'Erreur de chargement');
//         } finally {
//             setLoading(false);
//         }
//     }, [page, perPage, api]); // Toutes les dépendances déclarées

//     // Effet principal
//     useEffect(() => {
//         fetchUsers();
//     }, [fetchUsers]); // Seule dépendance nécessaire maintenant

//     // const fetchUsers = async () => {
//     //     setLoading(true);
//     //     setError(null);
//     //     try {
//     //         const response = await api.get(`/users?page=${page}&perPage=${perPage}`);
            
//     //         setUsers(response.data.data || []);
//     //         setTotalUsers(response.data.meta?.total || 0);
            
//     //         const admins = (response.data.data || []).filter(user => ['admin', 'superadmin'].includes(user.role)).length;
//     //         const regularUsers = (response.data.data || []).filter(user => user.role === 'user').length;
//     //         const technicians = (response.data.data || []).filter(user => user.role === 'technician').length;
//     //         const activeUsers = (response.data.data || []).filter(user => user.status === 'active').length;

//     //         setAdminCount(admins);
//     //         setUserCount(regularUsers);
//     //         setTechnicianCount(technicians);
//     //         setActiveUserCount(activeUsers);

//     //     } catch (err) {
//     //         setError(err.response?.data?.message || 'Erreur lors de la récupération des utilisateurs');
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     // useEffect(() => {
//     //     fetchUsers();
//     // }, [page, perPage]);

//     // const toggleTheme = () => {
//     //     const newDarkMode = !isDarkMode;
//     //     setIsDarkMode(newDarkMode);
//     //     if (newDarkMode) {
//     //         localStorage.theme = 'dark';
//     //         document.documentElement.classList.add('dark');
//     //     } else {
//     //         localStorage.theme = 'light';
//     //         document.documentElement.classList.remove('dark');
//     //     }
//     // };

    // const handleCreateUser = async (userData) => {
    //     try {
    //         await api.post('/users', userData);
    //         alert('Utilisateur créé avec succès !');
    //         await fetchUsers();
    //     } catch (error) {
    //         const errorMessage = error.response?.data?.message || "Échec de la création";
    //         console.error('Erreur création utilisateur:', errorMessage);
    //         alert('Erreur lors de la création !');
    //     }
    // };

    // const handleUpdateUser = async (id, updatedData) => {
    //     try {
    //         await api.patch(`/users/${id}`, updatedData);
    //         alert('Utilisateur mis à jour avec succès !');
    //         await fetchUsers();
    //     } catch (error) {
    //         const errorMessage = error.response?.data?.message || "Échec de la mise à jour";
    //         console.error('Erreur mise à jour utilisateur:', errorMessage);
    //         alert('Erreur lors de la mise à jour !');
    //     }
    // };

    // const handleDeleteUser = async (id) => {
    //     try {
    //         await api.delete(`/users/${id}`);
    //         alert('Utilisateur supprimé avec succès !');
    //         setUsers(users.filter(user => user.id !== id));
    //         setTotalUsers(prev => prev - 1);
    //     } catch (error) {
    //         const errorMessage = error.response?.data?.message || "Échec de la suppression";
    //         console.error('Erreur suppression utilisateur:', errorMessage);
    //         alert('Erreur lors de la suppression !');
    //     }
    // };

    // const handlePromoteToAdmin = async (id) => {
    //     await handleUpdateUser(id, { role: 'admin' });
    // };

    // const handlePromoteToSuperAdmin = async (id) => {
    //     await handleUpdateUser(id, { role: 'superadmin' });
    // };

    // const handleDemoteToUser = async (id) => {
    //     await handleUpdateUser(id, { role: 'user' });
    // };

    // const handleActivateUser = async (id) => {
    //     await handleUpdateUser(id, { status: 'active' });
    // };

    // const handleDeactivateUser = async (id) => {
    //     await handleUpdateUser(id, { status: 'inactive' });
    // };

    // const handleUserSelect = (user) => {
    //     setSelectedUser(user);
    // };

    // const handlePageChange = (newPage) => {
    //     if (newPage >= 1 && newPage <= Math.ceil(totalUsers / perPage)) {
    //         setPage(newPage);
    //     }
    // };

    // const handlePerPageChange = (newPerPage) => {
    //     setPerPage(Number(newPerPage));
    //     setPage(1);
    // };

    // const getRoleLabel = (role) => {
    //     switch (role) {
    //         case 'superadmin': return 'Super Admin';
    //         case 'admin': return 'Admin';
    //         case 'user': return 'Utilisateur';
    //         case 'technician': return 'Technicien';
    //         default: return role;
    //     }
    // };

    // const goToEditPage = (userId) => {
    //     window.location.href = `/users/${userId}/edit`;
    // };

    // const goToDetailPage = (userId) => {
    //     window.location.href = `/users/${userId}/details`;
    // };

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center h-64">
    //             <Loader2 className="animate-spin text-4xl text-gray-500 dark:text-gray-400" />
    //         </div>
    //     );
    // }

    // if (error) {
    //     return (
    //         <div className="p-4 flex items-center gap-2 text-red-500 dark:text-red-400">
    //             <AlertCircle className="h-5 w-5" />
    //             <span>Erreur : {error}</span>
    //         </div>
    //     );
    // }

//     return (
//         <div className={cn("p-4 md:p-6 lg:p-8")}>
// {/* , isDarkMode ? 'dark' : '' */}
//  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 lg:mb-8">
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
//                     <Users className="h-6 w-6" />
//                     Gestion des utilisateurs
//                 </h1>
//                 <Button
//                     onClick={() => handleCreateUser({
//                         name: 'Nouvel Utilisateur',
//                         email: `nouvelutilisateur${Date.now()}@example.com`,
//                         role: 'user',
//                         status: 'pending',
//                         category: 'Informatique'
//                     })}
//                     className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
//                 >
//                     <UserPlus className="h-4 w-4" />
//                     Ajouter un utilisateur
//                 </Button>
//             </div>

//             {/* User Statistics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                             <Users2 className="h-4 w-4" />
//                             Total
//                         </CardTitle>
//                         <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalUsers}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-500 dark:text-blue-400">
//                             <User className="h-4 w-4" />
//                             Admins
//                         </CardTitle>
//                         <User className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{adminCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Administrateurs</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-500 dark:text-green-400">
//                             <Users className="h-4 w-4" />
//                             Utilisateurs
//                         </CardTitle>
//                         <Users className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs Simples</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-500 dark:text-orange-400">
//                             <Briefcase className="h-4 w-4" />
//                             Techniciens
//                         </CardTitle>
//                         <Briefcase className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{technicianCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Techniciens</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
//                             <CheckCircle className="h-4 w-4" />
//                             Actifs
//                         </CardTitle>
//                         <CheckCircle className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeUserCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs Actifs</p>
//                     </CardContent>
//                 </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
//                         <Users className="h-5 w-5" />
//                         Liste des utilisateurs
//                     </h2>
//                     <div className="space-y-4">
//                         <Card className="shadow-md">
//                             <CardContent>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableHead>Nom et Email</TableHead>
//                                             <TableHead>Rôle</TableHead>
//                                             <TableHead>Catégorie</TableHead>
//                                             <TableHead>Statut</TableHead>
//                                             <TableHead>Date de création</TableHead>
//                                             <TableHead>Actions</TableHead>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {users.map((user) => (
//                                             <TableRow
//                                                 key={user.id}
//                                                 className={cn(
//                                                     "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
//                                                     selectedUser?.id === user.id && "ring-2 ring-blue-500 dark:ring-blue-400"
//                                                 )}
//                                                 onClick={() => handleUserSelect(user)}
//                                             >
//                                                 <TableCell>
//                                                     <div className="flex flex-col">
//                                                         <span className="font-medium">{user.name}</span>
//                                                         <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
//                                                     </div>
//                                                 </TableCell>
//                                                 <TableCell>{getRoleLabel(user.role)}</TableCell>
//                                                 <TableCell>{user.category}</TableCell>
//                                                 <TableCell>
//                                                     <span
//                                                         className={cn(
//                                                             "text-xs font-medium px-2 py-1 rounded",
//                                                             user.status === 'active' && 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
//                                                             user.status === 'inactive' && 'bg-red-100 text-red-800 dark:text-red-100',
//                                                             user.status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
//                                                             user.status === null && 'text-gray-500 dark:text-gray-400'
//                                                         )}
//                                                     >
//                                                         {user.status === 'active' ? 'Actif' :
//                                                             user.status === 'inactive' ? 'Inactif' :
//                                                                 user.status === 'pending' ? 'En attente' :
//                                                                     'N/A'}
//                                                     </span>
//                                                 </TableCell>
//                                                 <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
//                                                 <TableCell>
//                                                     <div className="flex gap-2">
//                                                         {user.role !== 'technician' && (
//                                                             <>
//                                                                  <Button
//                                                                     size="icon"
//                                                                     variant="ghost"
//                                                                     onClick={(e) => {
//                                                                         e.stopPropagation();
//                                                                         if (user.status === 'active') {
//                                                                             handleDeactivateUser(user.id);
//                                                                         } else {
//                                                                             handleActivateUser(user.id);
//                                                                         }
//                                                                     }}
//                                                                     className={cn(
//                                                                         user.status === 'active'
//                                                                             ? "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                                                                             : "text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
//                                                                     )}
//                                                                 >
//                                                                     {user.status === 'active' ? (
//                                                                         <ToggleLeft className="h-4 w-4" />
//                                                                     ) : (
//                                                                         <ToggleRight className="h-4 w-4" />
//                                                                     )}
//                                                                 </Button>
//                                                             </>
//                                                         )}
//                                                         <Button
//                                                             size="icon"
//                                                             variant="ghost"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 goToEditPage(user.id);
//                                                             }}
//                                                             className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
//                                                         >
//                                                             <Edit className="h-4 w-4" />
//                                                         </Button>
//                                                         <Button
//                                                             size="icon"
//                                                             variant="ghost"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 handleDeleteUser(user.id);
//                                                             }}
//                                                             className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                                                         >
//                                                             <UserX className="h-4 w-4" />
//                                                         </Button>
//                                                         <Button
//                                                             size="icon"
//                                                             variant="ghost"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 goToDetailPage(user.id)
//                                                             }}
//                                                             className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                                                         >
//                                                             <ChevronRight className="h-4 w-4" />
//                                                         </Button>
//                                                     </div>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </CardContent>
//                         </Card>
//                     </div>
//                     <div className="flex items-center justify-between mt-4 flex-row-reverse">
//                         <div className="flex items-center gap-2">
//                             <Button
//                                 onClick={() => handlePageChange(page + 1)}
//                                 disabled={page >= Math.ceil(totalUsers / perPage)}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
//                             >
//                                 Suivant
//                             </Button>
//                             <span className="text-sm text-gray-500 dark:text-gray-400">
//                                 Page {page} sur {Math.ceil(totalUsers / perPage)}
//                             </span>
//                             <Button
//                                 onClick={() => handlePageChange(Math.max(1, page - 1))}
//                                 disabled={page === 1}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
//                             >
//                                 Précédent
//                             </Button>
//                         </div>
//                     </div>
//                      <div className="flex items-center gap-4 mt-4">
//                         <span className="text-sm text-gray-500 dark:text-gray-400">
//                             Utilisateurs par page:
//                         </span>
//                         <select
//                             value={perPage}
//                             onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
//                             className="bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                         >
//                             <option value="5">5</option>
//                             <option value="10">10</option>
//                             <option value="20">20</option>
//                             <option value="50">50</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardUsersPage;



// import React, { useState, useEffect, useCallback } from 'react';
// import Button from '../../components/elements/Button';
// import Card from '../../components/elements/Card';
// import CardContent from '../../components/elements/CardContent';
// import CardHeader from '../../components/elements/CardHeader';
// import CardTitle from '../../components/elements/CardTitle';
// import classNames from 'classnames';
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import axios from 'axios';
// import { User, UserPlus, UserX, Users, Edit, AlertCircle, Loader2, ToggleLeft, ToggleRight, ChevronRight, Users2, Briefcase, CheckCircle } from 'lucide-react';

// const cn = classNames;

// const DashboardUsersPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [page, setPage] = useState(1);
//     const [perPage, setPerPage] = useState(10);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [adminCount, setAdminCount] = useState(0);
//     const [userCount, setUserCount] = useState(0);
//     const [technicianCount, setTechnicianCount] = useState(0);
//     const [activeUserCount, setActiveUserCount] = useState(0);

//     // Configuration Axios avec le token d'authentification
//     const api = axios.create({
//         baseURL: 'http://localhost:8000/api',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajout du token
//         },
//         withCredentials: true,
//     });

//     // Fonction fetchUsers stable avec useCallback
//     const fetchUsers = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await api.get('/users', {
//                 params: {
//                     page,
//                     perPage
//                 }
//             });
            
//             const data = response.data.data || [];
//             setUsers(data);
//             setTotalUsers(response.data.meta?.total || 0);
            
//             // Calcul des statistiques
//             const admins = data.filter(u => ['admin', 'superadmin'].includes(u.role)).length;
//             const regularUsers = data.filter(u => u.role === 'user').length;
//             const technicians = data.filter(u => u.role === 'technician').length;
//             const activeUsers = data.filter(u => u.status === 'active').length;

//             setAdminCount(admins);
//             setUserCount(regularUsers);
//             setTechnicianCount(technicians);
//             setActiveUserCount(activeUsers);

//         } catch (err) {
//             if (err.response?.status === 401) {
//                 // Rediriger vers la page de login si non autorisé
//                 window.location.href = '/login';
//             }
//             setError(err.response?.data?.message || 'Erreur de chargement');
//         } finally {
//             setLoading(false);
//         }
//     }, [page, perPage]); // Dépendances nécessaires

//     // Effet pour charger les utilisateurs
//     useEffect(() => {
//         fetchUsers();
//     }, [fetchUsers]);

//     // ... (le reste de vos fonctions handleCreateUser, handleUpdateUser, etc. reste inchangé)

//     const handleCreateUser = async (userData) => {
//         try {
//             await api.post('/users', userData);
//             alert('Utilisateur créé avec succès !');
//             await fetchUsers();
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "Échec de la création";
//             console.error('Erreur création utilisateur:', errorMessage);
//             alert('Erreur lors de la création !');
//         }
//     };

//     const handleUpdateUser = async (id, updatedData) => {
//         try {
//             await api.patch(`/users/${id}`, updatedData);
//             alert('Utilisateur mis à jour avec succès !');
//             await fetchUsers();
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "Échec de la mise à jour";
//             console.error('Erreur mise à jour utilisateur:', errorMessage);
//             alert('Erreur lors de la mise à jour !');
//         }
//     };

//     const handleDeleteUser = async (id) => {
//         try {
//             await api.delete(`/users/${id}`);
//             alert('Utilisateur supprimé avec succès !');
//             setUsers(users.filter(user => user.id !== id));
//             setTotalUsers(prev => prev - 1);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "Échec de la suppression";
//             console.error('Erreur suppression utilisateur:', errorMessage);
//             alert('Erreur lors de la suppression !');
//         }
//     };

//     //     const handlePromoteToAdmin = async (id) => {
//     //     await handleUpdateUser(id, { role: 'admin' });
//     // };

//     // const handlePromoteToSuperAdmin = async (id) => {
//     //     await handleUpdateUser(id, { role: 'superadmin' });
//     // };

//     // const handleDemoteToUser = async (id) => {
//     //     await handleUpdateUser(id, { role: 'user' });
//     // };

//     const handleActivateUser = async (id) => {
//         await handleUpdateUser(id, { status: 'active' });
//     };

//     const handleDeactivateUser = async (id) => {
//         await handleUpdateUser(id, { status: 'inactive' });
//     };

//     const handleUserSelect = (user) => {
//         setSelectedUser(user);
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage >= 1 && newPage <= Math.ceil(totalUsers / perPage)) {
//             setPage(newPage);
//         }
//     };

//     const handlePerPageChange = (newPerPage) => {
//         setPerPage(Number(newPerPage));
//         setPage(1);
//     };

//     const getRoleLabel = (role) => {
//         switch (role) {
//             case 'superadmin': return 'Super Admin';
//             case 'admin': return 'Admin';
//             case 'user': return 'Utilisateur';
//             case 'technician': return 'Technicien';
//             default: return role;
//         }
//     };

//     const goToEditPage = (userId) => {
//         window.location.href = `/users/${userId}/edit`;
//     };

//     const goToDetailPage = (userId) => {
//         window.location.href = `/users/${userId}/details`;
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <Loader2 className="animate-spin text-4xl text-gray-500 dark:text-gray-400" />
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="p-4 flex items-center gap-2 text-red-500 dark:text-red-400">
//                 <AlertCircle className="h-5 w-5" />
//                 <span>Erreur : {error}</span>
//             </div>
//         );
//     }

//     // Gestion de l'erreur 401
//     if (error && error.includes('401')) {
//         return (
//             <div className="p-4 flex flex-col items-center justify-center gap-4 text-red-500">
//                 <AlertCircle className="h-12 w-12" />
//                 <span className="text-xl">Session expirée</span>
//                 <Button 
//                     onClick={() => window.location.href = '/login'}
//                     className="bg-blue-500 text-white"
//                 >
//                     Se reconnecter
//                 </Button>
//             </div>
//         );
//     }

//     // ... (le reste de votre rendu JSX reste inchangé)
//     return (
//         <div className={cn("p-4 md:p-6 lg:p-8")}>
// {/* , isDarkMode ? 'dark' : '' */}
//  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 lg:mb-8">
//                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
//                     <Users className="h-6 w-6" />
//                     Gestion des utilisateurs
//                 </h1>
//                 <Button
//                     onClick={() => handleCreateUser({
//                         name: 'Nouvel Utilisateur',
//                         email: `nouvelutilisateur${Date.now()}@example.com`,
//                         role: 'user',
//                         status: 'pending',
//                         category: 'Informatique'
//                     })}
//                     className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
//                 >
//                     <UserPlus className="h-4 w-4" />
//                     Ajouter un utilisateur
//                 </Button>
//             </div>

//             {/* User Statistics Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                             <Users2 className="h-4 w-4" />
//                             Total
//                         </CardTitle>
//                         <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalUsers}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-blue-500 dark:text-blue-400">
//                             <User className="h-4 w-4" />
//                             Admins
//                         </CardTitle>
//                         <User className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{adminCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Administrateurs</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-500 dark:text-green-400">
//                             <Users className="h-4 w-4" />
//                             Utilisateurs
//                         </CardTitle>
//                         <Users className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs Simples</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-orange-500 dark:text-orange-400">
//                             <Briefcase className="h-4 w-4" />
//                             Techniciens
//                         </CardTitle>
//                         <Briefcase className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{technicianCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Techniciens</p>
//                     </CardContent>
//                 </Card>

//                 <Card className="shadow-lg transition-transform hover:scale-105">
//                     <CardHeader className="flex flex-row items-center justify-between pb-2">
//                         <CardTitle className="text-sm font-medium flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
//                             <CheckCircle className="h-4 w-4" />
//                             Actifs
//                         </CardTitle>
//                         <CheckCircle className="h-5 w-5" />
//                     </CardHeader>
//                     <CardContent className="text-center">
//                         <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeUserCount}</div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Utilisateurs Actifs</p>
//                     </CardContent>
//                 </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
//                 <div>
//                     <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
//                         <Users className="h-5 w-5" />
//                         Liste des utilisateurs
//                     </h2>
//                     <div className="space-y-4">
//                         <Card className="shadow-md">
//                             <CardContent>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableHead>Nom et Email</TableHead>
//                                             <TableHead>Rôle</TableHead>
//                                             <TableHead>Catégorie</TableHead>
//                                             <TableHead>Statut</TableHead>
//                                             <TableHead>Date de création</TableHead>
//                                             <TableHead>Actions</TableHead>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {users.map((user) => (
//                                             <TableRow
//                                                 key={user.id}
//                                                 className={cn(
//                                                     "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700",
//                                                     selectedUser?.id === user.id && "ring-2 ring-blue-500 dark:ring-blue-400"
//                                                 )}
//                                                 onClick={() => handleUserSelect(user)}
//                                             >
//                                                 <TableCell>
//                                                     <div className="flex flex-col">
//                                                         <span className="font-medium">{user.name}</span>
//                                                         <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
//                                                     </div>
//                                                 </TableCell>
//                                                 <TableCell>{getRoleLabel(user.role)}</TableCell>
//                                                 <TableCell>{user.category}</TableCell>
//                                                 <TableCell>
//                                                     <span
//                                                         className={cn(
//                                                             "text-xs font-medium px-2 py-1 rounded",
//                                                             user.status === 'active' && 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
//                                                             user.status === 'inactive' && 'bg-red-100 text-red-800 dark:text-red-100',
//                                                             user.status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
//                                                             user.status === null && 'text-gray-500 dark:text-gray-400'
//                                                         )}
//                                                     >
//                                                         {user.status === 'active' ? 'Actif' :
//                                                             user.status === 'inactive' ? 'Inactif' :
//                                                                 user.status === 'pending' ? 'En attente' :
//                                                                     'N/A'}
//                                                     </span>
//                                                 </TableCell>
//                                                 <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
//                                                 <TableCell>
//                                                     <div className="flex gap-2">
//                                                         {user.role !== 'technician' && (
//                                                             <>
//                                                                  <Button
//                                                                     size="icon"
//                                                                     variant="ghost"
//                                                                     onClick={(e) => {
//                                                                         e.stopPropagation();
//                                                                         if (user.status === 'active') {
//                                                                             handleDeactivateUser(user.id);
//                                                                         } else {
//                                                                             handleActivateUser(user.id);
//                                                                         }
//                                                                     }}
//                                                                     className={cn(
//                                                                         user.status === 'active'
//                                                                             ? "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                                                                             : "text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
//                                                                     )}
//                                                                 >
//                                                                     {user.status === 'active' ? (
//                                                                         <ToggleLeft className="h-4 w-4" />
//                                                                     ) : (
//                                                                         <ToggleRight className="h-4 w-4" />
//                                                                     )}
//                                                                 </Button>
//                                                             </>
//                                                         )}
//                                                         <Button
//                                                             size="icon"
//                                                             variant="ghost"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 goToEditPage(user.id);
//                                                             }}
//                                                             className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
//                                                         >
//                                                             <Edit className="h-4 w-4" />
//                                                         </Button>
//                                                         <Button
//                                                             size="icon"
//                                                             variant="ghost"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 handleDeleteUser(user.id);
//                                                             }}
//                                                             className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                                                         >
//                                                             <UserX className="h-4 w-4" />
//                                                         </Button>
//                                                         <Button
//                                                             size="icon"
//                                                             variant="ghost"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 goToDetailPage(user.id)
//                                                             }}
//                                                             className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                                                         >
//                                                             <ChevronRight className="h-4 w-4" />
//                                                         </Button>
//                                                     </div>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </CardContent>
//                         </Card>
//                     </div>
//                     <div className="flex items-center justify-between mt-4 flex-row-reverse">
//                         <div className="flex items-center gap-2">
//                             <Button
//                                 onClick={() => handlePageChange(page + 1)}
//                                 disabled={page >= Math.ceil(totalUsers / perPage)}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
//                             >
//                                 Suivant
//                             </Button>
//                             <span className="text-sm text-gray-500 dark:text-gray-400">
//                                 Page {page} sur {Math.ceil(totalUsers / perPage)}
//                             </span>
//                             <Button
//                                 onClick={() => handlePageChange(Math.max(1, page - 1))}
//                                 disabled={page === 1}
//                                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
//                             >
//                                 Précédent
//                             </Button>
//                         </div>
//                     </div>
//                      <div className="flex items-center gap-4 mt-4">
//                         <span className="text-sm text-gray-500 dark:text-gray-400">
//                             Utilisateurs par page:
//                         </span>
//                         <select
//                             value={perPage}
//                             onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
//                             className="bg-gray-100 border border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//                         >
//                             <option value="5">5</option>
//                             <option value="10">10</option>
//                             <option value="20">20</option>
//                             <option value="50">50</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DashboardUsersPage;








// import React, { useState, useEffect, useCallback } from 'react';
// import Button from '../../components/elements/Button';
// import Card from '../../components/elements/Card';
// import CardContent from '../../components/elements/CardContent';
// import CardHeader from '../../components/elements/CardHeader';
// import CardTitle from '../../components/elements/CardTitle';
// import classNames from 'classnames';
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import axios from 'axios';
// import { 
//   User, UserPlus, UserX, Users, Edit, 
//   AlertCircle, Loader2, ToggleLeft, ToggleRight, 
//   ChevronRight, Users2, Briefcase, CheckCircle 
// } from 'lucide-react';

// const cn = classNames;

// const DashboardUsersPage = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [page, setPage] = useState(1);
//     const [perPage, setPerPage] = useState(10);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [adminCount, setAdminCount] = useState(0);
//     const [userCount, setUserCount] = useState(0);
//     const [technicianCount, setTechnicianCount] = useState(0);
//     const [activeUserCount, setActiveUserCount] = useState(0);
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     // Vérification du mode dark au chargement
//     useEffect(() => {
//         const darkMode = localStorage.getItem('darkMode') === 'true' || 
//                         (!('darkMode' in localStorage) && 
//                          window.matchMedia('(prefers-color-scheme: dark)').matches);
//         setIsDarkMode(darkMode);
//         document.documentElement.classList.toggle('dark', darkMode);
//     }, []);

//     const toggleDarkMode = () => {
//         const newMode = !isDarkMode;
//         setIsDarkMode(newMode);
//         localStorage.setItem('darkMode', newMode);
//         document.documentElement.classList.toggle('dark', newMode);
//     };

//     const api = axios.create({

        
//         baseURL: 'http://localhost:8000/api',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
//         }
//     });

//     const fetchUsers = useCallback(async () => {
//         setLoading(true);
//         setError(null);
        
//         try {
//             const response = await api.get('/users', {
//                 params: { page, perPage }
//             });
            
//             const data = response.data.data || [];
//             setUsers(data);
//             setTotalUsers(response.data.meta?.total || 0);
            
//             // Calcul des statistiques
//             const admins = data.filter(u => ['admin', 'superadmin'].includes(u.role)).length;
//             const regularUsers = data.filter(u => u.role === 'user').length;
//             const technicians = data.filter(u => u.role === 'technician').length;
//             const activeUsers = data.filter(u => u.status === 'active').length;

//             setAdminCount(admins);
//             setUserCount(regularUsers);
//             setTechnicianCount(technicians);
//             setActiveUserCount(activeUsers);

//         } catch (err) {
//             setError(err.response?.data?.message || 'Erreur de chargement des utilisateurs');
//         } finally {
//             setLoading(false);
//         }
//     }, [page, perPage]);

//     useEffect(() => {
//         fetchUsers();
//     }, [page, perPage]);

import React, { useState, useEffect, useCallback } from 'react';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import CardContent from '../../components/elements/CardContent';
import CardHeader from '../../components/elements/CardHeader';
import CardTitle from '../../components/elements/CardTitle';
import classNames from 'classnames';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from 'axios';
import { 
  User, UserPlus, UserX, Users, Edit, 
  AlertCircle, Loader2, ToggleLeft, ToggleRight, 
  ChevronRight, Users2, Briefcase, CheckCircle 
} from 'lucide-react';

const cn = classNames;

const DashboardUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [technicianCount, setTechnicianCount] = useState(0);
    const [activeUserCount, setActiveUserCount] = useState(0);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Configuration Axios avec intercepteur
    const api = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        withCredentials: true
    });

    // Intercepteur pour les erreurs 401
    api.interceptors.response.use(
        response => response,
        error => {
            if (error.response?.status === 401) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    // Vérification du mode dark au chargement
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true' || 
                        (!('darkMode' in localStorage) && 
                        window.matchMedia('(prefers-color-scheme: dark)').matches);
        setIsDarkMode(darkMode);
        document.documentElement.classList.toggle('dark', darkMode);
    }, []);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await api.get('/users', {
                params: { page, perPage }
            });
            
            const data = response.data.data || [];
            setUsers(data);
            setTotalUsers(response.data.meta?.total || 0);
            
            const admins = data.filter(u => ['admin', 'superadmin'].includes(u.role)).length;
            const regularUsers = data.filter(u => u.role === 'user').length;
            const technicians = data.filter(u => u.role === 'technician').length;
            const activeUsers = data.filter(u => u.status === 'active').length;

            setAdminCount(admins);
            setUserCount(regularUsers);
            setTechnicianCount(technicians);
            setActiveUserCount(activeUsers);

        } catch (err) {
            if (err.response?.status === 401) {
                setError('Session expirée, veuillez vous reconnecter');
                return;
            }
            setError(err.response?.data?.message || 'Erreur de chargement des utilisateurs');
        } finally {
            setLoading(false);
        }
    }, [page, perPage]);

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            window.location.href = '/login';
            return;
        }
        fetchUsers();
    }, [page, perPage]);

    const handleCreateUser = async (userData) => {
        try {
            await api.post('/users', userData);
            await fetchUsers();
            alert('Utilisateur créé avec succès !');
        } catch (error) {
            console.error('Erreur création utilisateur:', error);
            alert("Échec de la création de l'utilisateur");
        }
    };

    const handleUpdateUser = async (id, updatedData) => {
        try {
            await api.patch(`/users/${id}`, updatedData);
            await fetchUsers();
            alert('Utilisateur mis à jour avec succès !');
        } catch (error) {
            console.error('Erreur mise à jour utilisateur:', error);
            alert("Échec de la mise à jour de l'utilisateur");
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            setTotalUsers(prev => prev - 1);
            alert('Utilisateur supprimé avec succès !');
        } catch (error) {
            console.error('Erreur suppression utilisateur:', error);
            alert("Échec de la suppression de l'utilisateur");
        }
    };

    const handleActivateUser = (id) => handleUpdateUser(id, { status: 'active' });
    const handleDeactivateUser = (id) => handleUpdateUser(id, { status: 'inactive' });
    const handleUserSelect = (user) => setSelectedUser(user);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalUsers / perPage)) {
            setPage(newPage);
        }
    };

    const handlePerPageChange = (newPerPage) => {
        setPerPage(Number(newPerPage));
        setPage(1);
    };

    const getRoleLabel = (role) => {
        const roles = {
            'superadmin': 'Super Admin',
            'admin': 'Admin',
            'user': 'Utilisateur',
        };
        return roles[role] || role;
    };

    const getStatusStyles = (status) => {
        const base = "text-xs font-medium px-2 py-1 rounded";
        const styles = {
            active: isDarkMode 
                ? `${base} bg-green-800 text-green-100` 
                : `${base} bg-green-100 text-green-800`,
            inactive: isDarkMode 
                ? `${base} bg-red-800 text-red-100` 
                : `${base} bg-red-100 text-red-800`,
            pending: isDarkMode 
                ? `${base} bg-yellow-800 text-yellow-100` 
                : `${base} bg-yellow-100 text-yellow-800`
        };
        return styles[status] || `${base} text-gray-500`;
    };

    const goToEditPage = (userId) => {
        window.location.href = `/users/${userId}/edit`;
    };

    const goToDetailPage = (userId) => {
        window.location.href = `/users/${userId}/details`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className={cn(
                    "animate-spin text-4xl",
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                )} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn(
                "p-4 flex items-center gap-2",
                isDarkMode ? "text-red-400" : "text-red-500"
            )}>
                <AlertCircle className="h-5 w-5" />
                <span>Erreur : {error}</span>
            </div>
        );
    }

    return (
        <div className={cn(
            "p-4 md:p-6 lg:p-8",
            isDarkMode ? "dark bg-gray-900" : "bg-white"
        )}>
            <div className="flex justify-between items-center mb-6">
                <h1 className={cn(
                    "text-2xl md:text-3xl lg:text-4xl font-semibold flex items-center gap-2",
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                )}>
                    <Users className="h-6 w-6" />
                    Gestion des utilisateurs
                </h1>
                {/* <Button
                    onClick={toggleDarkMode}
                    variant="ghost"
                    size="sm"
                    className="ml-4"
                >
                    {isDarkMode ? (
                        <span className="flex items-center gap-2">
                            ☀️ Mode clair
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            🌙 Mode sombre
                        </span>
                    )}
                </Button> */}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <Button
                    onClick={() => handleCreateUser({
                        name: 'Nouvel Utilisateur',
                        email: `nouvelutilisateur${Date.now()}@example.com`,
                        role: 'user',
                        status: 'pending',
                        category: 'Informatique'
                    })}
                    className={cn(
                        "bg-green-500 hover:bg-green-600 text-white flex items-center gap-2",
                        isDarkMode ? "dark:bg-green-600 dark:hover:bg-green-700" : ""
                    )}
                >
                    <UserPlus className="h-4 w-4" />
                    Ajouter un utilisateur
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {/* Cartes de statistiques */}
                {[
                    { 
                        title: "Total", 
                        value: totalUsers, 
                        icon: Users2, 
                        textColor: "text-gray-700 dark:text-gray-300",
                        bgColor: "bg-gray-200 dark:bg-gray-700"
                    },
                    { 
                        title: "Admins", 
                        value: adminCount, 
                        icon: User, 
                        textColor: "text-blue-500 dark:text-blue-400",
                        bgColor: "bg-blue-100 dark:bg-blue-900"
                    },
                    { 
                        title: "Utilisateurs", 
                        value: userCount, 
                        icon: Users, 
                        textColor: "text-green-500 dark:text-green-400",
                        bgColor: "bg-green-100 dark:bg-green-900"
                    },
                    { 
                        title: "Techniciens", 
                        value: technicianCount, 
                        icon: Briefcase, 
                        textColor: "text-orange-500 dark:text-orange-400",
                        bgColor: "bg-orange-100 dark:bg-orange-900"
                    },
                    { 
                        title: "Actifs", 
                        value: activeUserCount, 
                        icon: CheckCircle, 
                        textColor: "text-emerald-500 dark:text-emerald-400",
                        bgColor: "bg-emerald-100 dark:bg-emerald-900"
                    }
                ].map((stat, index) => (
                    <Card key={index} className={cn(
                        "shadow-lg transition-transform hover:scale-105",
                        stat.bgColor
                    )}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className={cn(
                                "text-sm font-medium flex items-center gap-2",
                                stat.textColor
                            )}>
                                <stat.icon className="h-4 w-4" />
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={cn(
                                "h-5 w-5",
                                stat.textColor
                            )} />
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className={cn(
                                "text-2xl font-bold",
                                isDarkMode ? "text-gray-100" : "text-gray-900"
                            )}>
                                {stat.value}
                            </div>
                            <p className={cn(
                                "text-sm",
                                isDarkMode ? "text-gray-300" : "text-gray-500"
                            )}>
                                {stat.title === "Total" ? "Utilisateurs" : stat.title}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <div>
                    <h2 className={cn(
                        "text-xl font-semibold mb-4 flex items-center gap-2",
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                        <Users className="h-5 w-5" />
                        Liste des utilisateurs
                    </h2>
                    <div className="space-y-4">
                        <Card className={cn(
                            "shadow-md",
                            isDarkMode ? "bg-gray-800" : "bg-white"
                        )}>
                            <CardContent>
                                <Table>
                                    <TableHead>
                                        <TableRow className={isDarkMode ? "bg-gray-700" : "bg-gray-100"}>
                                            {["Nom et Email", "Rôle", "Catégorie", "Statut", "Date de création", "Actions"].map((header, i) => (
                                                <TableHead key={i} className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                                                    {header}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow
                                                key={user.id}
                                                className={cn(
                                                    "cursor-pointer",
                                                    isDarkMode 
                                                        ? "hover:bg-gray-700" 
                                                        : "hover:bg-gray-100",
                                                    selectedUser?.id === user.id && 
                                                        (isDarkMode 
                                                            ? "ring-2 ring-blue-400" 
                                                            : "ring-2 ring-blue-500")
                                                )}
                                                onClick={() => handleUserSelect(user)}
                                            >
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className={cn(
                                                            "font-medium",
                                                            isDarkMode ? "text-gray-200" : "text-gray-900"
                                                        )}>
                                                            {user.name}
                                                        </span>
                                                        <span className={cn(
                                                            "text-sm",
                                                            isDarkMode ? "text-gray-400" : "text-gray-500"
                                                        )}>
                                                            {user.email}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                                                    {getRoleLabel(user.role)}
                                                </TableCell>
                                                <TableCell className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                                                    {user.category}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={getStatusStyles(user.status)}>
                                                        {user.status === 'active' ? 'Actif' :
                                                         user.status === 'inactive' ? 'Inactif' : 'En attente'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        {user.role !== 'technician' && (
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    user.status === 'active' 
                                                                        ? handleDeactivateUser(user.id)
                                                                        : handleActivateUser(user.id);
                                                                }}
                                                                className={cn(
                                                                    user.status === 'active' 
                                                                        ? "text-red-500 hover:text-red-700" 
                                                                        : "text-green-500 hover:text-green-700",
                                                                    isDarkMode && (
                                                                        user.status === 'active' 
                                                                            ? "dark:text-red-400 dark:hover:text-red-300" 
                                                                            : "dark:text-green-400 dark:hover:text-green-300"
                                                                    )
                                                                )}
                                                            >
                                                                {user.status === 'active' 
                                                                    ? <ToggleLeft className="h-4 w-4" />
                                                                    : <ToggleRight className="h-4 w-4" />}
                                                            </Button>
                                                        )}
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                goToEditPage(user.id);
                                                            }}
                                                            className={cn(
                                                                "text-blue-500 hover:text-blue-700",
                                                                isDarkMode && "dark:text-blue-400 dark:hover:text-blue-300"
                                                            )}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteUser(user.id);
                                                            }}
                                                            className={cn(
                                                                "text-red-500 hover:text-red-700",
                                                                isDarkMode && "dark:text-red-400 dark:hover:text-red-300"
                                                            )}
                                                        >
                                                            <UserX className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                goToDetailPage(user.id)
                                                            }}
                                                            className={cn(
                                                                "text-gray-500 hover:text-gray-700",
                                                                isDarkMode && "dark:text-gray-400 dark:hover:text-gray-300"
                                                            )}
                                                        >
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex items-center justify-between mt-4 flex-row-reverse">
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page >= Math.ceil(totalUsers / perPage)}
                                className={cn(
                                    "bg-gray-200 hover:bg-gray-300 text-gray-800",
                                    isDarkMode && "dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                                )}
                            >
                                Suivant
                            </Button>
                            <span className={cn(
                                "text-sm",
                                isDarkMode ? "text-gray-400" : "text-gray-500"
                            )}>
                                Page {page} sur {Math.ceil(totalUsers / perPage)}
                            </span>
                            <Button
                                onClick={() => handlePageChange(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className={cn(
                                    "bg-gray-200 hover:bg-gray-300 text-gray-800",
                                    isDarkMode && "dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                                )}
                            >
                                Précédent
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <span className={cn(
                            "text-sm",
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                        )}>
                            Utilisateurs par page:
                        </span>
                        <select
                            value={perPage}
                            onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
                            className={cn(
                                "bg-gray-100 border border-gray-300 text-gray-900 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                                isDarkMode && "dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400"
                            )}
                        >
                            {[5, 10, 20, 50].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardUsersPage;