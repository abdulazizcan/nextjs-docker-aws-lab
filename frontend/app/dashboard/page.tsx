// frontend/app/dashboard/page.tsx
"use client";

import { getCurrentUser, signOut, fetchUserAttributes } from "aws-amplify/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPageContent, updatePageContent } from "@/lib/api";

export default function DashboardPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    const checkUserAndFetchAttributes = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserId(currentUser.userId);

        const attributes = await fetchUserAttributes();
        setEmail(attributes.email || "");
      } catch (error) {
        router.push("/");
      }
    };

    checkUserAndFetchAttributes();
  }, [router]);

  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const {
    data: pageData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userPage", userId],
    queryFn: () => getPageContent(userId),
    enabled: !!userId,
  });

  const {
    mutate,
    isPending,
    isSuccess,
    isError: isMutationError,
  } = useMutation({
    mutationFn: (newContent: string) => updatePageContent(newContent),

    onSuccess: (data) => {
      console.log("Güncelleme başarılı:", data);
      // Cache'i güncelleme işlemini invalidateQueries ile daha basit yapabiliriz
      queryClient.invalidateQueries({ queryKey: ["userPage", userId] });
      setFeedback({
        type: "success",
        message: "Sayfanız başarıyla güncellendi!",
      });
    },
    onError: (error) => {
      console.error("Güncelleme hatası:", error);
      setFeedback({
        type: "error",
        message: `Bir hata oluştu: ${error.message}`,
      });
    },
  });

  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ type: "", message: "" });
      }, 3000);
      return () => clearTimeout(timer); // Component'ten çıkılırsa timer'ı temizle
    }
  }, [feedback]);

  useEffect(() => {
    if (pageData) {
      setContent(pageData.content);
    } else if (!isLoading) {
      setContent("");
    }
  }, [pageData, isLoading]);

  if (!userId) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
        Yükleniyor...
      </main>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(content);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Panelim</h1>
            <p className="text-gray-400">Hoş geldin, {email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Çıkış Yap
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Sayfa içeriğinizi buraya yazın..."
          />
          <button
            type="submit"
            disabled={isPending || isLoading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isPending ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>

        <div className="mt-4 h-6 text-center">
          {isLoading && <p>Mevcut içerik yükleniyor...</p>}
          {isError && (
            <p className="text-red-500">İçerik yüklenirken bir hata oluştu.</p>
          )}
          {feedback.type === "success" && (
            <p className="text-green-500">{feedback.message}</p>
          )}
          {feedback.type === "error" && (
            <p className="text-red-500">{feedback.message}</p>
          )}
        </div>
      </div>
    </main>
  );
}
