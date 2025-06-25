// import { Link2, Plus, User, LogOut, Menu, X } from 'lucide-react';

// const Header = ({ activeTab, setActiveTab, setShowCreateModal, currentUser, handleLogout, showMobileMenu, setShowMobileMenu }) => {
//   return (
//     <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <Link2 className="w-4 h-4 text-white" />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 LinkCraft
//               </span>
//             </div>
//           </div>

//           <nav className="hidden md:flex space-x-8">
//             <button
//               onClick={() => setActiveTab('dashboard')}
//               className={`px-3 py-2 rounded-lg transition-all ${
//                 activeTab === 'dashboard'
//                   ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
//                   : 'text-gray-300 hover:text-white hover:bg-white/5'
//               }`}
//             >
//               Dashboard
//             </button>
//             <button
//               onClick={() => setActiveTab('analytics')}
//               className={`px-3 py-2 rounded-lg transition-all ${
//                 activeTab === 'analytics'
//                   ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
//                   : 'text-gray-300 hover:text-white hover:bg-white/5'
//               }`}
//             >
//               Analytics
//             </button>
//           </nav>

//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center space-x-2"
//             >
//               <Plus className="w-4 h-4" />
//               <span className="hidden sm:inline">New Link</span>
//             </button>
            
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
//                 <User className="w-4 h-4 text-white" />
//               </div>
//               <span className="hidden sm:inline text-gray-300">{currentUser.name}</span>
//             </div>

//             <button
//               onClick={handleLogout}
//               className="text-gray-400 hover:text-white transition-colors"
//             >
//               <LogOut className="w-5 h-5" />
//             </button>

//             <button
//               onClick={() => setShowMobileMenu(!showMobileMenu)}
//               className="md:hidden text-gray-400 hover:text-white"
//             >
//               {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;