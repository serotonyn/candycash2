import { ClientResponseError } from "pocketbase";
// import { toast } from "sonner";

export function manageError(error: ClientResponseError) {
  if (error instanceof ClientResponseError) {
    if (!error.isAbort) {
      if (error.status === 0) {
        // toast.error("Le serveur n'est pas connecté");
        return;
      }
      console.log({ error });
    } else {
      console.log("🦙");
    }
  } else {
    console.log({ error });
  }
}
