import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../../redux/auth/authSelectors';
import Avatar, { genConfig } from 'react-nice-avatar';

import {
  UserName,
  UserLogoBtn,
  UserLogoIcon,
  UserLogoContainer,
  UserAvatar,
} from './UserLogo.styled';

import arrow from '../../../Icons/solid.svg';
import arrowup from '../../../Icons/arrow-up.svg';
import { UserLogoPopUp } from '../../AllModals/UserLogoModal/UserLogoPopUp';

function emailUsername(emailAddress) {
  return emailAddress.split('@')[0];
}

const config = genConfig();

export const UserLogo = () => {
  const userProfile = useSelector(selectUserProfile);
  const name = userProfile.username;
  const email = userProfile.email;
  const userAvatar = userProfile.avatar;
  const enteredUserEmail = emailUsername(email);
  const [isOpen, setIsOpen] = useState(false);
  const avatarURL = `https://water-tracker-backend-ob6w.onrender.com/${userAvatar}`;

  const makeUserName = () => {
    if (name) {
      return name;
    }
    if (!name && email) {
      return enteredUserEmail || '';
    } else {
      return 'User Name';
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <UserLogoContainer>
      <UserLogoBtn onClick={toggleMenu} aria-label="User Logo">
        <UserName>{makeUserName()}</UserName>

        {avatarURL ? (
          <UserAvatar src={avatarURL} alt="Avatar" />
        ) : (
          <Avatar
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              marginRight: '4px',
            }}
            {...config}
          />
        )}

        <UserLogoIcon>
          {isOpen ? (
            <use href={arrowup + '#icon-arrow-up'}></use>
          ) : (
            <use href={arrow + '#icon-arrow-down'}></use>
          )}
        </UserLogoIcon>
      </UserLogoBtn>
      {isOpen && <UserLogoPopUp />}
    </UserLogoContainer>
  );
};
