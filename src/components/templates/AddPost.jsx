import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

import { getCategory } from "services/admin";
import { addPost } from "services/user";

import styles from "./AddPost.module.css";

function AddPost() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    content: "",
    city: "",
    category: "",
    amount: null,
    images: null,
  });

  const { mutate } = useMutation(addPost, {
    onSuccess: () => queryClient.invalidateQueries("my-post-list"),
  });

  const { data } = useQuery(["get-categories"], getCategory);

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "images") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      !form.title ||
      !form.content ||
      !form.city ||
      !form.category ||
      !form.amount ||
      !form.images
    )
      return;

    const formData = new FormData();
    for (let i in form) {
      formData.append(i, form[i]);
    }
    mutate(
      formData,
      { onSuccess: (res) => toast.success(res?.data.message) },
      { onError: (err) => toast.error("مشکلی پیش آمده است") }
    );

    setForm({
      title: "",
      content: "",
      city: "",
      category: "",
      amount: "",
      images: null,
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      onChange={changeHandler}
      className={styles.form}
    >
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" value={form.title} />
      <label htmlFor="content">توضیحات</label>
      <textarea name="content" id="content" value={form.content}></textarea>
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" value={form.amount} />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" value={form.city} />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        {!form.category && (
          <option value={form.category} disabled selected="true">
            انتخاب کنید ...
          </option>
        )}
        {data?.data.map((i) => (
          <option key={i._id} value={i._id}>
            {i.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" value={null} />
      <button type="submit">ایجاد</button>
    </form>
  );
}

export default AddPost;
