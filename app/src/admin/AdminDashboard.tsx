import { useState } from 'react';
import { useAdminStore, type Booking } from '../store/adminStore';
import {
  LayoutDashboard,
  Package as PackageIcon,
  MapPin,
  MessageSquare,
  Calendar,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Star,
  Search,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Tab = 'dashboard' | 'packages' | 'destinations' | 'testimonials' | 'bookings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'package' | 'destination' | 'testimonial' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    adminUser,
    logout,
    packages,
    destinations,
    testimonials,
    bookings,
    deletePackage,
    deleteDestination,
    deleteTestimonial,
    updateBookingStatus,
    deleteBooking,
  } = useAdminStore();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const openModal = (type: 'package' | 'destination' | 'testimonial', item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setEditingItem(null);
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'confirmed':
        return 'bg-green-500/20 text-green-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] p-6">
          <div className="flex items-center justify-between mb-4">
            <PackageIcon size={24} className="text-[#D4A23A]" />
            <span className="text-2xl font-bold text-[#F4F1EA]">{packages.length}</span>
          </div>
          <p className="text-[#B7C0B3] text-sm">Total Packages</p>
        </div>

        <div className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] p-6">
          <div className="flex items-center justify-between mb-4">
            <MapPin size={24} className="text-[#D4A23A]" />
            <span className="text-2xl font-bold text-[#F4F1EA]">{destinations.length}</span>
          </div>
          <p className="text-[#B7C0B3] text-sm">Destinations</p>
        </div>

        <div className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] p-6">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare size={24} className="text-[#D4A23A]" />
            <span className="text-2xl font-bold text-[#F4F1EA]">{testimonials.length}</span>
          </div>
          <p className="text-[#B7C0B3] text-sm">Testimonials</p>
        </div>

        <div className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar size={24} className="text-[#D4A23A]" />
            <span className="text-2xl font-bold text-[#F4F1EA]">{bookings.length}</span>
          </div>
          <p className="text-[#B7C0B3] text-sm">Bookings</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#122C26] border border-[rgba(244,241,234,0.12)]">
        <div className="p-6 border-b border-[rgba(244,241,234,0.12)]">
          <h3 className="font-display font-bold text-[#F4F1EA] text-lg">Recent Bookings</h3>
        </div>
        <div className="p-6">
          {bookings.length === 0 ? (
            <p className="text-[#B7C0B3] text-center py-8">No bookings yet</p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-[#0B0F0D] border border-[rgba(244,241,234,0.08)]"
                >
                  <div>
                    <p className="text-[#F4F1EA] font-medium">{booking.name}</p>
                    <p className="text-[#B7C0B3] text-sm">{booking.tripType}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPackages = () => {
    const filtered = packages.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B7C0B3]" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 w-full sm:w-80"
            />
          </div>
          <button
            onClick={() => openModal('package')}
            className="btn-filled flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Package
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] overflow-hidden group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {pkg.featured && (
                  <span className="absolute top-3 left-3 bg-[#D4A23A] text-[#0B0F0D] text-xs font-bold px-2 py-1">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="label-mono text-[#D4A23A]">{pkg.category}</span>
                  <span className="text-[#B7C0B3] text-sm">{pkg.duration}</span>
                </div>
                <h4 className="font-display font-bold text-[#F4F1EA] mb-2">{pkg.title}</h4>
                <p className="text-[#B7C0B3] text-sm line-clamp-2 mb-4">{pkg.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4A23A] font-bold">{pkg.price}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal('package', pkg)}
                      className="p-2 text-[#B7C0B3] hover:text-[#D4A23A] transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deletePackage(pkg.id)}
                      className="p-2 text-[#B7C0B3] hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDestinations = () => {
    const filtered = destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B7C0B3]" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 w-full sm:w-80"
            />
          </div>
          <button
            onClick={() => openModal('destination')}
            className="btn-filled flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Destination
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] overflow-hidden group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {dest.featured && (
                  <span className="absolute top-3 left-3 bg-[#D4A23A] text-[#0B0F0D] text-xs font-bold px-2 py-1">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="label-mono text-[#D4A23A]">{dest.category}</span>
                  <span className="text-[#B7C0B3] text-sm">{dest.duration}</span>
                </div>
                <h4 className="font-display font-bold text-[#F4F1EA] mb-2">{dest.name}</h4>
                <p className="text-[#B7C0B3] text-sm line-clamp-2 mb-4">{dest.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="text-xs bg-[#0B0F0D] text-[#B7C0B3] px-2 py-1">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openModal('destination', dest)}
                    className="p-2 text-[#B7C0B3] hover:text-[#D4A23A] transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteDestination(dest.id)}
                    className="p-2 text-[#B7C0B3] hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTestimonials = () => {
    const filtered = testimonials.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.trip.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B7C0B3]" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 w-full sm:w-80"
            />
          </div>
          <button
            onClick={() => openModal('testimonial')}
            className="btn-filled flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Testimonial
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? 'text-[#D4A23A] fill-[#D4A23A]' : 'text-[#B7C0B3]'}
                  />
                ))}
              </div>
              <p className="text-[#F4F1EA] text-sm mb-4 line-clamp-4">{testimonial.text}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#F4F1EA] font-medium">{testimonial.name}</p>
                  <p className="text-[#B7C0B3] text-sm">{testimonial.trip}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal('testimonial', testimonial)}
                    className="p-2 text-[#B7C0B3] hover:text-[#D4A23A] transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial.id)}
                    className="p-2 text-[#B7C0B3] hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBookings = () => {
    const filtered = bookings.filter(
      (b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B7C0B3]" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 w-full sm:w-80"
          />
        </div>

        <div className="bg-[#122C26] border border-[rgba(244,241,234,0.12)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(244,241,234,0.12)]">
                  <th className="text-left p-4 text-[#B7C0B3] label-mono">NAME</th>
                  <th className="text-left p-4 text-[#B7C0B3] label-mono">EMAIL</th>
                  <th className="text-left p-4 text-[#B7C0B3] label-mono">TRIP TYPE</th>
                  <th className="text-left p-4 text-[#B7C0B3] label-mono">MONTH</th>
                  <th className="text-left p-4 text-[#B7C0B3] label-mono">STATUS</th>
                  <th className="text-left p-4 text-[#B7C0B3] label-mono">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#B7C0B3]">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filtered.map((booking) => (
                    <tr key={booking.id} className="border-b border-[rgba(244,241,234,0.08)]">
                      <td className="p-4 text-[#F4F1EA]">{booking.name}</td>
                      <td className="p-4 text-[#B7C0B3]">{booking.email}</td>
                      <td className="p-4 text-[#B7C0B3]">{booking.tripType}</td>
                      <td className="p-4 text-[#B7C0B3]">{booking.travelMonth}</td>
                      <td className="p-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value as Booking['status'])}
                          className={`text-xs px-3 py-1 rounded-full border-0 ${getStatusColor(booking.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="p-2 text-[#B7C0B3] hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
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
    );
  };

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'packages' as Tab, label: 'Packages', icon: PackageIcon },
    { id: 'destinations' as Tab, label: 'Destinations', icon: MapPin },
    { id: 'testimonials' as Tab, label: 'Testimonials', icon: MessageSquare },
    { id: 'bookings' as Tab, label: 'Bookings', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F0D] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#122C26] border-r border-[rgba(244,241,234,0.12)] hidden lg:block">
        <div className="p-6 border-b border-[rgba(244,241,234,0.12)]">
          <h1 className="font-display font-bold text-[#F4F1EA] text-xl">Triple Lions</h1>
          <p className="text-[#B7C0B3] text-sm">Admin Panel</p>
        </div>

        <nav className="p-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#D4A23A]/20 text-[#D4A23A]'
                    : 'text-[#B7C0B3] hover:text-[#F4F1EA] hover:bg-[rgba(244,241,234,0.05)]'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgba(244,241,234,0.12)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#D4A23A]/20 flex items-center justify-center">
              <span className="text-[#D4A23A] font-bold">{adminUser?.username[0].toUpperCase()}</span>
            </div>
            <div>
              <p className="text-[#F4F1EA] text-sm">{adminUser?.username}</p>
              <p className="text-[#B7C0B3] text-xs">{adminUser?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[rgba(244,241,234,0.2)] text-[#B7C0B3] hover:text-[#F4F1EA] hover:border-[#F4F1EA] transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#122C26] border-b border-[rgba(244,241,234,0.12)] z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="font-display font-bold text-[#F4F1EA]">Triple Lions Admin</h1>
          <button
            onClick={handleLogout}
            className="p-2 text-[#B7C0B3] hover:text-[#F4F1EA]"
          >
            <LogOut size={20} />
          </button>
        </div>
        <div className="flex overflow-x-auto px-4 pb-2 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#D4A23A]/20 text-[#D4A23A]'
                    : 'text-[#B7C0B3] hover:text-[#F4F1EA]'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 mt-20 lg:mt-0 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-[#F4F1EA] text-2xl mb-6">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'packages' && renderPackages()}
          {activeTab === 'destinations' && renderDestinations()}
          {activeTab === 'testimonials' && renderTestimonials()}
          {activeTab === 'bookings' && renderBookings()}
        </div>
      </main>

      {/* Modal for adding/editing items */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-[#0B0F0D] border border-[rgba(244,241,234,0.18)] text-[#F4F1EA] max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-xl">
              {editingItem ? 'Edit' : 'Add'} {modalType === 'package' ? 'Package' : modalType === 'destination' ? 'Destination' : 'Testimonial'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[#B7C0B3] text-center">
              Form implementation would include all fields for {modalType}
            </p>
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={closeModal} className="btn-primary">
              Cancel
            </button>
            <button onClick={closeModal} className="btn-filled">
              {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
