import { supabase } from "../supabase";

export const PostCartItem = async (id) => {
  console.log("add", id);
  const { data } = await supabase.auth.getUser();
  await supabase
    .from("cart")
    .insert({ itemId: id, quantity: 1, delete: false, userId: data.user.id });
};

export const DeleteItem = async (id) => {
  await supabase.from("cart").update({ delete: true }).eq("id", id);
};

export const PostPayment = async (val) => {
  // console.log("val",val)
  val.map((ca) => {
    ca.itemId = ca.itemId.id;
  });


  await supabase.from("cart").upsert(val);
};
