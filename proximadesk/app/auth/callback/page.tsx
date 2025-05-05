import { onAuthenticate, revalidateAuthCache } from "@/actions/user";
import { redirect } from "next/navigation";

const callback = async () => {
    const user1 = await onAuthenticate();
    if (user1?.data?.workspace[0].id) {
      revalidateAuthCache()
      return redirect(`/dashbord/${user1.data?.workspace[0].id}`);
    } else if ([403, 400, 500].includes(user1.status) && user1.data == null) {
      return redirect(`/auth/sign-in`);
    }
};

export default callback;
