import { IUser } from "@/utils/types";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { UserEl } from "./UserEl";

export const AdminPanel = () => {
  const [usersData, setUsersData] = useState<IUser[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const dbRequest = async () => {
      const response = await fetch("/api/getAll");
      const responseData = await response.json();
      setUsersData(responseData);
      console.log(responseData);
      setIsLoading(false);
    };
    void dbRequest();
  }, []);

  const removeUser = async (id: string) => {
    const newUsers = usersData?.filter((el) => el.id !== id);
    if (newUsers) {
      setUsersData(newUsers);
      await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gradient-to-b from-white via-white to-black">
        <Spinner className="" width={300} height={150} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-white via-white to-black p-10">
      <h1 className="mix-blend-difference w-full text-4xl text-white text-center">
        Admin Panel
      </h1>
      <div className="mt-24 gap-10 flex flex-col">
        {usersData
          ?.filter((el) => el.name !== "admin")
          .map((el) => (
            <UserEl data={el} key={el.id} removeUser={removeUser} />
          ))}
      </div>
    </div>
  );
};
