import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  AreaChart,
  Area,
  Bar
} from "recharts";
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaUserPlus,
} from "react-icons/fa";
import AdminSideBar from "../components/admin/AdminSideBar";

const TestingPage = () => {
    
    const customerStatusData = [
      { name: "Active", value: 850 },
      { name: "Inactive", value: 220 },
      { name: "VIP", value: 85 },
      { name: "Blocked", value: 45 },
    ];
    
    const COLORS = [
      "#22C55E",
      "#F59E0B",
      "#3B82F6",
      "#EF4444",
    ];


const customerGrowthData = [
  { month: "Jan", customers: 120 },
  { month: "Feb", customers: 180 },
  { month: "Mar", customers: 240 },
  { month: "Apr", customers: 320 },
  { month: "May", customers: 410 },
  { month: "Jun", customers: 520 },
  { month: "Jul", customers: 640 },
];

const customerRevenueData = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 148000 },
  { month: "Mar", revenue: 172000 },
  { month: "Apr", revenue: 210000 },
  { month: "May", revenue: 248000 },
  { month: "Jun", revenue: 286000 },
  { month: "Jul", revenue: 330000 },
];

const customerRegistrationData = [
  { month: "Jan", registrations: 42 },
  { month: "Feb", registrations: 56 },
  { month: "Mar", registrations: 63 },
  { month: "Apr", registrations: 78 },
  { month: "May", registrations: 91 },
  { month: "Jun", registrations: 106 },
  { month: "Jul", registrations: 118 },
];


  const customers = [
    {
      id: "CUS001",
      name: "John Smith",
      email: "john@example.com",
      phone: "+91 9876543210",
      orders: 18,
      spent: "₹24,500",
      joined: "12 Jan 2026",
      status: "Active",
    },
    {
      id: "CUS002",
      name: "Emma Watson",
      email: "emma@example.com",
      phone: "+91 9988776655",
      orders: 9,
      spent: "₹12,900",
      joined: "18 Feb 2026",
      status: "Active",
    },
    {
      id: "CUS003",
      name: "Michael Lee",
      email: "michael@example.com",
      phone: "+91 9123456780",
      orders: 3,
      spent: "₹3,200",
      joined: "05 Mar 2026",
      status: "Inactive",
    },
    {
      id: "CUS004",
      name: "Sophia Brown",
      email: "sophia@example.com",
      phone: "+91 9876501234",
      orders: 26,
      spent: "₹52,300",
      joined: "11 Apr 2026",
      status: "VIP",
    },
    {
      id: "CUS005",
      name: "David Wilson",
      email: "david@example.com",
      phone: "+91 9011223344",
      orders: 7,
      spent: "₹8,100",
      joined: "28 Apr 2026",
      status: "Blocked",
    },
  ];

  return (
    <div className="flex">
        <AdminSideBar />

    <div className="min-h-screen w-full bg-gray-100 p-6 font-inter">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            Customers
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your customers and their activities.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
          + Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Total Customers</p>
          <h2 className="text-3xl font-bold mt-2">1,284</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Active Customers</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">1,036</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">New This Month</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">146</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500 text-sm">Blocked Customers</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">24</h2>
        </div>
      </div>

      

      <div className="grid grid-cols-2 gap-6">

      {/* Customer Growth */}
      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-lg font-semibold text-gray-800">
          Customer Growth
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          Monthly customer registrations
        </p>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={customerGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="customers"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>
 {/* Customer Revenue */}
        <div className="bg-white rounded-xl shadow p-5">
  <h2 className="text-lg font-semibold text-gray-800">
    Customer Revenue
  </h2>

  <p className="text-sm text-gray-500 mb-4">
    Monthly revenue generated from customers
  </p>

  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={customerRevenueData}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Area
        type="monotone"
        dataKey="revenue"
        stroke="#3B82F6"
        fill="#93C5FD"
        strokeWidth={3}
      />
    </AreaChart>
  </ResponsiveContainer>
        </div>
      {/* Customer Status */}
      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-lg font-semibold text-gray-800">
          Customer Status
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          Distribution of customers
        </p>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>

            <Pie
              data={customerStatusData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={55}
              dataKey="value"
              label
            >
              {customerStatusData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>
       
{/* customer Registration */}
<div className="bg-white rounded-xl shadow p-5">
  <h2 className="text-lg font-semibold text-gray-800">
    Customer Registrations
  </h2>

  <p className="text-sm text-gray-500 mb-4">
    Monthly new customer registrations
  </p>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={customerRegistrationData}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="month" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="registrations"
        fill="#10B981"
        radius={[8, 8, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>

    </div>

    {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 my-5 flex items-center">
        <div className="relative w-full max-w-md">
          <FaSearch
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-600 text-sm">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Orders</th>
                <th className="px-6 py-4">Spent</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                        {customer.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {customer.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">{customer.phone}</td>

                  <td className="px-6 py-5 font-medium">
                    {customer.orders}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {customer.spent}
                  </td>

                  <td className="px-6 py-5">{customer.joined}</td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        customer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : customer.status === "VIP"
                          ? "bg-purple-100 text-purple-700"
                          : customer.status === "Blocked"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye size={19} />
                      </button>

                      <button className="text-green-600 hover:text-green-800">
                        <FaEdit size={19} />
                      </button>

                      <button className="text-red-600 hover:text-red-800">
                        <FaTrashAlt size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TestingPage