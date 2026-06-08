import { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
