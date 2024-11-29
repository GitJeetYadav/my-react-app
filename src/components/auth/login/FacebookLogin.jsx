import React, { useState, useEffect } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";

const FacebookLoginComponents = () => {
  const [user, setUser] = useState(null);
  const handleFacebookCallback = (response) => {
    if (response?.status === "unknown") {
      console.error("Sorry!", "Something went wrong with facebook Login.");
      return;
    }
    // console.log(response); for future use
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          // console.log("Profile =>", res.data); for future use
          setProfile(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div>
      <FacebookLogin
        buttonStyle={{ padding: "6px" }}
        appId="551440303967153" // we need to get this from facebook developer console by setting the app.
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookCallback}
      />
    </div>
  );
};

export default FacebookLoginComponents;
