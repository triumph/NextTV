"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

export async function login(prevState, formData) {
  const password = formData.get("password");

  if (!password || !password.trim()) {
    return { error: "请输入密码" };
  }

  if (password.trim() !== process.env.PASSWORD) {
    return { error: "密码错误，请重试" };
  }

  await createSession();
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
