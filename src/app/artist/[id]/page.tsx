"use client";
import "@/app/globals.css";
import "swiper/css";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/utils/types";
import { Spinner } from "@/components/Spinner";
import ArtistPageComponent from "@/components/ArtistPage/ArtistPage";
import ProfilePage from "@/components/ProfilePage/ProfilePage";

const ArtistPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<IUser | null>(null);

  const [userName, setUsername] = useState<string | null>("");

  useLayoutEffect(() => {
    const dbRequest = async () => {
      const response = await await fetch(`/api/user/${params.id}`);
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    };
    setUsername(localStorage.getItem("nickname"));
    void dbRequest();
  }, [params.id]);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gradient-to-b from-white via-white to-black">
        <Spinner className="" width={300} height={150} />
      </div>
    );
  }

  if (!isLoading && !data) {
    router.push("/");
    return;
  }

  if (data?.id === userName) {
    return data && <ProfilePage data={data} />;
  } else return data && <ArtistPageComponent data={data} />;
};

export default ArtistPage;
