import { useState } from "react";
import { FiSearch, FiPlus, FiTrash2 } from "react-icons/fi";
import AdminSideBar from "../components/admin/AdminSideBar";

const PurchaseEntryPage = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            product: "",
            quantity: 1,
            freeQty: 0,
            purchasePrice: 0,
            discount: 0,
            gst: 5,
            expiry: "",
            total: 0,
        },
    ]);

    const addRow = () => {
        setItems([
            ...items,
            {
                id: Date.now(),
                product: "",
                quantity: 1,
                freeQty: 0,
                purchasePrice: 0,
                discount: 0,
                gst: 5,
                expiry: "",
                total: 0,
            },
        ]);
    };

    const removeRow = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <AdminSideBar />

            <div className="flex-1 p-6">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-700">
                            Purchase Entry
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Create a new purchase invoice
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500">
                            Purchase No
                        </p>

                        <h2 className="text-xl font-bold text-blue-600">
                            PUR240001
                        </h2>
                    </div>
                </div>

                {/* Supplier + Invoice */}

                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Supplier */}

                    <div className="bg-white rounded-xl shadow border p-6">

                        <h2 className="font-semibold text-lg text-sky-600 mb-5">
                            Supplier Details
                        </h2>

                        <div className="space-y-4">

                            <div>
                                <label className="font-medium">
                                    Supplier
                                </label>

                                <select className="w-full mt-2 border rounded-lg p-3">
                                    <option>Select Supplier</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label>Contact Person</label>

                                    <input
                                        className="w-full mt-2 border rounded-lg p-3"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label>Phone</label>

                                    <input
                                        className="w-full mt-2 border rounded-lg p-3"
                                        disabled
                                    />
                                </div>

                            </div>

                            <div>

                                <label>GST Number</label>

                                <input
                                    className="w-full mt-2 border rounded-lg p-3"
                                    disabled
                                />

                            </div>

                        </div>

                    </div>

                    {/* Invoice */}

                    <div className="bg-white rounded-xl shadow border p-6">

                        <h2 className="font-semibold text-lg text-sky-600 mb-5">
                            Purchase Details
                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label>Invoice No.</label>

                                <input
                                    className="w-full mt-2 border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label>Invoice Date</label>

                                <input
                                    type="date"
                                    className="w-full mt-2 border rounded-lg p-3"
                                />
                            </div>

                            <div>
                                <label>Payment Status</label>

                                <select className="w-full mt-2 border rounded-lg p-3">
                                    <option>Paid</option>
                                    <option>Partial</option>
                                    <option>Pending</option>
                                </select>
                            </div>

                            <div>
                                <label>Payment Method</label>

                                <select className="w-full mt-2 border rounded-lg p-3">
                                    <option>Cash</option>
                                    <option>UPI</option>
                                    <option>Card</option>
                                    <option>Bank Transfer</option>
                                </select>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Search */}

                <div className="bg-white rounded-xl shadow border mt-7 p-6">

                    <h2 className="font-semibold text-lg text-sky-600 mb-5">
                        Add Products
                    </h2>

                    <div className="relative">

                        <FiSearch className="absolute top-4 left-4 text-gray-400"/>

                        <input
                            placeholder="Search Product by Name / Barcode"
                            className="w-full border rounded-xl pl-12 p-3"
                        />

                    </div>

                </div>

                {/* Purchase Table */}

                <div className="bg-white rounded-xl shadow border mt-7 overflow-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">

                            <tr className="text-gray-700">

                                <th className="p-4 text-left">
                                    Product
                                </th>

                                <th className="p-4">
                                    Qty
                                </th>

                                <th className="p-4">
                                    Free
                                </th>

                                <th className="p-4">
                                    Purchase Price
                                </th>

                                <th className="p-4">
                                    Discount
                                </th>

                                <th className="p-4">
                                    GST %
                                </th>

                                <th className="p-4">
                                    Expiry
                                </th>

                                <th className="p-4">
                                    Total
                                </th>

                                <th className="p-4">

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {items.map((item) => (

                                <tr key={item.id} className="border-t">

                                    <td className="p-3 min-w-[250px]">
                                        <input
                                            className="border rounded-lg p-2 w-full"
                                            placeholder="Product Name"
                                        />
                                    </td>

                                    <td className="p-3">
                                        <input
                                            type="number"
                                            defaultValue={1}
                                            className="border rounded-lg p-2 w-20"
                                        />
                                    </td>

                                    <td className="p-3">
                                        <input
                                            type="number"
                                            defaultValue={0}
                                            className="border rounded-lg p-2 w-20"
                                        />
                                    </td>

                                    <td className="p-3">
                                        <input
                                            type="number"
                                            className="border rounded-lg p-2 w-28"
                                        />
                                    </td>

                                    <td className="p-3">
                                        <input
                                            type="number"
                                            defaultValue={0}
                                            className="border rounded-lg p-2 w-24"
                                        />
                                    </td>

                                    <td className="p-3">
                                        <input
                                            type="number"
                                            defaultValue={5}
                                            className="border rounded-lg p-2 w-20"
                                        />
                                    </td>

                                    <td className="p-3">
                                        <input
                                            type="date"
                                            className="border rounded-lg p-2"
                                        />
                                    </td>

                                    <td className="font-semibold text-center">
                                        ₹0.00
                                    </td>

                                    <td className="text-center">

                                        <button
                                            onClick={() => removeRow(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 size={20}/>
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <div className="p-5">

                        <button
                            onClick={addRow}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                        >
                            <FiPlus />

                            Add Product

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PurchaseEntryPage;