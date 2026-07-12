import { Link } from "react-router-dom";

function PortalCard({

    index,
    title,
    description,
    button,
    link,

}) {

    return (

        <div
            className="
            bg-[#131922]
            border
            border-[#232B36]
            rounded-md
            p-8
            transition-all
            duration-300
            hover:border-[#4FD1C5]/50
            hover:-translate-y-1
            "
        >

            <p
                className="
                font-['IBM_Plex_Mono']
                text-xs
                tracking-widest
                text-[#4FD1C5]
                uppercase
                mb-5
                "
            >
                {index}
            </p>

            <h2
                className="
                font-['IBM_Plex_Mono']
                text-2xl
                font-semibold
                text-[#E6EAF0]
                leading-tight
                "
            >
                {title}
            </h2>

            <p
                className="
                mt-5
                text-sm
                leading-relaxed
                font-['IBM_Plex_Sans']
                text-[#8A94A3]
                min-h-[90px]
                "
            >
                {description}
            </p>

            <Link to={link}>

                <button
                    className="
                    mt-8
                    w-full
                    border
                    border-[#4FD1C5]/40
                    rounded-md
                    py-3.5
                    font-['IBM_Plex_Mono']
                    text-sm
                    text-[#4FD1C5]
                    hover:bg-[#4FD1C5]/10
                    transition-colors
                    "
                >
                    {button}
                </button>

            </Link>

        </div>

    );

}

export default PortalCard;