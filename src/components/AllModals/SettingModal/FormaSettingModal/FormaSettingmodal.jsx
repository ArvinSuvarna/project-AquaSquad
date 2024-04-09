import  { useState } from 'react';
import { ButtonSettingsForma } from './ButtonSettingsForma.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile } from '../../../../redux/auth/authSelectors';
import { useForm } from 'react-hook-form';
import sprite from '../../../../Icons/signIn-signUp/sprite.svg';
import {
  WrapperForma,
  WrapperFormaMain,
  WrapperFormaLeft,
  WrapperFormaRight,
  TitlePart,
  ContainerForm,
  WrapperRadio,
  FormLabelRadio,
  FormLabel,
  InputSettingEdit,
  EyeSvg,
} from './FormaSettingModal.styled';
import { updateUserProfileData } from '../../../../redux/auth/authOperations';

const emailPatern = /^[a-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$/;

export const FormaUpdateUserProfile = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const userData = useSelector(selectUserProfile);
  const userCurrentGender = userData.gender;

  const togglePasswordVisibility = (inputId) => {
    setShowPassword((prevPasswords) => ({
      ...prevPasswords,
      [inputId]: !prevPasswords[inputId],
    }));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      gender: userCurrentGender ? userCurrentGender : 'man',
      email: userData.email ? userData.email : 'user_email@gmail.com',
      name: userData.name ? userData.name : 'User Name'
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    const { name, gender, email, newPassword, oldPassword } = data;
    dispatch(
      updateUserProfileData({ name, gender, email, newPassword, oldPassword })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <WrapperForma>
        <WrapperFormaMain>
          <WrapperFormaLeft>
            <TitlePart>Your gender identity</TitlePart>
            <ContainerForm>
              <WrapperRadio>
                <FormLabelRadio>
                  <input
                    {...register('gender')}
                    type="radio"
                    value="woman"
                    style={{
                      position: 'absolute',
                      width: '1px',
                      height: '1px',
                      margin: '-1px',
                      border: '0',
                      padding: '0',
                      whiteSpace: 'nowrap',
                      clipPath: 'inset(100%)',
                      clip: 'rect(0 0 0 0)',
                      overflow: 'hidden',
                    }}
                  ></input>
                  <div></div>
                  <span>Woman</span>
                </FormLabelRadio>
                <FormLabelRadio>
                  <input
                    {...register('gender')}
                    type="radio"
                    value="man"
                    style={{
                      position: 'absolute',
                      width: '1px',
                      height: '1px',
                      margin: '-1px',
                      border: '0',
                      padding: '0',
                      whiteSpace: 'nowrap',
                      clipPath: 'inset(100%)',
                      clip: 'rect(0 0 0 0)',
                      overflow: 'hidden',
                    }}
                  ></input>
                  <div></div>
                  <span>Man</span>
                </FormLabelRadio>
              </WrapperRadio>

              <FormLabel>
                Your name
                <InputSettingEdit
                  {...register('name')}
                  type="text"
                  placeholder= 'User Name'
                />
              </FormLabel >

              <FormLabel >
                {/* $errors={errors.email} */}
                E-mail
                <InputSettingEdit
                  {...register('email')}
                  // $errors={errors.email}
                  type="text"
                  placeholder='user_email@gmail.com'
                  
                />
                <div
                style={{
                  position: 'relative',
                }}
              >
                {errors.email && (
                  <p
                    style={{
                      color: 'red',
                      position: 'absolute',
                      marginBottom: 0,
                      top: '-10px',
                    }}
                  >
                    {errors.email.message || 'Error!'}
                  </p>
                )}
              </div>
              </FormLabel>
            </ContainerForm>
          </WrapperFormaLeft>
          <WrapperFormaRight>
            <TitlePart>Password</TitlePart>

            <FormLabel>
              Oudated password
              <InputSettingEdit
                id="oldPassword"
                {...register('oldPassword')}
                type={showPassword['oldPassword'] ? 'text' : 'password'}
                placeholder="Password"
              />
              <div
                style={{ position: 'relative' }}
                onClick={() => togglePasswordVisibility('oldPassword')}
              >
                {showPassword['oldPassword'] ? (
                  <EyeSvg width="16" height="16">
                    <use href={`${sprite}#icon-outlineOn`} />
                  </EyeSvg>
                ) : (
                  <EyeSvg width="16" height="16">
                    <use href={`${sprite}#icon-outlineOff`} />
                  </EyeSvg>
                )}
              </div>
            </FormLabel>
            <FormLabel id="new">
              New Password
              <InputSettingEdit
                id="newPassword"
                {...register('newPassword')}
                type={showPassword['newPassword'] ? 'text' : 'password'}
                placeholder="Password"
              />
              <div
                style={{ position: 'relative' }}
                onClick={() => togglePasswordVisibility('newPassword')}
              >
                {showPassword['newPassword'] ? (
                  <EyeSvg width="16" height="16">
                    <use href={`${sprite}#icon-outlineOn`} />
                  </EyeSvg>
                ) : (
                  <EyeSvg width="16" height="16">
                    <use href={`${sprite}#icon-outlineOff`} />
                  </EyeSvg>
                )}
              </div>
            </FormLabel>
            <FormLabel id="repeat">
              {/* $errors={errors.repeatPassword} */}
              Repeat new password
              <InputSettingEdit
                id="repeatPassword"
                {...register('repeatPassword')}
                // $errors={errors.repeatPassword}
                type={showPassword['repeatPassword'] ? 'text' : 'password'}
                placeholder="Password"
              />
              <div
                style={{ position: 'relative' }}
                onClick={() => togglePasswordVisibility('repeatPassword')}
              >
                {showPassword['repeatPassword'] ? (
                  <EyeSvg width="16" height="16">
                    <use href={`${sprite}#icon-outlineOn`} />
                  </EyeSvg>
                ) : (
                  <EyeSvg width="16" height="16">
                    <use href={`${sprite}#icon-outlineOff`} />
                  </EyeSvg>
                )}
              </div>
              <div
                style={{
                  position: 'relative',
                }}
              >
                {errors.repeatPassword && (
                  <p
                    style={{
                      color: 'red',
                      position: 'absolute',
                      marginBottom: 0,
                      top: '-10px',
                    }}
                  >
                    {errors.repeatPassword.message || 'Error!'}
                  </p>
                )}
              </div>
            </FormLabel>
          </WrapperFormaRight>
        </WrapperFormaMain>
        <ButtonSettingsForma type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading..' : 'Save'}
        </ButtonSettingsForma>
      </WrapperForma>
    </form>
  );
};
