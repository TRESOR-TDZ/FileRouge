import classNames from 'classnames';

const cn = classNames;
/**
 * Composant Card réutilisable.
 */
const Card = ({ className, children, ...props }) => {
    return (
        <div className={cn("rounded-md border bg-white shadow-sm", className)} {...props}>
            {children}
        </div>
    );
};

export default Card;