import * as React from "react"
import { cn } from "@/@core/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [typeValue, setTypeValue] = React.useState(type)
    return (
      <div className={`flex ${type === "file" ? "" : "justify-end"}`}>
        <input
          type={typeValue}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {props.maxLength && typeof props.value === "string" && (
          <p
            className={`absolute mr-2 mt-2 ${
              props.value.length > props.maxLength
                ? "text-red-500"
                : "text-slate-400"
            }`}
          >
            {props.value.length} / {props.maxLength}
          </p>
        )}

        {type === "password" && (
          <button
            onClick={() =>
              typeValue === "text"
                ? setTypeValue("password")
                : setTypeValue("text")
            }
            type="button"
            className="absolute mr-3 mt-3 text-black"
          >
            {typeValue === "text" ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
