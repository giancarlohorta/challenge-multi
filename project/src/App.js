import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import "./App.css";

const FETCH_STATUS = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  DONE: "DONE",
  ERROR: "ERROR",
};

function App() {
  const [data, setData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.INITIAL);

  const fetchGet = useCallback(async () => {
    try {
      setFetchStatus(FETCH_STATUS.LOADING);
      const url = "https://jsonplaceholder.typicode.com";
      const [responseUsers, responsePosts] = await Promise.allSettled([
        axios.get(`${url}/users`),
        axios.get(`${url}/posts`),
      ]);
      setData(
        responseUsers.value.data.map((user) => {
          const posts = responsePosts.value.data
            .filter((post) => post.userId === user.id)
            .map((post) => {
              return {
                id: post.id,
                title: post.title,
                body: post.body,
              };
            });
          return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            address: `${user.address.street}, ${user.address.suite} - ${user.address.zipcode} ${user.address.city}`,
            phone: user.phone,
            website: user.website,
            company: user.company.name,
            posts,
          };
        })
      );
      setFetchStatus(FETCH_STATUS.DONE);
    } catch (e) {
      console.log(e);
      setFetchStatus(FETCH_STATUS.ERROR);
    }
  }, []);
  useEffect(() => {
    if (fetchStatus === FETCH_STATUS.INITIAL) fetchGet();
  }, [fetchStatus, fetchGet]);

  return (
    <div>
      {data.map(
        ({
          id,
          name,
          username,
          email,
          address,
          phone,
          website,
          company,
          posts,
        }) => {
          return (
            <div key={id}>
              <div>
                <h2>{name}</h2>
                <p>{username}</p>
              </div>
              <div>
                <h2>Personal Data</h2>
                <p>{email}</p>
                <p>{address}</p>
                <p>{phone}</p>
                <p>{website}</p>
                <p>{company}</p>
              </div>
              <div>
                <h2>Posts</h2>
                <ul>
                  {posts.map((post) => {
                    return (
                      <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

export default App;
