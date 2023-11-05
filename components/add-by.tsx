import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "../@core/lib/utils"
import Text from "./ui/text/Text"

interface AddByProps {
  pseudo: string
  updatedAt: string
  className?: string
}

export default function AddBy({ pseudo, updatedAt, className }: AddByProps) {
  return (
    <div className={cn(className)}>
      <Text type="gray">
        Dernière mise à jour le {new Date(updatedAt).toLocaleString()}
      </Text>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/49157786?s=400&u=d0292f91b205bfa2030feec971afd1aaeb0fc1f2&v=4" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Text type="gray">Ajouté par {pseudo}</Text>
      </div>
    </div>
  )
}
