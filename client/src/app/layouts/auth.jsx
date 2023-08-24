import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackHistoryButton from '../components/common/backButton';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';

const Auth = () => {
	const { type } = useParams();
	const [formType, setFormType] = useState(
		type === 'register' ? type : 'login'
	);
	const toggleFormType = () => {
		setFormType((prevState) =>
			prevState === 'register' ? 'login' : 'register'
		);
	};
	return (
		<>
			<BackHistoryButton />
			<div className="flex flex-col items-center mt-8">
				{formType === 'register' ? (
					<>
						<RegisterForm />
						<p className="mt-4">
							Уже зарегистрированы?
							<a role="button" onClick={toggleFormType} className="ml-1">
								Войдите
							</a>
						</p>
					</>
				) : (
					<>
						<LoginForm />
						<p className="mt-4">
							Ещё нет аккаунта?
							<a role="button" onClick={toggleFormType} className="ml-1">
								Зарегистрируйтесь
							</a>
						</p>
					</>
				)}
			</div>
		</>
	);
};

export default Auth;
