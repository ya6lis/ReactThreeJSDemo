import "./button.css";

const Button = ({ children, onClick, className, ...props }) => {
    return (
        <button 
            onClick={onClick} 
            className={`btn btn-book ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;