import { supabase } from "@/lib/supabase";

import { useQuery } from "@tanstack/react-query";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menus")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
