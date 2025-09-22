import { fetchAuthSession } from "aws-amplify/auth";
import { z } from "zod";

const API_BASE_URL = "https://064kdmd9ci.execute-api.eu-north-1.amazonaws.com";

export const PageDataSchema = z.object({
  username: z.string(),
  content: z.string(),
  lastUpdatedAt: z.string(),
});

export const PagesArraySchema = z.array(PageDataSchema);

async function getAuthToken() {
  try {
    const { tokens } = await fetchAuthSession();
    return tokens?.accessToken.toString();
  } catch (error) {
    console.log("Kullanıcı giriş yapmamış veya session süresi dolmuş.");
    return null;
  }
}

export const getPageContent = async (username: string) => {
  const response = await fetch(`${API_BASE_URL}/page/${username}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error("Sayfa verisi alınırken bir hata oluştu.");
  }

  const data = await response.json();

  return PageDataSchema.parse(data);
};

export const updatePageContent = async (content: string) => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("Bu işlemi yapmak için giriş yapmalısınız.");
  }

  const response = await fetch(`${API_BASE_URL}/page`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: content }),
  });

  if (!response.ok) {
    throw new Error("Sayfa güncellenirken bir hata oluştu.");
  }

  return await response.json();
};
