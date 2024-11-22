export default function Callout({children} : {children : React.ReactNode}){
    return (
        <div className="my-6 flex items-center rounded-md border border-l-fuchsia-400">
            <div>
                {children}
            </div>
        </div>
    )
}
