// const AnalyticsOverview = ({ links, formatTimeAgo }) => {
//     return (
//         <div className="space-y-8">
//             <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
//                 <h2 className="text-xl font-semibold text-white mb-6">Analytics Overview</h2>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                         <h3 className="text-white font-medium">Top Performing Links</h3>
//                         {links
//                             .sort((a, b) => b.clicks - a.clicks)
//                             .slice(0, 5)
//                             .map((link, index) => (
//                                 <div key={link.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
//                                     <div className="flex items-center space-x-3">
//                                         <span className="text-purple-400 font-bold">#{index + 1}</span>
//                                         <div>
//                                             <p className="text-white font-medium truncate max-w-xs">{link.title}</p>
//                                             <p className="text-gray-400 text-sm font-mono">{link.shortUrl}</p>
//                                         </div>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="text-white font-bold">{link.clicks}</p>
//                                         <p className="text-gray-400 text-sm">clicks</p>
//                                     </div>
//                                 </div>
//                             ))}
//                     </div>

//                     <div className="space-y-4">
//                         <h3 className="text-white font-medium">Recent Activity</h3>
//                         {links
//                             .filter(link => link.lastClicked)
//                             .sort((a, b) => new Date(b.lastClicked) - new Date(a.lastClicked))
//                             .slice(0, 5)
//                             .map((link) => (
//                                 <div key={link.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
//                                     <div>
//                                         <p className="text-white font-medium truncate max-w-xs">{link.title}</p>
//                                         <p className="text-gray-400 text-sm">Last clicked {formatTimeAgo(link.lastClicked)}</p>
//                                     </div>
//                                     <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                                 </div>
//                             ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AnalyticsOverview;