import { supabase } from "../supabase";
import router from "@/router";

export const PostCartItem = async (id) => {
  console.log("add", id);
  const { data } = await supabase.auth.getUser();
  await supabase
    .from("cart")
    .insert({ itemId: id, quantity: 1, delete: false, userId: data.user.id });
    router.push("/cart")
};

export const DeleteItem = async (id) => {
  await supabase.from("cart").update({ delete: true }).eq("id", id);
};

export const FinalCartItem = async (val) => {
  // console.log("val",val)
  val.map((ca) => {
    ca.itemId = ca.itemId.id;
  });

  await supabase.from("cart").upsert(val);
};

export const Postpayment = async (val) => {
  // console.log(val);
  val.map((ca) => {
    ca.itemId = ca.itemId.id;
  });
  const { data } = await supabase.auth.getUser();
  await supabase.from("orders")

.insert(val);

  await supabase.from("cart").delete().match({ userId: data.user.id });
  router.push({
    name: "completepayment",
  });
};
