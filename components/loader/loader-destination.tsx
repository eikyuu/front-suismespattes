// import React from "react"

// import { Skeleton } from "@/components/ui/skeleton"

// function LoaderDestination() {
//   return (
//     <>
//       <div className="container mt-5 flex w-full animate-pulse flex-col">
//         <div className="w-full">
//           <Skeleton className="h-[40px] w-[500px]" />
//         </div>
//         <div className="mt-3 flex w-full items-center space-x-3">
//           <Skeleton className="h-[20px] w-[120px] rounded-lg" />
//           <Skeleton className="h-[20px] w-[120px] rounded-lg" />
//           <Skeleton className="h-[20px] w-[120px] rounded-lg" />
//           <Skeleton className="h-[20px] w-[120px] rounded-lg" />
//           <Skeleton className="h-[20px] w-[120px] rounded-lg" />
//         </div>
//         <div>
//           <Skeleton className="mt-3 h-[20px] w-[200px] rounded-full" />
//           <div className="mt-3 flex items-center space-x-3">
//             <Skeleton className="h-[50px] w-[50px] rounded-full" />
//             <Skeleton className="h-[20px] w-[150px]" />
//           </div>
//         </div>
//         <div className="w-fullspace-x-3 mt-3 flex">
//           <div className="w-full space-y-3 md:w-1/2">
//             <Skeleton className="h-[20px] w-[600px]" />
//             <Skeleton className="h-[20px] w-[500px]" />
//             <Skeleton className="h-[20px] w-[600px]" />
//             <Skeleton className="h-[20px] w-[500px]" />
//             <Skeleton className="h-[20px] w-[600px]" />
//             <Skeleton className="h-[20px] w-[500px]" />
//           </div>
//           <div className="w-full md:w-1/2">
//             <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
//               <Skeleton className="h-[100px] w-[150px]" />
//               <Skeleton className="h-[100px] w-[150px]" />
//               <Skeleton className="h-[100px] w-[150px]" />
//               <Skeleton className="h-[100px] w-[150px]" />
//             </div>
//             <Skeleton className="mt-3 h-[20px] w-[200px]" />
//             <Skeleton className="mt-3 h-[394px] w-[644px]" />
//           </div>
//         </div>
//         <Skeleton className="mt-3 h-[20px] w-[800px]" />
//         <Skeleton className="mt-3 h-[20px] w-[600px]" />
//       </div>
//     </>
//   )
// }

// export default LoaderDestination

import React from "react"

import { Skeleton } from "@/components/ui/skeleton"

function LoaderDestination() {
  return (
    <>
      <div className="container mt-5 flex w-full animate-pulse flex-col">
        <div className="w-full">
          <Skeleton className="h-[40px] w-full md:w-[500px]" />
        </div>
        <div className="mt-3 flex w-full items-center space-x-3">
          <Skeleton className="h-[20px] w-full rounded-lg md:w-[120px]" />
          <Skeleton className="h-[20px] w-full rounded-lg md:w-[120px]" />
          <Skeleton className="h-[20px] w-full rounded-lg md:w-[120px]" />
          <Skeleton className="h-[20px] w-full rounded-lg md:w-[120px]" />
          <Skeleton className="h-[20px] w-full rounded-lg md:w-[120px]" />
        </div>
        <div>
          <Skeleton className="mt-3 h-[20px] w-full rounded-full md:w-[200px]" />
          <div className="mt-3 flex items-center space-x-3">
            <Skeleton className="h-[50px]  w-[50px] rounded-full" />
            <Skeleton className="h-[20px] w-full md:w-[150px]" />
          </div>
        </div>
        <div className="w-fullspace-x-3 mt-3 flex flex-col md:flex-row">
          <div className="w-full space-y-3 md:w-1/2">
            <Skeleton className="h-[20px] w-full md:w-[600px]" />
            <Skeleton className="h-[20px] w-full md:w-[500px]" />
            <Skeleton className="h-[20px] w-full md:w-[600px]" />
            <Skeleton className="h-[20px] w-full md:w-[500px]" />
            <Skeleton className="h-[20px] w-full md:w-[600px]" />
            <Skeleton className="h-[20px] w-full md:w-[500px]" />
          </div>
          <div className="w-full md:w-1/2">
            <div className="mt-3 grid grid-cols-2 gap-3 md:mt-0 md:grid-cols-4">
              <Skeleton className="h-[100px] w-full md:w-[150px]" />
              <Skeleton className="h-[100px] w-full md:w-[150px]" />
              <Skeleton className="h-[100px] w-full md:w-[150px]" />
              <Skeleton className="h-[100px] w-full md:w-[150px]" />
            </div>
            <Skeleton className="mt-3 h-[20px] w-full md:w-[200px]" />
            <Skeleton className="mt-3 h-[394px] w-full md:w-[644px]" />
          </div>
        </div>
        <Skeleton className="mt-3 h-[20px] w-full md:w-[800px]" />
        <Skeleton className="mt-3 h-[20px] w-full md:w-[600px]" />
      </div>
    </>
  )
}

export default LoaderDestination
