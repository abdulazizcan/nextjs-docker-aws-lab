"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  signIn,
  signUp,
  confirmSignUp,
  getCurrentUser,
} from "aws-amplify/auth";
import ConfigureAmplifyClientSide from "./components/ConfigureAmplify";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // <-- YENİ: Yüklenme durumu
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        await getCurrentUser();
        router.push("/dashboard");
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      setIsSigningUp(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await confirmSignUp({ username: email, confirmationCode: authCode });
      alert("Hesap başarıyla doğrulandı! Lütfen giriş yapın.");
      window.location.reload();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signIn({ username: email, password });
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
        Yönlendiriliyor...
      </main>
    );
  }

  return (
    <>
      <ConfigureAmplifyClientSide />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
        <div className="w-full max-w-md">
          {!isSigningUp ? (
            <form
              onSubmit={handleSignIn}
              className="bg-gray-800 p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h2>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Giriş Yap
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Yeni Hesap Oluştur
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleConfirmSignUp}
              className="bg-gray-800 p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Hesabını Doğrula
              </h2>
              <p className="text-center mb-4">
                {email} adresine gönderilen kodu gir.
              </p>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
              <div className="mb-4">
                <label className="block mb-2">Doğrulama Kodu</label>
                <input
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Doğrula
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
