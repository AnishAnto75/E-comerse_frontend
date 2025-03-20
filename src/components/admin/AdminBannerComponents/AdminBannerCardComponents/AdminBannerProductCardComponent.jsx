import {Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
   
const AdminBannerProductCardComponent = ({product})=> {

    return (
      <Card className="h-80 min-w-60 max-w-60 ">
        <CardHeader shadow={false} floated={false} className="h-52">
            <Link to={`/admin/products/${product?.product_barcode}`}>
            <img src={ product?.product_photos ? product.product_photos : "https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"} alt={product?.product_name} className="h-full w-full object-cover"/>
            </Link>
        </CardHeader>
        <CardBody>
            <div className="text-sm  mt-1 ">{product?.product_name}</div>
        </CardBody>
      </Card>
    );
  }

export default AdminBannerProductCardComponent
