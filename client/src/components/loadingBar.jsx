const LoadingBar = () => {
    return(
        <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="border-4 border-t-1 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
                <h2 className="text-blue-500 ">Loading...</h2>
        </div>
                
    )
}

export default LoadingBar;