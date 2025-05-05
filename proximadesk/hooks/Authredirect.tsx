"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { UserAuthentication } from "./UserAuthemtication";

const AuthRedirect = () => {
    const { data, refetch, isFetched } = UserAuthentication();

    useEffect(() => {
        refetch(); // Fetch user authentication data on mount
    }, [refetch]);

    if (!isFetched) return null; // Prevent unnecessary redirects before data is ready

    if (data?.data?.workspace[0]?.id) {
        redirect(`/dashbord/${data.data.workspace[0].id}`);
    } else if ([403, 400, 500].includes(data?.status) && data.data == null) {
        redirect(`/auth/sign-in`);
    }

    return null;
};

export default AuthRedirect;
