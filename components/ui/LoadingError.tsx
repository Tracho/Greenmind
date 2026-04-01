function LoadingError({children}:{children?:React.ReactNode}) {
  return ( <>
    <div className="flex flex-col justify-center">
      <h1 className="text-red-500">This page loading error...</h1>
      {children}
    </div>
  </> );
}

export default LoadingError;