import { cn } from 'classnames';
/**
 * Composant CardDescription réutilisable.
 */
const CardDescription = ({ className, children, ...props }) => {
    return (
        <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)} {...props}>
            {children}
        </p>
    );
};

export default CardDescription
;
