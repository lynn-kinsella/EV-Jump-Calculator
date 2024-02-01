import { ReactElement, useState } from "react";

interface PokeItemGroup {
    children: ReactElement[] | ReactElement;
    label: string;
    dir: "row" | "col" | "wrap"
    gap: "sm" | "md"
}


function Collapse({ children, label, dir, gap }: PokeItemGroup) {
    const [show, setShow] = useState<boolean>(false)
    return (
        <div className={`w-[100%] flex flex-col gap-2`}>
            <div onClick={() => { setShow(a => !a) }} className="border-2 px-4 w-fit select-none" >{show ? "Hide" : "Show"} {label}</div>
            {dir != "wrap" ?
                <div>
                    {gap == "sm" ?
                        (<div className={"px-4 w-[100%] flex gap-2 flex-" + dir}>
                            {show && children}
                        </div>)
                        :
                        (<div className={"px-4 w-[100%] flex gap-4 flex-" + dir}>
                            {show && children}
                        </div>)
                    }
                </div>

                : <div>
                    {gap == "sm" ?
                        (<div className={"px-4 w-[100%] flex gap-x-2 gap-y-1 flex-" + dir}>
                            {show && children}
                        </div>)
                        :
                        (<div className={"px-4 w-[100%] flex gap-x-4 gap-y-2 flex-" + dir}>
                            {show && children}
                        </div>)
                    }
                </div>
            }

        </div >
    )
}

export default Collapse