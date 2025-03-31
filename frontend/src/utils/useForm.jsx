import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CommentContext from "../context/CommentContext";

const useForm = (callback) => {
  const [formValues, setFormValues] = useState({
    video_id: "",
    text: "",
    likes: 0,
    dislikes: 0,
  });
  const [user, token] = useAuth();
  const { setComments } = useContext(CommentContext);
  const { id } = useParams();

  // const refresh = () => window.location.reload(true);

  async function updateComments() {
    const response = await axios.get(`https://youtube-clone-backend-gamma.vercel.app/api/comment/${id}`);
    console.log(response.data);
    setComments(response.data);
  }

  const handleChange = (event) => {
    event.persist();

    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
      video_id: id,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //
    try {
      axios
        .post(
          `https://youtube-clone-backend-gamma.vercel.app/api/comment/postto/${id}`,
          {
            video_id: `${id}`,
            text: formValues.comment,
            likes: 0,
            dislikes: 0,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          console.log(response.status, response.data.token);

          updateComments(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return { formValues, handleChange, handleSubmit };
};

export default useForm;
