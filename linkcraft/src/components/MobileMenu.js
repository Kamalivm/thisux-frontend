// const MobileMenu = ({ activeTab, setActiveTab, showMobileMenu, setShowMobileMenu }) => {
//     return (
//         <>
//             {showMobileMenu && (
//                 <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10">
//                     <div className="px-4 py-2 space-y-2">
//                         <button
//                             onClick={() => {
//                                 setActiveTab('dashboard');
//                                 setShowMobileMenu(false);
//                             }}
//                             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300'
//                                 }`}
//                         >
//                             Dashboard
//                         </button>
//                         <button
//                             onClick={() => {
//                                 setActiveTab('analytics');
//                                 setShowMobileMenu(false);
//                             }}
//                             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'analytics' ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300'
//                                 }`}
//                         >
//                             Analytics
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default MobileMenu;