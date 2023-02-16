import { supabase } from "../supabase";

export const CreateAccount = async (val) => {
  console.log(val);
  //   await supabase.from("users").insert(val);

  const { data, error } = await supabase.auth.signUp({
    email: val.eMail,
    password: val.passWord,
    options: {
      data: {
        name: val.name,
      },
    },
  });
};
export const Login = async (val) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: val.eMail,
      password: val.passWord,
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      //   alert(error.message);
      return error.message;
    }
  }
};
