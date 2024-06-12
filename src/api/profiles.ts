import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    enabled: !!userId,
  });
};
