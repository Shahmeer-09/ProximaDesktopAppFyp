import React, { useEffect, useState } from "react";
import { useQueryData } from "./userQueryData";
import { searchWorkspaces } from "@/actions/user";
export const UseSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [userdata, setUSerData] = useState<
    | {
        id: string;
        subscription: {
          plan: "FREE" | "PRO";
        }|null;
        firstName: string | null;
        lastName: string | null;
        image: string | null;    
        email: string 
      }[]
    | undefined
  >(undefined);
  const onSearchQuery= (e:React.ChangeEvent<HTMLInputElement>)=>{
      setQuery(e.target.value)
  }
  useEffect(()=>{
    const delayFetching = setTimeout(() => {
        setDebouncedQuery(query)
    }, 1000);
    return () => clearTimeout(delayFetching);
 },[query])
  const {refetch, isFetching} = useQueryData(async ({queryKey})=>{
      const params =  queryKey[1] as string;
      if(type =="USERS"){
        const users = await searchWorkspaces(params);
        if(users?.status == 200){
           setUSerData(users?.data ?? []) 
        }
      }
      return []
  },[key,debouncedQuery],)


  useEffect(()=>{
      if(debouncedQuery){
          refetch()
      }else if(!debouncedQuery){
        setUSerData(undefined)
      }
  },[debouncedQuery, refetch])
  return {userdata, onSearchQuery, isFetching, query}
};

