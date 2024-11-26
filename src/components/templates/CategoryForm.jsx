import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { addCategory } from "services/admin";

import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const [hide, setHide] = useState(false);

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    setHide(false);
    event.preventDefault();

    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
    setTimeout(() => {
      setHide(true);
    }, 5000);
    setForm({ name: "", slug: "", icon: "" });
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {!!error && <p>مشکلی پیش آمده است</p>}
      {data?.status === 201 && !hide && <p>دسته بندی با موفقیت اضافه شد</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" value={form.name} />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" value={form.slug} />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" value={form.icon} />
      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
