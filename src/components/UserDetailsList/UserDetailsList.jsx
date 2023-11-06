import { UserDetails } from "../UserDetails/UserDetails";
import { useEffect, useState } from "react";
// import { fetchHelper } from "../../utils/fetchHelper";

export function UserDetailsList() {

    // const useToken = () => {
    //     const getToken =() =>{
    //         const tokenString = sessionStorage.getItem('token')
    //         const userToken = JSON.parse(tokenString)
    //         return userToken?.token
    //     } 
    
    //     const [token, setToken] = useState(getToken())
        
    //     const saveToken = userToken => {
    //         sessionStorage.setItem('token', JSON.stringify(userToken))
    //         setToken(userToken.token)
    //       }
    //       return {
    //         setToken: saveToken,
    //         token
    //       }
    //     }
    //     useToken();


    const [userdetails, setUserdetails] = useState([]);

    // const fakeUser =
    // {
    //   "email": "Ullagretasson@gmail.com",
    //   "password": "123456",
    //   "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJVbGxhZ3JldGFzc29uQGdtYWlsLmNvbSIsImlhdCI6MTY5OTI2ODMwNX0.N1wjrdI-Zxj4O7ybLiGt2iavympM2g0_SRZ56AGk8QHc5iYcuvwYqb2WbQztzHRI_MmyrdVX7Akd5VZSniRKCXbYnG9m1QsFTv0flQi8I1UZY5jSwgxulWMbjvWjaFZc6Jx00sksxWEDSvVniWi7entx9BW0pIoQ8PnOJMN6-YFCNtpQkbGQg1gY5FFBup11qMlMuasc-ifV9RQWXQ7yX9v5u-nhhZ-EC0eJExJ5peTdUW3znHKjX6_9KL5mTLoVXvB7HlOEW6oiQJwr2J6zQdxFM8mb9iq1LQLUHbNYDmwoTcmyCgHaIEN2lNtdsFfkU2jRALesdnTQOS8wk0_kMg"
    // };

    useEffect(() => {
      async function getUserInfo() {

        const fetchOptions = () => {
          return ({
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
          })
        }

        const response = await fetch(`api/currentUser`, fetchOptions());
        const data = await response.json();
        
        setUserdetails(data);
        console.log(data);
          
      }
      getUserInfo();
    }, []);

    return (
      <section>
          {userdetails.map((userinfo, index) => (
            <UserDetails key={index} userinfo={userinfo} />
          ))
        }
      </section>
    );
  }
  
//   export default UserDetailsList;