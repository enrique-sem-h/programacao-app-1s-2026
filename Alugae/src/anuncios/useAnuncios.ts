import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import type { Anuncio, AnunciosResponse } from "../@types/types";
import { API_URL } from "@/constants/constants";

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
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/anuncios`);

      if (!response.ok) {
        throw new Error(
          `Erro ${response.status}: não foi possível carregar os anúncios.`,
        );
      }

      const json = await response.json();

      setAnuncios(json.anuncios || []);
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
