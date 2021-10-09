
import {
    PieChart,
    // BarChart2,
    // Settings,
    Users,
    // Tool,
    // DollarSign,
    // BarChart,
    Image,
    Plus,
    List,
    Layers,
    Archive,
    ShoppingCart,
    UserCheck,
    UserPlus,
    Key,
} from 'react-feather'

// --- Dashboard ---
import DashboardIndex from '../pages/dashboard/Index'

// --- Banner ---
import BannerIndex from '../pages/banner/Index'
import BannerStore from '../pages/banner/Create'

// --- Category ---
import CategoryIndex from '../pages/category/Index'
import CategoryStore from '../pages/category/Create'
import CategoryEdit from '../pages/category/Edit'

// --- Product ---
import ProductIndex from '../pages/product/Index'
import ProductStore from '../pages/product/Create'
import ProductEdit from '../pages/product/Edit'
import ProductShow from '../pages/product/Show'

// --- Order ---
import OrderIndex from '../pages/order/Index'
import OrderShow from '../pages/order/Show'

// --- Admin ---
import AdminIndex from '../pages/admin/Index'
import AdminStore from '../pages/admin/Create'
import AdminEdit from '../pages/admin/Edit'

// --- Customer ---
import CustomerIndex from '../pages/customer/Index'
import CustomerStore from '../pages/customer/Create'
import CustomerShow from '../pages/customer/Show'
import CustomerEdit from '../pages/customer/Edit'

// --- Profile ---
import ProfileIndex from '../pages/profile/Index'
import ChangePassword from '../pages/profile/ChangePassword'

// --- Role ---
import RoleIndex from '../pages/role/Index'
import RoleStore from '../pages/role/Create'
import RoleEdit from '../pages/role/Edit'

export const routes = [
    {
        title: "Dashboard",
        name: "dashboard",
        path: "/dashboard/",
        exact: true,
        inDrawer: true,
        icon: <PieChart size={18} />,
        component: DashboardIndex
    },
    {
        title: "Banner",
        name: "banner",
        inDrawer: true,
        icon: <Image size={18} />,
        child: [
            {
                title: "All Banner",
                name: "banner index",
                path: "/dashboard/banner",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: BannerIndex
            },
            {
                title: "New Banner",
                name: "banner store",
                path: "/dashboard/banner/store",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: BannerStore
            }
        ]
    },
    {
        title: "Category",
        name: "category",
        inDrawer: true,
        icon: <Layers size={18} />,
        child: [
            {
                title: "All Category",
                name: "category index",
                path: "/dashboard/category",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: CategoryIndex
            },
            {
                title: "New Category",
                name: "category store",
                path: "/dashboard/category/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: CategoryStore
            },
            {
                title: "Edit Category",
                name: "category edit",
                path: "/dashboard/category/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: CategoryEdit
            }
        ]
    },
    {
        title: "Product",
        name: "product",
        inDrawer: true,
        icon: <Archive size={18} />,
        child: [
            {
                title: "All Product",
                name: "product index",
                path: "/dashboard/product",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: ProductIndex
            },
            {
                title: "New Product",
                name: "product store",
                path: "/dashboard/product/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: ProductStore
            },
            {
                title: "Edit Product",
                name: "product edit",
                path: "/dashboard/product/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ProductEdit
            },
            {
                title: "Show Product",
                name: "product show",
                path: "/dashboard/product/show/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ProductShow
            }
        ]
    },
    {
        title: "Order",
        name: "order",
        path: "/dashboard/order",
        exact: true,
        inDrawer: true,
        icon: <ShoppingCart size={18} />,
        component: OrderIndex
    },
    {
        title: "Order Show",
        name: "order show",
        path: "/dashboard/order/:id",
        exact: true,
        inDrawer: false,
        icon: null,
        component: OrderShow
    },
    {
        title: "Admin",
        name: "admin",
        inDrawer: true,
        icon: <UserCheck size={18} />,
        child: [
            {
                title: "All Admin",
                name: "admin index",
                path: "/dashboard/admin",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: AdminIndex
            },
            {
                title: "New Admin",
                name: "admin store",
                path: "/dashboard/admin/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: AdminStore
            },
            {
                title: "Edit Admin",
                name: "admin edit",
                path: "/dashboard/admin/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: AdminEdit
            }
        ]
    },
    {
        title: "Customer",
        name: "customer",
        inDrawer: true,
        icon: <Users size={18} />,
        child: [
            {
                title: "All Customer",
                name: "customer index",
                path: "/dashboard/customer",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: CustomerIndex
            },
            {
                title: "New Customer",
                name: "customer store",
                path: "/dashboard/customer/store",
                exact: true,
                inDrawer: true,
                icon: <UserPlus size={18} />,
                component: CustomerStore
            },
            {
                title: "Show Customer",
                name: "customer show",
                path: "/dashboard/customer/show/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: CustomerShow
            },
            {
                title: "Edit Customer",
                name: "customer edit",
                path: "/dashboard/customer/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: CustomerEdit
            }
        ]
    },
    {
        title: "Profile",
        name: "profile",
        inDrawer: false,
        icon: null,
        child: [
            {
                title: "Profile Show",
                name: "profile index",
                path: "/dashboard/profile",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ProfileIndex
            },
            {
                title: "Change Password",
                name: "change-password",
                path: "/dashboard/profile/change-password",
                exact: true,
                inDrawer: false,
                icon: null,
                component: ChangePassword
            }
        ]
    },
    {
        title: "Role & Permissions",
        name: "role",
        inDrawer: true,
        icon: <Key size={18} />,
        child: [
            {
                title: "All Roles",
                name: "role index",
                path: "/dashboard/role",
                exact: true,
                inDrawer: true,
                icon: <List size={18} />,
                component: RoleIndex
            },
            {
                title: "New Role",
                name: "role store",
                path: "/dashboard/role/store",
                exact: true,
                inDrawer: true,
                icon: <Plus size={18} />,
                component: RoleStore
            },
            {
                title: "Edit Role",
                name: "role edit",
                path: "/dashboard/role/edit/:id",
                exact: true,
                inDrawer: false,
                icon: null,
                component: RoleEdit
            }
        ]
    },
]