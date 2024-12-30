import React, { useState } from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../utils/firebase.js'
import { addUser } from './auth.service.js';
import { useNavigate } from 'react-router-dom';

/*

TODO:
Validation


*/

interface SignUpData {
    email: string,
    password: string,
    confirmPassword: string
}
  

const SignUp: React.FC = () => {
    const [signUpData, setSignUpData] = useState<SignUpData>({email: '', password:'', confirmPassword:''});
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
        // validate the inputs
        try {
            await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password);
            if(auth.currentUser){
                await addUser({userId: auth.currentUser.uid});
                navigate('/sign-in');
            }
        } catch (error) {

        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpData({ ...signUpData, [name]: value });
    };


    return (
        <div className="flex items-center justify-center mt-20 rounded bg-gray-5">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
                    Create an Account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                    </label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    value={signUpData.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={signUpData.password}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm password
                    </label>
                    <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={signUpData.confirmPassword}
                    onChange={handleChange}
                    required
                    />
                </div>

                
                <button
                    type="submit"
                    className="w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                    Already have an account?{' '}
                    <a href="/sign-in" className="font-medium text-primary-600 hover:underline">
                    Login here
                    </a>
                </p>
                </form>
            </div>
            </div>
        </div>
    );
};

export default SignUp;
