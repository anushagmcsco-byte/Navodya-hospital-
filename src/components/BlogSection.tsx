import React, { useState } from 'react';
import { BlogPost, PageType } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Tag, 
  Share2, 
  X, 
  ArrowRight, 
  Check,
  Stethoscope,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface BlogSectionProps {
  blogs: BlogPost[];
  onBookAppointment?: (doctorId?: string, departmentId?: string) => void;
  setCurrentPage?: (page: PageType) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ 
  blogs, 
  onBookAppointment,
  setCurrentPage 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    'All',
    'Kidney Health',
    'Dialysis Care',
    'Diet & Nutrition',
    'Medical Innovations',
    'Preventive Care'
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs.find(b => b.featured) || blogs[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-12">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Medical Blogs & Clinical Insights
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Kidney Care & Health Publications
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Stay informed with evidence-based articles authored by Navodya Hospital's senior nephrologists, transplant surgeons, and renal dietitians.
        </p>
      </div>

      {/* Featured Blog Hero Banner (if available and no active search) */}
      {featuredBlog && !searchQuery && selectedCategory === 'All' && (
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-rose-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Featured Publication
                </span>
                <span className="text-sky-300 text-xs font-bold">{featuredBlog.category}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white hover:text-sky-200 transition-colors">
                {featuredBlog.title}
              </h2>

              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed line-clamp-3">
                {featuredBlog.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 font-semibold">
                  <User className="w-4 h-4 text-sky-400" />
                  <span>{featuredBlog.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>{featuredBlog.publishedAt}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span>{featuredBlog.readTime}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveArticle(featuredBlog)}
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>Read Full Featured Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <img
                src={featuredBlog.imageUrl}
                alt={featuredBlog.title}
                className="w-full h-64 sm:h-72 object-cover rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>

          </div>
        </div>
      )}

      {/* Search & Category Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by topic, keyword, or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            Showing <strong className="text-slate-900">{filteredBlogs.length}</strong> publication{filteredBlogs.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No blog articles found</h3>
          <p className="text-xs text-slate-500">
            Try resetting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 bg-sky-100 text-sky-800 hover:bg-sky-200 font-bold px-4 py-2 rounded-xl text-xs"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-sky-300"
            >
              <div>
                {/* Image & Category Overlay */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                    {blog.category}
                  </span>
                  {blog.featured && (
                    <span className="absolute top-3 right-3 bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      {blog.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActiveArticle(blog)}
                    className="font-black text-slate-900 text-base leading-snug hover:text-sky-700 cursor-pointer transition-colors line-clamp-2"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>

                  {/* Author line */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-600" />
                      {blog.author}
                    </span>
                    <span className="text-[10px] text-slate-400">{blog.authorRole.split('&')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Read More */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setActiveArticle(blog)}
                  className="w-full bg-slate-50 hover:bg-sky-50 text-slate-800 hover:text-sky-800 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 hover:border-sky-300 transition-colors"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 text-sky-600" />
                </button>
              </div>

            </article>
          ))}
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-10 relative space-y-6 max-h-[90vh] overflow-y-auto animate-scaleUp">
            
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 p-2 rounded-full transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-4 border-b border-slate-100 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-sky-100 text-sky-800 text-xs font-black px-3 py-0.5 rounded-full uppercase">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400">• {activeArticle.publishedAt}</span>
                <span className="text-xs text-slate-400">• {activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {activeArticle.title}
              </h2>

              {/* Author Badge */}
              <div className="flex items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-700 text-white font-black flex items-center justify-center text-base">
                    {activeArticle.author.charAt(3) || 'D'}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{activeArticle.author}</h4>
                    <p className="text-xs text-slate-500">{activeArticle.authorRole}</p>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <img
              src={activeArticle.imageUrl}
              alt={activeArticle.title}
              className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-slate-200"
            />

            {/* Content Body */}
            <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {activeArticle.content}
            </div>

            {/* Tags */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {activeArticle.tags.map((tag, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Specialist Appointment CTA Box */}
            <div className="bg-gradient-to-r from-sky-900 to-indigo-900 text-white p-6 sm:p-8 rounded-2xl space-y-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-extrabold text-lg flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-sky-300" />
                  <span>Consult Navodya Specialist Doctors</span>
                </h4>
                <p className="text-xs text-sky-200 max-w-md">
                  Have questions regarding your kidney health or creatinine reports? Book a priority consultation today.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveArticle(null);
                  if (onBookAppointment) {
                    onBookAppointment('doc-1', 'nephrology');
                  }
                }}
                className="bg-white text-slate-900 hover:bg-sky-50 font-black text-xs px-5 py-3 rounded-xl uppercase tracking-wider shadow whitespace-nowrap"
              >
                Book Consultation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
