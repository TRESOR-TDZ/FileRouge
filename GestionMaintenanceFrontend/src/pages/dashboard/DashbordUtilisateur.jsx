// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { cn } from '@/lib/utils';
// import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
// import axios from 'axios'; // Importez Axios
// import { User, UserPlus, UserMinus, UserX, Users, Edit, AlertCircle, Loader2, ToggleLeft, ToggleRight, ChevronRight, BarChart, Users2, Briefcase, CheckCircle} from 'lucide-react';


// const DashboardUsersPage = () => {
//     const [theme, setTheme] = useState('light');
//     const [isDarkMode, setIsDarkMode] = useState(false);
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

//     // Configuration de base pour Axios
//     const api = axios.create({
//         baseURL: 'http://votre-domaine.com/api', // Remplacez par l'URL de votre API Laravel
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         },
//         withCredentials: true, // Si vous utilisez des cookies d'authentification
//     });

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

//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             // Utilisez Axios pour faire une requête GET à votre API Laravel
//             const response = await api.get(`/users?page=${page}&perPage=${perPage}`); // Adaptez l'endpoint

//             // Les données de réponse de Laravel sont généralement dans un objet 'data'
//             setUsers(response.data.data);
//             setTotalUsers(response.data.meta.total); // Si votre API Laravel renvoie le total
//              // Mise à jour des stats
//             const admins = response.data.data.filter((user) => user.role === 'admin' || user.role === 'superadmin').length;
//             const regularUsers = response.data.data.filter((user) => user.role === 'user').length;
//             const technicians = response.data.data.filter((user) => user.role === 'technician').length;
//             const activeUsers = response.data.data.filter((user) => user.status === 'active').length;

//             setAdminCount(admins);
//             setUserCount(regularUsers);
//             setTechnicianCount(technicians);
//             setActiveUserCount(activeUsers);

//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Une erreur est survenue lors de la récupération des utilisateurs.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, [page, perPage]);

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

//     const handleCreateUser = async (userData) => {
//         try {
//             // Utilisez Axios pour envoyer une requête POST à votre API Laravel
//             const response = await api.post('/users', userData); // Adaptez l'endpoint

//             alert('Utilisateur créé avec succès !');
//             // setUsers([...users, response.data]); // Pas besoin, refetch la liste
//             await fetchUsers();

//         } catch (error: any) {
//             const errorMessage = error.response?.data?.message || "Failed to create user";
//             console.error('Erreur lors de la création de l’utilisateur :', errorMessage);
//             alert('Erreur lors de la création de l’utilisateur !');
//         }
//     };

//     const handleUpdateUser = async (id, updatedData) => {
//         try {
//             // Utilisez Axios pour envoyer une requête PUT/PATCH à votre API Laravel
//             const response = await api.patch(`/users/${id}`, updatedData); // Adaptez l'endpoint

//             alert('Utilisateur mis à jour avec succès !');
//              await fetchUsers();
//             // setUsers(
//             //     users.map((user) =>
//             //         user.id === id ? { ...user, ...response.data } : user
//             //     )
//             // );

//         } catch (error: any) {
//              const errorMessage = error.response?.data?.message || "Failed to update user";
//             console.error('Erreur lors de la mise à jour de l’utilisateur :', errorMessage);
//             alert('Erreur lors de la mise à jour de l’utilisateur !');
//         }
//     };

//     const handleDeleteUser = async (id) => {
//         try {
//             // Utilisez Axios pour envoyer une requête DELETE à votre API Laravel
//             await api.delete(`/users/${id}`); // Adaptez l'endpoint

//             alert('Utilisateur supprimé avec succès !');
//             setUsers(users.filter((user) => user.id !== id));
//             setTotalUsers(prev => prev - 1);

//         } catch (error: any) {
//              const errorMessage = error.response?.data?.message || "Failed to delete user";
//             console.error('Erreur lors de la suppression de l’utilisateur :', errorMessage);
//             alert('Erreur lors de la suppression de l’utilisateur !');
//         }
//     };

//       const handlePromoteToAdmin = async (id) => {
//         await handleUpdateUser(id, { role: 'admin' });
//     };

//     const handlePromoteToSuperAdmin = async (id) => {
//         await handleUpdateUser(id, { role: 'superadmin' });
//     };

//     const handleDemoteToUser = async (id) => {
//         await handleUpdateUser(id, { role: 'user' });
//     };

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
//          if (newPage >= 1 && newPage <= Math.ceil(totalUsers / perPage)) {
//             setPage(newPage);
//         }
//     };

//     const handlePerPageChange = (newPerPage) => {
//         setPerPage(newPerPage);
//         setPage(1);
//     };

//     const getRoleLabel = (role) => {
//         switch (role) {
//             case 'superadmin': return 'Super Admin';
//             case 'admin': return 'Admin';
//             case 'user': return 'Utilisateur';
//             case 'technician': return 'Technicien';
//             default: return 'Inconnu';
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

//     return (
//         <div className={cn(
//             "p-4 md:p-6 lg:p-8",
//             isDarkMode ? 'dark' : ''
//         )}>
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 lg:mb-8">
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
//                                     <TableHeader>
//                                         <TableRow>
//                                             <TableHead>Nom et Email</TableHead>
//                                             <TableHead>Rôle</TableHead>
//                                             <TableHead>Catégorie</TableHead>
//                                             <TableHead>Statut</TableHead>
//                                             <TableHead>Date de création</TableHead>
//                                             <TableHead>Actions</TableHead>
//                                         </TableRow>
//                                     </TableHeader>
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

