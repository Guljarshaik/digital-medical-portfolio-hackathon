interface LoadingSkeletonProps {
    variant?: 'card' | 'list' | 'table' | 'profile';
    count?: number;
}

export default function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
    const renderSkeleton = () => {
        switch (variant) {
            case 'card':
                return (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                );

            case 'list':
                return (
                    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center space-x-4 animate-pulse">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                );

            case 'table':
                return (
                    <div className="bg-white rounded-lg border border-gray-200 animate-pulse">
                        <div className="p-4 border-b border-gray-200">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                        <div className="p-4 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex space-x-4">
                                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
            ))}
        </div>
    );
}
