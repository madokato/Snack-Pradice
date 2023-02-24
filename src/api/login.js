import { supabase } from "../supabase";
import router from "@/router";

export const CreateAccount = async (val) => {
  console.log(val);
  try {
    const { error } = await supabase.auth.signUp({
      email: val.eMail,
      password: val.passWord,
      options: {
        data: {
          name: val.name,
        },
      },
    });
    if (error) throw error;
    router.push({
      name: "home",
    });
  } catch (error) {
    console.log(error);
    return "duplicate";
  }
};

export const Login = async (val) => {
  try {
    const { error, user } = await supabase.auth.signInWithPassword({
      email: val.eMail,
      password: val.passWord,
    });

    if (error) throw error;
    router.push({
      name: "home",
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      //   alert(error.message);
      return error.message;
    }
  }
};
