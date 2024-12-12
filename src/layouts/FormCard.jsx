import PropTypes from "prop-types";

function FormCard({children, title}) {
    return (
        <div className="flex flex-grow justify-center items-center border-black border-2">
            <div className="bg-gray-400 max-w-md w-full p-10 rounded-md text-black">
                <div className={'flex flex-col pb-[5em] justify-center items-center'}>
                    <h1 className='text-2xl font-bold text-center pb-2 text-blue-800'>{title}</h1>
                    <img className={'w-1/5 h-1/5'}
                        src="https://res.cloudinary.com/dmmlxlio3/image/upload/v1734040288/kkh7z3uvzfpota73pniw.jpg"
                         alt="No se encontro la imagen"/>
                </div>
                {children}
            </div>
        </div>
    );
}

FormCard.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}

export default FormCard;