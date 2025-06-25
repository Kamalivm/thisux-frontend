// import { X } from 'lucide-react';

// const CreateEditLinkModal = ({ showCreateModal, setShowCreateModal, formData, setFormData, editingLink, setEditingLink, createLink }) => {
//   return (
//     <>
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-white/10">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-white">
//                 {editingLink ? 'Edit Link' : 'Create New Link'}
//               </h3>
//               <button
//                 onClick={() => {
//                   setShowCreateModal(false);
//                   setEditingLink(null);
//                   setFormData({ originalUrl: '', customSlug: '', title: '' });
//                 }}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Original URL *
//                 </label>
//                 <input
//                   type="url"
//                   value={formData.originalUrl}
//                   onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
//                   placeholder="https://example.com/very-long-url"
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   placeholder="Link title (optional)"
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Custom Slug (optional)
//                 </label>
//                 <div className="flex items-center">
//                   <span className="text-gray-400 text-sm mr-2">lnkc.rf/</span>
//                   <input
//                     type="text"
//                     value={formData.customSlug}
//                     onChange={(e) => setFormData({ ...formData, customSlug: e.target.value })}
//                     placeholder="custom-slug"
//                     className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
//                   />
//                 </div>
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowCreateModal(false);
//                     setEditingLink(null);
//                     setFormData({ originalUrl: '', customSlug: '', title: '' });
//                   }}
//                   className="flex-1 px-4 py-3 text-gray-300 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={createLink}
//                   disabled={!formData.originalUrl}
//                   className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {editingLink ? 'Update' : 'Create'} Link
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreateEditLinkModal;