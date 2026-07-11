import React, { memo } from 'react'

const AdminPurchaseEntrySupplierDetailsComponent = ({ supplier, searchSupplier, setSearchSupplier, searchSupplierResults, showSupplierResults, selectSupplier }) => {
  return (
    <div className="bg-white col-span-5 rounded-xl shadow-md border p-6 space-y-4 gap-x-4 grid grid-cols-8">
        <h2 className="font-semibold col-span-8 text-lg text-sky-600 ">Supplier Details</h2>
        
        <div className="relative col-span-5">
            <label className="font-medium text-gray-700">Supplier</label>
            <input className=" w-full border mt-2 rounded-xl p-3"  placeholder="Search Supplier" value={searchSupplier} onChange={(e) => setSearchSupplier(e.target.value)}/>
            {showSupplierResults && (
                <div className="mt-2 border absolute w-full bg-white rounded-xl shadow-lg max-h-72 overflow-y-auto px-3">
                    {searchSupplierResults?.length === 0 ? (
                        <div className="py-4 text-gray-500">No Supplier Found</div>
                    ) : ( 
                        searchSupplierResults?.map((supplier, index) => (
                        <div key={index} className="p-3 hover:bg-blue-50 cursor-pointer items-center gap-3 flex border-b" onClick={() => selectSupplier(supplier)}>
                            <div>{supplier.supplier_name} ({supplier?.supplier_address?.city || "--"})</div>
                        </div>
                    )))}
                </div>
            )}
        </div>

        <div className="col-span-3">
            <label className="font-medium text-gray-600">Supplier ID</label>
            <input className="w-full mt-2 border text-gray-800 font-medium rounded-lg p-3" value={supplier?.supplier_id || "--"} readOnly={true} />
        </div>
        <div className="col-span-2">
            <label className="font-medium text-gray-600">Phone no.</label>
            <input className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={supplier?.supplier_phone || "--"} readOnly={true} />
        </div>

        <div className="col-span-3">
            <label className="font-medium text-gray-600">Email</label>
            <input className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={supplier?.supplier_email || "--"} readOnly={true} />
        </div>
        
        <div className="col-span-3">
            <label className="font-medium text-gray-600">GST no.</label>
            <input className="w-full mt-2 border text-gray-800 rounded-lg p-3" value={supplier?.supplier_gst_no || "--"} readOnly={true}/>
        </div>
    </div>
  )
}

export default memo(AdminPurchaseEntrySupplierDetailsComponent)