// import { useState } from 'react';
// import { Link2 } from 'lucide-react';

// const AuthScreen = ({ onLogin, onSignup, isLoading }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: 'demo@linkcraft.com',
//     password: 'demo123',
//     name: ''
//   });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       if (isLogin) {
//         const result = await onLogin(formData.email, formData.password);
//         if (!result.success) {
//           setError(result.error);
//         }
//       } else {
//         if (!formData.name.trim()) {
//           setError('Name is required');
//           return;
//         }
//         const result = await onSignup(formData.email, formData.password, formData.name);
//         if (!result.success) {
//           setError(result.error);
//         }
//       }
//     } catch (err) {
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setError('');
//     if (!isLogin) {
//       setFormData({
//         email: 'demo@linkcraft.com',
//         password: 'demo123',
//         name: ''
//       });
//     } else {
//       setFormData({
//         email: '',
//         password: '',
//         name: ''
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//       <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/10">
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//             <Link2 className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//             LinkCraft
//           </h1>
//           <p className="text-gray-400">
//             {isLogin ? 'Welcome back!' : 'Create your account'}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//                 placeholder="John Doe"
//                 required={!isLogin}
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//               placeholder="you@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           {error && (
//             <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//           >
//             {isLoading ? (
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
//               </div>
//             ) : (
//               <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
//             )}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <button
//             onClick={toggleMode}
//             disabled={isLoading}
//             className="text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
//           >
//             {isLogin
//               ? "Don't have an account? Sign up"
//               : "Already have an account? Sign in"
//             }
//           </button>
//         </div>

//         {isLogin && (
//           <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
//             <p className="text-blue-300 text-sm text-center">
//               Demo credentials are pre-filled. Just click "Sign In" to continue!
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthScreen;