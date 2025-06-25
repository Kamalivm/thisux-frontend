// import { Link2, Copy, ExternalLink, Edit3, Trash2 } from 'lucide-react';

// const LinksList = ({ links, copyToClipboard, simulateClick, formatDate, formatTimeAgo, setEditingLink, setFormData, setShowCreateModal, deleteLink }) => {
//     return (
//         <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
//             <div className="p-6 border-b border-white/10">
//                 <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold text-white">Your Links</h2>
//                     <span className="text-gray-400 text-sm">{links.length} links</span>
//                 </div>
//             </div>

//             <div className="divide-y divide-white/10">
//                 {links.map((link) => (
//                     <div key={link.id} className="p-6 hover:bg-white/5 transition-colors">
//                         <div className="flex items-start justify-between space-x-4">
//                             <div className="flex-1 min-w-0">
//                                 <div className="flex items-center space-x-3 mb-2">
//                                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
//                                         <Link2 className="w-4 h-4 text-white" />
//                                     </div>
//                                     <h3 className="text-white font-medium truncate">{link.title}</h3>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <div className="flex items-center space-x-2">
//                                         <button
//                                             onClick={() => copyToClipboard(`https://${link.shortUrl}`)}
//                                             className="text-purple-400 hover:text-purple-300 font-mono text-sm bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20 hover:border-purple-500/40 transition-colors flex items-center space-x-1"
//                                         >
//                                             <span>{link.shortUrl}</span>
//                                             <Copy className="w-3 h-3" />
//                                         </button>
//                                         <button
//                                             onClick={() => simulateClick(link.id)}
//                                             className="text-blue-400 hover:text-blue-300 transition-colors"
//                                         >
//                                             <ExternalLink className="w-4 h-4" />
//                                         </button>
//                                     </div>

//                                     <div className="flex items-center space-x-4 text-sm text-gray-400">
//                                         <span className="truncate max-w-xs">{link.originalUrl}</span>
//                                         <span>•</span>
//                                         <span className="flex items-center space-x-1">
//                                             <Eye className="w-3 h-3" />
//                                             <span>{link.clicks} clicks</span>
//                                         </span>
//                                         <span>•</span>
//                                         <span>{formatDate(link.createdAt)}</span>
//                                     </div>

//                                     <div className="text-xs text-gray-500">
//                                         Last clicked: {formatTimeAgo(link.lastClicked)}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex items-center space-x-2 flex-shrink-0">
//                                 <button
//                                     onClick={() => {
//                                         setEditingLink(link);
//                                         setFormData({
//                                             originalUrl: link.originalUrl,
//                                             customSlug: link.customSlug,
//                                             title: link.title
//                                         });
//                                         setShowCreateModal(true);
//                                     }}
//                                     className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
//                                 >
//                                     <Edit3 className="w-4 h-4" />
//                                 </button>
//                                 <button
//                                     onClick={() => deleteLink(link.id)}
//                                     className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
//                                 >
//                                     <Trash2 className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {links.length === 0 && (
//                     <div className="p-12 text-center">
//                         <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//                             <Link2 className="w-8 h-8 text-gray-400" />
//                         </div>
//                         <h3 className="text-white font-medium mb-2">No links yet</h3>
//                         <p className="text-gray-400 mb-6">Create your first shortened link to get started</p>
//                         <button
//                             onClick={() => setShowCreateModal(true)}
//                             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
//                         >
//                             Create Link
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default LinksList;