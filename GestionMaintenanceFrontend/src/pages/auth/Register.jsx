import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SocialButton from '../../components/Authentification/SocialAuthButton';
import imageregister from '../../assets/imageregister.png';
import {FaEnvelope, FaUser,  FaLock, FaEye} from 'react-icons/fa';
import {Loader2} from 'lucide-react';

// FaPhone

// import SocialButton from '../../components/authentification/SocialAuthButton';
const Register = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // phone: '',
        password: '',
        password_confirmation: '',
        acceptTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name: formData.name,
                email: formData.email,
                // phone: formData.phone,  Assure-toi que ce champ existe dans ton backend
                password: formData.password,
                password_confirmation: formData.password_confirmation
            });
            console.log('Inscription réussie:', response);
            // Redirection vers la page de connexion ou dashboard
            navigate('/login');
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error.response?.data);
            setIsLoading(false);
        }
    };

   
    

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white shadow-lg flex overflow-hidden max-w-8xl w-full">
                {/* Illustration à gauche */}
                <div className="hidden md:flex items-center justify-center ">
                    <img src={imageregister} alt="image register" className="max-w-full6" />
                </div>
        
                {/* Formulaire à droite */}
                <div className="w-full md:w-1/2  sm:p-12 h-full">
                    <h1 className="text-3xl font-bold text-[#1371B9] text-center mb-2">S'inscrire</h1>
                    <p className="text-center text-gray-600 mb-6">Hey, entrez les détails pour la création de votre compte</p>
            
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-full:md bg-white shadow-sm gap-4">
                            <FaEnvelope />
                            <input type="email" placeholder="Entre Votre Adresse email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent" />
                        </div>

                        <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-full:md bg-white shadow-sm gap-4">
                            <FaUser/>
                            <input type="text" placeholder="Nom et Prénom" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent" />
                        </div>

                        {/* <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-full:md bg-white shadow-sm gap-4">
                            <FaPhone/>
                            <input type="tel" placeholder="Numéro de téléphone" name="phone" id="phone" required value={formData.phone} onChange={handleChange} className="w-full focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent" />
                        </div> */}

                        <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-full:md bg-white shadow-sm gap-4">
                            <FaLock/>
                            <input type= "text" placeholder="Créer un mot de passe" name="password" id="password" required value={formData.password} onChange={handleChange} className="w-full focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent" />  
                        </div>

                        <div className="flex items-center border border-gray-500 rounded-lg px-3 py-2 w-full max-w-full:md bg-white shadow-sm gap-4">
                            <FaLock/>
                            <input type="password" placeholder="confirmer votre  mot de passe" name="password_confirmation" id="password_confirmation" required value={formData.password_confirmation} onChange={handleChange} className="w-full focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent" />
                            <FaEye/>
                        </div>
                
                        <div className="flex items-center">
                            <input type="checkbox" name="acceptTerms" id="acceptTerms" required checked={formData.acceptTerms} onChange={handleChange} className="h-4 w-4 text-[#1371B9] border-gray-300 rounded" />
                            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-700">
                            En créant ce compte, j'accepte les conditions générales et la politique de confidentialité.
                            </label>
                        </div>
                
                        <button type="submit" className="w-full bg-[#1371B9] text-white py-2 px-2 rounded-md hover:bg-[#4091CE] transition"> 
                            {isLoading ? (
                                <>
                                    <Loader2 className='animate-spin h-5 w-5 mr-2'/>
                                    Inscription...
                                </>
                            ) : 'S\'inscrire'}
                        </button>
                    </form>
            
                    <div className="mt-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">S'inscrire avec</span>
                            </div>
                        </div>
                
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <SocialButton provider="google" />
                            <SocialButton provider="facebook" />
                        </div>
                        
                
                        <div className="mt-2 text-center">
                            <p className="text-sm text-gray-600">
                                Vous avez déjà un compte ?
                                <Link to="/login" className="ml-1 text-[#1371B9] hover:text-[#4091CE] font-medium">Connexion</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
    
};

export default Register;