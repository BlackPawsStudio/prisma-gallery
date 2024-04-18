"use client";
import { AdminPanel } from "@/components/ProfilePage/AdminPanel";
import ProfilePage from "@/components/ProfilePage/ProfilePage";
import { Spinner } from "@/components/Spinner";
import { IUser } from "@/utils/types";
import { useLayoutEffect, useState } from "react";

const ProfilePageComponent = () => {
  const [data, setData] = useState<IUser | null>(null);

  const [id, setId] = useState<string | null>("");

  useLayoutEffect(() => {
    const userId = localStorage.getItem("nickname");
    setId(userId);
    const dbRequest = async () => {
      const response = await await fetch(`/api/user/${userId}`);
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    };
    void dbRequest();
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (data?.name === "admin") {
    return <AdminPanel />;
  }

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gradient-to-b from-white via-white to-black">
        <Spinner className="" width={300} height={150} />
      </div>
    );
  }

  return data && <ProfilePage data={data} />;
};

export default ProfilePageComponent;
