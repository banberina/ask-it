import React, { useState, useEffect } from "react";

import { withRouter, useLocation } from "react-router-dom";
import { Spinner } from "reactstrap";

import { users } from "../../api/index";
import { checkToken } from "../../utils/utils";

import PublicProfileCard from "../public-profile-card/public-profile-card.component";

const MyProfile = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const fetchUser = async () => {
    setIsLoading(true);
    await users.getOneUser(location.pathname.split("/")[2]).then((res) => {
      setUserData(res.data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <PublicProfileCard
          name={`${userData.name} ${userData.surname}`}
          email={userData.email}
          numberOfAnswers={userData.noOfAnswers}
        /> )}
        { checkToken() ? ( <p>Update user data form</p>
      ) : null}
    </div>
  );
};

export default withRouter(MyProfile);
