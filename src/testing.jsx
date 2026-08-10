import { useState } from "react";
import {
    FiChevronDown,
    FiChevronUp,
    FiPackage,
    FiCalendar,
    FiHash,
    FiTruck,
    FiAlertTriangle,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";

const ProductInventoryComponent = ({ inventory }) => {

    const [expandedIndex, setExpandedIndex] = useState(null);

    const productStock = inventory?.product_stock || [];

    const totalStock = inventory?.product_total_stock || 0;

    const lowStockLimit = inventory?.product_low_in_stock || 1;

    const inventoryValue = productStock.reduce(
        (total, item) => total + ((item.stock || 0) * (item.unit_purchase_cost || 0)),
        0
    );

    const toggleRow = (index) => {
        setExpandedIndex(
            expandedIndex === index ? null : index
        );
    };

    const getStockStatus = (stock) => {

        if (stock <= 0) {
            return {
                label: "Out of Stock",
                className: "text-red-600 bg-red-50",
                icon: <FiXCircle size={14} />
            };
        }

        if (stock <= lowStockLimit) {
            return {
                label: "Low Stock",
                className: "text-amber-600 bg-amber-50",
                icon: <FiAlertTriangle size={14} />
            };
        }

        return {
            label: "In Stock",
            className: "text-emerald-600 bg-emerald-50",
            icon: <FiCheckCircle size={14} />
        };
    };

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="w-full rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <FiPackage size={19} className="text-cyan-600"/>
                            <h2 className="text-lg font-semibold text-gray-800">Inventory</h2>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {productStock.length} batches · {totalStock.toLocaleString("en-IN")} units
                        </p>
                    </div>

                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${ totalStock <= 0 ? "text-red-600 bg-red-50" : totalStock <= lowStockLimit ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50" }`} >
                        <span className={`w-2 h-2 rounded-full ${ totalStock <= 0 ? "bg-red-500" : totalStock <= lowStockLimit ? "bg-amber-500" : "bg-emerald-500" }`}/>
                        {totalStock <= 0 ? "Out of Stock" : totalStock <= lowStockLimit ? "Low Stock" : "In Stock" }
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Batch</th>
                            <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stock</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">MRP</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Selling</th>
                            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Purchase</th>
                            <th className="w-12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productStock.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-12 text-center">
                                    <FiPackage size={30} className="mx-auto text-gray-300"/>
                                    <p className="mt-2 text-sm text-gray-500">No inventory batches available</p>
                                </td>
                            </tr>
                        ) : (
                            productStock.map((item, index) => {
                                const isExpanded = expandedIndex === index;
                                const stockStatus = getStockStatus(item.stock);
                                return ( 
                                    <>
                                        <tr key={item._id || `${item.batch_no}-${index}`} onClick={() => toggleRow(index)} className={` border-b border-gray-100 cursor-pointer transition-colors ${ isExpanded ? "bg-cyan-50/40" : "hover:bg-gray-50" }`}>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className=" w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 ">
                                                        <FiPackage size={17} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">{item.batch_no || "No Batch"}</p>
                                                        <p className="text-xs text-gray-400 mt-0.5">FIFO #{index + 1}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-sm font-semibold text-gray-700">{(item.stock || 0).toLocaleString("en-IN")}</span>
                                                    <span className={` flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${stockStatus.className}`}>
                                                        {stockStatus.icon}
                                                        {stockStatus.label}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex justify-end items-center gap-1 text-sm text-gray-600">
                                                    <FaIndianRupeeSign size={11} />
                                                    {item.mrp?.toLocaleString("en-IN") || "0"}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex justify-end items-center gap-1 text-sm font-semibold text-gray-800">
                                                    <FaIndianRupeeSign size={11} />
                                                    {item.selling_price?.toLocaleString("en-IN") || "0"}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex justify-end items-center gap-1 text-sm text-gray-600">
                                                    <FaIndianRupeeSign size={11} />
                                                    {item.unit_purchase_cost?.toLocaleString("en-IN") || "0"}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className=" w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 ">
                                                    {isExpanded ? <FiChevronUp size={17} /> : <FiChevronDown size={17} />}
                                                </div>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr key={`expanded-${item._id || index}`} className="bg-gray-50/70 border-b border-gray-200">
                                                <td colSpan={6} className="px-5 py-5">
                                                    <div className=" grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
                                                        <Detail icon={<FiTruck />} label="Purchase ID" value={ item.purchase_id || "-"} />
                                                        <Detail icon={<FiPackage />} label="Size" value={ item.size || "-" }/>
                                                        <Detail icon={<FiCalendar />} label="Manufacture Date" value={ formatDate( item.manufacture_date )}/>
                                                        <Detail icon={<FiCalendar />} label="Expiry Date" value={ formatDate( item.expiry_date )}/>
                                                        <Detail label="Best Before" value={ item.best_before ? `${item.best_before} months` : "-" }/>
                                                        <Detail label="Purchase Cost" value={ `₹${(item.purchase_cost || 0).toLocaleString("en-IN")}` }/>
                                                        <Detail label="GST" value={ `${item.gst_percentage || 0}%` }/>
                                                        <Detail label="Other Expenses" value={ `₹${(item.other_expenses || 0).toLocaleString("en-IN")}` }/>
                                                    </div>
                                                    <div className=" mt-5 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 ">
                                                        <div className="flex items-center gap-2">
                                                            <FiHash size={14} className="text-cyan-600" />
                                                            <span className="text-xs text-gray-500">FIFO Position</span>
                                                            <span className=" text-xs font-semibold text-gray-700">#{index + 1}</span>
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Batch stock: 
                                                            <span className="ml-1 font-semibold text-gray-800">{(item.stock || 0).toLocaleString("en-IN")} units</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className=" border-t border-gray-200 bg-gray-50 px-5 py-4 grid grid-cols-2 gap-4 ">
                <div>
                    <p className="text-xs text-gray-500">Total Stock</p>
                    <p className="text-lg font-bold text-gray-800 mt-0.5">
                        {totalStock.toLocaleString("en-IN")}
                        <span className="text-xs font-medium text-gray-500 ml-1">units</span>
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">Inventory Value</p>
                    <p className="text-lg font-bold text-gray-800 mt-0.5 flex justify-end items-center gap-1">
                        <FaIndianRupeeSign size={13} />
                        {inventoryValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                </div>
            </div>

        </div>
    );
};


/* -------------------------------- */
/* DETAIL COMPONENT                 */
/* -------------------------------- */

const Detail = ({ icon, label, value }) => {

    return (
        <div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">

                {icon && (
                    <span className="text-gray-400">
                        {icon}
                    </span>
                )}

                <span>
                    {label}
                </span>

            </div>

            <p className="text-sm font-medium text-gray-700 truncate">
                {value}
            </p>

        </div>
    );
};


export default ProductInventoryComponent;