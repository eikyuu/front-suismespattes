import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from './icons'


export function UserAvatar({ user, ...props }: any) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}