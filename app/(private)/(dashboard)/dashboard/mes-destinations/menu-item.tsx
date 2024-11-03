
import { getCurrentUser } from "@/core/lib/session"
import { MesDestinations } from "./mes-destinations"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDestination } from "@/core/services/destinationService";
import { useRouter } from "next/navigation";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export default function MenuItem({ slug }: { slug: string }) {

  const router = useRouter()

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (slug: string) => {
      return deleteDestination(slug)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserDestinations"] })
    },
  });

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onClick={() => {
          mutation.mutate(slug)
        }
        }
      >
        Supprimer
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => {
          router.push(`/destination-chien-accepte/${slug}/edit`)
        }}
      >Modifier
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          router.push(`/destination-chien-accepte/${slug}`)
        }}
      >Voir</DropdownMenuItem>
    </DropdownMenuContent>
  );
}
