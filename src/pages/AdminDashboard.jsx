import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { removeProduct } from "../redux/slices/productSlice";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Price formatter (consistent with ProductCard)
const formatPrice = (price) => {
  const n = typeof price === "number" && !isNaN(price) ? price : 0;
  return `₹${n.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

// ─── User Card ───────────────────────────────────────────────────────────────
const UserCard = ({ user, currentUserId, onToggleRole }) => {
  const [loading, setLoading] = useState(false);

  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();
  const avatarUrl =
    user.photoUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      `${user.firstName} ${user.lastName}`
    )}&background=0D8ABC&color=fff`;

  const isSelf = user._id === currentUserId;
  const isUserAdmin = user.role === "admin";

  const handleToggle = async () => {
    setLoading(true);
    await onToggleRole(user._id);
    setLoading(false);
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl border border-base-300">
      <div className="card-body p-5">
        {/* Avatar + Name + Role badge */}
        <div className="flex items-center gap-4 mb-3">
          <div className="avatar">
            <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatarUrl} alt={user.firstName} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-xs text-gray-500 truncate">{user.emailId}</p>
          </div>
          <span
            className={`badge badge-sm font-semibold ${
              isUserAdmin ? "badge-warning" : "badge-ghost"
            }`}
          >
            {isUserAdmin ? "Admin" : "User"}
          </span>
        </div>

        {/* Info row */}
        <div className="text-xs text-gray-400 space-y-1 mb-4">
          {user.gender && (
            <p>
              <span className="font-medium text-gray-500">Gender:</span>{" "}
              {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
            </p>
          )}
          {user.age && (
            <p>
              <span className="font-medium text-gray-500">Age:</span> {user.age}
            </p>
          )}
          <p>
            <span className="font-medium text-gray-500">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Toggle role button */}
        <button
          className={`btn btn-sm w-full ${
            isSelf
              ? "btn-disabled"
              : isUserAdmin
              ? "btn-error btn-outline"
              : "btn-success btn-outline"
          }`}
          onClick={handleToggle}
          disabled={isSelf || loading}
          title={isSelf ? "Cannot change your own role" : ""}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : isSelf ? (
            "👑 That's You"
          ) : isUserAdmin ? (
            "⬇️ Remove Admin"
          ) : (
            "⬆️ Make Admin"
          )}
        </button>
      </div>
    </div>
  );
};

