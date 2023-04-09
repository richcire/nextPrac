import getUser from "@/app/lib/getUser";
import getUserPosts from "@/app/lib/getUserPosts";
import { Metadata } from "next";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";

type Params = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user = await userData;

  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

export default async function Userpage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostData: Promise<Post[]> = getUserPosts(userId);
  const user = await userData;
  // const userPosts = await userPostData;
  // const [user, userPosts] = await Promise.all([userData, userPostData]);
  return (
    <>
      <div>User Page</div>
      <h2>{user.name}</h2>
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error Async Server Component */}
        <UserPosts promise={userPostData} />
      </Suspense>
      <br />
    </>
  );
}
