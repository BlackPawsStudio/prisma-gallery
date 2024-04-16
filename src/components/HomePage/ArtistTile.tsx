import { IUser } from "@/utils/types";
import { useRouter } from "next/navigation";

interface ArtistTileProps {
  data: IUser;
}

export const ArtistTile = ({ data }: ArtistTileProps) => {
  const router = useRouter();

  return (
    <div
      className="w-2/5 p-5 border-2 rounded-xl hover:scale-110 transition-all cursor-pointer"
      style={{
        borderColor: data.colors.lightColor,
        background: `linear-gradient(${data.colors.mainColor}, ${data.colors.mainDarkerColor})`,
        color: data.colors.textColor,
      }}
      onClick={() => router.push(`/artist/${data.id}`)}
    >
      <p className="text-2xl">{data.name}</p>
      {data.count} items loaded
    </div>
  );
};
