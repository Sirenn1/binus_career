/* eslint-disable jsx-a11y/anchor-is-valid */
import { Container } from "@mui/material";
import SEO from "../components/common/seo";
import { LoginContent } from "../components/container/login";
// import { OverlayModalLogin } from 'components/layout/overlay';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/auth/selector";

export function Login() {
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (auth.user) window.location.href = "/";
  }, [auth]);

  const [modalLogin, setModalLogin] = useState(false);
  return (
    <>
      <SEO />
      <Container maxWidth={false} disableGutters>
        <LoginContent modalLogin={modalLogin} setModalLogin={setModalLogin} />
        {/* <OverlayModalLogin modalLogin={modalLogin} setModalLogin={setModalLogin} />
        <CardModalLogin modalLogin={modalLogin} setModalLogin={setModalLogin} /> */}
      </Container>
    </>
  );
}
