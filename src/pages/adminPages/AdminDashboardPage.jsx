import React from 'react'

import AdminSideBar from '../../components/admin/AdminSideBar';
import { TbBrandShopee } from "react-icons/tb";
import { FaBoxesStacked } from "react-icons/fa6";
import { GiProfit } from "react-icons/gi";
import { IoIosStar } from "react-icons/io";
import { BiSolidPurchaseTag } from "react-icons/bi";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AdminDashboardHeaderComponent from '../../components/admin/AdminDashboradComponents/AdminDashboardHeaderComponent';
import AdminRevenueDetailsComponent from '../../components/admin/AdminDashboradComponents/AdminRevenueDetailsComponent';
import AdminDashboardTopProductsComponent from '../../components/admin/AdminDashboradComponents/AdminDashboardTopProductsComponent';
import AdminDashboardCustomerStatistics from '../../components/admin/AdminDashboradComponents/AdminDashboardCustomerStatistics';
import TestingPage from '../TestingPage';
import AdminDashboardOrderOverviewComponent from '../../components/admin/AdminDashboradComponents/AdminDashboardOrderOverviewComponent';

const AdminDashboardPage = () => {

    const data = {
        purchase : {
            total_purchase : 45200,
            increament: 5
        },
        sales : {
            total_sales : 452000,
            increament: -5
        },
        orders : {
            total_orders : 400,
            increament: 5
        },
        profit : {
            total_profit : 200000,
            increament: -0.5
        },
        revenueData : [
            {
                label: 'Jan',
                sales: 400000,
                purchase: 320000,
                profit: 80000,
            },
            {
                label: 'Feb',
                sales: 500000,
                purchase: 400000,
                profit: 100000,
            },
            {
                label: 'Mar',
                sales: 400000,
                purchase: 320000,
                profit: 80000,
            },
            {
                label: 'Apr',
                sales: 600000,
                purchase: 320000,
                profit: 280000,
            },
            {
                label: 'May',
                sales: 580000,
                purchase: 320000,
                profit: 200000,
            },
            {
                label: 'Jun',
                sales: 500000,
                purchase: 320000,
                profit: 280000,
            },
            {
                label: 'Jul',
                sales: 600000,
                purchase: 320000,
                profit: 280000,
            },
            {
                label: 'Aug',
                sales: 300000,
                purchase: 320000,
                profit: 280000,
            },
            {
                label: 'Sep',
                sales: 600000,
                purchase: 320000,
                profit: 280000,
            },
            {
                label: 'Oct',
                sales: 540000,
                purchase: 320000,
                profit: 280000,
            },
            {
                label: 'Nov',
                sales: 700000,
                purchase: 320000,
                profit: 280000,
            },
            {
                label: 'Dec',
                sales: 600000,
                purchase: 320000,
                profit: 280000,
            }
        ],
        topProducts : [
            {
                product_barcode : "random1",
                product_photos : "hgjhb",
                product_name: "Fancy Earring",
                product_average_ratings : 4.8,
                product_total_stock : 555
            },{
                product_barcode : "random2",
                product_photos : "hgjhb",
                product_name: "Cat Bag",
                product_average_ratings : 4.2,
                product_total_stock : 85
            },
            {
                product_barcode : "random3",
                product_photos : "hgjhb",
                product_name: "Peacocok Bangles",
                product_average_ratings : 4.1,
                product_total_stock : 45
            },
            {
                product_barcode : "random4",
                product_photos : "hgjhb",
                product_name: "Classmate Note 180pgs L UR",
                product_average_ratings : 3.8,
                product_total_stock : 420
            },
        {
                product_barcode : "random5",
                product_photos : "hgjhb",
                product_name: "Siru Payaru",
                product_average_ratings : 4.8,
                product_total_stock : 102
            },
        ],
        customerData : {
            total_customer : [
                { name: 'Total', value: 600 },
            ],
            data : [
                { name: 'Male', value: 150 },
                { name: 'Female', value: 400 },
                { name: 'others', value: 250 },
            ]
        },
        orderOverviewData : [
            {
                month: "Jan",
                placed: 1250,
                confirmed: 1180,
                outForDelivery: 1120,
                delivered: 1085,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Feb",
                placed: 1080,
                confirmed: 952,
                outForDelivery: 952,
                delivered: 900,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Mar",
                placed: 120,
                confirmed: 1955,
                outForDelivery: 1392,
                delivered: 1350,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Apr",
                placed: 1680,
                confirmed: 1005,
                outForDelivery: 1840,
                delivered: 192,
                canceled: 10,
                returned: 15,
            },
            {
                month: "May",
                placed: 1825,
                confirmed: 3350,
                outForDelivery: 18,
                delivered: 1645,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Jun",
                placed: 3500,
                confirmed: 182,
                outForDelivery: 2815,
                delivered: 2668,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Jul",
                placed: 3140,
                confirmed: 2058,
                outForDelivery: 195,
                delivered: 1932,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Aug",
                placed: 280,
                confirmed: 1605,
                outForDelivery: 2318,
                delivered: 2060,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Sep",
                placed: 3415,
                confirmed: 236,
                outForDelivery: 1255,
                delivered: 2198,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Oct",
                placed: 2570,
                confirmed: 1482,
                outForDelivery: 406,
                delivered: 3348,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Nov",
                placed: 260,
                confirmed: 2768,
                outForDelivery: 1685,
                delivered: 3610,
                canceled: 10,
                returned: 15,
            },
            {
                month: "Dec",
                placed: 3240,
                confirmed: 1135,
                outForDelivery: 3842,
                delivered: 2065,
                canceled: 10,
                returned: 15,
            },
        ]
    }

    const purchase = data.purchase
    const sales = data.sales
    const orders = data.orders
    const profit = data.profit
    const revenueData = data.revenueData
    const topProducts = data.topProducts
    const customerData = data.customerData
    const orderOverviewData = data.orderOverviewData

  return (
    <div className='w-full flex font-inter'>
        <AdminSideBar />
        <div className='w-full h-full p-5'>
            <div className='text-2xl text-gray-800 font-semibold font-inter pt-2 pb-5'>Dashboard</div>
            <div className='flex gap-5'>
                <div className='w-full'>

                    <AdminDashboardHeaderComponent purchase={purchase} sales={sales} orders={orders} profit={profit} />
                    <AdminRevenueDetailsComponent revenueData = {revenueData}/>
                    <AdminDashboardOrderOverviewComponent orderOverviewData = {orderOverviewData} />
                </div>
                <div className='w-1/3 space-y-5'>
                    <AdminDashboardTopProductsComponent topProducts={topProducts}/>
                    <AdminDashboardCustomerStatistics customerData={customerData}/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AdminDashboardPage