import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import {
  Input, ImgAttach, Select, ButtonComp, Typo, Navbar,
} from "../../components";
import styles from "./index.module.css";
import axios from 'axios'

function Register(props) {

  const history = useHistory()

  const [img, setImg] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [generation, setGeneration] = useState('')
  const [campus, setCampus] = useState('')
  const [description, setDescription] = useState('')
  const [eChecked, setEChecked] = useState(false)
  const [nChecked, setNChecked] = useState(false)

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPassHandler = (event) => {
    if (event.target.id === "password") {
      setPassword(event.currentTarget.value)
    }
    if (event.target.id === "passwordConfirm") {
      setPassConfirm(event.currentTarget.value)
    }
  };
  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  const onGenerationHandler = (event) => {
    setGeneration(event.currentTarget.value);
  };
  const onCampusHandler = (event) => {
    setCampus(event.currentTarget.value);
  };
  const onDescriptionHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const handleChangeFile = (event) => {
    setImg(event.target.files[0])

    const reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])
    reader.onloadend = (e) => {
      document.getElementById('imgView').setAttribute('src', e.target.result)
    }
  }
  const handleRemove = () => {
    setImg('/images/default-images.png')
  };

  function PassConfirm() {
    const pass = document.getElementById('password')
    const confirm = document.getElementById('passwordConfirm')
    if (pass && confirm != null) {
      if (pass.value === '' || confirm.value === '') {
        return (
          <Typo ty="desc">&nbsp;</Typo>
        )
      }
      if (pass.value === confirm.value) {
        return (
          <Typo ty="desc" className={styles.yes}>??????????????? ???????????????.</Typo>
        )
      }
      if (pass.value !== confirm.value) {
        return (
          <Typo ty="desc" className={styles.no}>??????????????? ???????????? ????????????.</Typo>
        )
      }
    }
    return (
      <Typo ty="desc">&nbsp;</Typo>
    )
  }

  const dupEmail = () => {
    if (email <= 0) {
      return
    }
    axios.get(process.env.REACT_APP_HOST + "/account/checkDupEmail", {
      params: {
        email: email
      }
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.response === "success") {
            alert('???????????? ????????? ??? ????????????.')
            const disableEmail = document.getElementById('email')
            const disableEmailButton = document.getElementById('dupEmail')
            disableEmail.disabled = 'true'
            disableEmailButton.disabled = 'true'
            setEChecked(true)
          }
          else {
            alert('????????? ??????????????????.')
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
          alert('????????? ??????????????????.')
        }
      })
  }

  const validEmail = (str) => {
    let valid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (valid.test(str)) {
      dupEmail()
    }
    else {
      alert('????????? ????????? ????????????.')
      return
    }
  }

  const dupNickname = () => {
    if (nickname <= 0) {
      return
    }
    axios.get(process.env.REACT_APP_HOST + "/account/checkDupNickName", {
      params: {
        nickName: nickname
      }
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.response === "success") {
            alert('???????????? ????????? ??? ????????????.')
            const disableNick = document.getElementById('nickname')
            const disableNickButton = document.getElementById('dupNickname')
            disableNick.disabled = 'true'
            disableNickButton.disabled = 'true'
            setNChecked(true)
          }
          else {
            alert('????????? ??????????????????.')
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
          alert('????????? ??????????????????.')
        }
      })
  }
  async function register() {
    if (!email || !password || !passConfirm || !nickname ||
      !generation || !campus || !description === true) {
      alert('?????? ???????????? ???????????????.')
      return
    }
    if (eChecked === false) {
      alert('????????? ?????? ????????? ??? ?????????.')
      return
    }
    if (nChecked === false) {
      alert('????????? ?????? ????????? ??? ?????????.')
      return
    }
    if (password != passConfirm) {
      alert('???????????? ????????? ???????????? ????????????.')
      return
    }

    const formData = new FormData()
    const userData = {
      email: email,
      password: password,
      nickName: nickname,
      generation: generation,
      campus: campus,
      description: description,
    }
    formData.append('file', img)
    formData.append('user', new Blob([JSON.stringify(userData)], { type: 'application/json' }))
    console.log(formData)
    await axios.post(process.env.REACT_APP_HOST + "/account/signup", formData)
      .then((res) => {
        if (res.status == 200) {
          history.push({
            pathname: '/verify',
            state: { email: email }
          })
        }
        else {
          alert('???????????? ??????')
        }
      })
      .catch((err) => {
        alert('???????????? ??????')
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Navbar className={styles.nav}>
          <div className={styles.redirect} onClick={() => { history.push("/login") }}></div>
          <i className={"fas fa-chevron-left color_black" + " " + styles.icon}></i>
          <span className={"color_black" + " " + styles.title}><Typo ty="h4">????????????</Typo></span>
          <i></i>
        </Navbar>

        <div className={styles.relative}>
          <div className={styles.header}>
            <div className={styles.box}>
              <input id="propic" type="file" name="Inputfile" onChange={handleChangeFile} className={styles.input} />
              <img id="imgView" src={img ? img : "/images/default-image.png"} onClick={handleRemove} alt="" className={styles.profile} />
              <label className={styles.attach_icon}>
                <i className="fas fa-camera-retro color_black" style={{ fontSize: "1.0m", height: "100%" }}></i>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.inputdiv}>
        <Typo className={styles.label} ty="desc">?????????</Typo>
        <div className={styles.div}>
          <Input className={styles.dupinput} id="email" type="email" placeholder="???????????? ???????????????" onchange={onEmailHandler}></Input>
          <ButtonComp className={styles.dup} width="regular" type="base" textvalue="????????????" id="dupEmail" onClick={() => { validEmail(email) }}></ButtonComp>
        </div>

        <Typo ty="desc" className={styles.label}>????????????</Typo>
        <Input id="password" type="password" placeholder="??????????????? ???????????????" onchange={onPassHandler}></Input>

        <Typo ty="desc" className={styles.label}>???????????? ??????</Typo>
        <Input id="passwordConfirm" type="password" placeholder="???????????? ??????" onchange={onPassHandler}></Input>
        <PassConfirm></PassConfirm>

        <Typo ty="desc" className={styles.label}>?????????</Typo>
        <div className={styles.div}>
          <Input className={styles.dupinput} id="nickname" placeholder="???????????? ???????????????" onchange={onNicknameHandler}></Input>
          <ButtonComp className={styles.dup} width="regular" type="base" textvalue="????????????" id="dupNickname" onClick={dupNickname}></ButtonComp>
        </div>

        <Typo ty="desc" className={styles.label}>??????</Typo>
        <Select id="generation" onchange={onGenerationHandler} className={styles.select}>
          <option value="">????????? ???????????????</option>
          <option value="1">1???</option>
          <option value="2">2???</option>
          <option value="3">3???</option>
          <option value="4">4???</option>
          <option value="5">5???</option>
        </Select>

        <Typo ty="desc" className={styles.label}>????????? ??????</Typo>
        <Select id="campus" onchange={onCampusHandler} className={styles.select}>
          <option value="">????????? ???????????????</option>
          <option value="?????? ?????????">?????? ?????????</option>
          <option value="?????? ?????????">?????? ?????????</option>
          <option value="?????? ?????????">?????? ?????????</option>
          <option value="?????? ?????????">?????? ?????????</option>
        </Select>

        <Typo ty="desc" className={styles.label}>????????????</Typo>
        <textarea id="description" className={styles.textarea} placeholder="??????????????? ??????????????????"
          onChange={onDescriptionHandler}></textarea>

        <ButtonComp id="register" className={styles.button} width="large" type="base" textvalue="????????????" onClick={register}></ButtonComp>
      </div>
    </div>
  )
};
export default Register;