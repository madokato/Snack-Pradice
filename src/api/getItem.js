import { supabase } from "../supabase"

export const GetItem = async () => {
  const { data } = await supabase.from("snacks").select("*");

  return data;
};


export const GetCartItem = async () => {
  const { data } = await supabase.from("cart").select("*,itemId(*)").eq('delete',false);

  return data;
};
