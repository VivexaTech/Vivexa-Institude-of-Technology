"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  collection, doc, setDoc, getDocs, deleteDoc, 
  query, orderBy, serverTimestamp 
} from "firebase/firestore";
import { 
  Lock, Mail, Eye, EyeOff, Loader2, LayoutDashboard, 
  FilePlus, Database, LogOut, CheckCircle2, AlertCircle,
  Search, Trash2, ExternalLink, Image as ImageIcon, FileText,
  Users, Award, TrendingUp, Filter
} from "lucide-react";

// --- Cloudinary Upload Helper ---
const uploadToCloudinary = async (file, resourceType = "image") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
};

// --- Animations ---
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function AdminClient() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Strict Admin Lock
      if (currentUser && currentUser.email === "admin@vivexatech.in") {
        setUser(currentUser);
      } else {
        setUser(null);
        if (currentUser) signOut(auth); // Kick out unauthorized users
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 font-sans relative overflow-hidden">
      {/* Universal Futuristic Background */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-xl border ${
              toast.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {user ? <Dashboard showToast={showToast} /> : <Login showToast={showToast} />}
    </div>
  );
}

// ==========================================
// 1. LOGIN COMPONENT
// ==========================================
function Login({ showToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email !== "admin@vivexatech.in") throw new Error("Unauthorized Email Address.");
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Access Granted. Welcome Admin.");
    } catch (error) {
      showToast(error.message || "Invalid Credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 md:p-10 rounded-[2.5rem] bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="text-center mb-10 relative z-10">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Secure Login</h1>
          <p className="text-slate-500 text-sm mt-2">Vivexa Institute of Technology</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
                placeholder="admin@vivexatech.in"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all dark:text-white"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold tracking-wide hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all active:scale-95 flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Authenticate"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ==========================================
// 2. DASHBOARD COMPONENT
// ==========================================
function Dashboard({ showToast }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "certificates"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => doc.data());
      setCertificates(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to load database.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    showToast("Logged out successfully.");
  };

  // Stats Calculations
  const stats = {
    total: certificates.length,
    verified: certificates.filter(c => c.status === "Verified").length,
    pending: certificates.filter(c => c.status === "Pending").length,
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative z-10">
      
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white/80 dark:bg-black/40 backdrop-blur-2xl border-r border-slate-200 dark:border-white/5 flex flex-col p-6 sticky top-0 md:h-screen z-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="font-black text-slate-900 dark:text-white leading-tight">Admin Portal</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Vivexa Tech</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")} icon={<LayoutDashboard size={20} />} label="Overview" />
          <SidebarButton active={activeTab === "add"} onClick={() => setActiveTab("add")} icon={<FilePlus size={20} />} label="Add Certificate" />
          <SidebarButton active={activeTab === "manage"} onClick={() => setActiveTab("manage")} icon={<Database size={20} />} label="Manage Database" />
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-bold text-sm">
          <LogOut size={20} /> Secure Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <AnimatePresence mode="wait">
          
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial="hidden" animate="visible" exit="hidden" variants={fadeUp} className="space-y-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back, admin@vivexatech.in</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <StatCard title="Total Certificates" value={stats.total} icon={<Users size={24} />} color="blue" />
                <StatCard title="Verified Issued" value={stats.verified} icon={<Award size={24} />} color="green" />
                <StatCard title="Pending Review" value={stats.pending} icon={<TrendingUp size={24} />} color="orange" />
              </div>

              {/* Quick Actions / Recent Mini Table could go here, omitting for brevity to focus on core requirements */}
            </motion.div>
          )}

          {/* ADD CERTIFICATE TAB */}
          {activeTab === "add" && (
            <motion.div key="add" initial="hidden" animate="visible" exit="hidden" variants={fadeUp}>
              <AddCertificateForm showToast={showToast} onSuccess={() => { fetchCertificates(); setActiveTab("manage"); }} />
            </motion.div>
          )}

          {/* MANAGE DATABASE TAB */}
          {activeTab === "manage" && (
            <motion.div key="manage" initial="hidden" animate="visible" exit="hidden" variants={fadeUp}>
              <ManageTable certificates={certificates} loading={loading} refresh={fetchCertificates} showToast={showToast} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Sidebar Helper ---
function SidebarButton({ active, onClick, icon, label }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
        active 
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" 
          : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      {icon} {label}
    </button>
  );
}

// --- Stat Card Helper ---
function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  };
  return (
    <div className="p-6 rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl flex items-center gap-6 shadow-xl">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white">{value}</h3>
      </div>
    </div>
  );
}

// ==========================================
// 3. ADD CERTIFICATE FORM
// ==========================================
function AddCertificateForm({ showToast, onSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    certificateId: "", studentName: "", course: "", email: "", phone: "",
    completionDate: "", issueDate: "", duration: "", grade: "", status: "Verified"
  });
  const [files, setFiles] = useState({ image: null, pdf: null });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files.image || !files.pdf) return showToast("Image and PDF are required.", "error");

    setUploading(true);
    try {
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(files.image, "image");
      
      // Note: Cloudinary expects 'raw' or 'image' for PDF depending on settings. Usually 'image' works for multi-page PDFs, but 'raw' is safer for pure document storage. We'll use 'image' as standard, but if it fails, switch to 'raw'.
      const pdfUrl = await uploadToCloudinary(files.pdf, "image");

      // 2. Save to Firestore
      const docData = {
        ...formData,
        instituteName: "Vivexa Institute of Technology",
        certificateImage: imageUrl,
        certificatePdf: pdfUrl,
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, "certificates", formData.certificateId.trim()), docData);
      
      showToast("Certificate Uploaded Successfully!");
      onSuccess();
    } catch (error) {
      console.error(error);
      showToast(error.message || "Failed to upload certificate.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Issue New Certificate</h1>
        <p className="text-slate-500">Enter student details and upload verified documents.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 p-8 rounded-[2rem] bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-2xl relative">
        {uploading && (
          <div className="absolute inset-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
            <p className="font-bold text-lg animate-pulse text-slate-900 dark:text-white">Processing & Uploading...</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Certificate ID" name="certificateId" placeholder="VIT-2026-001" required value={formData.certificateId} onChange={handleInputChange} />
          <Input label="Student Name" name="studentName" placeholder="Vivek Kumar" required value={formData.studentName} onChange={handleInputChange} />
          <Input label="Course Name" name="course" placeholder="ADCA" required value={formData.course} onChange={handleInputChange} />
          <Input label="Email Address" name="email" type="email" placeholder="student@example.com" required value={formData.email} onChange={handleInputChange} />
          <Input label="Phone Number" name="phone" placeholder="9354486861" required value={formData.phone} onChange={handleInputChange} />
          <Input label="Duration" name="duration" placeholder="12 Months" required value={formData.duration} onChange={handleInputChange} />
          <Input label="Completion Date" name="completionDate" type="date" required value={formData.completionDate} onChange={handleInputChange} />
          <Input label="Issue Date" name="issueDate" type="date" required value={formData.issueDate} onChange={handleInputChange} />
          <Input label="Grade" name="grade" placeholder="A+" required value={formData.grade} onChange={handleInputChange} />
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
            <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 focus:border-blue-500 outline-none text-slate-900 dark:text-white">
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-white/10 grid md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certificate Image (JPG/PNG)</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl hover:border-blue-500 dark:hover:border-cyan-400 transition-colors cursor-pointer bg-slate-50 dark:bg-black/20">
              <ImageIcon className="text-slate-400 mb-2" size={24} />
              <span className="text-sm font-bold text-slate-500">{files.image ? files.image.name : "Select Image File"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setFiles({...files, image: e.target.files[0]})} required />
            </label>
          </div>
          {/* PDF Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Certificate Document (PDF)</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-white/20 rounded-xl hover:border-blue-500 dark:hover:border-cyan-400 transition-colors cursor-pointer bg-slate-50 dark:bg-black/20">
              <FileText className="text-slate-400 mb-2" size={24} />
              <span className="text-sm font-bold text-slate-500">{files.pdf ? files.pdf.name : "Select PDF File"}</span>
              <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFiles({...files, pdf: e.target.files[0]})} required />
            </label>
          </div>
        </div>

        <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all active:scale-95">
          Generate & Save Certificate
        </button>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input 
        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-slate-900 dark:text-white"
        {...props}
      />
    </div>
  );
}

// ==========================================
// 4. MANAGE CERTIFICATES TABLE
// ==========================================
function ManageTable({ certificates, loading, refresh, showToast }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const handleDelete = async (id) => {
    if (!window.confirm(`Critical Warning: Are you sure you want to permanently delete certificate ${id}?`)) return;
    try {
      await deleteDoc(doc(db, "certificates", id));
      showToast("Certificate deleted successfully.");
      refresh();
    } catch (err) {
      showToast("Error deleting certificate.", "error");
    }
  };

  const filteredCerts = certificates.filter(c => {
    const matchesSearch = c.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) || c.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Certificate Database</h1>
          <p className="text-slate-500">Manage, search, and verify issued certificates.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" placeholder="Search ID or Name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm focus:border-blue-500 outline-none dark:text-white w-full sm:w-64"
            />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2.5 rounded-xl bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm outline-none dark:text-white">
            <option value="All">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-100/50 dark:bg-black/40 border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Certificate ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Student Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Course</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Issue Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredCerts.length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center text-slate-500">No certificates found.</td></tr>
                ) : (
                  filteredCerts.map((cert) => (
                    <tr key={cert.certificateId} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">{cert.certificateId}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{cert.studentName}</td>
                      <td className="px-6 py-4 text-blue-600 dark:text-cyan-400 font-bold">{cert.course}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(cert.issueDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${cert.status === 'Verified' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400'}`}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <a href={`/verify?id=${cert.certificateId}`} target="_blank" rel="noopener noreferrer" className="inline-flex p-2 rounded-lg bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-cyan-400 hover:bg-blue-100 dark:hover:bg-white/10 transition-colors">
                          <ExternalLink size={16} />
                        </a>
                        <button onClick={() => handleDelete(cert.certificateId)} className="inline-flex p-2 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}