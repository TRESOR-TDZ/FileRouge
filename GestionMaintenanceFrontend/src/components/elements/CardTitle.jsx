import { cn } from 'classnames';
const CardTitle = ({ className, children, ...props }) => {
    return (
        <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props}>
            {children}
        </h3>
    );
};

export default CardTitle;