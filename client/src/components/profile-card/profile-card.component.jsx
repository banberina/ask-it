import React, { useState, useEffect } from "react";

import { withRouter, useLocation } from "react-router-dom";
import { Spinner } from "reactstrap";

import ChangeUserDataCard from "../change-user-data-card/change-user-data-card.component";

import { users } from "../../api/index";
import { checkToken } from "../../utils/utils";
import helpers from '../../utils/helpers'

import PublicProfileCard from "../public-profile-card/public-profile-card.component";

const MyProfile = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMyData, setIsMyData] = useState(false);
  
  const location = useLocation();

  const fetchUser = async () => {
    setIsLoading(true);
    await users.getOneUser(location.pathname.split("/")[2]).then((res) => {
      setUserData(res.data);
      if (res.data._id === helpers.decodeToken()._id) setIsMyData(true);
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
        />
      )}
      {checkToken() && isMyData ? <ChangeUserDataCard /> : null}
    </div>
  );
};

export default withRouter(MyProfile);
