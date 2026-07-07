import { Link } from "react-router-dom";

function PortalCard({

    title,
    description,
    button,
    link

}) {

    return (

        <div
            className="
            bg-white
            rounded-xl
            shadow-xl
            p-8
            hover:scale-105
            transition
            "
        >

            <h2
                className="
                text-3xl
                font-bold
                text-blue-700
                mb-5
                "
            >
                {title}
            </h2>

            <p
                className="
                text-gray-600
                mb-8
                "
            >
                {description}
            </p>

            <Link
                to={link}
            >

                <button
                    className="
                    bg-blue-600
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    hover:bg-blue-700
                    "
                >
                    {button}
                </button>

            </Link>

        </div>

    );

}

export default PortalCard;