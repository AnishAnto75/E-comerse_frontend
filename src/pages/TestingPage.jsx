import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiStar,
  FiPlus,
  FiSearch,
} from "react-icons/fi";

const TestingPage = () => {
  const growthData = [
    { month: "Jan", suppliers: 82 },
    { month: "Feb", suppliers: 89 },
    { month: "Mar", suppliers: 95 },
    { month: "Apr", suppliers: 103 },
    { month: "May", suppliers: 115 },
    { month: "Jun", suppliers: 126 },
  ];

  const recentlyJoined = [
    {
      name: "TechZone Pvt Ltd",
      category: "Electronics",
      joined: "2 days ago",
    },
    {
      name: "Fresh Farms",
      category: "Groceries",
      joined: "5 days ago",
    },
    {
      name: "Style Hub",
      category: "Fashion",
      joined: "1 week ago",
    },
  ];

  const requestedProducts = [
    {
      product: "Apple MagSafe Charger",
      requests: 84,
    },
    {
      product: "JBL Flip Speaker",
      requests: 65,
    },
    {
      product: "Office Chair",
      requests: 42,
    },
    {
      product: "Gaming Keyboard",
      requests: 36,
    },
  ];

  const suppliers = [
    {
      name: "TechZone",
      email: "tech@gmail.com",
      products: 245,
      revenue: "₹18.4L",
      rating: 4.8,
      status: "Active",
    },
    {
      name: "Fresh Farms",
      email: "fresh@gmail.com",
      products: 168,
      revenue: "₹12.6L",
      rating: 4.7,
      status: "Active",
    },
    {
      name: "Style Hub",
      email: "style@gmail.com",
      products: 312,
      revenue: "₹21.2L",
      rating: 4.9,
      status: "Active",
    },
    {
      name: "Home Essentials",
      email: "home@gmail.com",
      products: 112,
      revenue: "₹8.4L",
      rating: 4.4,
      status: "Inactive",
    },
  ];

  const cards = [
    {
      title: "Total Suppliers",
      value: "126",
      color: "from-indigo-500 to-violet-500",
      icon: <FiUsers />,
    },
    {
      title: "Active Suppliers",
      value: "118",
      color: "from-green-500 to-emerald-500",
      icon: <FiUsers />,
    },
    {
      title: "Products",
      value: "5,842",
      color: "from-blue-500 to-cyan-500",
      icon: <FiPackage />,
    },
    {
      title: "Total Revenue",
      value: "₹2.48 Cr",
      color: "from-orange-500 to-amber-500",
      icon: <FiTrendingUp />,
    },
    {
      title: "Avg Rating",
      value: "4.7",
      color: "from-pink-500 to-rose-500",
      icon: <FiStar />,
    },
  ];

  return (
    <div className="min-h-screen p-8 font-sans">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Suppliers
            </h1>

            <p className="opacity-90 mt-2">
              Manage all registered suppliers
            </p>
          </div>

          <div className="flex gap-3">

            <button className="bg-white text-gray-700 px-4 py-2 rounded-xl flex items-center gap-2">
              <FiSearch />
              Search
            </button>

            <button className="bg-yellow-400 text-black px-5 py-2 rounded-xl flex items-center gap-2 font-semibold">
              <FiPlus />
              Add Supplier
            </button>

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-5 mt-8">

        {cards.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-3xl p-6 shadow-lg hover:-translate-y-1 duration-300"
          >

            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-2xl`}>

              {item.icon}

            </div>

            <p className="text-gray-500 mt-5">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

      {/* Chart + Recently Joined */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-2">

          <h2 className="font-semibold text-xl mb-6">
            Supplier Growth
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="suppliers"
                stroke="#6366F1"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="font-semibold text-xl mb-5">
            Recently Joined
          </h2>

          <div className="space-y-4">

            {recentlyJoined.map((item) => (

              <div
                key={item.name}
                className="border rounded-2xl p-4 hover:bg-slate-50"
              >

                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.category}
                </p>

                <span className="text-indigo-600 text-sm font-medium">
                  {item.joined}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Requested Products */}

      <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

        <h2 className="font-semibold text-xl mb-5">
          🔥 Customer Requested Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          {requestedProducts.map((item) => (

            <div
              key={item.product}
              className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 border"
            >

              <h3 className="font-semibold">
                {item.product}
              </h3>

              <div className="mt-4 inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                {item.requests} Requests
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Supplier Table */}

      <div className="bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold">
            Supplier Directory
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left">

              <th className="p-4">Supplier</th>
              <th>Email</th>
              <th>Products</th>
              <th>Revenue</th>
              <th>Rating</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {suppliers.map((item) => (

              <tr
                key={item.email}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4 font-medium">
                  {item.name}
                </td>

                <td>{item.email}</td>

                <td>{item.products}</td>

                <td>{item.revenue}</td>

                <td>⭐ {item.rating}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      item.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TestingPage