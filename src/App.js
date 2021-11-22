import React, { useEffect, useState } from "react";

const App = () => {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchApi = async () => {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}_page=${page}`
    );
    const dataJ = await data.json();
    setPost(dataJ);
  };

  useEffect(() => {
    fetchApi();
  });

  window.addEventListener("scroll", () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("loading...");
      setPage(page + 1);
      console.log(page);
      console.log(post);
      fetchApi();
    }
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-primary">
          <div className="col-12 text-center bg-primary fw-bold fs-1 text-white text-decoration-underline py-3">
            Infinite Scrolling
          </div>
          <div className="col-1"></div>
          <div className="col-10">
            {post.map((Elem, index) => {
              return (
                <>
                  <div className="box bg-white m-3 p-4 my-5" key={index}>
                    <div className="bg-secondary col-1 text-white text-center fs-3 fw-bold">
                      {Elem.id}
                    </div>
                    <div className="fs-4 fw-bold py-2 text-capitalize">
                      {Elem.title}
                    </div>
                    <div className="fs-5">{Elem.body}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
