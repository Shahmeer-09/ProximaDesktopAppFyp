"use client";
import { enableFirstView, getFirstView } from "@/actions/user";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [isFirstView, setIsFirstView] = useState<boolean | undefined>(
    undefined
  );
  useEffect(() => {
    if(isFirstView !==undefined) return
    const fetchData = async () => {
      const firstview = await getFirstView();
      if (firstview.status === 200) {
        setIsFirstView(firstview.data!);
      }
    };
    fetchData();
  }, [isFirstView]);

  const handleSwitchChange = async (checked: boolean) => {
    const enabled = await enableFirstView(checked);
    if (enabled.status === 200) {
      toast.success("Success", { description: enabled.data });
    } else if (enabled.status !== 200) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mt-4">Video Sharing Settings</h2>
      <p className="text-muted-foreground">
        Enabling this feature will send you notifications when someone watched
        your video for the first time. This feature can help during client
        outreach.
      </p>
      <Label className="flex items-center gap-x-3 mt-4 text-md">
        Enable First View
        <Switch
        className="data-[state=checked]:bg-white data-[state=unchecked]:bg-black"
          onCheckedChange={handleSwitchChange}
          disabled={isFirstView === undefined}
          checked={isFirstView}
          onClick={() => setIsFirstView(!isFirstView)}
        />
      </Label>
    </div>
  );
};

export default Page;
