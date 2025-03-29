const LoadingSpinner = () => {
    return (
    <div className="fixed inset-0 overflow-y-auto z-50">
        <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity"/>
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <div className="animate-spin rounded-full h-28 w-28 border-t-5 border-b-2 border-blue-500"/>
        </div>
    </div>
    );
  };

  export default LoadingSpinner;