import { format } from 'date-fns'
import React, { memo } from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

const AdminPurchaseEntryProductTable = ({
    products,
    editProduct,
    removeRow,
    lineTotal,
    unitPerCost
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
        <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 bg-sky-500 text-white shadow-sm">
                <tr>
                    <th className="p-4 rounded-l-lg" />
                    <th className="p-4" />
                    <th className="p-4 font-medium text-start w-64">Product</th>
                    <th className="p-4 font-medium">Batch</th>
                    <th className="p-4 font-medium" title="Quantity Received">QR</th>
                    <th className="p-4 font-medium">Free</th>
                    <th className="p-4 font-medium">size</th>
                    <th className="p-4 font-medium" title="Manufacture / Expiry date">MFD / EXD</th>
                    <th className="p-4 font-medium" title="Best Before">BB</th>
                    <th className="p-4 font-medium">MRP</th>
                    <th className="p-4 font-medium" title="Purchase cost">PC</th>
                    <th className="p-4 font-medium">GST %</th>
                    <th className="p-4 font-medium" title="Other expenses">OE</th>
                    <th className="p-4 font-medium" title="Selling Price">SP</th>
                    <th className="p-4 font-medium" title="Unit per cost">UPC</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium rounded-r-lg" />
                </tr>
            </thead>
            <tbody>
            {products?.map((item, index) => (
                <tr key={index} className={`text-center border-b text-lg font-medium text-gray-700`}>
                    <td className="py-3 pl-3 border-b">{index+1})</td>
                    <td className="border-b">
                        <div className="flex justify-center">
                            <img src={`${import.meta.env.VITE_IMAGE_URL}${item.product_photo?.url}`} alt={item?.product_name} className="w-[70px] h-[70px] text-center rounded-xl object-cover"/>
                        </div>
                    </td>
                    <td className='text-start border-b py-4 flex flex-col max-w-64'>
                        <span className='mb-0.5 font-semibold line-clamp-1'>{item?.product_name}</span>
                        <span className='text-gray-500 text-[17px]'>{item?.product_barcode}</span>
                    </td>
                    <td  className="border-b">{item.batch_no || "--"}</td>
                    <td  className="border-b">{item.quantity_received}</td>
                    <td  className="border-b">{item.free_received || "--"}</td>
                    <td  className="border-b">{item.size}</td>
                    <td className="border-b">
                        <div className="flex flex-col">
                            <span>{item.manufacture_date ? format(item.manufacture_date, 'dd-MM-yyyy') : "--"}</span>
                            <span>{item.expiry_date ? format(item.expiry_date, 'dd-MM-yyyy') : "--"}</span>
                        </div>
                    </td>
                    <td  className="border-b">{item.best_before ? `${item.best_before} days`  : "--"}</td>
                    <td  className="border-b"><div className="inline-flex items-center"><FaIndianRupeeSign />{item.mrp}</div></td>
                    <td  className="border-b"><div className="inline-flex items-center"><FaIndianRupeeSign />{item.purchase_cost}</div></td>
                    <td  className="border-b">{item.gst_percentage ? `${item.gst_percentage}%` : "--"}</td>
                    <td  className="border-b">{item.other_expenses ?<div className="inline-flex items-center"><FaIndianRupeeSign />{item.other_expenses}</div>: "--" }</td>
                    <td  className="border-b"><div className="inline-flex items-center"><FaIndianRupeeSign />{item.selling_price}</div></td>
                    <td  className="border-b"><div className="inline-flex items-center"><FaIndianRupeeSign />{unitPerCost(item)}</div></td>
                    <td  className="border-b"><div className="inline-flex items-center"><FaIndianRupeeSign />{lineTotal(item).toFixed(2)}</div></td>
                    <td className="text-center border-b space-x-1">
                        <button onClick={() => editProduct(item)} className="text-orange-500 hover:text-orange-600"><FiEdit size={22}/></button>
                        <button onClick={() => removeRow(item)} className="text-red-500 hover:text-red-700"><FiTrash2 size={22}/></button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default memo(AdminPurchaseEntryProductTable)