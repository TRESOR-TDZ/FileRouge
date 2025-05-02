import classNames from 'classnames';

const cn = classNames;

/**
 * Composant Badge réutilisable.
 */
const Badge = ({ variant, className, children, ...props }) => {
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    const variantClasses = {
        'default': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
        'secondary': 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
        'outline': 'border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300',
        'destructive': 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
        'success': 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700',
        'warning': 'bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700',
    };

    const combinedClasses = cn( baseClasses, variantClasses[variant || 'default'], className);

    return (
        <span className={combinedClasses} {...props}>
            {children}
        </span>
    );

    
};

export default Badge;