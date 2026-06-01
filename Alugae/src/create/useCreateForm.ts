import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/src/context/AuthContext";
import { API_URL, MAX_PHOTOS } from "../../constants/constants";
import type { Categoria } from "../../constants/constants";

export interface FormState {
  title: string;
  price: string;
  caucao: string;
  descricao: string;
  categoria: Categoria | "";
  images: string[];
}

const INITIAL_STATE: FormState = {
  title: "",
  price: "",
  caucao: "",
  descricao: "",
  categoria: "",
  images: [],
};

export function useCreateForm() {
  const { token } = useAuth();

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // ── Setters ─────────────────────────────────────────────────────────────
  const setField =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) =>
      setForm((prev) => ({ ...prev, [key]: value }));

  // ── Images ───────────────────────────────────────────────────────────────
  const pickImages = async () => {
    const remaining = MAX_PHOTOS - form.images.length;

    if (remaining <= 0) {
      Alert.alert("Limite atingido", `Máximo de ${MAX_PHOTOS} fotos.`);
      return;
    }

    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert("Permissão necessária", "Precisamos acessar sua galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 0.8,
    });

    if (!result.canceled) {
      setField("images")([...form.images, ...result.assets.map((a) => a.uri)]);
    }
  };

  const removeImage = (uri: string) =>
    setField("images")(form.images.filter((i) => i !== uri));

  // ── Validation ───────────────────────────────────────────────────────────
  const validate = (): boolean => {
    if (!form.title.trim()) {
      Alert.alert("Atenção", "Informe o que você está anunciando.");
      return false;
    }
    if (!form.price.trim()) {
      Alert.alert("Atenção", "Informe o valor do aluguel.");
      return false;
    }
    if (!form.caucao.trim()) {
      Alert.alert("Atenção", "Informe o valor da caução.");
      return false;
    }
    if (!form.categoria) {
      Alert.alert("Atenção", "Selecione uma categoria.");
      return false;
    }
    return true;
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const buildFormData = (): FormData => {
    const data = new FormData();
    data.append("titulo", form.title);
    data.append("valorDiario", form.price);
    data.append("caucao", form.caucao);
    data.append("descricao", form.descricao);
    data.append("categoria", form.categoria);

    form.images.forEach((uri) => {
      const filename = uri.split("/").pop() ?? "foto.jpg";
      const ext = /\.(\w+)$/.exec(filename);
      const type = ext ? `image/${ext[1]}` : "image/jpeg";
      data.append("fotos", { uri, name: filename, type } as any);
    });

    return data;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/anuncios`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: buildFormData(),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.message ?? "Erro ao criar anúncio.");
      }

      setSuccessModalVisible(true);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessModalVisible(false);
    setForm(INITIAL_STATE);
  };

  return {
    form,
    loading,
    successModalVisible,
    setField,
    pickImages,
    removeImage,
    handleSubmit,
    handleReset,
  };
}
