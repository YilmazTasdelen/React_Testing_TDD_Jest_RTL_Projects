import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../contexts/OrderDetail';


export default function Options({ optionType }) {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [OrderDetails, updateItemCount] = useOrderDetails();

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => {
                setError(true);
            });
    }, [optionType]);

    if (error) {
        return <AlertBanner />
    }

    // TODO: replace `null` with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
    const tittle = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={(itemName, newItemCount) =>
                updateItemCount(itemName, newItemCount, optionType)
            }
        />
    ));

    return (
        <>
            <h2>{tittle}</h2>
            <p>{pricePerItem[optionType]} each</p>
            <p><span>{tittle} total : {OrderDetails.totals[optionType]}</span></p>
            <Row>{optionItems}</Row>
        </>
    );
}