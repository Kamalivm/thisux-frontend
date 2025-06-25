// import { Link, MousePointer, TrendingUp } from 'lucide-react';

// const StatsCards = ({ totalLinks, totalClicks }) => {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-400 text-sm">Total Links</p>
//                         <p className="text-3xl font-bold text-white">{totalLinks}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
//                         <Link className="w-6 h-6 text-blue-400" />
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-400 text-sm">Total Clicks</p>
//                         <p className="text-3xl font-bold text-white">{totalClicks}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
//                         <MousePointer className="w-6 h-6 text-green-400" />
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-gray-400 text-sm">Avg Clicks</p>
//                         <p className="text-3xl font-bold text-white">
//                             {totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0}
//                         </p>
//                     </div>
//                     <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
//                         <TrendingUp className="w-6 h-6 text-purple-400" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StatsCards;