import React, { useState } from 'react';

const Adresse = () => {
    const [formData, setFormData] = useState({
        client: '', // Correspond à client dans le formulaire
        phone: '',  // Correspond à phone dans le formulaire
        city: '',   // Correspond à city dans le formulaire
        address: '', // Correspond à address dans le formulaire
    });

    const [errors, setErrors] = useState({
        client: '',
        phone: '',
        city: '',
        address: '',
    });

    const villesTunisiennes = [
        "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia", "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Médenine", "Tataouine", "Gafsa", "Tozeur", "Kébili"
    ];

    const validateClient = () => {
        if (!formData.client) {
            setErrors(prevErrors => ({
                ...prevErrors,
                client: 'Veuillez saisir votre nom et prénom.'
            }));
            return false;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            client: ''
        }));
        return true;
    };

    const validatePhone = () => {
        const phoneNumberPattern = /^(\+216)?\d{8}$/;
        if (!formData.phone || !phoneNumberPattern.test(formData.phone)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                phone: 'Veuillez saisir un numéro de téléphone valide (+216XXXXXXXX).'
            }));
            return false;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            phone: ''
        }));
        return true;
    };

    const validateCity = () => {
        if (!formData.city) {
            setErrors(prevErrors => ({
                ...prevErrors,
                city: 'Veuillez sélectionner une ville.'
            }));
            return false;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            city: ''
        }));
        return true;
    };

    const validateAddress = () => {
        if (!formData.address) {
            setErrors(prevErrors => ({
                ...prevErrors,
                address: 'Veuillez saisir votre adresse.'
            }));
            return false;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            address: ''
        }));
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isClientValid = validateClient();
        const isPhoneValid = validatePhone();
        const isCityValid = validateCity();
        const isAddressValid = validateAddress();

        if (isClientValid && isPhoneValid && isCityValid && isAddressValid) {
            // Toutes les validations sont réussies, soumettre le formulaire
            console.log('Formulaire soumis:', formData);
        } else {
            // Afficher un message d'erreur global ou effectuer une action en conséquence
            console.log('Le formulaire contient des erreurs. Veuillez corriger les champs.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-4 text-center">Remplir vos informations</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Nom et Prénom:</label>
                        <input type="text" name="client" id="client" value={formData.client} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        {errors.client && <p className="text-red-500 text-sm mt-1">{errors.client}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone:</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="+216XXXXXXXX" />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville:</label>
                        <select name="city" id="city" value={formData.city} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Sélectionner une ville</option>
                            {villesTunisiennes.map((ville, index) => (
                                <option key={index} value={ville}>{ville}</option>
                            ))}
                        </select>
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse Exacte:</label>
                        <textarea name="address" id="address" value={formData.address} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows="3"></textarea>
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                    <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 w-full">Soumettre</button>
                </form>
            </div>
        </div>
    );
}

export default Adresse;
