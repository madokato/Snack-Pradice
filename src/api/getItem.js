import { supabase } from "../supabase"

export const GetItem = async () => {
  const { data } = await supabase.from("snacks").select("*");

  return data;
};


export const GetCartItem = async () => {
  const { data:userId} = await supabase.auth.getUser()
  const { data } = await supabase.from("cart").select("*,itemId(*)").eq('delete',false).eq('userId',userId.user.id);
  // console.log("apicart")

  return data;
};
