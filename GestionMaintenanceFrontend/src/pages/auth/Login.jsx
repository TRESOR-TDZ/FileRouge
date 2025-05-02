import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import SocialButton from '../../components/Authentification/SocialAuthButton';  // On réutilise le composant créé précédemment
import {FaEnvelope, FaLock, FaEye} from 'react-icons/fa';
import {Loader2} from 'lucide-react';


const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

            // Validation simple
        if (!formData.email || !formData.password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email: formData.email,
                password: formData.password
            });
            localStorage.setItem('auth_token', response.data.token);
            // Redirection vers le dashboard
            navigate('/dashboard');
            
        } catch (error) {
            console.error('Erreur de connexion:', error.response?.data);
            console.log(error);
            // Gérer l'affichage des erreurs
            setIsLoading(false);
            setError(error.message || 'une information est erronnee');
        }
    };

    return (
    <div className="min-h-screen bg-[#1371B9] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
        {/* Section centrale  */}
        <div className="mt-2 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    <h1 className="text-start text-2xl sm:text-3xl font-bold text-[#1371B9] mb-4">Connexion</h1>
                    {error && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
                        Une information est erronée
                      </div>
                    )}
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-full:md bg-white shadow-sm gap-4">
                        <FaEnvelope />
                        <input type="email" placeholder="Adresse Email" name="email" id="email" required value={formData.email}  onChange={handleChange} className="w-full focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent" />
                    </div>

                    <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-full:md bg-white shadow-sm gap-4">
                        <FaLock/>
                        <input type="password" placeholder="Mot de passe" name="password" id="password" required className="w-full focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent" value={formData.password} onChange={handleChange} />
                        <FaEye/>
                    </div>

                    <div className="flex items-center justify-between">
                        <Link to="/forgot-password" className="text-sm text-[#1371B9] hover:text-[#4091CE]">Mot de passe oublié ?</Link>
                    </div>

                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-[#1371B9] hover:bg-[#4091CE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {isLoading ? (
                                <>
                                    <Loader2 className='animate-spin h-5 w-5 mr-2'/>
                                        Connexion...
                                </>
                            ) : 'Se connecter'} 
                        </button>
                    </div>
                </form>

                {/* Section pour les autres options */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Autres</span>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:justify-center">
                        <SocialButton provider="google" />
                        <SocialButton provider="facebook" />
                    </div>
                </div>
            </div>
        </div>

        {/* Pied de page  */}
        <div className="mt-2 text-center text-sm text-gray-500">
            <p className="mb-4 text-white">
                Vous n'avez pas un compte ?
                <Link to="/register" className="font-medium text-white hover:text-black"> S'inscrire</Link>
            </p>
            <div className="flex flex-col sm:flex-row justify-between border-t border-gray-200 pt-4">
                <p className="mb-2 text-white">Gestion Maintenances © Avril 2025</p>
                <Link to="/privacy" className="hover:text-gray-700 text-white">Politique de Confidentialité</Link>
                <Link to="/help" className="hover:text-gray-700 text-white">Aide</Link>
                <p className="mb-4- text-white">Copyright by Trésor Zigna</p>
            </div>
        </div>
    </div>

    );
};

export default Login;