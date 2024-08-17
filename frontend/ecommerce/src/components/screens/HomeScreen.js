import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios'
import {Row, Col, Card} from 'react-bootstrap'

function HomeScreen(){
    const [products, setProduct] = useState([])

    useEffect(()=>{
        async function fetchproducts() {
            const {data} = await axios.get('/api/products')
            setProduct(data)      
        }
        fetchproducts()
    },[])
    return (
        <Container>
            <br />
            <h1>Products</h1>
            <Row>
                {products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className="my-3 p-3 rounded">
                        <img src={product.product_image}></img>
                        </Card>
                        <h3>{product.product_name}</h3>
                        <h6>{product.product_category}</h6>
                        <h6>{product.product_price}</h6>
                        <h6>{product.product_info}</h6>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
export default HomeScreen