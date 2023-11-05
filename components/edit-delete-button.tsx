import { Fragment } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { deleteDestination } from "../@core/services/destinationService"
import { Button } from "./ui/button"

interface Props {
  slug: string
}

export default function EditDeleteButton({ slug }: Props) {
  const queryClient = useQueryClient()

  const router = useRouter()

  const { data: session } = useSession()

  const mutation = useMutation({
    mutationFn: (slug: string) => {
      return deleteDestination(slug)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["destinationBySlug"] })
      router.push("/")
    },
  })

  return (
    <Fragment>
      {session?.user?.roles?.includes("ROLE_ADMIN") && (
        <div className=" mt-5 flex justify-end">
          <Link
            className="relative right-0 top-0 mr-2 block"
            href={`/destination-chien-accepte/${slug}/edit`}
          >
            <Button>MODIFIER</Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={"destructive"}
                className="relative right-0 top-0 block"
              >
                SUPPRIMER
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Voulez-vous vraiment supprimer cette destination ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Si vous supprimez cette destination, vous ne pourrez plus la
                  récupérer. Vous pouvez la modifier si vous le souhaitez.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  variant={"destructive"}
                  onClick={() => {
                    mutation.mutate(slug)
                  }}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </Fragment>
  )
}
