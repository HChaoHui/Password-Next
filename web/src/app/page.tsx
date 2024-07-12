"use client"
import styles from "./page.module.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { login } from "@/apis/login";
import { getPassword } from "@/apis/getPassword";
import { get2faToken } from "@/apis/get2faToken";
import { deletePassword } from "@/apis/deletePassword";
import { addPassword } from "@/apis/addPassword";
import { editNewPassword } from "@/apis/editNewPassword";
import Loading from "@/components/loading/page";
import { get } from "http";

export default function Home() {

  const [token, setToken] = useState("");

  const [localToken, setLocalToken] = useState("");

  const [loadingStatus, setLoadingStatus] = useState(true);

  const [passwordList, setPasswordList] = useState<any[]>([]);

  const [copiedIndex, setCopiedIndex] = useState<any>(null);

  const [deleteStaus, setDeleteStaus] = useState(false);

  const [newPasswordStatus, setNewPasswordStatus] = useState(false);

  const [editPasswordStatus, setEditPasswordStatus] = useState(false);

  const [editAddPasswordStatus, setEditAddPasswordStatus] = useState(false);

  const [addPasswordStatus, setAddPasswordStatus] = useState(false);

  const [settingIndex, setSettingIndex] = useState<any>(null);

  const [loginTips, setLoginTips] = useState("");

  const [twofaIndex, setTwofaIndex] = useState<any>(null);

  const [twofa, setTwofa] = useState<any>(null);

  const copiedTimeoutRef = useRef<any>(null);

  const twofaTimeoutRef = useRef<any>(null);

  const newPasswordData = {
    appName: "",
    webSite: "",
    account: "",
    password: "",
    twofa: "",
  }

  const [newPassword, setNewPassword] = useState(newPasswordData);

  const [editPassword, setEditPassword] = useState(newPasswordData);

  useEffect(() => {
    const localToken = localStorage.getItem("localToken");
    if (localToken) {
      loginRequest(localToken)
      return
    }

    setLoadingStatus(false)
  }, [])

  const loginUser = () => {

    if (token) {
      loginRequest(token)
    }

  }

  const loginRequest = (token: string) => {
    const requestData = {
      token: token,
    }

    login(requestData).then((res) => {
      const { token } = res.data;
      setLocalToken(token)
      localStorage.setItem("localToken", token);
      getPasswordRequest()
    }).catch(err => {
      localStorage.removeItem("localToken");
      setLoginTips(err.response.data.msg)
      setLoadingStatus(false)
    })

  }

  const getPasswordRequest = () => {
    getPassword().then((res) => {
      setPasswordList(res.data);
      setLoadingStatus(false)
      setDeleteStaus(false)
      setAddPasswordStatus(false)
      setNewPasswordStatus(false)
      setEditPasswordStatus(false)
      setEditAddPasswordStatus(false)
      setSettingIndex(null)
    }).catch(() => {
      console.log("error");
    })
  }

  const copyPassword = (password: string, index: any) => {

    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }

    navigator.clipboard.writeText(password).then(() => {
      setCopiedIndex(index);
      copiedTimeoutRef.current = setTimeout(() => setCopiedIndex(null), 2000);
    });
  }

  const show2fa = (twofa: string, index: any) => {

    if (twofaTimeoutRef.current) {
      clearTimeout(twofaTimeoutRef.current);
    }

    get2faToken({ secret: twofa }).then(res => {
      setTwofaIndex(index)
      const dom = <span style={{ fontWeight: 'bold' }}>{res.data.token} <span style={{ color: '#666666', fontSize: '14px' }}>{res.data.remainingTime}s</span></span>
      setTwofa(dom)
      twofaTimeoutRef.current = setTimeout(() => setTwofaIndex(null), 3000);
    })
  }

  const deletePasswordRequest = (id: string) => {
    setDeleteStaus(true)
    deletePassword({ id }).then(res => {
      getPasswordRequest()
    })
  }

  const addNewPassword = () => {

    const data = newPassword as any;

    if (!data.appName) {
      return "appName cannot be empty";
    }
    if (!data.webSite) {
      return "webSite cannot be empty";
    }
    if (!data.account) {
      return "account cannot be empty";
    }
    if (!data.password) {
      return "password cannot be empty";
    }

    setAddPasswordStatus(true)

    addPassword(data).then(res => {
      getPasswordRequest();
    })

  }

  const editNewPasswordRequest = () => {
    const data = editPassword as any;

    if (!data.appName) {
      return "appName cannot be empty";
    }
    if (!data.webSite) {
      return "webSite cannot be empty";
    }
    if (!data.account) {
      return "account cannot be empty";
    }
    if (!data.password) {
      return "password cannot be empty";
    }

    setEditPasswordStatus(true)

    editNewPassword(data).then(res => {
      getPasswordRequest();
    })
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          &nbsp;&nbsp;
          <code className={styles.code}>Password Next</code>
          &nbsp;&nbsp;
        </p>
        {!localToken && (
          <div>
            By&nbsp;<code className={styles.code}>HChaoHui</code>
          </div>
        )}
        {(localToken && !newPasswordStatus && !editPasswordStatus) && (
          <div className={styles.addNewPassword} onClick={() => { setNewPasswordStatus(true); setNewPassword(newPasswordData) }}>
            + New Password
          </div>
        )}
        {(localToken && newPasswordStatus) && (
          <div className={styles.addNewPassword} onClick={() => { setNewPasswordStatus(false) }}>
            Cancel
          </div>
        )}
        {(localToken && editPasswordStatus) && (
          <div className={styles.addNewPassword} onClick={() => { setEditPasswordStatus(false) }}>
            Cancel
          </div>
        )}
      </div>

      <div className={styles.center}>

        {!localToken && (
          <div className={styles.loginForm}>
            <textarea className={styles.loginText} placeholder="Login With Token" autoFocus value={token} onChange={(e) => { setToken(e.target.value); setLoginTips("") }}></textarea>
            <p className={styles.loginTips}>{loginTips}</p>

            <button className={styles.loginButton} onClick={() => { loginUser() }}>Login</button>
          </div>
        )}

        {(passwordList.length > 0 && !newPasswordStatus && !editPasswordStatus) && (
          <div className={styles.passwordList}>
            {passwordList.map((item, index) => {
              return (
                <div className={styles.password} key={index}>
                  <div className={styles.passwordOption}>
                    <span className={styles.passwordLabel}>AppName: </span> {item.appName}
                  </div>
                  <div className={styles.passwordOption}>
                    <span className={styles.passwordLabel}>WebSite: </span> <a className={styles.passwordHref} href={item.webSite}>{item.webSite}</a>
                  </div>
                  <div className={styles.passwordOption}>
                    <span className={styles.passwordLabel}>Account: </span> {item.account}
                  </div>
                  <div className={styles.passwordOption}>
                    <span className={styles.passwordLabel}>Password: </span>
                    <span className={styles.disableSelect} onClick={() => { copyPassword(item.password, index) }}>******</span>
                    {copiedIndex === index && <span className={styles.copySuccess}>&emsp;Copied Success!!! </span>}
                  </div>
                  {item.twofa && (
                    <div className={styles.passwordOption}>
                      <span className={styles.passwordLabel}>2fa: </span>
                      <span onClick={() => { show2fa(item.twofa, index) }}>{twofaIndex == index ? twofa : <span style={{ userSelect: 'none' }}>******</span>}</span>
                    </div>
                  )}

                  <div className={styles.setting} onClick={() => { setSettingIndex(item.id) }}>
                    <Image src="/images/setting.png" alt="setting" width={20} height={20} />
                  </div>

                  {settingIndex == item.id && (
                    <div className={styles.settingPage}>

                      <div className={styles.settingPageOperationList}>
                        <p className={styles.settingPageOperation} onClick={() => { setEditPasswordStatus(true); setEditPassword({ ...item }) }}>Edit</p>
                        {!deleteStaus && (
                          <p className={styles.settingPageOperation} onClick={() => { deletePasswordRequest(item.id) }}>Delete</p>
                        )}
                        {deleteStaus && (
                          <p className={styles.settingPageOperation}>Deleteing...</p>
                        )}
                      </div>

                      <div className={styles.setting} onClick={() => { setSettingIndex(null) }}>
                        <Image src="/images/cancelSetting.png" alt="setting" width={20} height={20} />
                      </div>

                    </div>
                  )}

                </div>
              )
            })}
          </div>
        )}

        {(passwordList.length == 0 && !newPasswordStatus && !editPasswordStatus && localToken) && (
          <div className={styles.noPassword}>
            <span>No password set, please add one.</span>
          </div>
        )}

        {newPasswordStatus && (
          <div className={styles.newPassword}>

            <div className={styles.newPasswordInput}>
              <p>Account:</p>
              <input type="text" value={newPassword.account} onChange={(e) => { setNewPassword({ ...newPassword, account: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>Password:</p>
              <input type="password" value={newPassword.password} onChange={(e) => { setNewPassword({ ...newPassword, password: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>AppName:</p>
              <input type="text" value={newPassword.appName} onChange={(e) => { setNewPassword({ ...newPassword, appName: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>WebSite:</p>
              <input type="text" value={newPassword.webSite} onChange={(e) => { setNewPassword({ ...newPassword, webSite: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>2fa:</p>
              <input type="text" value={newPassword.twofa} onChange={(e) => { setNewPassword({ ...newPassword, twofa: e.target.value }) }} />
            </div>

            {!addPasswordStatus && (
              <div className={styles.newPasswordOperation}>
                <p className={styles.settingPageOperation} onClick={() => { addNewPassword() }}>Submit</p>
              </div>
            )}

            {addPasswordStatus && (
              <div className={styles.newPasswordOperation}>
                <p className={styles.settingPageOperation}>Submit...</p>
              </div>
            )}

          </div>
        )}

        {editPasswordStatus && (
          <div className={styles.newPassword}>

            <div className={styles.newPasswordInput}>
              <p>Account:</p>
              <input type="text" value={editPassword.account} onChange={(e) => { setEditPassword({ ...editPassword, account: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>Password:</p>
              <input type="password" value={editPassword.password} onChange={(e) => { setEditPassword({ ...editPassword, password: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>AppName:</p>
              <input type="text" value={editPassword.appName} onChange={(e) => { setEditPassword({ ...editPassword, appName: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>WebSite:</p>
              <input type="text" value={editPassword.webSite} onChange={(e) => { setEditPassword({ ...editPassword, webSite: e.target.value }) }} />
            </div>
            <div className={styles.newPasswordInput}>
              <p>2fa:</p>
              <input type="text" value={editPassword.twofa} onChange={(e) => { setEditPassword({ ...editPassword, twofa: e.target.value }) }} />
            </div>

            {!editAddPasswordStatus && (
              <div className={styles.newPasswordOperation}>
                <p className={styles.settingPageOperation} onClick={() => { editNewPasswordRequest() }}>Submit</p>
              </div>
            )}

            {editAddPasswordStatus && (
              <div className={styles.newPasswordOperation}>
                <p className={styles.settingPageOperation}>Submit...</p>
              </div>
            )}

          </div>
        )}

      </div>

      <div className={styles.grid}>

      </div>

      {loadingStatus && <Loading />}
    </main>
  );
}
