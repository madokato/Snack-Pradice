import { supabase } from "../supabase";
import router from "@/router";

export const CreateAccount = async (val) => {

  const { user,session,data, error } = await supabase.auth.signUp({
    email: val.eMail,
    password: val.passWord,
    // options: {
    //   data: {
    //     name: val.name,
    //   },
    // },
  });
 
};


export const Login = async (val) => {

  try {
    const { error,user } = await supabase.auth.signInWithPassword({
      email: val.eMail,
      password: val.passWord,
    });
    const { data} = await supabase.auth.getUser()

  console.log(data.user.id)
    if (error) throw error;
    router.push({
      name: 'home',
    });
  return user
  } catch (error) {
    if (error instanceof Error) {
      //   alert(error.message);
      return error.message;
    }
  }
};
