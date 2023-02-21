import { supabase } from "../supabase";

export const PostCartItem = async (id) => {
  console.log("add", id);

  await supabase
    .from("cart")
    .insert({ itemId: id, quantity: 1, delete: false });
};

export const DeleteItem = async (id) => {
  await supabase.from("cart").update({ delete: true }).eq("id", id);
};
