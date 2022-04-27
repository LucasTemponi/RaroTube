import React, { ReactNode, useState } from "react";

export type Props = {
    children: ReactNode;
}

export const Sidebar:React.FC<Props> = ({children}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex flex-row w-full " >
            <div className="flex flex-col min-h-screen w-48 pl-8 bg-raro-cobalto">
                    <h2>Sidebar</h2>
                    <h3 onClick={()=>setIsOpen(!isOpen)} >Semana 1</h3>
                        <ul>
                            <li>Video 1 </li>
                            <li>Video 2 </li>
                        </ul>
                </div>            
            <div>
                <div className="w-full ml-48" >{children}</div>        
            </div>
        </div>
    )
}