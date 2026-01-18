import { redirect } from "next/navigation";
import CustomerPortalRedirect from "~/components/CustomerPortalRedirect";
import { getFirebaseSession } from "~/lib/server/firebase-session";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getFirebaseSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <CustomerPortalRedirect />;
}