// ─── Product Admin Card ───────────────────────────────────────────────────────
const AdminProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeleting(true);
    await onDelete(product._id);
    setDeleting(false);
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-xl border border-base-300">
      <figure
        className="cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-44 w-full object-cover rounded-t-xl"
        />
      </figure>

      <div className="card-body p-4">
        <h3 className="font-semibold text-base truncate">{product.title}</h3>

        {product.category && (
          <span className="badge badge-outline badge-sm text-xs mt-0.5">
            {product.category}
          </span>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-primary">{formatPrice(product.price ?? 0)}</span>
          <span
            className={`badge badge-xs ${
              product.isActive ? "badge-success" : "badge-error"
            }`}
          >
            {product.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Admin controls */}
        <div className="flex gap-2 mt-3">
          <button
            className="btn btn-sm btn-outline flex-1"
            onClick={() =>
              navigate(`/admin/products/update/${product._id}`)
            }
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-sm btn-error btn-outline flex-1"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "🗑️ Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Dashboard ─────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("users"); // "users" | "products"

  // ── Users state ─────────────────────────────────────────────────
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); // "" | "admin" | "user"
  const [totalUserCount, setTotalUserCount] = useState(0);

  // ── Products state ───────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [error, setError] = useState("");

  // ── Fetch users from dedicated /admin/users API ─────────────────
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (userSearch.trim()) params.append("search", userSearch.trim());
        if (roleFilter)        params.append("role",   roleFilter);

        const res = await axios.get(
          `${API_URL}/admin/users?${params.toString()}`,
          { withCredentials: true }
        );
        setUsers(res.data.data);
        setTotalUserCount(res.data.count ?? res.data.data.length);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    // Debounce search input by 350ms
    const timer = setTimeout(fetchUsers, userSearch ? 350 : 0);
    return () => clearTimeout(timer);
  }, [userSearch, roleFilter]);

  // ── Fetch products ─────────────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await axios.get(`${API_URL}/products?limit=100`, {
          withCredentials: true,
        });
        setProducts(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // ── Toggle user role ───────────────────────────────────────────
  const handleToggleRole = async (userId) => {
    try {
      const res = await axios.post(
        `${API_URL}/admin/users/${userId}/toggle-role`,
        {},
        { withCredentials: true }
      );
      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, role: res.data.data.role } : u
        )
      );
    } catch (err) {
      // Log full error so we can see exactly what's happening
      console.error("Toggle role error:", err);
      console.error("Response:", err.response);
      const msg = err.response?.data?.error || err.message || "Failed to update role";
      alert(msg);
    }
  };

  // ── Delete product ─────────────────────────────────────────────
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_URL}/products/${productId}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      dispatch(removeProduct(productId));
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete product");
    }
  };

  // ── Stats ──────────────────────────────────────────────────────
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalRegular = users.filter((u) => u.role === "user").length;
  const activeProducts = products.filter((p) => p.isActive).length;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">⚙️ Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage users, roles, and products from one place.
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-300 py-4 px-5">
          <div className="stat-title text-xs">Total Users</div>
          <div className="stat-value text-2xl text-primary">{totalUserCount}</div>
        </div>
        <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-300 py-4 px-5">
          <div className="stat-title text-xs">Admins</div>
          <div className="stat-value text-2xl text-warning">{totalAdmins}</div>
        </div>
        <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-300 py-4 px-5">
          <div className="stat-title text-xs">Regular Users</div>
          <div className="stat-value text-2xl text-info">{totalRegular}</div>
        </div>
        <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-300 py-4 px-5">
          <div className="stat-title text-xs">Active Products</div>
          <div className="stat-value text-2xl text-success">{activeProducts}</div>
        </div>
      </div>

      {/* ── Global error ── */}
      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="tabs tabs-boxed bg-base-100 shadow-sm rounded-xl px-2 py-1 mb-6 w-fit gap-4">
        <button
          className={`tab tab-lg font-semibold ${activeTab === "users" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Users
        </button>
        <button
          className={`tab tab-lg font-semibold ${activeTab === "products" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          📦 Products
        </button>
      </div>

      {/* ── USERS TAB ── */}
      {activeTab === "users" && (
        <>
          {/* Search + Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="text"
              placeholder="🔍  Search by name or email…"
              className="input input-bordered w-full sm:max-w-sm"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
            <select
              className="select select-bordered w-full sm:w-40"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {(userSearch || roleFilter) && (
              <button
                className="btn btn-outline btn-sm self-center"
                onClick={() => { setUserSearch(""); setRoleFilter(""); }}
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Result count */}
          {!loadingUsers && (
            <p className="text-sm text-gray-500 mb-4">
              Showing <span className="font-semibold text-base-content">{users.length}</span> user{users.length !== 1 ? "s" : ""}
              {(userSearch || roleFilter) && " matching your filters"}
            </p>
          )}

          {loadingUsers ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No users found.</p>
              {(userSearch || roleFilter) && (
                <button
                  className="btn btn-sm btn-outline mt-3"
                  onClick={() => { setUserSearch(""); setRoleFilter(""); }}
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  currentUserId={currentUser?._id}
                  onToggleRole={handleToggleRole}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── PRODUCTS TAB ── */}
      {activeTab === "products" && (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/products/create")}
            >
              ➕ Create Product
            </button>
          </div>

          {loadingProducts ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-400 py-20">No products found.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <AdminProductCard
                  key={product._id}
                  product={product}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

