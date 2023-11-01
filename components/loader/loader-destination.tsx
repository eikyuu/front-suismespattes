import React from "react"

function LoaderDestination() {
  return (
    <div className="container mx-auto flex w-11/12 animate-pulse flex-col pt-10 md:flex-row md:space-x-10">
      <div className="flex-1 space-y-6 py-1">
        <div className="h-72 rounded bg-slate-300 md:h-96"></div>
      </div>
      <div className="flex-1 py-1">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-300"></div>
            <div className="col-span-1 h-2 rounded bg-slate-300"></div>
          </div>
          <div className="h-2 rounded bg-slate-300"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-300"></div>
            <div className="col-span-1 h-2 rounded bg-slate-300"></div>
          </div>
          <div className="h-2 rounded bg-slate-300"></div>
          <div className="h-2 rounded bg-slate-300"></div>
          <div className="h-2 rounded bg-slate-300"></div>
        </div>
      </div>
    </div>
  )
}

export default LoaderDestination
