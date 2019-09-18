import Cookies from 'js-cookie';

const setConsentCookie = (
  cookieName,
  {
    accepted = true,
    sessionCookies = true,
    analyticsCookies = false,
    marketingCookies = false,
  }
) => {
  const consentCookie = {
    accepted,
    sessionCookies,
    analyticsCookies,
    marketingCookies,
    dateOfConsent: new Date(),
  };
  Cookies.set(cookieName, consentCookie, { secure: true });
  return consentCookie;
};

const getConsentCookie = cookieName => {
  return (
    Cookies.getJSON(cookieName) || {
      accepted: false,
      sessionCookies: false,
      analyticsCookies: false,
      marketingCookies: false,
      dateOfConsent: undefined,
    }
  );
};

export { setConsentCookie, getConsentCookie };
