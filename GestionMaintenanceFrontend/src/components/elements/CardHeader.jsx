import { cn } from 'classnames';

const CardHeader = ({ className, children, ...props }) => {
    return (
        <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
            {children}
        </div>
    );
};

export default CardHeader;
