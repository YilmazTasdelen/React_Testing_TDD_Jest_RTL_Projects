import {
    createContext,
    useContext,
    useState,
    useMemo,
    useEffect
} from 'react';
import { pricePerItem } from '../constants/index';
import { formatCurrency } from "../utilities";

const OrderDetails = createContext();

export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if (!context) {
        throw new Error('useOrderDetails must be used within an OrderdetailProvider');
    }

    return context;
}

function calculateSubTotal(optionType, optionCounts) {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }
    return optionCount * pricePerItem[optionType];
}



export function OrderdetailProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });

    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubTotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubTotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        });
    }, [optionCounts])

    //getter: object  containing option count for scoops and toppings,subtotals
    //setter: update option count 
    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, OptionType) {
            const newOptionCounts = { ...optionCounts };

            //update ıoption count for this item with the new vale
            const ıptionCountsMap = optionCounts[OptionType];
            ıptionCountsMap.set(itemName, parseInt(newItemCount));
            setOptionCounts(newOptionCounts);
        }
        return [{ ...optionCounts, totals }, updateItemCount];
    }, [optionCounts, totals]);
    return <OrderDetails.Provider value={value} {...props} />
}