import React, { useState } from 'react';
import { BlogPost, AppointmentData, PageType } from '../types';
import { 
  Lock, 
  UserCheck, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  RefreshCw,
  Search,
  Check,
  AlertTriangle,
  Building2,
  Tag,
  Sparkles,
  X
} from 'lucide-react';

interface AdminPanelProps {
  blogs: BlogPost[];
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
  onResetBlogs: () => void;
  appointments: AppointmentData[];
  onUpdateAppointmentStatus: (bookingId: string, status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled') => void;
  setCurrentPage: (page: PageType) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  blogs,
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
  onResetBlogs,
  appointments,
  onUpdateAppointmentStatus,
  setCurrentPage
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<'blogs' | 'appointments' | 'overview'>('blogs');

  // Blog CRUD Modal States
  const [isBlogModalOpen, setIsBlogModalOpen] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [previewBlog, setPreviewBlog] = useState<BlogPost | null>(null);
  const [blogSearch, setBlogSearch] = useState<string>('');

  // Blog Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Kidney Health' as BlogPost['category'],
    author: 'Dr. Navneet Sharma',
    authorRole: 'Senior Consultant Nephrologist & HOD',
    publishedAt: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    tags: 'Kidney, Nephrology, Health',
    featured: false
  });

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && (password === 'navodya123' || password === 'admin123')) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials! Use Username: admin and Password: navodya123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Open Modal for Create or Edit
  const handleOpenCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Kidney Health',
      author: 'Dr. Navneet Sharma',
      authorRole: 'Senior Consultant Nephrologist & HOD',
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      tags: 'Kidney, Nephrology, Health',
      featured: false
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      authorRole: blog.authorRole,
      publishedAt: blog.publishedAt,
      readTime: blog.readTime,
      imageUrl: blog.imageUrl,
      tags: blog.tags.join(', '),
      featured: !!blog.featured
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const slugified = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (editingBlog) {
      // Update
      const updated: BlogPost = {
        ...editingBlog,
        title: formData.title,
        slug: slugified,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        authorRole: formData.authorRole,
        publishedAt: formData.publishedAt,
        readTime: formData.readTime,
        imageUrl: formData.imageUrl,
        tags: tagsArray.length > 0 ? tagsArray : ['Health'],
        featured: formData.featured
      };
      onUpdateBlog(updated);
    } else {
      // Create
      const newBlog: BlogPost = {
        id: `blog-${Date.now()}`,
        title: formData.title,
        slug: slugified || `post-${Date.now()}`,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        author: formData.author,
        authorRole: formData.authorRole,
        publishedAt: formData.publishedAt,
        readTime: formData.readTime,
        imageUrl: formData.imageUrl,
        tags: tagsArray.length > 0 ? tagsArray : ['Health'],
        featured: formData.featured
      };
      onAddBlog(newBlog);
    }

    setIsBlogModalOpen(false);
  };

  // Filtered Blogs for Admin Table
  const filteredBlogs = blogs.filter(
    b => b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
         b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
         b.author.toLowerCase().includes(blogSearch.toLowerCase())
  );

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl space-y-6 text-center">
          
          <div className="w-16 h-16 bg-sky-100 text-sky-800 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900">Hospital Admin Portal</h1>
            <p className="text-xs text-slate-500">
              Authorized access for Navodya Hospital Content & Appointment Desk
            </p>
          </div>

          {/* Quick Demo Credentials Badge */}
          <div className="bg-sky-50 border border-sky-200 p-3 rounded-2xl text-left text-xs space-y-1">
            <span className="font-extrabold text-sky-900 block text-[11px] uppercase tracking-wider">
              🔑 Demo Admin Credentials
            </span>
            <div className="text-slate-700 font-mono text-[11px] space-y-0.5">
              <div>Username: <strong className="text-slate-900">admin</strong></div>
              <div>Password: <strong className="text-slate-900">navodya123</strong></div>
            </div>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Username</label>
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow transition-colors"
            >
              Log In to Admin Console
            </button>
          </form>

        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-sky-500/20 text-sky-300 rounded-2xl border border-sky-400/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Active Session
              </span>
              <span className="text-xs text-sky-200">Logged in as Administrator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">Navodya Hospital Admin Control Panel</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('blogs')}
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-sky-300" />
            <span>View Live Blog</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === 'blogs'
              ? 'bg-sky-600 text-white shadow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Manage Blogs ({blogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === 'appointments'
              ? 'bg-sky-600 text-white shadow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments ({appointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === 'overview'
              ? 'bg-sky-600 text-white shadow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>System Status</span>
        </button>
      </div>

      {/* ================= TAB 1: BLOGS CRUD MANAGEMENT ================= */}
      {activeTab === 'blogs' && (
        <div className="space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Blog Posts & Clinical Publications</h2>
                <p className="text-xs text-slate-500">
                  Create, edit, delete or restore medical blog articles displayed to patients.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onResetBlogs}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                  title="Restore default sample blogs"
                >
                  <RefreshCw className="w-4 h-4 text-sky-700" />
                  <span>Restore Defaults</span>
                </button>

                <button
                  onClick={handleOpenCreateModal}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Blog Article</span>
                </button>
              </div>
            </div>

            {/* Filter / Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles by title, category, author..."
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Blogs Data Table */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Article</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Published</th>
                    <th className="p-4 text-center">Featured</th>
                    <th className="p-4 text-right">CRUD Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBlogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                        No blog posts match search query. Click "Create New Blog Article" to add one!
                      </td>
                    </tr>
                  ) : (
                    filteredBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                            />
                            <div>
                              <strong className="block text-slate-900 text-sm line-clamp-1">{blog.title}</strong>
                              <span className="text-[11px] text-slate-400 line-clamp-1">{blog.excerpt}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <span className="bg-sky-100 text-sky-800 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">
                            {blog.category}
                          </span>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <strong className="text-slate-900 block">{blog.author}</strong>
                          <span className="text-[10px] text-slate-400">{blog.readTime}</span>
                        </td>

                        <td className="p-4 whitespace-nowrap font-mono text-[11px]">
                          {blog.publishedAt}
                        </td>

                        <td className="p-4 text-center whitespace-nowrap">
                          {blog.featured ? (
                            <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                              Yes
                            </span>
                          ) : (
                            <span className="text-slate-300 text-[10px]">No</span>
                          )}
                        </td>

                        <td className="p-4 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => setPreviewBlog(blog)}
                            className="p-1.5 bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-800 rounded-lg transition-colors"
                            title="Preview Article"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEditModal(blog)}
                            className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-900 rounded-lg transition-colors"
                            title="Edit Article"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onDeleteBlog(blog.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-800 rounded-lg transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 2: APPOINTMENTS MANAGEMENT ================= */}
      {activeTab === 'appointments' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Hospital Patient Appointments</h2>
              <p className="text-xs text-slate-500">
                View and manage patient OPD consultation bookings and emergency requests.
              </p>
            </div>
            <span className="text-xs font-black bg-sky-100 text-sky-800 px-3 py-1 rounded-full">
              {appointments.length} Total Bookings
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Doctor & Dept</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((apt) => (
                  <tr key={apt.bookingId} className="hover:bg-slate-50/80">
                    <td className="p-3 font-mono font-bold text-sky-800">{apt.bookingId}</td>
                    <td className="p-3">
                      <strong className="text-slate-900 block">{apt.patientName} ({apt.patientAge}y)</strong>
                      <span className="text-[10px] text-slate-400">{apt.patientPhone}</span>
                    </td>
                    <td className="p-3">
                      <strong className="text-slate-900 block">{apt.doctorName}</strong>
                      <span className="text-[10px] text-slate-500">{apt.departmentName}</span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-bold">{apt.date}</div>
                      <span className="text-[10px] text-rose-600 font-semibold">{apt.timeSlot}</span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                        apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        apt.status === 'Completed' ? 'bg-sky-100 text-sky-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.bookingId, 'Confirmed')}
                        className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-emerald-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.bookingId, 'Completed')}
                        className="bg-sky-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-sky-700"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => onUpdateAppointmentStatus(apt.bookingId, 'Cancelled')}
                        className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2.5 py-1 rounded-lg hover:bg-rose-200"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SYSTEM OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-sky-700 uppercase">24x7 Dialysis Bed Occupancy</span>
            <div className="text-3xl font-black text-slate-900">36 / 40 Beds</div>
            <p className="text-xs text-slate-500">90% Capacity running under high-flux double pass RO plant.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-emerald-700 uppercase">Total Published Blogs</span>
            <div className="text-3xl font-black text-slate-900">{blogs.length} Articles</div>
            <p className="text-xs text-slate-500">Live on hospital website for patient education.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-xs font-bold text-indigo-700 uppercase">Emergency ICU Ready</span>
            <div className="text-3xl font-black text-slate-900">24/7 Operational</div>
            <p className="text-xs text-slate-500">3 Transplant ICUs and 15 Cardiac ICU Beds available.</p>
          </div>
        </div>
      )}

      {/* ================= BLOG CREATE / EDIT MODAL ================= */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-6 max-h-[90vh] overflow-y-auto animate-scaleUp">
            
            <button
              onClick={() => setIsBlogModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-black uppercase text-sky-700 bg-sky-100 px-2.5 py-1 rounded">
                CRUD OPERATION
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {editingBlog ? 'Edit Blog Article' : 'Create New Blog Article'}
              </h3>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Crucial Warning Signs of Kidney Disease"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Kidney Health">Kidney Health</option>
                    <option value="Dialysis Care">Dialysis Care</option>
                    <option value="Transplant">Transplant</option>
                    <option value="Diet & Nutrition">Diet & Nutrition</option>
                    <option value="Medical Innovations">Medical Innovations</option>
                    <option value="Preventive Care">Preventive Care</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Read Time *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 4 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Navneet Sharma"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Consultant Nephrologist"
                    value={formData.authorRole}
                    onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt (Summary) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief summary displayed on article cards..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Content *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write clinical content, markdown headings (###) or formatted text..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="CKD, Nephrology, Diet, Laser"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded"
                />
                <label htmlFor="featured" className="font-bold text-slate-800">
                  Mark as Featured Article (Highlighted at top of blog)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold shadow"
                >
                  {editingBlog ? 'Save Changes' : 'Publish Blog Post'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* PREVIEW ARTICLE MODAL */}
      {previewBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setPreviewBlog(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="bg-sky-100 text-sky-800 text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
              {previewBlog.category}
            </span>
            <h3 className="text-2xl font-black text-slate-900">{previewBlog.title}</h3>
            <p className="text-xs text-slate-500">By {previewBlog.author} • {previewBlog.publishedAt}</p>

            <img
              src={previewBlog.imageUrl}
              alt={previewBlog.title}
              className="w-full h-48 object-cover rounded-xl border"
            />

            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
              {previewBlog.content}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
