import { signOut } from "../../auth";
import Button from "next/link";

export function SignOut() {
  return (
    <div>
      <Button href="/" onClick={() => signOut()}>Se deconnecter</Button>
    </div>
  );
}