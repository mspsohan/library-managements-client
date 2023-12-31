import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const SocialLogin = () => {
	const { googleLogin } = useAuth();
	const navigate = useNavigate();
	const handleGoogleLogin = () => {
		googleLogin()
			.then(() => {
				toast.success('Successfully Sign in With Google');
				navigate('/');
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
	return (
		<div>
			<button
				onClick={handleGoogleLogin}
				className="flex w-full max-w-xs mx-auto mt-2 items-center justify-center rounded-[20px] border-2 border-[#ff4b2b] hover:bg-[#ff4b2b] text-[14px] font-bold py-1  uppercase transition ease-in 80ms hover:text-white">
				<span className="border-2 p-1 text-xl bg-white rounded-full mr-5">
					<FcGoogle />
				</span>
				Sign in With Google
			</button>
		</div>
	);
};

export default SocialLogin;
