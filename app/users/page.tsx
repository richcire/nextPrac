import { Metadata } from "next";
import Link from "next/link";
import getAllUsers from "../lib/getAllUsers";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const userData: Promise<User[]> = getAllUsers();
  const users = await userData;
  return (
    <section>
      <h1>Users Page</h1>
      <h2>
        <Link href="/">Go back to home</Link>
      </h2>
      <br />
      {users.map((user) => (
        <>
          <p key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </p>
          <br />
        </>
      ))}
    </section>
  );
}
