import { Link } from 'react-router-dom';

type BreadcrumbItem = {
    label: string;
    path?: string;
};

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <svg
                                className="h-5 w-5 text-gray-300"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                        )}
                        {item.path ? (
                            <Link
                                to={item.path}
                                className={`ml-2 ${
                                    index === items.length - 1
                                        ? 'text-gray-900 font-medium'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="ml-2 text-gray-900 font-medium">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
