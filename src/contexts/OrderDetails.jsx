import {createContext, useContext, useState, useMemo, useEffect} from "react";
import {pricePerItem} from "../constants";
import {formatCurrency} from "../utilities";

const OrderDetails = createContext()

// create custom book to check whether we're inside a provider
export function useOrderDetails(){
    const context = useContext(OrderDetails)
    if(!context){
        throw new Error('useOrderDetails must be used within an OrderDetailsProvider')
    }

    return context
}

function calculateSubtotal(optionType, optionCounts){
    let optionCount = 0;
    for(const count of optionCount[optionType].values()){
        optionCount += count
    }
    return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props){
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    })
    const zeroCurrency = formatCurrency(0)
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    })

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts)
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
        const grandTotal = scoopsSubtotal + toppingsSubtotal
        setTotals({
            scoops: zeroCurrency(scoopsSubtotal),
            toppings: zeroCurrency(toppingsSubtotal),
            grandTotal: zeroCurrency(grandTotal)
        })
    },[optionCounts])

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType){
            const newOptionCounts = {...optionCounts}

            const optionCountsMap = optionCounts[optionType]
            optionCountsMap.set(itemName, parseInt(newItemCount))

            setOptionCounts(newOptionCounts)
        }
        function resetOrder(){
            setOptionCounts({
                scoops: new Map(),
                toppings: new Map()
            })
        }
        return [{...optionCounts, totals}, updateItemCount, resetOrder]
    }, [optionCounts, totals])

    return <OrderDetails.Provider value={value} {...props} />
}