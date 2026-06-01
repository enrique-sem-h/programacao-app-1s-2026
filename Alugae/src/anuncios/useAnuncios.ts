import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import type { Anuncio, AnunciosResponse } from "../@types/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

interface UseAnunciosResult {
  anuncios: Anuncio[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useAnuncios(): UseAnunciosResult {
  const { token } = useAuth();

  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnuncios = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/anuncios`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `Erro ${response.status}: não foi possível carregar os anúncios.`,
        );
      }

      const json = await response.json();

      setAnuncios(json.data ?? json.anuncios ?? json ?? []); // ← adjust once you see the shape
    } catch (err: any) {
      setError(err.message ?? "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAnuncios();
  }, [fetchAnuncios]);

  return { anuncios, loading, error, refresh: fetchAnuncios };
}
