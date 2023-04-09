import axios from 'axios'
import {useEffect, useState} from "react";
import Row from 'react-bootstrap/Row'
import ScoopOption from "./ScoopOptions";
import ToppingOption from './ToppingOption'
import AlertBanner from "./common/AllertBanner";
import {pricePerItem} from "../../constants";
import {useOrderDetails} from "../../contexts/OrderDetails";

export default function Options({optionType}){
    const [items, setItems] = useState([])
    const [error, setError] = useState(false)
    const [orderDetails, updateIteCount] = useOrderDetails()

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(response => setItems(response.data))
            .catch(error => setError(true))
    }, [optionType])

    if(error){
        return <AlertBanner />
    }

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

    const optionItems = items.map((it) => (
        <>
            <h2>{title}</h2>
            <p>{pricePerItem[optionType]} each</p>
            <p>{title} total: {orderDetails.totals[optionType]}</p>
            <Row>
                <ItemComponent
                    key={it.name}
                    name={it.name}
                    imagePath={it.imagePath}
                    updateItemCount={(itemName, newItemCount) =>
                        updateIteCount(itemName, newItemCount, optionType)}
                />
            </Row>
        </>

    ))

    return <Row>{optionItems}</Row>
}