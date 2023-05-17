import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);


  // const apiUrl = 'https://gorest.co.in/public/v2/posts';

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     debugger
  //     try {
  //       const response = await axios.get(apiUrl);
  //       const articles = response.data.map((article) => ({
  //         id: article.id,
  //         title: article.title,
  //         body: article.body,
  //         createdAt: article.created_at,
  //         // Add any other properties you need from the API response
  //       }));
  //       setArticles(articles);
  //       console.log(articles);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   fetchArticles();
  // }, []);






  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,

            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
               
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {/* {createdBy && (
                        <span className="badge bg-primary">null</span>
                      )} */}
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      {user && user.uid === userId && (
                        <DeleteArticle id={id} imageUrl={imageUrl} />
                      )}
                    </div>
                  </div>
                  <h3>{title}</h3>
                  {/* <p>{createdAt.toDate().toDateString()}</p> */}
                  {title}
                  {id}
                  <h5>{description.slice(0, 10)}</h5>

                  <div className="d-flex flex-row-reverse">
                    {user && <LikeArticle id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div>
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}



