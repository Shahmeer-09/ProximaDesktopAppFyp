import { onAuthenticate } from "@/actions/user";
import { redirect } from "next/navigation";

const page = async () => {

    const  data= await onAuthenticate();    if (data.data?.workspace[0].id) {
      return redirect(`/dashbord/${data.data?.workspace[0].id}`);
    } else if ([403, 400, 500].includes(data?.staus) && data.data == null) {
      return redirect(`/auth/sign-in`);
    }   
};

export default page;
