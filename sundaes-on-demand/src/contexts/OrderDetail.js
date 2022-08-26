import {
    createContext,
    useContext,
    useState,
    useMemo
} from 'react';

const OrderDetails = createContext();

function useOrderDetails() {
    const context = useContext(OrderDetails);

    if (!context) {
        throw new Error('useOrderDetails must be used within an OrderdetailProvider');
    }

    return context;
}

function OrderdetailProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });
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
        return [{ ...optionCounts }, updateItemCount];
    }, [optionCounts]);
    return <OrderDetails.Provider value={value} {...props} />
}