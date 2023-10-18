import { RouteData } from "@/app/context";
import { useContext } from "react"

export function TransactionView() {
    const {etherAmount, destinationAddress} = useContext(RouteData);
    return (
        <div style={{"border":"1px black"}}>
            <h3 style={{"color": "black"}}>Transaction View</h3>
            <p>Amount: {etherAmount.toString()}</p>
            <p>To: {destinationAddress}</p>
        </div>
    )
}