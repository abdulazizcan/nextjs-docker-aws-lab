"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import ConfigureAmplifyClientSide from "./components/ConfigureAmplify";

function HomePageContent() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Hoş Geldin, {user.attributes?.email}
        </h1>
        <p className="mb-8">Başarıyla giriş yaptın!</p>

        <button
          onClick={signOut}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-8"
        >
          Çıkış Yap (Sign Out)
        </button>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <>
      <ConfigureAmplifyClientSide />
      <Authenticator>
        <HomePageContent />
      </Authenticator>
    </>
  );
}
