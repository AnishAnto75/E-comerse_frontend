import { useState } from "react";
import {
    FiPlus,
    FiSearch,
    FiChevronDown,
    FiChevronRight,
    FiMoreVertical,
    FiEdit,
    FiTrash2,
    FiEye,
    FiFolder,
    FiPackage,
    FiLayers,
} from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";


const AdminGroupCategoryPage = () => {

    const [expandedGroup, setExpandedGroup] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [search, setSearch] = useState("");


    // Temporary data
    const [groups] = useState([
        {
            _id: "1",
            group_name: "Dairy",
            group_description: "Fresh dairy and milk products",
            group_image: "/3-08.webp",
            status: "active",
            category_count: 12,
            product_count: 1248,

            categories: [
                {
                    _id: "101",
                    category_name: "Milk",
                    category_description: "Fresh milk products",
                    category_image: "/3-08.webp",
                    product_count: 324,
                    status: "active",
                },
                {
                    _id: "102",
                    category_name: "Cheese",
                    category_description: "Cheese and processed cheese",
                    category_image: "/3-08.webp",
                    product_count: 186,
                    status: "active",
                },
                {
                    _id: "103",
                    category_name: "Curd",
                    category_description: "Fresh curd products",
                    category_image: "/3-08.webp",
                    product_count: 142,
                    status: "active",
                },
                {
                    _id: "104",
                    category_name: "Butter",
                    category_description: "Butter products",
                    category_image: "/3-08.webp",
                    product_count: 96,
                    status: "inactive",
                },
            ],
        },

        {
            _id: "2",
            group_name: "Grocery",
            group_description: "Everyday grocery products",
            group_image: "/3-08.webp",
            status: "active",
            category_count: 18,
            product_count: 2431,

            categories: [
                {
                    _id: "201",
                    category_name: "Rice",
                    category_description: "Rice and rice products",
                    category_image: "/3-08.webp",
                    product_count: 420,
                    status: "active",
                },
                {
                    _id: "202",
                    category_name: "Pulses",
                    category_description: "Different types of pulses",
                    category_image: "/3-08.webp",
                    product_count: 238,
                    status: "active",
                },
                {
                    _id: "203",
                    category_name: "Cooking Oil",
                    category_description: "Edible cooking oils",
                    category_image: "/3-08.webp",
                    product_count: 154,
                    status: "active",
                },
            ],
        },

        {
            _id: "3",
            group_name: "Personal Care",
            group_description: "Personal care and hygiene products",
            group_image: "/3-08.webp",
            status: "active",
            category_count: 15,
            product_count: 1028,

            categories: [
                {
                    _id: "301",
                    category_name: "Shampoo",
                    category_description: "Hair care products",
                    category_image: "/3-08.webp",
                    product_count: 128,
                    status: "active",
                },
                {
                    _id: "302",
                    category_name: "Soap",
                    category_description: "Bath and body soaps",
                    category_image: "/3-08.webp",
                    product_count: 210,
                    status: "active",
                },
            ],
        },
    ]);


    const filteredGroups = groups.filter((group) => {

        const searchValue = search.toLowerCase();

        return (
            group.group_name.toLowerCase().includes(searchValue) ||
            group.categories.some(category =>
                category.category_name.toLowerCase().includes(searchValue)
            )
        );
    });


    const toggleGroup = (id) => {
        setExpandedGroup(prev =>
            prev === id ? null : id
        );

        setOpenMenu(null);
    };


    return (
        <div className="min-h-screen bg-white p-6">

            {/* HEADER */}
            <div className="flex items-start justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Product Groups & Categories
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Organize your products into groups and categories
                    </p>
                </div>

                <button
                    className="
                        flex items-center gap-2
                        px-4 py-2.5
                        rounded-xl
                        bg-cyan-500
                        hover:bg-cyan-600
                        text-white
                        text-sm font-medium
                        transition
                    "
                >
                    <FiPlus size={18} />
                    Add Group
                </button>

            </div>


            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-4 gap-4 mb-6">

                <SummaryCard
                    icon={<FiFolder />}
                    value={groups.length}
                    title="Total Groups"
                />

                <SummaryCard
                    icon={<MdOutlineCategory />}
                    value="86"
                    title="Total Categories"
                />

                <SummaryCard
                    icon={<FiPackage />}
                    value="8,542"
                    title="Assigned Products"
                />

                <SummaryCard
                    icon={<FiLayers />}
                    value="3"
                    title="Inactive"
                />

            </div>


            {/* SEARCH */}
            <div className="flex items-center justify-between mb-5">

                <div
                    className="
                        w-[350px]
                        flex items-center
                        gap-2
                        border border-gray-200
                        rounded-xl
                        px-3
                        py-2.5
                        focus-within:border-cyan-400
                        transition
                    "
                >

                    <FiSearch
                        size={18}
                        className="text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search groups or categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            outline-none
                            w-full
                            text-sm
                            text-gray-700
                            placeholder:text-gray-400
                        "
                    />

                </div>

            </div>


            {/* GROUP LIST */}
            <div className="space-y-4">

                {filteredGroups.map((group) => {

                    const expanded =
                        expandedGroup === group._id;

                    return (
                        <div
                            key={group._id}
                            className="
                                border border-gray-200
                                rounded-2xl
                                overflow-hidden
                                bg-white
                                shadow-sm
                            "
                        >

                            {/* GROUP HEADER */}
                            <div
                                className="
                                    flex items-center
                                    gap-4
                                    p-4
                                    cursor-pointer
                                    hover:bg-gray-50
                                    transition
                                "
                                onClick={() =>
                                    toggleGroup(group._id)
                                }
                            >

                                {/* GROUP IMAGE */}

                                <div
                                    className="
                                        w-14 h-14
                                        rounded-xl
                                        bg-gray-100
                                        overflow-hidden
                                        flex-shrink-0
                                    "
                                >
                                    <img
                                        src={group.group_image}
                                        alt={group.group_name}
                                        className="
                                            w-full h-full
                                            object-cover
                                        "
                                    />
                                </div>


                                {/* GROUP INFO */}

                                <div className="flex-1 min-w-0">

                                    <div className="flex items-center gap-2">

                                        <h2
                                            className="
                                                text-base
                                                font-semibold
                                                text-gray-800
                                            "
                                        >
                                            {group.group_name}
                                        </h2>

                                        <span
                                            className={`
                                                text-xs
                                                px-2 py-0.5
                                                rounded-full
                                                ${
                                                    group.status === "active"
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-gray-100 text-gray-500"
                                                }
                                            `}
                                        >
                                            {group.status}
                                        </span>

                                    </div>


                                    <p
                                        className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                            truncate
                                        "
                                    >
                                        {group.group_description}
                                    </p>


                                    <div
                                        className="
                                            flex items-center
                                            gap-5
                                            mt-2
                                            text-xs
                                            text-gray-500
                                        "
                                    >
                                        <span>
                                            {group.category_count} Categories
                                        </span>

                                        <span>
                                            {group.product_count.toLocaleString()} Products
                                        </span>
                                    </div>

                                </div>


                                {/* ACTIONS */}

                                <div
                                    className="relative"
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                >

                                    <button
                                        onClick={() =>
                                            setOpenMenu(
                                                openMenu === group._id
                                                    ? null
                                                    : group._id
                                            )
                                        }
                                        className="
                                            p-2
                                            rounded-lg
                                            hover:bg-gray-100
                                            text-gray-500
                                        "
                                    >
                                        <FiMoreVertical size={18} />
                                    </button>


                                    {openMenu === group._id && (

                                        <div
                                            className="
                                                absolute
                                                right-0
                                                top-10
                                                z-20
                                                w-36
                                                bg-white
                                                border
                                                border-gray-200
                                                rounded-xl
                                                shadow-lg
                                                overflow-hidden
                                            "
                                        >

                                            <MenuItem
                                                icon={<FiEye />}
                                                label="View"
                                            />

                                            <MenuItem
                                                icon={<FiEdit />}
                                                label="Edit"
                                            />

                                            <MenuItem
                                                icon={<FiTrash2 />}
                                                label="Delete"
                                                danger
                                            />

                                        </div>

                                    )}

                                </div>


                                {/* EXPAND ICON */}

                                <div
                                    className="
                                        text-gray-400
                                        flex-shrink-0
                                    "
                                >
                                    {expanded
                                        ? <FiChevronDown size={20} />
                                        : <FiChevronRight size={20} />
                                    }
                                </div>

                            </div>


                            {/* EXPANDED CATEGORIES */}

                            {expanded && (

                                <div
                                    className="
                                        border-t
                                        border-gray-100
                                        bg-gray-50/50
                                        p-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            mb-3
                                        "
                                    >

                                        <div>

                                            <h3
                                                className="
                                                    text-sm
                                                    font-semibold
                                                    text-gray-700
                                                "
                                            >
                                                Categories
                                            </h3>

                                            <p
                                                className="
                                                    text-xs
                                                    text-gray-400
                                                    mt-0.5
                                                "
                                            >
                                                Manage categories under{" "}
                                                {group.group_name}
                                            </p>

                                        </div>


                                        <button
                                            className="
                                                flex items-center
                                                gap-1.5
                                                px-3 py-2
                                                rounded-lg
                                                bg-cyan-50
                                                hover:bg-cyan-100
                                                text-cyan-600
                                                text-xs
                                                font-medium
                                                transition
                                            "
                                        >
                                            <FiPlus size={15} />
                                            Add Category
                                        </button>

                                    </div>


                                    {/* CATEGORY LIST */}

                                    <div className="space-y-2">

                                        {group.categories.map(
                                            (category) => (

                                                <CategoryRow
                                                    key={category._id}
                                                    category={category}
                                                />

                                            )
                                        )}

                                    </div>

                                </div>

                            )}

                        </div>
                    );
                })}


                {/* EMPTY STATE */}

                {filteredGroups.length === 0 && (

                    <div
                        className="
                            py-16
                            text-center
                            border border-dashed
                            border-gray-200
                            rounded-2xl
                        "
                    >

                        <FiSearch
                            size={30}
                            className="
                                mx-auto
                                text-gray-300
                                mb-3
                            "
                        />

                        <p
                            className="
                                text-sm
                                font-medium
                                text-gray-600
                            "
                        >
                            No groups or categories found
                        </p>

                        <p
                            className="
                                text-xs
                                text-gray-400
                                mt-1
                            "
                        >
                            Try another search term
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
};


/* -------------------------------- */
/* SUMMARY CARD */
/* -------------------------------- */

const SummaryCard = ({ icon, value, title }) => {

    return (
        <div
            className="
                border border-gray-200
                rounded-2xl
                p-4
                flex items-center
                gap-4
                bg-white
            "
        >

            <div
                className="
                    w-11 h-11
                    rounded-xl
                    bg-cyan-50
                    text-cyan-500
                    flex items-center
                    justify-center
                    text-xl
                "
            >
                {icon}
            </div>

            <div>

                <p
                    className="
                        text-xl
                        font-semibold
                        text-gray-800
                    "
                >
                    {value}
                </p>

                <p
                    className="
                        text-xs
                        text-gray-500
                        mt-0.5
                    "
                >
                    {title}
                </p>

            </div>

        </div>
    );
};


/* -------------------------------- */
/* MENU ITEM */
/* -------------------------------- */

const MenuItem = ({
    icon,
    label,
    danger = false
}) => {

    return (
        <button
            className={`
                w-full
                flex items-center
                gap-2
                px-3 py-2
                text-sm
                hover:bg-gray-50
                ${
                    danger
                        ? "text-red-500"
                        : "text-gray-600"
                }
            `}
        >
            {icon}
            {label}
        </button>
    );
};


/* -------------------------------- */
/* CATEGORY ROW */
/* -------------------------------- */

const CategoryRow = ({ category }) => {

    return (
        <div
            className="
                flex items-center
                gap-3
                bg-white
                border border-gray-100
                rounded-xl
                px-3 py-2.5
                hover:border-gray-200
                transition
            "
        >

            {/* IMAGE */}

            <div
                className="
                    w-10 h-10
                    rounded-lg
                    overflow-hidden
                    bg-gray-100
                    flex-shrink-0
                "
            >

                <img
                    src={category.category_image}
                    alt={category.category_name}
                    className="
                        w-full h-full
                        object-cover
                    "
                />

            </div>


            {/* CATEGORY INFO */}

            <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2">

                    <p
                        className="
                            text-sm
                            font-medium
                            text-gray-700
                        "
                    >
                        {category.category_name}
                    </p>

                    <span
                        className={`
                            text-[10px]
                            px-1.5 py-0.5
                            rounded-full
                            ${
                                category.status === "active"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-100 text-gray-400"
                            }
                        `}
                    >
                        {category.status}
                    </span>

                </div>

                <p
                    className="
                        text-xs
                        text-gray-400
                        mt-0.5
                        truncate
                    "
                >
                    {category.category_description}
                </p>

            </div>


            {/* PRODUCT COUNT */}

            <div
                className="
                    text-right
                    min-w-[100px]
                "
            >

                <p
                    className="
                        text-sm
                        font-medium
                        text-gray-700
                    "
                >
                    {category.product_count.toLocaleString()}
                </p>

                <p
                    className="
                        text-[11px]
                        text-gray-400
                    "
                >
                    Products
                </p>

            </div>


            {/* ACTION */}

            <button
                className="
                    p-2
                    rounded-lg
                    text-gray-400
                    hover:bg-gray-100
                    hover:text-gray-600
                "
            >
                <FiMoreVertical size={17} />
            </button>

        </div>
    );
};


export default AdminGroupCategoryPage;