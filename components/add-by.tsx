import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "../core/lib/utils"
import Text from "./ui/text/Text"

interface AddByProps {
  pseudo: string
  userId: string
  updatedAt: string
  className?: string
}

export default function AddBy({ pseudo, userId, updatedAt, className }: AddByProps) {
  return (
    <div className={cn(className)}>
      <Text type="gray">
        Dernière mise à jour le {new Date(updatedAt).toLocaleString()}
      </Text>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}users/${userId}/picture`} />
          <AvatarFallback>NO</AvatarFallback>
        </Avatar>
        <Text type="gray">Ajouté par {pseudo}</Text>
      </div>
    </div>
  )
}
