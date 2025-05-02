import { cn } from 'classnames';

/**
 * Composant CardContent réutilisable.
 */
const CardContent = ({ className, children, ...props }) => {
    return (
        <div className={cn("p-6 pt-0", className)} {...props}>
            {children}
        </div>
    );
};

export default CardContent;