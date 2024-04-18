import { FormEvent, useState } from "react";
import { Spinner } from "../Spinner";
import { useRouter } from "next/navigation";

interface LogInModalProps {
  close: () => void;
}

export const LogInModal = ({ close }: LogInModalProps) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const loginResponse = await await fetch("/api/user/auth", {
      method: "POST",
      body: JSON.stringify({ username: nickname, password }),
    });

    const data = await loginResponse.json();

    console.log(data);

    const { success, error, id } = data;

    if (error) {
      alert(error);
      setIsLoading(false);
      return;
    }

    if (success) {
      close();
      localStorage.setItem("nickname", id);
      router.push(`/artist/${id}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#00000099] fixed top-0 left-0 flex items-center justify-center z-50">
      <form
        className="w-1/3 h-1/2 bg-white border-2 border-black rounded-3xl p-10 text-black"
        onSubmit={onSubmit}
      >
        <h3 className="text-4xl font-bold">Welcome back!</h3>
        <div className="mx-auto flex flex-col mt-10 justify-around h-4/5">
          <input
            type="text"
            placeholder="Enter your nickname"
            className="p-4 rounded-full border-black border-2"
            minLength={3}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="p-4 rounded-full border-black border-2"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoading ? (
            <Spinner className="mx-auto" width={230} height={60} />
          ) : (
            <button
              type="submit"
              className="p-4 border-black rounded-full bg-white text-black border-2 text-center hover:scale-110 hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Log in
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
